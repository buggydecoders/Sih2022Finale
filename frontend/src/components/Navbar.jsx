import React from "react";
import logo from "../assets/UGC_LOGO.png";
import { AiOutlineHome, AiFillBell } from "react-icons/ai";
import {Link} from 'react-router-dom'
// import {BiCheckDouble} from 'react-icons/bi'
// import {GrStatusCritical} from 'react-icons/gr'
import {BsBagCheck} from 'react-icons/bs'
import {RiAccountCircleLine} from 'react-icons/ri'
import {BsCheck2All} from 'react-icons/bs';
// import Status from "../pages/Status";
import {MdOutlineGames} from 'react-icons/md';
import { useLocation } from "react-router-dom";

const NavbarLink = ({text,icon,href})=>{
  const location = useLocation();
  const active = location.pathname===href;
  return (
    <Link to={href || '/'}className={`${active?' bg-opacity-20 ':'bg-opacity-0 hover:bg-opacity-5'} transition-all rounded-xl text-primary bg-primary flex items-center gap-2 py-3 px-6`}>
    {icon}
    <p>{text}</p>
  </Link>
  )
}


function Navbar() {
  return (
    <div className="flex items-center justify-between px-6 py-3">
      <div className="flex items-center">
        <Link to="/" className="pr-2">
            <img src={logo} alt="UGC LOGO" className="w-16 h-16"/>
        </Link>
        <div className="flex flex-col">
          <p className="text-gray-700 font-medium">
            University Grants Commission
          </p>
          <p className="text-gray-500 text-xs">Higher Education Institutes </p>
        </div>
      </div>
      <ul className="flex font-medium items-center space-x-4">
        <NavbarLink href='/' text='Dashboard' icon={<AiOutlineHome size={18}/>}/>
        <NavbarLink href='/requests' text='Requests' icon={<BsCheck2All size={18}/>}/>
        <NavbarLink href='/status' text='Status' icon={<MdOutlineGames size={18}/>}/>
        <NavbarLink href='/saved-items' text='Saved Items' icon={<BsBagCheck size={18}/>}/>
        <NavbarLink href='/profile' text='Profile' icon={<RiAccountCircleLine size={20}/>}/>
      </ul>
      <button className="rounded-full bg-lightGray p-4">
        <AiFillBell />
      </button>
    </div>
  );
}

export default Navbar;
