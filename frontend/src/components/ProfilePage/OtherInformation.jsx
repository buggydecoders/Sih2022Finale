import React from "react";
import { BiEdit } from "react-icons/bi";
import { useSelector } from "react-redux";

function OtherInformation() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="w-full p-4 rounded-2xl bg-lightGray my-10">
      <div className="flex justify-between items-center">
        <h2 className="font-medium text-xl">Other Information</h2>
        <span className="bg-white p-1 border border-1 text-gray-500 rounded cursor-pointer text-2xl">
          <BiEdit />
        </span>
      </div>
      <hr className="border border-1 w-20 bg-black" />
      <ul className="pt-4">
        <li>
          <b className="font-semibold text-sm pr-2">NAAC Rating:</b>
          {user?.naac}
        </li>
        <li>
          <b className="font-semibold text-sm pr-2">Reputation Points:</b>
          {user?.reputationPoints || 0}
        </li>
        <li>
          <b className="font-semibold text-sm pr-2">University Type:</b>
          State
        </li>
      </ul>
    </div>
  );
}

export default OtherInformation;
