import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Mail, MapPin, Pencil, Phone, UserRound } from 'lucide-react'
import CustomerService from '../services/CustomerService'
import CustomerAvatar from '../components/ui/CustomerAvatar'
import HealthBadge from '../components/ui/HealthBadge'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { enrichCustomer } from '../utils/customerInsights'

function ViewCustomer() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [customer, setCustomer] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    CustomerService.getCustomerById(id)
      .then((response) => {
        setCustomer(enrichCustomer(response.data.data))
      })
      .catch((err) => {
        setError(err.response?.data?.message || 'Customer not found.')
      })
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return <LoadingSpinner label="Loading customer details" />
  }

  if (error) {
    return (
      <section className="page-section fade-in">
        <div className="alert-card alert-error">{error}</div>
        <button type="button" className="btn-gradient" onClick={() => navigate('/')}>
          <ArrowLeft size={17} /> Back to Customers
        </button>
      </section>
    )
  }

  return (
    <section className="page-section fade-in">
      <div className="page-title-row">
        <div>
          <span className="eyebrow">Customer Details</span>
          <h1>{customer.customerName}</h1>
          <p>Full contact profile and automatically calculated customer health score.</p>
        </div>
        <div className="action-row">
          <button type="button" className="btn-soft" onClick={() => navigate('/')}>
            <ArrowLeft size={17} /> Back
          </button>
          <Link to={`/edit/${customer.id}`} className="btn-gradient">
            <Pencil size={17} /> Edit
          </Link>
        </div>
      </div>

      <div className="details-grid">
        <div className="glass-card customer-hero-card scale-in">
          <CustomerAvatar customer={customer} size="lg" />
          <h2>{customer.customerName}</h2>
          <span>Customer ID #{customer.id}</span>
          <HealthBadge customer={customer} />
        </div>

        <div className="glass-card details-card slide-up">
          <div className="detail-item">
            <div><UserRound size={18} /></div>
            <span>Name</span>
            <strong>{customer.customerName}</strong>
          </div>
          <div className="detail-item">
            <div><Mail size={18} /></div>
            <span>Email</span>
            <strong>{customer.email}</strong>
          </div>
          <div className="detail-item">
            <div><Phone size={18} /></div>
            <span>Phone</span>
            <strong>{customer.phone}</strong>
          </div>
          <div className="detail-item">
            <div><MapPin size={18} /></div>
            <span>City</span>
            <strong>{customer.city}</strong>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ViewCustomer
