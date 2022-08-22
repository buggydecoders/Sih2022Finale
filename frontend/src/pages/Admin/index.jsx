import React from 'react'
import Header from '../../components/Admin/Header';
import Sidebar from '../../components/Admin/Sidebar';
import {MdArrowForwardIos} from 'react-icons/md';
import {FaBuilding, FaBox, FaMoneyBillWave,FaBookmark} from 'react-icons/fa';

const StatComponent = ({count,title,icon})=>{
  return (
    <div className='p-4 bg-white w-full flex justify-between rounded-xl items-center'>
      <div className='flex gap-3 items-center'>
        <div className='h-[50px] w-[50px] bg-primary flex items-center justify-center text-center bg-opacity-30 rounded-xl text-primary'>
          {icon}
        </div>
        <div>
          <div className='font-[600]'>{count}</div>
          <div className='text-sm text-gray-400 font-[500]'>{title}</div>
        </div>
      </div>
      <><MdArrowForwardIos className='text-primary'/></>
    </div>
  )
}

const AdminPanel = () => {
  return (
    <div className='grid grid-cols-[1fr_4fr] min-h-[100vh]'>
     <Sidebar/>
     <div className='bg-lightGray'>
      <Header/>
      <div className='p-8 grid gap-2 grid-cols-[2fr_1fr]'>
        <div className='grid grid-cols-2 gap-8'>
          <StatComponent icon={<FaBuilding size={24}/>} title='institutes' count='3400'/>
          <StatComponent icon={<FaBox size={22}/>} title='Resources' count='5,000'/>
          <StatComponent icon={<FaBookmark size={22}/>} title='Requirements' count='5,000'/>
          <StatComponent icon={<FaMoneyBillWave size={22}/>} title='Transactions' count='50,000'/>
        </div>
        <div className='mt-8 p-5 bg-white rounded-md'></div>
      </div>
     </div>
    </div>
  )
}

export default AdminPanel