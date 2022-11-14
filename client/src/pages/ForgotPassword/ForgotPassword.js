import React, { useEffect } from 'react'
import CustomerLayout from '../../component/customer/CustomerLayout/CustomerLayout'
import ForgotPasswordForm from '../../component/customer/ForgotPasswordForm/ForgotPasswordForm'

const ForgotPassword = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <CustomerLayout>
      <ForgotPasswordForm />
    </CustomerLayout>
  )
}

export default ForgotPassword
