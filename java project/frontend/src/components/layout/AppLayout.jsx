import React, { useState } from 'react'
import Sidebar from './Sidebar'
import TopNavbar from './TopNavbar'
import AnimatedBackground from './AnimatedBackground'
import Footer from '../Footer'

function AppLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="app-shell">
      <AnimatedBackground />
      <div className={`sidebar-mobile-backdrop ${mobileOpen ? 'show' : ''}`} onClick={() => setMobileOpen(false)} />
      <div className={`sidebar-frame ${mobileOpen ? 'mobile-open' : ''}`}>
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((value) => !value)} />
      </div>
      <div className={`app-content ${collapsed ? 'sidebar-collapsed' : ''}`}>
        <TopNavbar onMenuClick={() => setMobileOpen(true)} />
        <main className="page-stage">{children}</main>
        <Footer />
      </div>
    </div>
  )
}

export default AppLayout
