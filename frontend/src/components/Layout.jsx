import React from 'react'
import NotificationContextProvider from '../contexts/NotificationContext'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Layout = ({ children }) => {
  const {user} = useSelector(state=>state.auth);
  return (
    <NotificationContextProvider>
      {!user?.isVerified&&<div className='absolute bg-red-500 w-[100%] text-white text-sm text-center'>Your account is not verified. Please <span className='underline'><Link to='/edit-profile?tab=activate-account'>verify</Link></span></div>}
      <Navbar />
      {children}
    </NotificationContextProvider>
  )
}

export default Layout