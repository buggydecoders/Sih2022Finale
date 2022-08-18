import React from 'react'
import InputField from "../InputField";
import Logo from "../../assets/DAVV_LOGO.png";

const AcceptAndReview = () => {
  return (
    <>
    <div className="mt-8">
      <div className="text-base font-[600]">Resource Details</div>
      <div className="justify-between flex items-center">
        <div className="flex items-center gap-3 mt-4">
          <img
            src={RESOURCE_FALLBACK_IMG}
            className="w-[80px] h-[80px] rounded-md"
          />
          <div className="font-open">
            <div className="font-[600]">Meth Lab filled with Meth</div>
            <div className="text-sm text-gray-500">14 July-15 July</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="underline text-primary">More about Resource</div>
        </div>
      </div>
    </div>
    <div className="mt-8">
      <div className="text-base font-[600]">Institute Details</div>
      <div className="mt-3 flex justify-between items-center">
        <div className="flex gap-3 font-open items-center">
          <img src={Logo} className="w-[80px] h-[80px] " />
          <div>
            <div className="font-[600]">
              Insitute of Engineering & Technology, DAVV
            </div>
            <div className="text-sm text-gray-600">Indore, India</div>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="px-3 py-1 font-open text-sm text-primary border-primary border-[2px] rounded-xl">
            Send Message
          </button>
          <button className="px-3 py-1 font-open text-sm text-white bg-primary border-[2px] rounded-xl">
            View Profile
          </button>
        </div>
      </div>
    </div>
    <div className="mt-7">
        <InputField area={true} disabled={true} label="Note"/>
    </div>
    <div className="mt-6 flex gap-6 justify-end items-center">
        <button className="px-5 py-2 border-[1px] border-primary text-primary rounded-md">Reject</button>
        <button className="px-5 py-2 bg-primary text-white rounded-md">Accept</button>
    </div>
  </>
  )
}

export default AcceptAndReview