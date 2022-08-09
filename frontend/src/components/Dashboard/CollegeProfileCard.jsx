import React from 'react'
import CollegeLogo from '../../assets/DAVV_LOGO.png';

const CollegeProfileCard = () => {
  return (
    <div className='bg-white py-7 shadow-sm w-full px-5 rounded-md flex flex-col items-center justify-center'>
        <div><img alt="logo" src={CollegeLogo} className='w-[150px]'/></div>
        <div className='text-center mt-5 font-[600]'>Institute of Engineering and Technology, DAVV</div>
        <div className='text-sm text-gray-400 mt-1'>Indore,India</div>
        <div className='text-secondary text-center cursor-pointer rounded-xl mt-4 bg-secondary bg-opacity-10 py-2 w-full '>Edit Profile</div>
    </div>
  )
}

export default CollegeProfileCard