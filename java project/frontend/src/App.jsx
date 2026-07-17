import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import Home from './pages/Home.jsx'
import AddCustomer from './pages/AddCustomer.jsx'
import EditCustomer from './pages/EditCustomer.jsx'
import ViewCustomer from './pages/ViewCustomer.jsx'
import CustomerForm from './components/CustomerForm.jsx'
import {
  ActivityTimeline,
  AnalyticsDashboard,
  CustomerStatistics,
  DashboardHome,
  RecentActivities,
  ReportsPage,
} from './pages/DashboardPages.jsx'
import {
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
} from './pages/ExtraPages.jsx'

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddCustomer />} />
        <Route path="/add-wizard" element={<CustomerForm wizard />} />
        <Route path="/edit/:id" element={<EditCustomer />} />
        <Route path="/view/:id" element={<ViewCustomer />} />
        <Route path="/customers/:id" element={<ViewCustomer />} />
        <Route path="/customer-profile" element={<CustomerProfilePage />} />

        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        <Route path="/dashboard" element={<DashboardHome />} />
        <Route path="/analytics" element={<AnalyticsDashboard />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/activity" element={<ActivityTimeline />} />
        <Route path="/statistics" element={<CustomerStatistics />} />
        <Route path="/recent-activities" element={<RecentActivities />} />

        <Route path="/about" element={<AboutProject />} />
        <Route path="/help" element={<HelpCenter />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />

        <Route path="*" element={<Error404Page />} />
      </Routes>
    </AppLayout>
  )
}

export default App
