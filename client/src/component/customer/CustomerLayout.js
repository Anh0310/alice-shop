import React from 'react'
import Header from './Header'
import Footer from './Footer'

const CustomerLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main style={{ paddingTop: 95 }}>{children}</main>
      <Footer />
    </>
  )
}

export default CustomerLayout
