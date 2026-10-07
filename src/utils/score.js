import { SCORE, SCORE_COMPONENTS, SCORE_PRESETS } from '../constants/scoreRules.js'
import { getLetterGrade, isPassing, getGradeDetail, getGradeColor } from '../constants/gradeScale.js'

export function isValidScore(value) {
  return typeof value === 'number' && SCORE.MIN <= value && value <= SCORE.MAX
}

export function isValidStep(value) {
  if (typeof value !== 'number') return false
  return (value * 2) % 1 === 0
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
  if (!isValidStep(value)) return `Điểm phải là bội số của ${SCORE.STEP}`
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

export function getDefaultWeights() {
  return {
    tx: SCORE_COMPONENTS.find(c => c.key === 'tx')?.weight ?? 0.3,
    gk: SCORE_COMPONENTS.find(c => c.key === 'gk')?.weight ?? 0.3,
    ck: SCORE_COMPONENTS.find(c => c.key === 'ck')?.weight ?? 0.4,
  }
}

export function calcSummary(scores, weights = getDefaultWeights()) {
  const { tx, gk, ck } = scores ?? {}
  if (tx === null || tx === undefined || gk === null || gk === undefined || ck === null || ck === undefined) {
    return null
  }
  if (!isValidScore(tx) || !isValidScore(gk) || !isValidScore(ck)) {
    return null
  }
  const total = tx * weights.tx + gk * weights.gk + ck * weights.ck
  return roundTo(total)
}

export function computeGrade(score) {
  if (score === null || score === undefined) return { tongKet: null, diemChu: 'F', dat: false, detail: null }
  return {
    tongKet: score,
    diemChu: getLetterGrade(score),
    dat: isPassing(score),
    detail: getGradeDetail(score),
  }
}

export function validateAllScores(scores) {
  const errors = {}
  for (const comp of SCORE_COMPONENTS) {
    const value = scores?.[comp.key]
    const err = scoreInputError(value)
    if (err) errors[comp.key] = err
  }
  return errors
}

export function getScoreComponentLabels() {
  return SCORE_COMPONENTS.map(c => ({ key: c.key, label: c.label, shortLabel: c.shortLabel, weight: c.weight }))
}