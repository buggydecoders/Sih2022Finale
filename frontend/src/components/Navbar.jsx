import React from "react";
import logo from "../assets/UGC_LOGO.png";
import { AiOutlineHome, AiFillBell } from "react-icons/ai";
import {Link} from 'react-router-dom'
import {BiCheckDouble} from 'react-icons/bi'
import {GrStatusCritical} from 'react-icons/gr'
import {BsFillBagCheckFill} from 'react-icons/bs'
import {RiAccountCircleLine} from 'react-icons/ri'

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
      <ul className="flex font-medium items-center space-x-10">
        <Link to="/" className="text-primary flex items-center space-x-1">
          <AiOutlineHome />
          <p>Dashboard</p>
        </Link>
        <Link to="/" className="text-primary flex items-center space-x-1">
          <BiCheckDouble />
          <p>Request</p>
        </Link>
        <Link to="/" className="text-primary flex items-center space-x-1">
          <GrStatusCritical />
          <p>Status</p>
        </Link>
        <Link to="/" className="text-primary flex items-center space-x-1">
          <BsFillBagCheckFill />
          <p>Saved Items</p>
        </Link>
        <Link to="/" className="text-primary flex items-center space-x-1">
          <RiAccountCircleLine />
          <p>Profile</p>
        </Link>
      </ul>
      <button className="rounded-full bg-lightGray p-4">
        <AiFillBell />
      </button>
    </div>
  );
}

export default Navbar;
