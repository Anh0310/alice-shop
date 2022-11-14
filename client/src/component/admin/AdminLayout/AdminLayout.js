import React from 'react'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
const AdminLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main style={{ height: '100vh' }}>
        {children}
      </main>
      <Sidebar />
    </>
  )
}

export default AdminLayout
