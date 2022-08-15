import React from "react";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useSelector } from "react-redux";
import UniversityLogo from '../../assets/DAVV_LOGO.png';

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


const MessageCard = ()=>{
  return (
    <div className="border-b-[1px] border-black border-opacity-10 px-1 py-5">
      <div className="flex gap-3 items-center">
        <img src={UniversityLogo} alt="" className="w-[50px] h-[50px]" />
        <div className=" text-sm w-full">
          <div className="flex items-center justify-between w-full">
            <div className="font-semibold text-sm ">Insitute...</div>
            <div className="text-xs font-[500]  text-gray-500">2 hours ago</div>
          </div>
          <div className="mt-1 flex items-center justify-between">
            <div className="text-xs font-[500]">hey up for that deal??</div>
            <div className="h-[17px] w-[17px] text-white  bg-primary flex items-center justify-center text-xs rounded-full">1</div>
          </div>
        </div>
      </div>
     
    </div>
  )
}

const AllMessages = () => {
  const {rooms} = useSelector(state=>state.chatRoom);
  console.log(rooms);
  return (
    <div className="bg-lightGray w-full px-5 py-6 rounded-r-md  ">
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
        {/* {rooms?.map(r=><MessageCard/>)} */}
      </div>
    </div>
  );
};

export default AllMessages;
