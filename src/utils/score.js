import { SCORE, SCORE_COLUMNS } from '../constants/scoreRules.js'

export function isValidScore(value) {
  return typeof value === 'number' && SCORE.MIN <= value && value <= SCORE.MAX
}

export function parseScore(input) {
  if (input === null || input === undefined) return null
  const text = String(input).trim().replace(',', '.').replace('%', '')
  if (text === '') return null
  const value = Number(text)
  return Number.isFinite(value) ? value : null
}

export function scoreError(input) {
  const value = parseScore(input)
  if (value === null) return null
  if (value < SCORE.MIN) return `Điểm phải >= ${SCORE.MIN}`
  if (value > SCORE.MAX) return `Điểm phải <= ${SCORE.MAX}`
  return null
}

export function scoreInputError(input) {
  const text = String(input ?? '').trim()
  if (text === '') return null
  if (parseScore(input) === null) return 'Điểm không hợp lệ'
  return scoreError(input)
}

export function roundTo(value, decimals = 1) {
  return Math.round((value + Number.EPSILON) * 10 ** decimals) / 10 ** decimals
}

export function calcSummary(scores) {
  let total = 0
  for (const col of SCORE_COLUMNS) {
    const value = scores?.[col.key]
    if (typeof value !== 'number') return null
    if (!isValidScore(value)) return null
  }
  for (const col of SCORE_COLUMNS) {
    total += scores[col.key] * col.weight
  }
  return roundTo(total)
}