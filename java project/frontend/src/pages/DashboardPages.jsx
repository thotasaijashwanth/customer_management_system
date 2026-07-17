import React from 'react'
import { Link } from 'react-router-dom'
import {
  Activity,
  BarChart3,
  Bell,
  Clock3,
  FileText,
  LineChart,
  PieChart,
  Plus,
  Sparkles,
  TrendingUp,
  UserCheck,
  UserMinus,
  UsersRound,
} from 'lucide-react'
import CustomerAvatar from '../components/ui/CustomerAvatar'
import EmptyState from '../components/ui/EmptyState'
import HealthBadge from '../components/ui/HealthBadge'
import { SkeletonCards, SkeletonTable } from '../components/ui/Skeleton'
import { BarSummary, LineSummary, PieSummary } from '../components/ui/DashboardCharts'
import useCustomers from '../hooks/useCustomers'
import { getCustomerStats, getGreeting } from '../utils/customerInsights'
import { exportCustomersToExcel, exportCustomersToPDF } from '../utils/exportCustomers'

function StatCard({ icon: Icon, label, value, hint, tone = 'lavender' }) {
  return (
    <div className={`glass-card stat-card stat-${tone}`}>
      <div className="stat-icon"><Icon size={22} /></div>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{hint}</small>
    </div>
  )
}

function RecentCustomerTable({ customers }) {
  if (!customers.length) {
    return <EmptyState title="No recent customers" message="New customer activity will appear here." />
  }

  return (
    <div className="glass-card table-shell">
      <table className="modern-table compact-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>City</th>
            <th>Health</th>
          </tr>
        </thead>
        <tbody>
          {customers.slice(0, 5).map((customer) => (
            <tr key={customer.id}>
              <td>
                <div className="customer-cell">
                  <CustomerAvatar customer={customer} />
                  <div>
                    <strong>{customer.customerName}</strong>
                    <span>{customer.email}</span>
                  </div>
                </div>
              </td>
              <td>{customer.city}</td>
              <td><HealthBadge customer={customer} compact /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function DashboardHome() {
  const { customers, loading, error } = useCustomers()
  const stats = getCustomerStats(customers)

  return (
    <section className="page-section fade-in">
      <div className="welcome-card glass-card">
        <div>
          <span className="eyebrow">{getGreeting()}, Admin</span>
          <h1>Dashboard Home</h1>
          <p>Your customer workspace is ready with live records, health scoring, and quick actions.</p>
        </div>
        <div className="welcome-actions">
          <Link to="/add-wizard" className="btn-gradient"><Plus size={17} /> Add Customer</Link>
          <Link to="/reports" className="btn-soft"><FileText size={17} /> Reports</Link>
        </div>
      </div>

      {error && <div className="alert-card alert-error">{error}</div>}

      {loading ? (
        <SkeletonCards count={4} />
      ) : (
        <div className="stats-grid">
          <StatCard icon={UsersRound} label="Total Customers" value={stats.total} hint="All saved records" tone="sky" />
          <StatCard icon={UserCheck} label="Active Customers" value={stats.active} hint="Good health score" tone="mint" />
          <StatCard icon={UserMinus} label="Inactive Customers" value={stats.inactive} hint="Needs attention" tone="purple" />
          <StatCard icon={Sparkles} label="Today's New" value={stats.newToday} hint="Created today" tone="blue" />
        </div>
      )}

      <div className="dashboard-grid">
        <div className="dashboard-main">
          <div className="section-heading">
            <span>Recent Customers</span>
            <Link to="/">View all</Link>
          </div>
          {loading ? <SkeletonTable rows={4} /> : <RecentCustomerTable customers={customers} />}
        </div>

        <div className="dashboard-side">
          <PieSummary active={stats.active} inactive={stats.inactive} />
        </div>
      </div>

      <div className="chart-grid">
        <LineSummary customers={customers} />
        <BarSummary customers={customers} />
      </div>
    </section>
  )
}

function AnalyticsDashboard() {
  const { customers, loading } = useCustomers()
  const stats = getCustomerStats(customers)

  return (
    <section className="page-section fade-in">
      <div className="page-title-row">
        <div>
          <span className="eyebrow">Analytics</span>
          <h1>Analytics Dashboard</h1>
          <p>Visual customer distribution, health movement, and city-wise trends.</p>
        </div>
      </div>
      {loading ? <SkeletonCards count={3} /> : (
        <>
          <div className="stats-grid">
            <StatCard icon={TrendingUp} label="Average Health" value={`${stats.averageHealth}%`} hint="Across all customers" tone="mint" />
            <StatCard icon={PieChart} label="Active Ratio" value={`${stats.total ? Math.round((stats.active / stats.total) * 100) : 0}%`} hint="Healthy customer share" tone="sky" />
            <StatCard icon={BarChart3} label="Cities Covered" value={new Set(customers.map((customer) => customer.city)).size} hint="Customer locations" tone="purple" />
          </div>
          <div className="chart-grid">
            <PieSummary active={stats.active} inactive={stats.inactive} />
            <LineSummary customers={customers} />
            <BarSummary customers={customers} />
          </div>
        </>
      )}
    </section>
  )
}

function ReportsPage() {
  const { customers, loading } = useCustomers()

  return (
    <section className="page-section fade-in">
      <div className="page-title-row">
        <div>
          <span className="eyebrow">Reports</span>
          <h1>Reports Page</h1>
          <p>Export customer health and contact records for presentation or review.</p>
        </div>
        <div className="action-row">
          <button type="button" className="btn-soft" onClick={() => exportCustomersToPDF(customers)}>Export PDF</button>
          <button type="button" className="btn-gradient" onClick={() => exportCustomersToExcel(customers)}>Export Excel</button>
        </div>
      </div>
      {loading ? <SkeletonTable rows={5} /> : <RecentCustomerTable customers={customers} />}
    </section>
  )
}

function ActivityTimeline() {
  const { customers, loading } = useCustomers()

  return (
    <section className="page-section fade-in">
      <div className="page-title-row">
        <div>
          <span className="eyebrow">Activity</span>
          <h1>Activity Timeline</h1>
          <p>Recent customer records displayed as an easy timeline.</p>
        </div>
      </div>
      <div className="timeline-list">
        {loading ? <SkeletonTable rows={4} /> : customers.slice(0, 7).map((customer, index) => (
          <div className="timeline-item glass-card" key={customer.id}>
            <div className="timeline-dot"><Activity size={16} /></div>
            <div>
              <strong>{customer.customerName}</strong>
              <span>{index === 0 ? 'Recently reviewed' : 'Customer record available'} in {customer.city}</span>
            </div>
            <HealthBadge customer={customer} compact />
          </div>
        ))}
      </div>
    </section>
  )
}

function CustomerStatistics() {
  const { customers, loading } = useCustomers()
  const stats = getCustomerStats(customers)

  return (
    <section className="page-section fade-in">
      <div className="page-title-row">
        <div>
          <span className="eyebrow">Statistics</span>
          <h1>Customer Statistics</h1>
          <p>Quick numbers for viva explanation and project review.</p>
        </div>
      </div>
      {loading ? <SkeletonCards count={4} /> : (
        <div className="stats-grid">
          <StatCard icon={UsersRound} label="Total" value={stats.total} hint="Saved customers" tone="sky" />
          <StatCard icon={UserCheck} label="Active" value={stats.active} hint="Health score 65+" tone="mint" />
          <StatCard icon={UserMinus} label="Inactive" value={stats.inactive} hint="Below health target" tone="purple" />
          <StatCard icon={LineChart} label="Average Score" value={stats.averageHealth} hint="Out of 100" tone="blue" />
        </div>
      )}
    </section>
  )
}

function RecentActivities() {
  const { customers, loading } = useCustomers()

  return (
    <section className="page-section fade-in">
      <div className="page-title-row">
        <div>
          <span className="eyebrow">Recent</span>
          <h1>Recent Activities</h1>
          <p>Freshly loaded customer activity from the current backend records.</p>
        </div>
      </div>
      {loading ? <SkeletonTable rows={5} /> : (
        <div className="activity-grid">
          {customers.slice(0, 6).map((customer) => (
            <div className="glass-card activity-card" key={customer.id}>
              <CustomerAvatar customer={customer} />
              <div>
                <strong>{customer.customerName}</strong>
                <span><Clock3 size={14} /> Contact record checked</span>
              </div>
              <Bell size={18} />
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export {
  ActivityTimeline,
  AnalyticsDashboard,
  CustomerStatistics,
  DashboardHome,
  RecentActivities,
  ReportsPage,
}
