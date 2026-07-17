import React, { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  ArrowDownAZ,
  ArrowUpAZ,
  Download,
  Eye,
  FileSpreadsheet,
  Pencil,
  Plus,
  Search,
  SlidersHorizontal,
  Trash2,
} from 'lucide-react'
import CustomerService from '../services/CustomerService'
import CustomerAvatar from './ui/CustomerAvatar'
import EmptyState from './ui/EmptyState'
import HealthBadge from './ui/HealthBadge'
import { SkeletonTable } from './ui/Skeleton'
import Toast from './ui/Toast'
import { enrichCustomers, sortCustomers } from '../utils/customerInsights'
import { exportCustomersToExcel, exportCustomersToPDF } from '../utils/exportCustomers'

const pageSize = 6

function CustomerList() {
  const [searchParams] = useSearchParams()
  const [customers, setCustomers] = useState([])
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortKey, setSortKey] = useState('customerName')
  const [sortDirection, setSortDirection] = useState('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [toast, setToast] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const fetchCustomers = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await CustomerService.getAllCustomers()
      setCustomers(enrichCustomers(response.data.data || []))
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch customers. Please make sure the backend server is running.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCustomers()
  }, [])

  useEffect(() => {
    const routedSearch = searchParams.get('search') || ''
    setSearchTerm(routedSearch)
    setCurrentPage(1)
  }, [searchParams])

  const filteredCustomers = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()
    const matchesSearch = (customer) =>
      [customer.customerName, customer.email, customer.phone, customer.city]
        .some((value) => String(value || '').toLowerCase().includes(term))

    const matchesFilter = (customer) => {
      if (statusFilter === 'active') return customer.isActive
      if (statusFilter === 'inactive') return !customer.isActive
      if (statusFilter === 'excellent') return customer.healthScore >= 85
      return true
    }

    return sortCustomers(
      customers.filter((customer) => matchesSearch(customer) && matchesFilter(customer)),
      sortKey,
      sortDirection,
    )
  }, [customers, searchTerm, sortDirection, sortKey, statusFilter])

  const totalPages = Math.max(Math.ceil(filteredCustomers.length / pageSize), 1)
  const pageCustomers = filteredCustomers.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDirection((direction) => (direction === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDirection('asc')
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return

    try {
      await CustomerService.deleteCustomer(deleteTarget.id)
      setToast({ type: 'success', message: `${deleteTarget.customerName} deleted successfully.` })
      setDeleteTarget(null)
      fetchCustomers()
    } catch (err) {
      setToast({ type: 'error', message: err.response?.data?.message || 'Failed to delete customer.' })
      setDeleteTarget(null)
    }
  }

  const sortIcon = sortDirection === 'asc' ? <ArrowDownAZ size={15} /> : <ArrowUpAZ size={15} />

  return (
    <section className="page-section fade-in">
      <Toast toast={toast} onClose={() => setToast(null)} />

      <div className="page-title-row">
        <div>
          <span className="eyebrow">Customer Module</span>
          <h1>Customers</h1>
          <p>Manage records, monitor health, and keep every contact ready for follow-up.</p>
        </div>
        <div className="action-row">
          <button type="button" className="btn-soft" onClick={() => exportCustomersToPDF(filteredCustomers)}>
            <Download size={17} /> PDF
          </button>
          <button type="button" className="btn-soft" onClick={() => exportCustomersToExcel(filteredCustomers)}>
            <FileSpreadsheet size={17} /> Excel
          </button>
          <Link to="/add" className="btn-gradient">
            <Plus size={17} /> Add Customer
          </Link>
        </div>
      </div>

      <div className="glass-card controls-card">
        <div className="search-control">
          <Search size={18} />
          <input
            type="search"
            placeholder="Search by name, email, phone, or city"
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value)
              setCurrentPage(1)
            }}
          />
        </div>

        <div className="filter-control">
          <SlidersHorizontal size={18} />
          <select
            value={statusFilter}
            onChange={(event) => {
              setStatusFilter(event.target.value)
              setCurrentPage(1)
            }}
          >
            <option value="all">All Customers</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="excellent">Excellent Health</option>
          </select>
        </div>
      </div>

      {error && <div className="alert-card alert-error">{error}</div>}

      {loading ? (
        <SkeletonTable rows={6} />
      ) : filteredCustomers.length === 0 ? (
        <EmptyState title="No customers found" message="Try a different search term or add a new customer." />
      ) : (
        <>
          <div className="glass-card table-shell slide-up">
            <table className="modern-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>
                    <button type="button" onClick={() => handleSort('email')}>Email {sortKey === 'email' && sortIcon}</button>
                  </th>
                  <th>Phone</th>
                  <th>
                    <button type="button" onClick={() => handleSort('city')}>City {sortKey === 'city' && sortIcon}</button>
                  </th>
                  <th>
                    <button type="button" onClick={() => handleSort('healthScore')}>Health {sortKey === 'healthScore' && sortIcon}</button>
                  </th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pageCustomers.map((customer) => (
                  <tr key={customer.id}>
                    <td>
                      <div className="customer-cell">
                        <CustomerAvatar customer={customer} />
                        <div>
                          <strong>{customer.customerName}</strong>
                          <span>ID #{customer.id}</span>
                        </div>
                      </div>
                    </td>
                    <td>{customer.email}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.city}</td>
                    <td><HealthBadge customer={customer} compact /></td>
                    <td>
                      <div className="table-actions">
                        <Link to={`/view/${customer.id}`} className="icon-button" title="View">
                          <Eye size={17} />
                        </Link>
                        <Link to={`/edit/${customer.id}`} className="icon-button" title="Edit">
                          <Pencil size={17} />
                        </Link>
                        <button type="button" className="icon-button danger-soft" title="Delete" onClick={() => setDeleteTarget(customer)}>
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination-row">
            <span>
              Showing {(currentPage - 1) * pageSize + 1}-{Math.min(currentPage * pageSize, filteredCustomers.length)} of {filteredCustomers.length}
            </span>
            <div className="pagination-buttons">
              <button type="button" disabled={currentPage === 1} onClick={() => setCurrentPage((page) => page - 1)}>
                Previous
              </button>
              <strong>{currentPage} / {totalPages}</strong>
              <button type="button" disabled={currentPage === totalPages} onClick={() => setCurrentPage((page) => page + 1)}>
                Next
              </button>
            </div>
          </div>
        </>
      )}

      {deleteTarget && (
        <div className="modal-backdrop-soft">
          <div className="confirm-dialog glass-card scale-in">
            <div className="modal-icon danger-soft">
              <Trash2 size={24} />
            </div>
            <h2>Delete customer?</h2>
            <p>
              This will remove <strong>{deleteTarget.customerName}</strong> from the system.
            </p>
            <div className="dialog-actions">
              <button type="button" className="btn-soft" onClick={() => setDeleteTarget(null)}>Cancel</button>
              <button type="button" className="btn-danger-gradient" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default CustomerList
