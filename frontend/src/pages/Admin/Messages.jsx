import React, { useContext, useState } from 'react'
import AdminLayout from '../../components/Admin/AdminLayout'
import LogoImg from '../../assets/DAVV_LOGO.png';
import {IoIosArrowUp} from 'react-icons/io';
import MessageController from '../../components/Inbox/MessageController';
import MessageContainer from '../../components/Inbox/MessageContainer';
import MessageContextProvider, { MessageContext } from '../../contexts/MessageContext';
const ChatCard = ()=>{
    return (
        <div className='bg-lightGray max-w-[300px] shrink-0 font-open flex gap-3 p-3 rounded-md w-full'>
            <img src={LogoImg} className='w-[40px] h-[40px] rounded-full'></img>
            <div className='text-sm'>
                <div>Insitute of Engineering & Technoology</div>
                <div className='text-gray-300 text-xs'>Hey I want that</div>
            </div>
        </div>
    )
}

const Messages = () => {    
    const [isChats,setIsChats] = useState(false);
    const {sendMessage,messages,messagesLoading : loading,reciever,activeRoom,error} =  useContext(MessageContext)
  return (
    <AdminLayout>
        <div className='mt-2 p-3'>
            <div className='bg-white rounded-md p-6 pb-3'>
                <div className='text-xl font-semibold'>Chats</div>
                <div className='w-full mt-4 text-sm'><input placeholder='Search Institute' className='text-sm outline-none py-2 border-b-[1px] w-full'/></div>
                <div className='relative'>
                    <div className='absolute w-full'>
                {isChats&&<div className='flex w-full overflow-x-auto py-2 gap-4'>
                    <ChatCard/>
                    <ChatCard/>
                    <ChatCard/>
                    <ChatCard/>
                    <ChatCard/>
                    <ChatCard/>
                    <ChatCard/>
                </div>}
                <div className='mt-4 flex items-center justify-center'>
                    <IoIosArrowUp size={18} onClick={()=>setIsChats(prev=>!prev)}/>
                </div>
                </div>
                </div>
                <MessageContainer/>
                <MessageController/>
            </div>
        </div>
    </AdminLayout>
  )
}

const WrappedMessages = ()=>{
    return(
        <MessageContextProvider>
            <Messages/>
        </MessageContextProvider>
    )
}

export default WrappedMessages