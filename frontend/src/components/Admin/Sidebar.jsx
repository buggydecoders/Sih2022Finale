import React from 'react'
import UserIcon from '../../assets/icons/user.png';
import {AiOutlineAppstore} from 'react-icons/ai';
import {AiOutlineMessage} from 'react-icons/ai';
import {HiOutlineDocumentReport} from 'react-icons/hi';
import {FiStopCircle} from 'react-icons/fi';
import {BiLogOutCircle} from 'react-icons/bi';
import {BsPatchCheckFill} from 'react-icons/bs';
import {GrResources} from 'react-icons/gr';
import {FaBuilding} from 'react-icons/fa';
import {AiFillEdit} from 'react-icons/ai';
import { useLocation, useNavigate } from 'react-router-dom';
const SidebarLink = ({icon,title,link})=>{
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = location.pathname===link;
    return (
        <div onClick={()=>navigate(link)} className={`flex gap-3 cursor-pointer items-center ${isActive?'text-primary opacity-100':'opacity-40 hover:opacity-90 hover:text-primary transition-all'}`}>
            {icon}
            <div className={`${isActive?'opacity-100':''} text-lg font-[500]`}>{title}</div>
        </div>
    )
}

const Sidebar = ({searchFor}) => {
  return (
    <div className='bg-white shadow-xl relative px-8 py-10'>
    <div className='flex gap-4 items-center'>
      <img src={UserIcon} className='w-[60px] h-[60px]'/>
      <div>
        <div className='text-xl font-[600]'>Admin Portal</div>
        <div className='text-sm font-open text-gray-500'>Access for UGC</div>
      </div>
    </div>
    <div className='space-y-8 mt-16 px-3'>
        <SidebarLink icon={<AiOutlineAppstore size={22}/>} link='/admin' title='Dashboard'/>
        <SidebarLink icon={<AiOutlineMessage size={22}/>} title='Messages' link='/admin/messages'/>
        <SidebarLink icon={<HiOutlineDocumentReport size={22}/>} title='Reports' link='/admin/reports'/>
        <SidebarLink icon={<BsPatchCheckFill size={22}/>} title='Requirements' link='/admin/requirements'/>
        <SidebarLink icon={<FaBuilding size={22}/>} title='Institutes' link='/admin/institutes'/>
        <SidebarLink icon={<GrResources size={22}/>} title='Resources' link='/admin/resources'/>
        <SidebarLink icon={<AiFillEdit size={22}/>} title='Requests' link='/admin/requests'/>
    </div>
        <div className='justify-end px-3 absolute bottom-10 flex flex-col'>
        <div className={`flex gap-3 items-center text-primary`}>
            <BiLogOutCircle size={22}/>
            <div className={`opacity-100 text-lg font-[500]`}>Logout</div>
        </div>
        </div>
  </div>
  )
}

export default Sidebar