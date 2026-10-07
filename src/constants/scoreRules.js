export const SCORE = {
  MAX: 10,
  MIN: 0,
  STEP: 0.5,
}

export const SCORE_COMPONENTS = [
  { key: 'tx', label: 'Thường xuyên', weight: 0.3, shortLabel: 'TX' },
  { key: 'gk', label: 'Giữa kỳ', weight: 0.3, shortLabel: 'GK' },
  { key: 'ck', label: 'Cuối kỳ', weight: 0.4, shortLabel: 'CK' },
]

export const SCORE_PRESETS = {
  default: { tx: 0.3, gk: 0.3, ck: 0.4 },
  theoryHeavy: { tx: 0.2, gk: 0.3, ck: 0.5 },
  practiceHeavy: { tx: 0.4, gk: 0.3, ck: 0.3 },
}