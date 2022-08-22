import React from 'react'
import Header from '../../components/Admin/Header';
import Sidebar from '../../components/Admin/Sidebar';
import {MdArrowForwardIos} from 'react-icons/md';
import {FaBuilding, FaBox, FaMoneyBillWave,FaBookmark} from 'react-icons/fa';
import LogoImg from '../../assets/DAVV_LOGO.png';
import {MdOutlineTipsAndUpdates, MdTipsAndUpdates} from 'react-icons/md';
import {GoGraph} from 'react-icons/go';
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

const UpdateCard = ()=>{
  return (
    <div className='flex font-open w-full items-center gap-2 bg-lightGray py-3 px-2 rounded-md'>
      <div className='w-[40px] shrink-0 h-[40px] bg-primary rounded-md bg-opacity-10'></div>
      <div className='text-sm'>
        <div className=''>Insitute just finished the contract</div>
        <div className='text-xs text-gray-400'>SRM University</div>
      </div>
    </div>
  )
}


const UpdatesComponent = ()=>{
  return (
    <div className='p-3 bg-white rounded-md w-full'>
      <div className='flex py-2 pb-3 items-center gap-4 border-b-[1px] border-gray-300'>
        <MdOutlineTipsAndUpdates className='text-xl'/>
        <div className='text-lg font-[500] hover:text-primary'>Updates</div>
      </div>
      <div className='mt-5 space-y-3 h-[250px] overflow-y-auto'>
        <UpdateCard/>
        <UpdateCard/>
        <UpdateCard/>
        <UpdateCard/>
      </div>
    </div>
  )
}

const PortalComponent = ()=>{
  return (
    <div className='p-3 bg-white rounded-md w-full'>
      <div className='flex py-2 pb-3 items-center gap-4 border-b-[1px] border-gray-300'>
        <GoGraph className='text-xl'/>
        <div className='text-lg font-[500] hover:text-primary'>Portal Updates</div>
      </div>
      <div className='mt-5 space-y-3 h-[130px] overflow-y-auto'>
      </div>
    </div>
  )
}

const InsituteCard = ()=>{
  return (
    <div className='flex items-center font-open bg-lightGray p-2 py-3 rounded-md justify-between'>
      <div className='flex gap-2 items-center'>
        <img src={LogoImg} className='w-[30px] h-[30px] rounded-full'></img>
        <div className='text-sm'>Insitute of DAVV</div>
      </div>
      <div className='grid text-sm grid-cols-3 w-[50%]'>
        <div className=''>20</div>
        <div className=''>20</div>
        <div className=''>Aug 18 2022</div>
      </div>
    </div>
  )
}

const AdminPanel = () => {
  return (
    <div className='grid grid-cols-[1fr_4fr] min-h-[100vh]'>
     <Sidebar/>
     <div className='bg-lightGray'>
      <Header/>
      <div className='p-8 grid gap-6 grid-cols-[2.1fr_1fr]'>
        <div>
        <div className='grid grid-cols-2 gap-6'>
          <StatComponent icon={<FaBuilding size={24}/>} title='institutes' count='3400'/>
          <StatComponent icon={<FaBox size={22}/>} title='Resources' count='5,000'/>
          <StatComponent icon={<FaBookmark size={22}/>} title='Requirements' count='5,000'/>
          <StatComponent icon={<FaMoneyBillWave size={22}/>} title='Transactions' count='50,000'/>
        </div>
        <div className='mt-6 p-5 pb-2 bg-white rounded-md'>
          <div className='justify-between items-center flex'>
            <div className='text-gray-300 text-sm'>Statistics</div>
            <select className='text-primary font-open'>
              <option value="">This Month</option>
              <option value="">This Week</option>
            </select>
          </div>
          <div className='font-[600] text-2xl'>Insitutes' Report</div>
          <div className='w-full mt-5'>
            <input placeholder='Search Insitute' className='py-2 px-5 text-sm w-full bg-lightGray rounded-md'/>
          </div>
          <div className='mt-5 flex justify-between items-center'>
            <div className='text-sm font-[600] text-gray-300'>Institute</div>
            <div className='grid text-sm grid-cols-3 w-[50%]'>
              <div className='text-sm font-[600] text-gray-300'>Shared</div>
              <div className='text-sm font-[600] text-gray-300'>Uploaded</div>
              <div className='text-sm font-[600] text-gray-300'>Reg. date</div>
            </div>
          </div>
          <div className='mt-4 space-y-4'>
            <InsituteCard/>
            <InsituteCard/>
            <InsituteCard/>
          </div>
        </div>
        </div>
        <div className='space-y-6'>
          <UpdatesComponent/>
          <PortalComponent/>
        </div>
      </div>
     </div>
    </div>
  )
}

export default AdminPanel