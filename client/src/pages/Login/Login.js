import React, { useEffect } from 'react'
import CustomerLayout from '../../component/customer/CustomerLayout/CustomerLayout'
import LoginForm from '../../component/LoginForm/LoginForm'

const Login = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <CustomerLayout>
      <LoginForm />
    </CustomerLayout>
  )
}

export default Login
