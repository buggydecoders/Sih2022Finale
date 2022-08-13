import React from "react";
import InputField from "../InputField";

const ConfirmationComponent = () => {
  return (
    <div className="py-3">
      <div className="flex justify-between items-center">
        <div>
          <div className="text-2xl font-semibold">Request Active</div>
          <div className="text-green-500 text-sm font-[600]">
            Insitute signed the contract mark it approved once its lended...
          </div>
        </div>
        <div className="">
          <select className="outline-none px-5 py-2 font-[600] bg-transparent border-b-[3px] rounded-xl border-b-secondary">
            <option value="notApproved" className="text-primary">Not Approved</option>
            <option value="approved" className="text-secondary">Approved</option>
            <option value="cancelled" className="text-red-600">Cancelled</option>
            <option value="cancelled" className="text-green-500">Completed</option>
          </select>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-4 bg-white px-6 shadow-md py-4 rounded-md">
        <div className="">
          <div className="font-[700] text-sm text-gray-500">From</div>
          <div className="font-semibold ">12 March 2022</div>
        </div>
        <div className="">
          <div className="font-[700] text-sm text-gray-500">To</div>
          <div className="font-semibold ">16 March 2022</div>
        </div>
        <div className="">
          <div className="font-[700] text-sm text-gray-500">Status</div>
          <div className="font-semibold text-orange-400">Not Approved</div>
        </div>
        <div className="">
          <div className="font-[700] text-sm text-gray-500">
            Reputation Points
          </div>
          <div className="font-semibold">4.5</div>
        </div>
      </div>
      <div className="mt-10">
        <div className="text-lg font-[600]">Add Comment</div>
        <hr className="my-5" />
        {/* <div className='grid grid-cols-[1fr_2fr]'>
        <InputField area={true} label='Comment'/>
      </div> */}
      </div>
    </div>
  );
};

export default ConfirmationComponent;
