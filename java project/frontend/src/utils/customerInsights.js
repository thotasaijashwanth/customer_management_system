const RECENT_WINDOW_DAYS = 30

export function getCustomerInitials(customer = {}) {
  const name = customer.customerName || customer.name || 'Customer'
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('')

  return initials || 'CU'
}

function hasValue(value) {
  return Boolean(String(value || '').trim())
}

function isUpdatedRecently(customer = {}) {
  const rawDate = customer.updatedAt || customer.lastUpdated || customer.modifiedAt || customer.createdAt

  if (!rawDate) {
    return Boolean(customer.id)
  }

  const date = new Date(rawDate)
  if (Number.isNaN(date.getTime())) {
    return Boolean(customer.id)
  }

  const ageInDays = (Date.now() - date.getTime()) / (1000 * 60 * 60 * 24)
  return ageInDays <= RECENT_WINDOW_DAYS
}

/**
 * Customer Health Score for viva/demo:
 * +30 when the main contact information is complete.
 * +20 when email exists.
 * +20 when phone exists.
 * +20 when the record was updated recently.
 * +10 when city is available.
 *
 * The current backend does not expose an updatedAt column, so the frontend
 * treats existing records as recently maintained. If updatedAt/createdAt is
 * added later, this same function will automatically use that real date.
 */
export function calculateCustomerHealthScore(customer = {}) {
  const hasEmail = hasValue(customer.email)
  const hasPhone = hasValue(customer.phone)
  const hasCity = hasValue(customer.city)
  const contactComplete = hasValue(customer.customerName) && hasEmail && hasPhone

  return [
    contactComplete ? 30 : 0,
    hasEmail ? 20 : 0,
    hasPhone ? 20 : 0,
    isUpdatedRecently(customer) ? 20 : 0,
    hasCity ? 10 : 0,
  ].reduce((total, points) => total + points, 0)
}

export function getHealthStatus(score) {
  if (score >= 85) {
    return { label: 'Excellent', color: 'green', className: 'health-excellent' }
  }
  if (score >= 65) {
    return { label: 'Good', color: 'yellow', className: 'health-good' }
  }
  if (score >= 45) {
    return { label: 'Average', color: 'orange', className: 'health-average' }
  }
  return { label: 'Needs Attention', color: 'red', className: 'health-risk' }
}

export function enrichCustomer(customer) {
  const healthScore = calculateCustomerHealthScore(customer)
  const healthStatus = getHealthStatus(healthScore)

  return {
    ...customer,
    healthScore,
    healthStatus,
    isActive: healthScore >= 65,
  }
}

export function enrichCustomers(customers = []) {
  return customers.map(enrichCustomer)
}

export function getCustomerStats(customers = []) {
  const enriched = enrichCustomers(customers)
  const active = enriched.filter((customer) => customer.isActive).length
  const inactive = enriched.length - active
  const today = new Date().toDateString()
  const newToday = enriched.filter((customer) => {
    const rawDate = customer.createdAt || customer.updatedAt
    return rawDate && new Date(rawDate).toDateString() === today
  }).length

  const averageHealth = enriched.length
    ? Math.round(enriched.reduce((total, customer) => total + customer.healthScore, 0) / enriched.length)
    : 0

  return {
    total: enriched.length,
    active,
    inactive,
    newToday,
    averageHealth,
  }
}

export function getGreeting() {
  const hour = new Date().getHours()

  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

export function sortCustomers(customers, sortKey, direction = 'asc') {
  const sorted = [...customers].sort((a, b) => {
    const first = a[sortKey]
    const second = b[sortKey]

    if (typeof first === 'number' && typeof second === 'number') {
      return first - second
    }

    return String(first || '').localeCompare(String(second || ''))
  })

  return direction === 'desc' ? sorted.reverse() : sorted
}
