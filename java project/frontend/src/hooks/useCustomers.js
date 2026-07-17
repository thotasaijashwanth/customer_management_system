import { useEffect, useState } from 'react'
import CustomerService from '../services/CustomerService'
import { enrichCustomers } from '../utils/customerInsights'

function useCustomers() {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadCustomers = async (searchTerm = '') => {
    setLoading(true)
    setError('')
    try {
      const response = await CustomerService.getAllCustomers(searchTerm)
      setCustomers(enrichCustomers(response.data.data || []))
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load customers from the backend.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCustomers()
  }, [])

  return { customers, loading, error, reload: loadCustomers }
}

export default useCustomers
