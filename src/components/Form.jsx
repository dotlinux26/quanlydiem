import { forwardRef } from 'react'

export const Input = forwardRef(function Input({ label, error, hint, className = '', ...props }, ref) {
  return (
    <div className="form-group" style={{ width: '100%' }}>
      {label && <label className="form-label" htmlFor={props.id}>{label}</label>}
      <input
        ref={ref}
        className={`form-input ${error ? 'error' : ''} ${className}`}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${props.id}-error` : hint ? `${props.id}-hint` : undefined}
        {...props}
      />
      {error && <span id={`${props.id}-error`} className="form-error" role="alert">{error}</span>}
      {hint && !error && <span id={`${props.id}-hint`} className="form-hint">{hint}</span>}
    </div>
  )
})

export const Select = forwardRef(function Select({ label, options, error, hint, className = '', ...props }, ref) {
  return (
    <div className="form-group" style={{ width: '100%' }}>
      {label && <label className="form-label" htmlFor={props.id}>{label}</label>}
      <select
        ref={ref}
        className={`form-select ${error ? 'error' : ''} ${className}`}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${props.id}-error` : hint ? `${props.id}-hint` : undefined}
        {...props}
      >
        {options.map((opt, i) => (
          <option key={i} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <span id={`${props.id}-error`} className="form-error" role="alert">{error}</span>}
      {hint && !error && <span id={`${props.id}-hint`} className="form-hint">{hint}</span>}
    </div>
  )
})

export const Textarea = forwardRef(function Textarea({ label, error, hint, className = '', ...props }, ref) {
  return (
    <div className="form-group" style={{ width: '100%' }}>
      {label && <label className="form-label" htmlFor={props.id}>{label}</label>}
      <textarea
        ref={ref}
        className={`form-input ${error ? 'error' : ''} ${className}`}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${props.id}-error` : hint ? `${props.id}-hint` : undefined}
        {...props}
      />
      {error && <span id={`${props.id}-error`} className="form-error" role="alert">{error}</span>}
      {hint && !error && <span id={`${props.id}-hint`} className="form-hint">{hint}</span>}
    </div>
  )
})

export function FormRow({ children }) {
  return <div className="form-row">{children}</div>
}