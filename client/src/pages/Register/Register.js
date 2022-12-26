import React, { useEffect } from 'react'
import CustomerLayout from '../../component/customer/CustomerLayout/CustomerLayout'
import RegisterForm from '../../component/RegisterForm'

const Register = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <CustomerLayout>
      <RegisterForm />
    </CustomerLayout>
  )
}

export default Register
