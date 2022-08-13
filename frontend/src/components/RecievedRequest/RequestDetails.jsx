import React from 'react'
import UniLogo from "../../assets/DAVV_LOGO.png";



const LearnMoreAboutInstitute = ()=>{
    return (
        <>
        <div className="mt-8 font-semibold text-xl">
        More about IET, DAVV
      </div>
      <div className="flex items-center justify-between mt-7">
        <div className="flex gap-5 items-center">
          <img src={UniLogo} className="w-[120px]" />
          <div className="">
            <div className="text-lg font-[600]">
              Institute of Engineering & Tech. DAVV
            </div>
            <div className="mt-1 text-gray-500 font-[500] text-sm">
              Indore, India
            </div>
          </div>
        </div>
        <div className="flex gap-5">
          <button className="w-fit py-2 px-3 border-[1px] border-primary rounded-md bg-primary text-white">
            Send Message
          </button>
          <button className="w-fit py-2 px-3 border-[1px] border-primary rounded-md text-primary">
            Profile
          </button>
        </div>
      </div>
      <div className="mt-5 font-[600]">Contact Information : </div>
      <div className="space-y-1 mt-3">
        <div className="text-sm">
          <span className="font-[600]">Phone : </span> +91 7049930190
        </div>
        <div className="text-sm">
          <span className="font-[600]">Email : </span> ietdavv@edu.co.in
        </div>
      </div></>
    )
}

const RequestDetails = () => {
  return (
    <div>
        <div className='text-2xl font-semibold'>Basic details</div>
        <div className='grid mt-6 grid-cols-[2fr_1fr_1fr] row-gap-7 gap-5'>
            <div className=''>
                <div className='text-sm font-bold text-gray-500'>University</div>
                <div className='mt-1 break-words font-semibold'>Insittute of Engineering & Tech. DAVV</div>
            </div>
            <div className=''>
                <div className='text-sm font-bold text-gray-500'>From</div>
                <div className='mt-1 font-semibold'>12 March 2022</div>
            </div>
            <div className=''>
                <div className='text-sm font-bold text-gray-500'>To</div>
                <div className='mt-1 font-semibold'>12 March 2022</div>
            </div>
            <div className=''>
                <div className='text-sm font-bold text-gray-500'>Scheduling Status</div>
                <div className='mt-1 font-semibold'>Not fulfilled</div>
            </div>
            <div className=''>
                <div className='text-sm font-bold text-gray-500'>Requested On</div>
                <div className='mt-1 font-semibold'>12 March 2022</div>
            </div>
            <div className=''>
                <div className='text-sm font-bold text-gray-500'>Reputation</div>
                <div className='mt-1 font-semibold'>4.5</div>
            </div>
        </div>
        <div className='mt-2'>
            <LearnMoreAboutInstitute/>
        </div>
    </div>
  )
}

export default RequestDetails