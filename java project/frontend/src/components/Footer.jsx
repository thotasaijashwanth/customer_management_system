import React from 'react'
import { HeartHandshake } from 'lucide-react'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="app-footer">
      <span><HeartHandshake size={16} /> Customer Management System</span>
      <small>{currentYear} · Spring Boot · React · MySQL</small>
    </footer>
  )
}

export default Footer
