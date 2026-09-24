import { SCORE_COLUMNS } from '../constants/scoreRules.js'

export default function ScoreForm({ value, onChange, errors }) {
  return (
    <div className="score-form">
      {SCORE_COLUMNS.map((col) => {
        const err = errors?.[col.key]
        return (
          <label key={col.key} className={err ? 'has-error' : ''}>
            <span title={`Hệ số ${col.weight}`}>{col.label}</span>
            <input
              type="text"
              inputMode="decimal"
              placeholder="0–10"
              value={value?.[col.key] ?? ''}
              onChange={(e) => onChange(col.key, e.target.value)}
            />
            {err && <em className="field-error">{err}</em>}
          </label>
        )
      })}
    </div>
  )
}