import React from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

const AdminLayout = ({ children, searchFor }) => {
  return (
    <div className='grid grid-cols-[1fr_4fr] overflow-hidden min-h-[100vh]'>
      <Sidebar/>
      <div className='bg-lightGray'>
        <Header searchFor={searchFor} />
        {children}
      </div>
    </div>
  )
}

export default AdminLayout