import React from 'react'

function SkeletonTable({ rows = 5 }) {
  return (
    <div className="glass-card table-shell skeleton-shell">
      {Array.from({ length: rows }).map((_, index) => (
        <div className="skeleton-row" key={index}>
          <span />
          <span />
          <span />
          <span />
        </div>
      ))}
    </div>
  )
}

function SkeletonCards({ count = 4 }) {
  return (
    <div className="stats-grid">
      {Array.from({ length: count }).map((_, index) => (
        <div className="glass-card stat-card skeleton-card" key={index}>
          <span />
          <strong />
          <small />
        </div>
      ))}
    </div>
  )
}

export { SkeletonCards, SkeletonTable }
