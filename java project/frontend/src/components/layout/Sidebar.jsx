import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  BarChart3,
  Bell,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  PieChart,
  Settings,
  UserRound,
  UsersRound,
} from 'lucide-react'

const navItems = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Customers', path: '/', icon: UsersRound, end: true },
  { label: 'Reports', path: '/reports', icon: BarChart3 },
  { label: 'Analytics', path: '/analytics', icon: PieChart },
  { label: 'Notifications', path: '/notifications', icon: Bell },
  { label: 'Settings', path: '/settings', icon: Settings },
  { label: 'Profile', path: '/profile', icon: UserRound },
]

function Sidebar({ collapsed, onToggle }) {
  const navigate = useNavigate()

  return (
    <aside className={`app-sidebar ${collapsed ? 'is-collapsed' : ''}`}>
      <div className="sidebar-brand">
        <div className="brand-mark">CM</div>
        {!collapsed && (
          <div>
            <strong>CustomerMS</strong>
            <span>Pastel CRM</span>
          </div>
        )}
      </div>

      <button type="button" className="sidebar-toggle" onClick={onToggle} aria-label="Toggle sidebar">
        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>

      <nav className="sidebar-nav" aria-label="Main navigation">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              title={collapsed ? item.label : undefined}
            >
              <Icon size={19} />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          )
        })}
      </nav>

      <button type="button" className="sidebar-link logout-link" onClick={() => navigate('/login')}>
        <LogOut size={19} />
        {!collapsed && <span>Logout</span>}
      </button>
    </aside>
  )
}

export default Sidebar
