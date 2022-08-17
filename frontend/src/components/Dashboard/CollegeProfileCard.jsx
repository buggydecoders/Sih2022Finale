import React from 'react'
import CollegeLogo from '../../assets/DAVV_LOGO.png';
import {useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
const CollegeProfileCard = () => {
  const {user} = useSelector(state=>state.auth);
  const navigate = useNavigate();
  const handleEditClick = (e)=>{
    e.stopPropagation();
    navigate('/edit-profile')
  }
  return (
    <div onClick={()=>navigate('/profile')} className='bg-white cursor-pointer py-7 shadow-sm w-full px-5 rounded-md flex flex-col items-center justify-center'>
        <div><img alt="logo" src={user?.logo} className='w-[160px] h-[160px] rounded-full'/></div>
        <div className='text-center mt-5 font-[600]'>{user?.instituteName}</div>
        <div className='text-sm text-gray-400 mt-1'>{user?.address?.city}, {user?.address?.state}</div>
        <div onClick={handleEditClick} className='text-secondary text-center cursor-pointer rounded-xl mt-4 bg-secondary bg-opacity-10 py-2 w-full '>Edit Profile</div>
    </div>
  )
}

export default CollegeProfileCard