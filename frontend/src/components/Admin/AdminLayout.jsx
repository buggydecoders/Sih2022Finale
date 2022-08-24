import React from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

const AdminLayout = ({children}) => {
  return (
    <div className='grid grid-cols-[1fr_4fr] min-h-[100vh]'>
    <Sidebar/>
    <div className='bg-lightGray'>
     <Header/>
     {children}
    </div>
   </div>
  )
}

export default AdminLayout