import React from 'react'
import { useSelector } from 'react-redux';
import UNI_LOGO from '../../assets/DAVV_LOGO.png';
import { useNavigate } from 'react-router-dom'
import { data } from 'autoprefixer';

const BannerAndProfile = () => {
  const { user } = useSelector(state => state.auth)
  const navigate = useNavigate();
  return (
    <div className=''>
      <div className='w-full h-[30vh] bg-gray-200 rounded-md relative ' style={{ background: `url(${data.banner ? data.banner : 'https://res.cloudinary.com/unesco-admin/image/upload/v1660722255/banner-placeholder_nyqa5j.webp'}) center center/cover` }}>
        <div onClick={() => navigate('/edit-profile')} className='border-[1px] border-primary text-primary w-fit -bottom-2 translate-y-[100%] px-5 rounded-xl hover:bg-primary hover:text-white duration-300 transition-all ease-in-out cursor-pointer right-0 absolute'>Edit Profile</div>
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