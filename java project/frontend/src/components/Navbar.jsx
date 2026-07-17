import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Home, UserPlus, UsersRound } from 'lucide-react'

function Navbar() {
  return (
    <nav className="legacy-navbar glass-card">
      <Link className="legacy-brand" to="/">
        <UsersRound size={22} />
        Customer Management System
      </Link>
      <div className="legacy-nav-links">
        <NavLink to="/" end>
          <Home size={17} /> Home
        </NavLink>
        <NavLink to="/add">
          <UserPlus size={17} /> Add Customer
        </NavLink>
      </div>
    </nav>
  )
}

export default Navbar
