import React, { useEffect } from 'react'
import { CheckCircle2, Info, X, XCircle } from 'lucide-react'

const iconMap = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
}

function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return undefined

    const timer = setTimeout(onClose, 3200)
    return () => clearTimeout(timer)
  }, [toast, onClose])

  if (!toast) return null

  const Icon = iconMap[toast.type || 'info'] || Info

  return (
    <div className={`toast-notice toast-${toast.type || 'info'}`}>
      <Icon size={18} />
      <span>{toast.message}</span>
      <button type="button" onClick={onClose} aria-label="Close notification">
        <X size={16} />
      </button>
    </div>
  )
}

export default Toast
