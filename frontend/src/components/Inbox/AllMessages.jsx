import moment from "moment";
import React, { useContext } from "react";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import UniversityLogo from '../../assets/DAVV_LOGO.png';
import { MessageContext } from "../../contexts/MessageContext";
import { setActiveRoom } from "../../store/chatRoom/actions";

const MessageTab = ({ title, active, setActive,id }) => {
  const isActive = id===active;
  return (
    <div onClick={()=>setActive(id)} className={`${isActive?'text-secondary':'text-gray-700 '} cursor-pointer  text-sm font-semibold  relative`}>
      <div>{title}</div>
      {isActive&&<div className="absolute -bottom-1 h-[2px] w-[30px] bg-secondary"></div>}
    </div>
  );
};
const MessageTabs = () => {
  const [active,setActive] = useState(1)
  return <div className="flex items-center gap-7">
    <MessageTab id={1} active={active} setActive={setActive} title='All Conversations'/>
    <MessageTab id={2} active={active} setActive={setActive} title='Archived'/>
    <MessageTab id={3} active={active} setActive={setActive} title='Starred'/>
  </div>;
};


const MessageCard = ({data})=>{
  const {user} = useSelector(state=>state.auth);
  const {activeRoom,lastMessage} = useSelector(state=>state.chatRoom);
  const isActive = data._id===activeRoom._id;
  let cardUserData = data?.users[0]._id===user._id?data?.users[1]:data?.users[0];
  const dispatch = useDispatch();
  const handleSelectActive = ()=>{
    if (!isActive) {
    dispatch(setActiveRoom(data));
    }
  }
  let currentLastMessage = isActive?lastMessage:data?.lastMessage;
  let updatedLastMessage = isActive?lastMessage?.content:data?.lastMessage?.content || '';
  if (updatedLastMessage?.length>17) updatedLastMessage =  updatedLastMessage?.slice(0,17)  + '..'
  return (
    <div onClick={handleSelectActive} className={`${isActive?'':''} border-b-[1px] cursor-pointer relative border-black border-opacity-10 px-1 py-5`}>
      {isActive&&<div className="w-[5px] h-[85%] bg-primary absolute top-[50%] -translate-y-[50%] -left-2"></div>}
      <div className="flex gap-3 items-center">
        <img src={cardUserData?.logo} alt="" className="w-[50px] rounded-full h-[50px]" />
        <div className=" text-sm w-full">
          <div className="flex items-center justify-between w-full">
            <div className="font-semibold text-sm ">{cardUserData?.instituteName?.slice(0,12)}...</div>
            <div className="text-xs font-[500]  text-gray-500">{moment(currentLastMessage.createdAt).diff(moment(),'minutes')*-1} min ago</div>
          </div>
          <div className="mt-1 flex items-center justify-between">
            <div className="text-xs font-[500]">{updatedLastMessage}</div>
            <div className="h-[17px] w-[17px] text-white  bg-primary flex items-center justify-center text-xs rounded-full">1</div>
          </div>
        </div>
      </div>
     
    </div>
  )
}

const AllMessages = () => {
  const {rooms} = useSelector(state=>state.chatRoom);

  const {reciever} = useContext(MessageContext);

  return (
    <div className="bg-lightGray min-h-[90vh] w-full px-5 py-6 rounded-r-md  ">
      <div className="flex items-center justify-between">
        <div className="font-bold flex items-center gap-2 text-xl">
          Messages{" "}
          <span className="w-[20px] ml-2 h-[20px] flex items-center justify-center text-center text-white bg-primary font-semibold text-xs rounded-full">
            3
          </span>
        </div>
        <div className="w-[35px] rounded-full flex items-center justify-center text-center text-gray-500 bg-white h-[35px] shadow-md">
          <FiSearch />
        </div>
      </div>
      <div className="my-4">
        <MessageTabs/>
      </div>
      <div className="mt-2 space-y-3">
        {(!rooms || rooms?.length===0)&&<div className="py-20 text-center w-full font-open text-gray-500 font-[500]">No Chats Found</div>}
        {rooms?.length>0&&rooms.filter(r=>r.lastMessage!==null).map(r=><MessageCard data={r}/>)}
      </div>
    </div>
  );
};

export default AllMessages;
