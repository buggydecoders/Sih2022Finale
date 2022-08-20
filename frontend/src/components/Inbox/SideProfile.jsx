import React from 'react'
import UniversityLogo from '../../assets/DAVV_LOGO.png'
import POCImg from '../../assets/POC/VJ.png';
const SideProfile = ({ data }) => {
  return (
    <div className='bg-lightGray py-5 px-3 rounded-xl shadow-sm flex flex-col '>
      <img src={data?.logo} className='w-[120px] mx-auto rounded-full' />
      <div className='mt-3 font-semibold text-center'>
        {data?.instituteName}
      </div>
      <div className='mt-1 text-sm text-gray-400 font-[500] text-center'>{data?.address?.city}, {data?.address?.state}</div>
      <hr className='my-6' />
      <div className='mt-2'>
        <div className='text-sm font-semibold w-full'>Contact Details : </div>
        {/* <div className='mt-2 text-sm font-[500] flex items-center gap-2 text-gray-500'> +91 7049930190</div> */}
        <div className='mt-1 text-sm font-[500] flex items-center gap-2 text-gray-500'> {data?.email || 'Not Found'}</div>
      </div>
      <hr className='my-6' />
      <div className='mt-2'>
        <div className='text-sm font-semibold w-full'>Website</div>
        <div className='mt-0 text-sm font-[500] flex items-center gap-2 text-gray-500'><a href={data?.website} target="_blank">{data?.website || 'Not Found'}</a></div>
      </div>
      <hr className='my-6' />
      <div className='mt-2'>
        <div className='text-sm font-semibold'>Contact Person</div>
        {data?.contactPerson?.name ? <div className='flex  items-center gap-3 mt-3'>
          <img src={data?.contactPerson?.image} className='w-[50px] rounded-md' />
          <div className='text-sm'>
            <div className='font-semibold'>{data?.contactPerson?.phone || 'Phone unset'}</div>
            <div className='text-gray-400 font-[500]'>{data?.contactPerson?.email || 'email unset'}</div>
          </div>
        </div> : <div className='mt-1 text-red-500 font-open'>Not Assigned yet.</div>}
      </div>
    </div>
  )
}

export default SideProfile