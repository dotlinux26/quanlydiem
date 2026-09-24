import { useEffect, useRef } from 'react'

export default function Modal({ title, children, onCancel, onConfirm, confirmLabel = 'Xác nhận', cancelLabel = 'Hủy', variant = 'danger' }) {
  const ref = useRef(null)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onCancel?.()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onCancel])

  const confirmClass = `btn btn-${variant}`

  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        ref={ref}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h3>{title}</h3>
          <button
            type="button"
            className="modal-close"
            aria-label="Đóng"
            onClick={onCancel}
          >
            ×
          </button>
        </div>
        <div className="modal-body">{children}</div>
        {onConfirm && (
          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={onCancel}>
              {cancelLabel}
            </button>
            <button type="button" className={confirmClass} onClick={onConfirm}>
              {confirmLabel}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}