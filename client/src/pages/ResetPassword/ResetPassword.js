import React, { useEffect } from 'react'
import CustomerLayout from '../../component/customer/CustomerLayout/CustomerLayout'
import ResetPasswordForm from '../../component/customer/ResetPasswordForm/ResetPasswordForm'
const ResetPassword = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <CustomerLayout>
      <ResetPasswordForm />
    </CustomerLayout>
  )
}

export default ResetPassword
