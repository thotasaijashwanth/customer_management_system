import React from 'react'

function PieSummary({ active = 0, inactive = 0 }) {
  const total = active + inactive || 1
  const activePercent = Math.round((active / total) * 100)

  return (
    <div className="chart-card glass-card">
      <div className="section-heading">
        <span>Health Mix</span>
        <strong>{activePercent}% active</strong>
      </div>
      <div className="pie-chart" style={{ '--active-percent': `${activePercent}%` }}>
        <span>{activePercent}%</span>
      </div>
      <div className="chart-legend">
        <span><i className="legend-mint" />Active</span>
        <span><i className="legend-lavender" />Needs care</span>
      </div>
    </div>
  )
}

function BarSummary({ customers = [] }) {
  const cityCounts = customers.reduce((groups, customer) => {
    const city = customer.city || 'Unknown'
    groups[city] = (groups[city] || 0) + 1
    return groups
  }, {})

  const bars = Object.entries(cityCounts).slice(0, 5)
  const max = Math.max(...bars.map(([, count]) => count), 1)

  return (
    <div className="chart-card glass-card">
      <div className="section-heading">
        <span>Customers by City</span>
        <strong>{bars.length} cities</strong>
      </div>
      <div className="bar-chart">
        {bars.map(([city, count]) => (
          <div className="bar-row" key={city}>
            <span>{city}</span>
            <div><i style={{ width: `${(count / max) * 100}%` }} /></div>
            <strong>{count}</strong>
          </div>
        ))}
      </div>
    </div>
  )
}

function LineSummary({ customers = [] }) {
  const points = customers.slice(0, 8).map((customer, index) => ({
    x: 10 + index * 12,
    y: 80 - Math.min(customer.healthScore || 0, 100) * 0.62,
  }))

  const path = points
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ')

  return (
    <div className="chart-card glass-card">
      <div className="section-heading">
        <span>Health Trend</span>
        <strong>Recent records</strong>
      </div>
      <svg className="line-chart" viewBox="0 0 100 90" role="img" aria-label="Customer health trend">
        <path className="line-grid" d="M10 20H94 M10 45H94 M10 70H94" />
        <path className="line-path" d={path || 'M 10 70 L 94 70'} />
        {points.map((point) => (
          <circle key={`${point.x}-${point.y}`} cx={point.x} cy={point.y} r="2.2" />
        ))}
      </svg>
    </div>
  )
}

export { BarSummary, LineSummary, PieSummary }
