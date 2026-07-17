import React from 'react'
import { ShieldCheck } from 'lucide-react'
import { calculateCustomerHealthScore, getHealthStatus } from '../../utils/customerInsights'

function HealthBadge({ customer, score: providedScore, compact = false }) {
  const score = providedScore ?? calculateCustomerHealthScore(customer)
  const status = getHealthStatus(score)

  return (
    <div className={`health-badge ${status.className} ${compact ? 'health-badge-compact' : ''}`}>
      <ShieldCheck size={compact ? 14 : 16} />
      <span>{score}</span>
      {!compact && <small>{status.label}</small>}
    </div>
  )
}

export default HealthBadge
