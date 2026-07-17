import React, { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Building2, CheckCircle2, Mail, MapPin, Phone, Save, UserRound } from 'lucide-react'
import CustomerService from '../services/CustomerService'
import HealthBadge from './ui/HealthBadge'
import LoadingSpinner from './ui/LoadingSpinner'
import Toast from './ui/Toast'

const initialFormState = {
  customerName: '',
  email: '',
  phone: '',
  city: '',
}

function CustomerForm({ wizard = false }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditMode = Boolean(id)

  const [formData, setFormData] = useState(initialFormState)
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [toast, setToast] = useState(null)
  const [loading, setLoading] = useState(isEditMode)
  const [submitting, setSubmitting] = useState(false)
  const [step, setStep] = useState(1)

  useEffect(() => {
    if (isEditMode) {
      CustomerService.getCustomerById(id)
        .then((response) => {
          const customer = response.data.data
          setFormData({
            customerName: customer.customerName || '',
            email: customer.email || '',
            phone: customer.phone || '',
            city: customer.city || '',
          })
        })
        .catch(() => {
          setServerError('Unable to load customer details for editing.')
        })
        .finally(() => setLoading(false))
    }
  }, [id, isEditMode])

  const previewCustomer = useMemo(() => ({ id, ...formData }), [formData, id])

  const validate = () => {
    const newErrors = {}

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Customer name is required.'
    } else if (formData.customerName.trim().length < 2) {
      newErrors.customerName = 'Customer name must be at least 2 characters.'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.'
    } else if (!/^[0-9+\-\s]{7,15}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number.'
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateCurrentStep = () => {
    if (!wizard || step === 2) return validate()

    const stepErrors = {}
    if (!formData.customerName.trim()) stepErrors.customerName = 'Customer name is required.'
    if (!formData.email.trim()) stepErrors.email = 'Email is required.'
    setErrors(stepErrors)
    return Object.keys(stepErrors).length === 0
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setServerError('')

    if (!validate()) return

    setSubmitting(true)
    try {
      if (isEditMode) {
        await CustomerService.updateCustomer(id, formData)
        setToast({ type: 'success', message: 'Customer updated successfully.' })
      } else {
        await CustomerService.createCustomer(formData)
        setToast({ type: 'success', message: 'Customer added successfully.' })
      }
      setTimeout(() => navigate('/'), 900)
    } catch (err) {
      const apiValidationErrors = err.response?.data?.validationErrors
      if (apiValidationErrors) setErrors(apiValidationErrors)
      setServerError(err.response?.data?.message || 'Something went wrong while saving the customer.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <LoadingSpinner label="Loading customer" />
  }

  return (
    <section className="page-section fade-in">
      <Toast toast={toast} onClose={() => setToast(null)} />

      <div className="page-title-row">
        <div>
          <span className="eyebrow">Customer Module</span>
          <h1>{wizard ? 'Add Customer Wizard' : isEditMode ? 'Edit Customer' : 'Add Customer'}</h1>
          <p>{isEditMode ? 'Update contact details without changing the customer ID.' : 'Create a polished customer record with complete contact information.'}</p>
        </div>
        <Link to="/" className="btn-soft">
          <ArrowLeft size={17} /> Back to Customers
        </Link>
      </div>

      <div className="form-grid">
        <form className="glass-card customer-form slide-up" onSubmit={handleSubmit} noValidate>
          {wizard && (
            <div className="wizard-steps">
              <button type="button" className={step === 1 ? 'active' : ''} onClick={() => setStep(1)}>
                <UserRound size={16} /> Identity
              </button>
              <button type="button" className={step === 2 ? 'active' : ''} onClick={() => validateCurrentStep() && setStep(2)}>
                <Phone size={16} /> Contact
              </button>
            </div>
          )}

          {serverError && <div className="alert-card alert-error">{serverError}</div>}

          {(!wizard || step === 1) && (
            <div className="form-section">
              <label className="field-label" htmlFor="customerName">Customer Name</label>
              <div className={`input-shell ${errors.customerName ? 'has-error' : ''}`}>
                <UserRound size={18} />
                <input
                  type="text"
                  id="customerName"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  placeholder="Enter customer name"
                />
              </div>
              {errors.customerName && <span className="field-error">{errors.customerName}</span>}

              <label className="field-label" htmlFor="email">Email Address</label>
              <div className={`input-shell ${errors.email ? 'has-error' : ''}`}>
                <Mail size={18} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                />
              </div>
              {errors.email && <span className="field-error">{errors.email}</span>}
            </div>
          )}

          {(!wizard || step === 2) && (
            <div className="form-section">
              <label className="field-label" htmlFor="phone">Phone Number</label>
              <div className={`input-shell ${errors.phone ? 'has-error' : ''}`}>
                <Phone size={18} />
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="9876543210"
                />
              </div>
              {errors.phone && <span className="field-error">{errors.phone}</span>}

              <label className="field-label" htmlFor="city">City</label>
              <div className={`input-shell ${errors.city ? 'has-error' : ''}`}>
                <MapPin size={18} />
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Hyderabad"
                />
              </div>
              {errors.city && <span className="field-error">{errors.city}</span>}
            </div>
          )}

          <div className="form-actions">
            {wizard && step === 1 ? (
              <button type="button" className="btn-gradient" onClick={() => validateCurrentStep() && setStep(2)}>
                Continue
              </button>
            ) : (
              <button type="submit" className="btn-gradient" disabled={submitting}>
                {submitting ? <span className="button-spinner" /> : <Save size={17} />}
                {isEditMode ? 'Update Customer' : 'Save Customer'}
              </button>
            )}
          </div>
        </form>

        <aside className="glass-card form-preview scale-in">
          <div className="preview-icon">
            <Building2 size={28} />
          </div>
          <h2>Record Preview</h2>
          <p>{formData.customerName || 'New Customer'}</p>
          <HealthBadge customer={previewCustomer} />
          <ul>
            <li><Mail size={16} /> {formData.email || 'Email pending'}</li>
            <li><Phone size={16} /> {formData.phone || 'Phone pending'}</li>
            <li><MapPin size={16} /> {formData.city || 'City pending'}</li>
          </ul>
          <div className="success-note">
            <CheckCircle2 size={17} />
            <span>Complete records earn stronger health scores.</span>
          </div>
        </aside>
      </div>
    </section>
  )
}

export default CustomerForm
