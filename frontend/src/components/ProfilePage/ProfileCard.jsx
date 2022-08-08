import React from "react";
import { BiEdit } from "react-icons/bi";
import DAVV_LOGO from "../../assets/DAVV_LOGO.png";

function ProfileCard(props) {
  return (
    <div className="">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-2xl font-semibold">Profile</h1>
        <span className="bg-white p-1 border border-1 text-gray-500 rounded cursor-pointer text-2xl">
          <BiEdit />
        </span>
      </div>

      <img src={DAVV_LOGO} alt="" className="py-8" />
      <p className="text-lg font-medium text-center">
        Institute of Engineering & Technology, DAVV
      </p>
      <p className="text-sm text-center text-gray-500">Indore, India</p>
    </div>
  );
}

export default ProfileCard;
