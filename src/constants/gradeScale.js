export const GRADE_SCALE_43 = [
  { letter: 'A', min: 8.5, max: 10.0, label: 'Xuất sắc', gradePoint: 4.0 },
  { letter: 'B', min: 7.0, max: 8.4, label: 'Khá', gradePoint: 3.0 },
  { letter: 'C', min: 5.5, max: 6.9, label: 'Trung bình', gradePoint: 2.0 },
  { letter: 'D', min: 4.0, max: 5.4, label: 'Trung bình yếu', gradePoint: 1.0 },
  { letter: 'F', min: 0.0, max: 3.9, label: 'Không đạt', gradePoint: 0.0 },
]

export function getLetterGrade(score) {
  if (score === null || score === undefined || isNaN(score)) return 'F'
  const grade = GRADE_SCALE_43.find(g => score >= g.min && score <= g.max)
  return grade?.letter ?? 'F'
}

export function getGradeDetail(score) {
  if (score === null || score === undefined || isNaN(score)) return GRADE_SCALE_43[GRADE_SCALE_43.length - 1]
  return GRADE_SCALE_43.find(g => score >= g.min && score <= g.max) ?? GRADE_SCALE_43[GRADE_SCALE_43.length - 1]
}

export function isPassing(score) {
  if (score === null || score === undefined || isNaN(score)) return false
  return score >= 4.0
}

export function getGradeColor(letter) {
  const colors = {
    A: '#16a34a',
    B: '#2563eb',
    C: '#f59e0b',
    D: '#f97316',
    F: '#dc2626',
  }
  return colors[letter] ?? '#64748b'
}