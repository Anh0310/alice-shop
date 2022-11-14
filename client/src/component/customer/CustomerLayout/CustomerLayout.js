import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { HEADER_HEIGHT } from '../../../constants/common'

const CustomerLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main style={{ paddingTop: HEADER_HEIGHT }}>{children}</main>
      <Footer />
    </>
  )
}

export default CustomerLayout
