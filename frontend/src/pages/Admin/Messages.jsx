import React from 'react'
import AdminLayout from '../../components/Admin/AdminLayout'
import LogoImg from '../../assets/DAVV_LOGO.png';

const ChatCard = ()=>{
    return (
        <div className='bg-lightGray font-open flex gap-3 w-full'>
            <img src={LogoImg} className='w-[40px] h-[40px] rounded-full'></img>
            <div>
                <div>Insitute of Engineering & Technoology</div>
                <div className='text-gray-300 text-xs'>Hey I want that</div>
            </div>
        </div>
    )
}

const Messages = () => {    
  return (
    <AdminLayout>
        <div className='mt-2 p-6 '>
            <div className='bg-white rounded-md p-6'>
                <div className='text-xl font-semibold'>Chats</div>
                <div className='w-full mt-4 text-sm'><input placeholder='Search Institute' className='text-sm outline-none border-b-[1px] w-full'/></div>
                <div className='grid cols-4 grid-flow-col py-5 gap-4'>
                    <ChatCard/>
                    <ChatCard/>
                    <ChatCard/>
                    <ChatCard/>
                </div>
            </div>
        </div>
    </AdminLayout>
  )
}

export default Messages