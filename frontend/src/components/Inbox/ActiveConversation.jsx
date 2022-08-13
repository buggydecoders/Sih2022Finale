import React from 'react'
import UniversityLogo from '../../assets/DAVV_LOGO.png'
import {BsThreeDotsVertical} from 'react-icons/bs';
import {BiPhoneCall} from 'react-icons/bi';
import {FiSend} from 'react-icons/fi';
import SideProfile from './SideProfile';

const ProfileCard = ()=>{
  return (
    <div className='py-3 px-5 shadow-lg flex justify-between rounded-xl items-center'>
      <div className='flex items-center gap-3'>
        <img src={UniversityLogo} className='w-[40px] h-[40px]'></img>
        <div className='text-base font-semibold'>
          Insitute of Engineering, DAVV
          <div className='mt-0 text-xs font-[500] text-gray-400'>Active now</div>
          </div>
      </div>
      <div className='flex items-center gap-3'>
        <div className='w-[40px] h-[40px] rounded-full bg-lightGray flex items-center justify-center shadow-sm'><BsThreeDotsVertical/></div>
        <div className='w-[40px] h-[40px] rounded-full bg-lightGray flex items-center justify-center shadow-sm'><BiPhoneCall/></div>
      </div>
    </div>
  )
}

const MessageController = ()=>{
  return (
    <div className='w-full bg-transparent flex items-center py-2 rounded-xl gap-3'>
      <div className='w-full'>
      <input  className=' border-[1px] border-gray-300  w-full px-3 py-2 text-sm rounded-2xl outline-none' placeholder='Type your Message here!'/>
      </div>
      <div className='w-[40px] h-[40px] flex items-center rounded-full bg-secondary bg-opacity-10 justify-center'><FiSend/></div>

    </div>
  )
}

const MessageCard = ({isSent})=>{
  return (
    <div className={`${!isSent?'justify-end':'justify-start'} flex w-full`}>
      <div className='py-2 px-3 bg-lightGray rounded-md max-w-[70%]'>
        <div className={`${isSent?'text-secondary':'text-primary'} font-[600] text-sm`}>Kunal Sangtiani</div>
        <div className='font-[500] mt-2 text-xs text-gray-600'>Lorem, ipsum dolor sit amet  earum </div>
      </div>
    </div>
  )
}

const ActiveConversation = () => {
  return (
    <div className='px-5 py-6 grid grid-cols-[4fr_1.4fr] gap-5 border-[1px] border-opacity-5 rounded-md border-l-0 border-r-0'>
      <div>
        <ProfileCard/>
        <div className='mt-6 h-[60vh] space-y-3 overflow-y-auto'>
          <MessageCard/>
          <MessageCard isSent={true}/>
        </div>
        <div className='mt-5 space-y-4'>
          <MessageController/>

        </div>
      </div>
     <SideProfile/>
    </div>
  )
}

export default ActiveConversation