import React from 'react'
import { SearchX } from 'lucide-react'

function EmptyState({ title = 'No records found', message = 'Try changing the search or filter.' }) {
  return (
    <div className="empty-state glass-card">
      <div className="empty-illustration">
        <SearchX size={44} />
      </div>
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  )
}

export default EmptyState
