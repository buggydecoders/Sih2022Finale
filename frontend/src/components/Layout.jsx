import React from 'react'
import NotificationContextProvider from '../contexts/NotificationContext'
import Navbar from './Navbar'

const Layout = ({ children }) => {
  return (
    <NotificationContextProvider>
      <Navbar />
      {children}
    </NotificationContextProvider>
  )
}

export default Layout