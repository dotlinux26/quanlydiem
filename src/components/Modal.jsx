import { useEffect, useRef } from 'react'

export default function Modal({ title, children, onCancel, onConfirm }) {
  const ref = useRef(null)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onCancel?.()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onCancel])

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
        <button
          type="button"
          className="modal-close"
          aria-label="Đóng"
          onClick={onCancel}
        >
          ×
        </button>
        <h3>{title}</h3>
        <div className="modal-body">{children}</div>
        {onConfirm && (
          <div className="modal-actions">
            <button type="button" className="btn" onClick={onCancel}>
              Hủy
            </button>
            <button type="button" className="btn btn-danger" onClick={onConfirm}>
              Xác nhận
            </button>
          </div>
        )}
      </div>
    </div>
  )
}