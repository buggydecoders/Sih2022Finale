import React, { useContext, useState } from 'react'
import UniversityLogo from '../../assets/DAVV_LOGO.png'
import {BsThreeDotsVertical} from 'react-icons/bs';
import {BiPhoneCall} from 'react-icons/bi';
import {FiSend} from 'react-icons/fi';
import SideProfile from './SideProfile';
import { useSelector } from 'react-redux';
import { MessageContext } from '../../contexts/MessageContext';

const ProfileCard = ({data})=>{

  return (
    <div className='py-3 px-5 shadow-lg flex justify-between rounded-xl items-center'>
      <div className='flex items-center gap-3'>
        <img src={UniversityLogo} className='w-[40px] h-[40px]'></img>
        <div className='text-base font-semibold'>
          {data?.instituteName}
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

const MessageController = ({sendMessage})=>{
  const [text,setText] = useState('');
  const handleSend = ()=>{
    if (text.length>0) {
      sendMessage(text);
    }
  }
  return (
    <div className='w-full bg-transparent flex items-center py-2 rounded-xl gap-3'>
      <div className='w-full'>
      <input  value={text} onChange={(e)=>setText(e.target.value)} className=' border-[1px] border-gray-300  w-full px-3 py-2 text-sm rounded-2xl outline-none' placeholder='Type your Message here!'/>
      </div>
      <div onClick={handleSend} className='w-[40px] h-[40px] flex items-center rounded-full bg-secondary bg-opacity-10 justify-center'><FiSend/></div>

    </div>
  )
}

const MessageCard = ({isSent,message})=>{
  return (
    <div className={`${!isSent?'justify-end':'justify-start'} flex w-full`}>
      <div className='py-2 px-3 bg-lightGray rounded-md max-w-[70%]'>
        <div className={`${isSent?'text-secondary':'text-primary'} font-[600] text-sm`}>Kunal Sangtiani</div>
        <div className='font-[500] mt-2 text-xs text-gray-600'>{message?.content} </div>
      </div>
    </div>
  )
}

const ActiveConversation = () => {
  const {activeRoom} = useSelector(state=>state.chatRoom);
  const {reciever,messagesLoading,messages,sendMessage} = useContext(MessageContext);
  console.log(reciever)
  if (messagesLoading) return <div>Loading..</div>
  return (
    <div className='px-5 py-6 grid grid-cols-[4fr_1.4fr] gap-5 border-[1px] border-opacity-5 rounded-md border-l-0 border-r-0'>
      <div>
        <ProfileCard data={reciever}/>
        <div className='mt-6 h-[60vh] space-y-3 overflow-y-auto'>
          {messages.length>0?messages.map(m=><MessageCard message={m}/>):<div></div>}
        </div>
        <div className='mt-5 space-y-4'>
          <MessageController sendMessage={sendMessage}/>

        </div>
      </div>
     <SideProfile data={reciever}/>
    </div>
  )
}

export default ActiveConversation