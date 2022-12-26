import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

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
