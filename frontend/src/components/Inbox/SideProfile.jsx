import React from 'react'
import UniversityLogo from '../../assets/DAVV_LOGO.png'
import POCImg from '../../assets/POC/VJ.png';
const SideProfile = () => {
  return (
    <div className='bg-lightGray py-5 px-3 rounded-xl shadow-sm flex flex-col '>
    <img src={UniversityLogo} className='w-[120px] mx-auto'/>
    <div className='mt-3 font-semibold text-center'>
      Institute of Engineering, Technology, DAVV
    </div>
    <div className='mt-1 text-sm text-gray-400 font-[500] text-center'>Indore, India</div>
    <hr  className='my-6'/>
    <div className='mt-2'>
      <div className='text-sm font-semibold w-full'>Contact Details : </div>
      <div className='mt-2 text-sm font-[500] flex items-center gap-2 text-gray-500'> +91 7049930190</div>
      <div className='mt-1 text-sm font-[500] flex items-center gap-2 text-gray-500'> ksangtiani13@gmail.com</div>
    </div>
    <hr  className='my-6'/>
    <div className='mt-2'>
      <div className='text-sm font-semibold w-full'>Website</div>
      <div className='mt-0 text-sm font-[500] flex items-center gap-2 text-gray-500'>www.ietdavv.edu.in</div>
    </div>
    <hr  className='my-6'/>
    <div className='mt-2'>
      <div className='text-sm font-semibold'>Contact Person</div>
      <div className='flex items-center gap-3 mt-3'>
        <img src={POCImg} className='w-[50px] rounded-md'/>
        <div className='text-sm'>
            <div className='font-semibold'>Vaibhav Jain</div>
            <div className='text-gray-400 font-[500]'>vjain@ietdavv.edu.in</div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default SideProfile