import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import UNI_LOGO from '../../assets/DAVV_LOGO.png';
import { useNavigate } from 'react-router-dom'
import { data } from 'autoprefixer';
import { AiFillEdit } from 'react-icons/ai';
import { BANNER_FALLBACK_IMG } from '../../utils/fallbackImages';
import { getFileLink } from '../../utils/generateImageLink';
import { updateUser } from '../../store/auth/actions';

const BannerAndProfile = ({user}) => {

  const navigate = useNavigate();
  return (
    <div className=''>
      <div className='w-full h-[30vh] bg-gray-200 rounded-md relative ' style={{ background: `url(${user?.banner}) center center/cover` }}>
    
       
      </div>
      <div className='flex justify-between items-center'>
        <div className='flex gap-5 items-center relative -top-[40px] px-3'>
          <img src={user?.logo} className='w-[170px] h-[170px] object-cover border-[5px] border-white rounded-full' />
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