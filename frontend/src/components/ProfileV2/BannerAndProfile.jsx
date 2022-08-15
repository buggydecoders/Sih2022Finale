import React from 'react'
import { useSelector } from 'react-redux';
import UNI_LOGO from '../../assets/DAVV_LOGO.png';

const BannerAndProfile = () => {
  const {user} = useSelector(state=>state.auth)
  return (
    <div className=''>
        <div className='w-full h-[30vh] bg-gray-200 rounded-md' style={{background : `url(https://wallpaperaccess.com/full/1209458.jpg) center center/cover`}}></div>
        <div className='flex justify-between items-center'>
            <div className='flex gap-5 items-center relative -top-[40px] px-3'>
                <img src={UNI_LOGO} className='w-[170px] object-cover border-[5px] border-white rounded-full'/>
                <div className=''>
                    <div className='font-[700] text-xl'>{user?.instituteName}</div>
                    <div className='text-sm text-gray-400'>{user?.address?.city} , {user?.address?.state}</div>
                    <div className='text-xs mt-2 text-gray-400'> Joined on : 12 March 2022</div>
                </div>
            </div>
           
        </div>
    </div>
  )
}

export default BannerAndProfile