import React from "react";
import InputField from "../InputField";

const ExchangePage = () => {
  return (
    <div className="py-3">
      <div className="text-2xl font-semibold">Request Active</div>
      <div className="text-green-500 text-sm font-[600]">
        Your resource request is currently ongoing...
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

export default ExchangePage;
