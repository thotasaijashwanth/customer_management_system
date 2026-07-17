import React, { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Bell, CalendarDays, Menu, Search, Sparkles, UserRound } from 'lucide-react'

function TopNavbar({ onMenuClick }) {
  const navigate = useNavigate()
  const [now, setNow] = useState(new Date())
  const [query, setQuery] = useState('')
  const [profileOpen, setProfileOpen] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const currentDate = useMemo(
    () => now.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' }),
    [now],
  )
  const currentTime = useMemo(
    () => now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }),
    [now],
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    navigate(query.trim() ? `/?search=${encodeURIComponent(query.trim())}` : '/')
  }

  return (
    <header className="top-navbar">
      <button type="button" className="icon-button mobile-menu-button" onClick={onMenuClick} aria-label="Open menu">
        <Menu size={20} />
      </button>

      <form className="top-search" onSubmit={handleSubmit}>
        <Search size={18} />
        <input
          type="search"
          placeholder="Search customers..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </form>

      <div className="topbar-actions">
        <div className="date-pill">
          <CalendarDays size={17} />
          <span>{currentDate}</span>
          <strong>{currentTime}</strong>
        </div>

        <button type="button" className="icon-button" aria-label="Notifications" onClick={() => navigate('/notifications')}>
          <Bell size={19} />
          <span className="notification-dot" />
        </button>

        <button type="button" className="accent-toggle" aria-label="Soft theme">
          <Sparkles size={17} />
        </button>

        <div className="profile-menu">
          <button type="button" className="profile-trigger" onClick={() => setProfileOpen((value) => !value)}>
            <span>AD</span>
            <UserRound size={17} />
          </button>
          {profileOpen && (
            <div className="profile-dropdown">
              <Link to="/profile" onClick={() => setProfileOpen(false)}>User Profile</Link>
              <Link to="/settings" onClick={() => setProfileOpen(false)}>Settings</Link>
              <Link to="/login" onClick={() => setProfileOpen(false)}>Logout</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default TopNavbar
