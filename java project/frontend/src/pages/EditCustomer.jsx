import React from 'react'
import CustomerForm from '../components/CustomerForm.jsx'

/**
 * Page for editing an existing customer. Renders CustomerForm in "edit"
 * mode - the route `id` parameter tells the form which customer to load.
 */
function EditCustomer() {
  return (
    <div>
      <CustomerForm />
    </div>
  )
}

export default EditCustomer
