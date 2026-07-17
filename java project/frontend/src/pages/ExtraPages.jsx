import React from 'react'
import { Link } from 'react-router-dom'
import {
  Bell,
  CheckCircle2,
  CircleHelp,
  Contact,
  HeartHandshake,
  LockKeyhole,
  Mail,
  MapPin,
  MessageCircle,
  RotateCcw,
  Settings,
  ShieldCheck,
  UserPlus,
  UserRound,
  UsersRound,
} from 'lucide-react'
import CustomerAvatar from '../components/ui/CustomerAvatar'
import HealthBadge from '../components/ui/HealthBadge'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import useCustomers from '../hooks/useCustomers'

function MiniPanel({ icon: Icon, title, text }) {
  return (
    <div className="glass-card mini-panel">
      <div className="mini-icon"><Icon size={22} /></div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  )
}

function AuthShell({ title, subtitle, icon: Icon, children, footer }) {
  return (
    <section className="auth-page fade-in">
      <div className="glass-card auth-card scale-in">
        <div className="auth-icon"><Icon size={30} /></div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
        {children}
        {footer && <div className="auth-footer">{footer}</div>}
      </div>
    </section>
  )
}

function WelcomePage() {
  return (
    <section className="welcome-page fade-in">
      <div className="welcome-card glass-card">
        <div>
          <span className="eyebrow">Welcome</span>
          <h1>Customer Management System</h1>
          <p>A polished college project for managing customer records, health scores, reports, and analytics.</p>
          <div className="action-row">
            <Link to="/dashboard" className="btn-gradient">Open Dashboard</Link>
            <Link to="/login" className="btn-soft">Login</Link>
          </div>
        </div>
        <div className="welcome-visual">
          <UsersRound size={72} />
          <span>CRM</span>
        </div>
      </div>
    </section>
  )
}

function LoginPage() {
  return (
    <AuthShell
      title="Login"
      subtitle="Access your pastel customer workspace."
      icon={LockKeyhole}
      footer={<><Link to="/forgot-password">Forgot password?</Link><span>New user? <Link to="/register">Register</Link></span></>}
    >
      <div className="input-shell"><Mail size={18} /><input type="email" placeholder="admin@example.com" /></div>
      <div className="input-shell"><LockKeyhole size={18} /><input type="password" placeholder="Password" /></div>
      <Link to="/dashboard" className="btn-gradient full-width">Login</Link>
    </AuthShell>
  )
}

function RegisterPage() {
  return (
    <AuthShell
      title="Register"
      subtitle="Create a new project user account UI."
      icon={UserPlus}
      footer={<span>Already registered? <Link to="/login">Login</Link></span>}
    >
      <div className="input-shell"><UserRound size={18} /><input type="text" placeholder="Full name" /></div>
      <div className="input-shell"><Mail size={18} /><input type="email" placeholder="Email address" /></div>
      <div className="input-shell"><LockKeyhole size={18} /><input type="password" placeholder="Password" /></div>
      <Link to="/dashboard" className="btn-gradient full-width">Create Account</Link>
    </AuthShell>
  )
}

function ForgotPasswordPage() {
  return (
    <AuthShell
      title="Forgot Password"
      subtitle="Enter your email to receive reset instructions."
      icon={RotateCcw}
      footer={<Link to="/login">Back to login</Link>}
    >
      <div className="input-shell"><Mail size={18} /><input type="email" placeholder="Email address" /></div>
      <Link to="/reset-password" className="btn-gradient full-width">Continue</Link>
    </AuthShell>
  )
}

function ResetPasswordPage() {
  return (
    <AuthShell
      title="Reset Password"
      subtitle="Set a fresh password for your project account."
      icon={ShieldCheck}
      footer={<Link to="/login">Return to login</Link>}
    >
      <div className="input-shell"><LockKeyhole size={18} /><input type="password" placeholder="New password" /></div>
      <div className="input-shell"><CheckCircle2 size={18} /><input type="password" placeholder="Confirm password" /></div>
      <Link to="/login" className="btn-gradient full-width">Reset Password</Link>
    </AuthShell>
  )
}

function AboutProject() {
  return (
    <section className="page-section fade-in">
      <div className="page-title-row">
        <div>
          <span className="eyebrow">About</span>
          <h1>About Project</h1>
          <p>Full-stack customer CRUD system built with Spring Boot, React, MySQL, and a refined presentation layer.</p>
        </div>
      </div>
      <div className="info-grid">
        <MiniPanel icon={UsersRound} title="Customer CRUD" text="Create, read, update, delete, search, and export records." />
        <MiniPanel icon={ShieldCheck} title="Health Score" text="A simple 0-100 customer quality indicator for viva explanation." />
        <MiniPanel icon={HeartHandshake} title="Professional UI" text="Pastel glassmorphism interface with dashboard analytics." />
      </div>
    </section>
  )
}

function HelpCenter() {
  return (
    <section className="page-section fade-in">
      <div className="page-title-row">
        <div>
          <span className="eyebrow">Support</span>
          <h1>Help Center</h1>
          <p>Quick support areas for customer records, reports, account pages, and dashboard views.</p>
        </div>
      </div>
      <div className="info-grid">
        <MiniPanel icon={UsersRound} title="Customers" text="Use the customer page for searching, filtering, sorting, editing, and deleting." />
        <MiniPanel icon={MessageCircle} title="Reports" text="Export customer records to PDF or Excel from the reports page." />
        <MiniPanel icon={Settings} title="Settings" text="Personalize notification and project preferences from settings." />
      </div>
    </section>
  )
}

function FAQPage() {
  const faqs = [
    ['Does this change the backend?', 'No. The frontend reuses the existing customer CRUD APIs.'],
    ['How is health score calculated?', 'It adds points for complete contact details, email, phone, recent update, and city.'],
    ['Can I export data?', 'Yes. The customer table and reports page support PDF and Excel exports.'],
  ]

  return (
    <section className="page-section fade-in">
      <div className="page-title-row">
        <div>
          <span className="eyebrow">FAQ</span>
          <h1>Frequently Asked Questions</h1>
        </div>
      </div>
      <div className="faq-list">
        {faqs.map(([question, answer]) => (
          <div className="glass-card faq-item" key={question}>
            <CircleHelp size={20} />
            <div>
              <h3>{question}</h3>
              <p>{answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function ContactPage() {
  return (
    <section className="page-section fade-in">
      <div className="page-title-row">
        <div>
          <span className="eyebrow">Contact</span>
          <h1>Contact Page</h1>
          <p>Project contact UI for support and feedback.</p>
        </div>
      </div>
      <div className="form-grid">
        <div className="glass-card customer-form">
          <div className="input-shell"><UserRound size={18} /><input type="text" placeholder="Your name" /></div>
          <div className="input-shell"><Mail size={18} /><input type="email" placeholder="Email address" /></div>
          <textarea className="message-box" placeholder="Message" />
          <button type="button" className="btn-gradient">Send Message</button>
        </div>
        <div className="glass-card form-preview">
          <Contact size={34} />
          <h2>Project Desk</h2>
          <p>Customer Management System</p>
          <ul>
            <li><Mail size={16} /> support@example.com</li>
            <li><MapPin size={16} /> College Project Lab</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

function UserProfile() {
  return (
    <section className="page-section fade-in">
      <div className="glass-card profile-card">
        <div className="customer-avatar customer-avatar-lg">AD</div>
        <h1>Admin Profile</h1>
        <p>Project administrator</p>
        <div className="profile-stats">
          <span><strong>React</strong> Frontend</span>
          <span><strong>Spring</strong> Backend</span>
          <span><strong>MySQL</strong> Database</span>
        </div>
      </div>
    </section>
  )
}

function SettingsPage() {
  return (
    <section className="page-section fade-in">
      <div className="page-title-row">
        <div>
          <span className="eyebrow">Preferences</span>
          <h1>Settings Page</h1>
          <p>Project UI settings and notification preferences.</p>
        </div>
      </div>
      <div className="settings-list">
        {['Email notifications', 'Health score alerts', 'Weekly reports', 'Compact customer table'].map((item) => (
          <label className="glass-card setting-row" key={item}>
            <span>{item}</span>
            <input type="checkbox" defaultChecked />
          </label>
        ))}
      </div>
    </section>
  )
}

function NotificationsPage() {
  const notices = ['Customer health report is ready', 'New dashboard view added', 'Export tools are available']

  return (
    <section className="page-section fade-in">
      <div className="page-title-row">
        <div>
          <span className="eyebrow">Notifications</span>
          <h1>Notifications Page</h1>
        </div>
      </div>
      <div className="timeline-list">
        {notices.map((notice) => (
          <div className="timeline-item glass-card" key={notice}>
            <div className="timeline-dot"><Bell size={16} /></div>
            <div>
              <strong>{notice}</strong>
              <span>Just now</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function CustomerProfilePage() {
  const { customers, loading } = useCustomers()
  const customer = customers[0]

  if (loading) return <LoadingSpinner label="Loading customer profile" />

  if (!customer) {
    return (
      <section className="page-section fade-in">
        <Link to="/add" className="btn-gradient">Add First Customer</Link>
      </section>
    )
  }

  return (
    <section className="page-section fade-in">
      <div className="glass-card profile-card">
        <CustomerAvatar customer={customer} size="lg" />
        <h1>{customer.customerName}</h1>
        <p>{customer.email}</p>
        <HealthBadge customer={customer} />
        <Link to={`/view/${customer.id}`} className="btn-soft">Open Details</Link>
      </div>
    </section>
  )
}

function Error404Page() {
  return (
    <section className="auth-page fade-in">
      <div className="glass-card auth-card scale-in">
        <div className="auth-icon"><CircleHelp size={34} /></div>
        <h1>404 Page</h1>
        <p>The requested page does not exist in this customer workspace.</p>
        <Link to="/dashboard" className="btn-gradient full-width">Back to Dashboard</Link>
      </div>
    </section>
  )
}

export {
  AboutProject,
  ContactPage,
  CustomerProfilePage,
  Error404Page,
  FAQPage,
  ForgotPasswordPage,
  HelpCenter,
  LoginPage,
  NotificationsPage,
  RegisterPage,
  ResetPasswordPage,
  SettingsPage,
  UserProfile,
  WelcomePage,
}
