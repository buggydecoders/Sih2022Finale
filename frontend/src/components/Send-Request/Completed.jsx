import React from 'react'
import Input from '../Input'

const Completed = ({data}) => {
  return (
<div className="py-3">
      <div className="text-2xl font-semibold">Request Completed</div>
      <div className="text-green-500 text-sm font-[600]">
       
      </div>
      <div className="mt-8 grid grid-cols-4 bg-white px-6 shadow-md py-4 rounded-md">
        <div className="">
          <div className="font-[700] text-sm text-gray-500">From</div>
          <div className="font-semibold ">{data?.startDate}</div>
        </div>
        <div className="">
          <div className="font-[700] text-sm text-gray-500">To</div>
          <div className="font-semibold ">{data?.endDate}</div>
        </div>
        <div className="">
          <div className="font-[700] text-sm text-gray-500">Status</div>
          <div className="font-semibold text-green-500">{data?.status}</div>
        </div>
        <div className="">
          <div className="font-[700] text-sm text-gray-500">
            Reputation Points
          </div>
          <div className="font-semibold">4.5</div>
        </div>
      </div>
      <div className="mt-10">
       <Input label={'Feedback'} area={true} cols={5} note="Please add a valid feedback"/>
       <div className='mt-5 flex justify-end'>
        <button className='bg-secondary px-4 rounded-md py-2 text-white'>Send</button>
       </div>
        <hr className="my-5" />
        {/* <div className='grid grid-cols-[1fr_2fr]'>
        <InputField area={true} label='Comment'/>
      </div> */}
      </div>
    </div>
  )
}

export default Completed