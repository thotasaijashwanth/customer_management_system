import React from 'react'
import { getCustomerInitials } from '../../utils/customerInsights'

function CustomerAvatar({ customer, size = 'md' }) {
  return (
    <div className={`customer-avatar customer-avatar-${size}`} aria-label={`${customer?.customerName || 'Customer'} avatar`}>
      {getCustomerInitials(customer)}
    </div>
  )
}

export default CustomerAvatar
