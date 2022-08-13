import React from "react";
import { BiEdit } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import VJ from "../../assets/POC/VJ.png"
import { useSelector } from "react-redux";

function POC() {
  const {user} = useSelector(state=>state.auth);
  return (
    <div className="">
        
    <div className="w-full py-10">
      <div className="flex justify-between items-center w-full border-b-2 py-2">
        <h1 className="text-md font-semibold">Person of Contact</h1>
        <span className="bg-white p-1 border border-1 text-gray-400 rounded cursor-pointer text-2xl">
          <BiEdit />
        </span>
      </div>
    </div>
    
    <div className="flex items-center">
        <img src={user?.contactPerson.image} alt="" className="w-24 h-24 rounded-full"/>
        <div className="flex flex-col pl-4">
            <h3 className="text-lg font-medium">{user?.contactPerson?.name || 'Unset'}</h3>
            <p className="text-xs">{user?.contactPerson?.position || 'Unset'}</p>
            <p className="flex items-center text-xs space-x-2"><AiOutlineMail/> <span>{user?.contactPerson?.email || 'Unset'}</span></p>
        </div>
    </div>
            </div>
  );
}

export default POC;
