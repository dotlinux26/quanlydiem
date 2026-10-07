import { useState, useRef, useEffect, useCallback } from 'react'
import Icon from './Icon.jsx'

export default function Select({ options, value, onChange, placeholder, className = '', disabled, style }) {
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef(null)
  const isMounted = useRef(true)

  useEffect(() => {
    isMounted.current = true
    return () => { isMounted.current = false }
  }, [])

  const handleClickOutside = useCallback((e) => {
    if (!isMounted.current) return
    if (selectRef.current && !selectRef.current.contains(e.target)) {
      setIsOpen(false)
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, handleClickOutside])

  const handleToggle = (e) => {
    e.stopPropagation()
    if (!disabled) setIsOpen(prev => !prev)
  }

  function handleSelect(option) {
    onChange?.(option.value)
    setIsOpen(false)
  }

  const selectedLabel = value ? (options.find(o => o.value === value)?.label ?? value) : placeholder

  return (
    <div className={`custom-select ${className}`} ref={selectRef} style={style}>
      <button
        type="button"
        className="select-trigger"
        onClick={handleToggle}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          padding: '0.5rem 0.75rem',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-sm)',
          background: '#fff',
          color: value ? 'var(--color-text)' : 'var(--color-text-muted)',
          font: 'inherit',
          fontSize: '0.875rem',
          cursor: disabled ? 'not-allowed' : 'pointer',
          textAlign: 'left',
        }}
      >
        <span>{value ? (options.find(o => o.value === value)?.label ?? value) : placeholder}</span>
        <Icon name={isOpen ? 'chevronUp' : 'chevronDown'} size={16} style={{ marginLeft: '0.5rem', color: 'var(--color-text-muted)', flexShrink: 0 }} />
      </button>
      {isOpen && (
        <ul className="select-options" role="listbox" style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          marginTop: '0.25rem',
          background: '#fff',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-sm)',
          boxShadow: 'var(--shadow-md)',
          listStyle: 'none',
          padding: '0.25rem 0',
          maxHeight: '200px',
          overflowY: 'auto',
          zIndex: 100,
        }}>
          {options.map((opt) => (
            <li
              key={opt.value}
              role="option"
              aria-selected={value === opt.value}
              onClick={() => handleSelect(opt)}
              style={{
                padding: '0.5rem 0.75rem',
                cursor: 'pointer',
                background: value === opt.value ? 'var(--color-primary-light)' : 'transparent',
                color: value === opt.value ? 'var(--color-primary)' : 'var(--color-text)',
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}