export function Table({ columns, data, keyField = 'id', onRowClick, emptyMessage = 'Không có dữ liệu', className = '', striped = true }) {
  if (!data || data.length === 0) {
    return (
      <div className="empty-state" style={{ padding: '3rem' }}>
        <div className="icon" style={{ width: '48px', height: '48px', fontSize: '1.25rem' }}>📋</div>
        <h3 style={{ margin: '0.75rem 0 0', color: '#1e293b' }}>{emptyMessage}</h3>
      </div>
    )
  }

  return (
    <div className="table-wrapper">
      <table className={`table ${className}`} role="grid">
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th key={i} style={{ width: col.width, textAlign: col.align || 'left' }}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={row[keyField]}
              onClick={() => onRowClick?.(row)}
              style={{ cursor: onRowClick ? 'pointer' : 'default' }}
              className={striped && rowIndex % 2 === 1 ? 'bg-alt' : ''}
            >
              {columns.map((col, colIndex) => (
                <td key={colIndex} style={{ textAlign: col.align || 'left' }}>
                  {col.render ? col.render(row, rowIndex) : row[col.field]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function Pagination({ currentPage, totalPages, onPageChange, pageSize = 20, totalItems, showPageSize = false, onPageSizeChange }) {
  if (totalPages <= 1) return null

  const pages = []
  const maxVisible = 5
  let start = Math.max(1, currentPage - Math.floor(maxVisible / 2))
  let end = Math.min(totalPages, start + maxVisible - 1)
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1)
  }

  return (
    <div className="pagination" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', marginTop: '1rem', flexWrap: 'wrap' }}>
      <span className="pagination-info" style={{ fontSize: '0.8125rem', color: '#64748b' }}>
        Trang {currentPage}/{totalPages} · Tổng {totalItems} mục
      </span>
      <button
        className="btn btn-outline btn-sm"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        aria-label="Trang đầu"
      >
        ««
      </button>
      <button
        className="btn btn-outline btn-sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Trang trước"
      >
        «
      </button>
      {start > 1 && (
        <>
          <button className="btn btn-outline btn-sm" onClick={() => onPageChange(1)}>1</button>
          {start > 2 && <span className="pagination-ellipsis" style={{ padding: '0 0.5rem', color: '#94a3b8' }}>…</span>}
        </>
      )}
      {Array.from({ length: end - start + 1 }, (_, i) => start + i).map((page) => (
        <button
          key={page}
          className={`btn btn-sm ${page === currentPage ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => onPageChange(page)}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </button>
      ))}
      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className="pagination-ellipsis" style={{ padding: '0 0.5rem', color: '#94a3b8' }}>…</span>}
          <button className="btn btn-outline btn-sm" onClick={() => onPageChange(totalPages)}>{totalPages}</button>
        </>
      )}
      <button
        className="btn btn-outline btn-sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Trang sau"
      >
        »
      </button>
      <button
        className="btn btn-outline btn-sm"
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        aria-label="Trang cuối"
      >
        »»
      </button>
      {showPageSize && (
        <select
          className="form-select"
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          style={{ width: 'auto', marginLeft: '1rem' }}
          aria-label="Số mục mỗi trang"
        >
          {[10, 20, 50, 100].map((size) => <option key={size} value={size}>{size} / trang</option>)}
        </select>
      )}
    </div>
  )
}