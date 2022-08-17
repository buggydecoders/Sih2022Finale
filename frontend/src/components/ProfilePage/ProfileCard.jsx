import React from "react";
import { BiEdit } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import DAVV_LOGO from "../../assets/DAVV_LOGO.png";
import {Avatar} from '@mui/material';
import { useSelector } from "react-redux";
function ProfileCard(props) {
  const navigate = useNavigate();
  const {user} = useSelector(state=>state.auth);

  return (
    <div className="">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-2xl font-semibold">Profile</h1>
        <span className="bg-white p-1 border border-1  text-gray-500  cursor-pointer text-2xl">
          <BiEdit  onClick={()=>navigate('/edit-profile')}/>
        </span>
      </div>

      <img src={user?.logo} alt="" className="py-8 " />
      <p className="text-lg font-medium text-center">
        {user?.instituteName}
      </p>
      <p className="text-sm text-center text-gray-500">{user?.address?.city},{user?.address?.state}</p>
    </div>
  );
}

export default ProfileCard;
