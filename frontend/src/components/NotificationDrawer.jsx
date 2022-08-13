import React, { useState } from 'react'
import { Drawer } from '@mui/material'
import {MdClear} from 'react-icons/md';
const NotificationDrawer = ({setIsOpen,isOpen}) => {

    const handleClose = ()=>setIsOpen(false);

  return (
    <Drawer open={isOpen} onClose={handleClose} anchor={"right"}>
        <div className='w-[400px] bg-white p-5'>
            <div className='flex justify-between items-center'>
            <div className='text-lg font-[600]'>Notifications 🔔</div>
            <div><MdClear onClick={handleClose} size={22}/></div>
            </div>
        </div>
    </Drawer>
  )
}

export default NotificationDrawer