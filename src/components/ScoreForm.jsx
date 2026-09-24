import { SCORE_COLUMNS } from '../constants/scoreRules.js'

export default function ScoreForm({ value, onChange, errors }) {
  return (
    <div className="score-form" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'nowrap' }}>
      {SCORE_COLUMNS.map((col) => {
        const err = errors?.[col.key]
        return (
          <div key={col.key} className={err ? 'has-error' : ''} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.15rem', minWidth: '96px' }}>
            <label className="form-label" style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.03em', color: '#94a3b8', margin: 0, lineHeight: 1, whiteSpace: 'nowrap' }}>
              {col.label}
            </label>
            <input
              type="text"
              inputMode="decimal"
              className="form-input"
              placeholder="0–10"
              value={value?.[col.key] ?? ''}
              onChange={(e) => onChange(col.key, e.target.value)}
              style={{ width: '96px', height: '36px', padding: '0 0.5rem', fontSize: '0.875rem', textAlign: 'center', borderRadius: '6px', boxSizing: 'border-box' }}
            />
            {err && <span className="form-error" style={{ fontSize: '0.65rem', color: '#dc2626', lineHeight: 1, whiteSpace: 'nowrap' }}>{err}</span>}
          </div>
        )
      })}
    </div>
  )
}