import { chromium } from 'playwright'
const BASE = process.env.BASE_URL || 'http://localhost:5174'

const results = []
function t(name, cond, extra = '') {
  results.push({ name, cond })
  console.log(`${cond ? 'PASS' : 'FAIL'}  ${name}${extra ? '  [' + extra + ']' : ''}`)
}

;(async () => {
  const browser = await chromium.launch({ executablePath: '/usr/bin/chromium' })
  const page = await browser.newPage()
  const consoleErrors = []
  page.on('console', (m) => m.type() === 'error' && consoleErrors.push(m.text()))
  page.on('pageerror', (e) => consoleErrors.push('PAGEERROR: ' + e.message))

  const login = async (u, p) => {
    await page.goto(BASE + '/login')
    await page.waitForSelector('input[autocomplete=username]')
    await page.fill('input[autocomplete=username]', u)
    await page.fill('input[autocomplete=current-password]', p)
    await page.click('button[type=submit]')
    await page.waitForSelector('.navbar')
  }
  const goScore = async () => {
    await page.click('.navbar-links a:has-text("Lớp học")')
    await page.waitForSelector('.table tbody tr')
    await page.click('text=Xem sinh viên')
    await page.waitForSelector('text=Nhập điểm theo lớp')
    await page.click('text=Nhập điểm theo lớp')
    await page.waitForSelector('.score-table tbody tr td:nth-child(3)')
  }

  await page.goto(BASE)
  await page.waitForSelector('text=thay thế quy trình thủ công')
  t('landing loads', true)

  await page.goto(BASE + '/lop')
  await page.waitForSelector('text=Đăng nhập')
  t('protected route redirects to /login', page.url().includes('/login'))

  await login('gv01', '123456')
  await page.click('.navbar-links a:has-text("Lớp học")')
  await page.waitForSelector('.table tbody tr')
  const rows = await page.locator('.table tbody tr').count()
  t('teacher sees 3 classes', rows === 3, `rows=${rows}`)

  // Bug #3: per-student link -> highlight row
  await page.click('text=Xem sinh viên')
  await page.waitForSelector('tbody tr a:has-text("Nhập điểm")')
  await page.click('tbody tr:nth-child(3) a:has-text("Nhập điểm")')
  await page.waitForSelector('.score-table')
  await page.waitForSelector('.row-highlight')
  const hlMa = await page.locator('.row-highlight td:nth-child(2)').textContent()
  t('bug#3 per-student link highlights row', hlMa.trim() === 'SV0003', `hl=${hlMa.trim()}`)
  await page.goto(BASE + '/lop/1/diem')
  await page.waitForSelector('.score-table tbody tr td:nth-child(3)')

  // Bug #2: comma decimal 7,5 works + tongKet auto
  const row4 = page.locator('.score-table tbody tr').nth(3)
  const inputs = row4.locator('.score-form input')
  await inputs.nth(0).fill('7,5')
  const v = await inputs.nth(0).inputValue()
  t('bug#2 comma input accepted (7,5)', v === '7,5', `value=${JSON.stringify(v)}`)
  await inputs.nth(1).fill('8')
  await inputs.nth(2).fill('6,5')
  const calc = await row4.locator('.tong-ket').textContent()
  t('tongKet auto computed', /\d/.test(calc.trim()), calc.trim())

  // Invalid text -> error
  await inputs.nth(0).fill('abc')
  const errTxt = await row4.locator('.form-error').first().textContent()
  t('invalid text shows error', errTxt.trim() === 'Điểm không hợp lệ', errTxt.trim())

  // Invalid 15 -> error
  await inputs.nth(0).fill('15')
  await row4.locator('button.btn-primary').click()
  const errRng = await row4.locator('.form-error').first().textContent()
  t('score >10 rejected', errRng.includes('<= 10'), errRng.trim())

  // Fix valid + save
  await inputs.nth(0).fill('7,5')
  await row4.locator('button.btn-primary').click()
  await page.waitForSelector('.alert-success')
  const status = await row4.locator('.badge').textContent()
  t('row saved status=Đã lưu', status.trim() === 'Đã lưu', status.trim())

  // Bug #1: switching mon when dirty -> confirm dialog
  let dialogShown = false
  page.on('dialog', (d) => {
    if (d.type() === 'confirm') dialogShown = true
    d.accept()
  })
  await inputs.nth(0).fill('9')
  await page.locator('.toolbar select').selectOption({ value: '2' })
  await page.waitForTimeout(500)
  t('bug#1 confirm dialog shown before switching mon', dialogShown)
  const v1 = await page.locator('.score-table tbody tr').nth(3).locator('.score-form input').nth(0).inputValue()
  t('after switch mon row reset clean (no stale)', v1 === '', `value=${v1}`)

  // Logout -> login
  await page.click('text=Đăng xuất')
  await page.waitForSelector('text=Hệ thống nhập liệu')
  t('logout redirects to login', true)

  // Admin login: from landing, check admin dashboard
  await login('quanly01', '123456')
  await page.waitForSelector('text=Bảng điều khiển quản trị')
  const adminCards = await page.locator('main a[href^="/admin"]').count()
  t('admin sees dashboard with 4 stats cards', adminCards === 4, `cards=${adminCards}`)

  t('no console errors', consoleErrors.length === 0, consoleErrors.slice(0, 3).join(' | ') || 'none')

  await browser.close()

  const failed = results.filter((r) => !r.cond)
  console.log(`\n${results.length - failed.length}/${results.length} passed`)
  process.exit(failed.length > 0 ? 1 : 0)
})().catch((e) => {
  console.error('E2E CRASH:', e.message)
  process.exit(1)
})