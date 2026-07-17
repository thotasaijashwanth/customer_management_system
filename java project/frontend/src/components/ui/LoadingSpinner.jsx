import React from 'react'

function LoadingSpinner({ label = 'Loading' }) {
  return (
    <div className="loading-wrap" role="status" aria-live="polite">
      <div className="pastel-spinner" />
      <span>{label}</span>
    </div>
  )
}

export default LoadingSpinner
