import React from 'react'
import CustomerForm from '../components/CustomerForm.jsx'

/**
 * Page for adding a brand new customer. Renders CustomerForm in "add" mode
 * since no route `id` parameter is present.
 */
function AddCustomer() {
  return (
    <div>
      <CustomerForm />
    </div>
  )
}

export default AddCustomer
