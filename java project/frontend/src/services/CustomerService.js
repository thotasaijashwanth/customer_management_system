import axios from 'axios'

// In development, Vite proxies /api requests to Spring Boot.
// For production, set VITE_API_BASE_URL if the backend is hosted elsewhere.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/customers'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * CustomerService centralizes all HTTP communication with the
 * Customer Management System backend, so components never call
 * axios directly.
 */
const CustomerService = {
  /**
   * Fetch all customers. If a search term is provided, only customers
   * whose name contains that term (case-insensitive) are returned.
   */
  getAllCustomers: (searchTerm = '') => {
    const params = searchTerm ? { name: searchTerm } : {}
    return apiClient.get('', { params })
  },

  /**
   * Fetch a single customer by id.
   */
  getCustomerById: (id) => {
    return apiClient.get(`/${id}`)
  },

  /**
   * Create a new customer.
   */
  createCustomer: (customer) => {
    return apiClient.post('', customer)
  },

  /**
   * Update an existing customer.
   */
  updateCustomer: (id, customer) => {
    return apiClient.put(`/${id}`, customer)
  },

  /**
   * Delete a customer by id.
   */
  deleteCustomer: (id) => {
    return apiClient.delete(`/${id}`)
  },
}

export default CustomerService
