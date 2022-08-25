import React, { useEffect, useState } from "react";
import UGCLogo from "../UGCLogo";
import { BiLockOpenAlt } from "react-icons/bi";
import FormInputField from "../FormInputField";
import {useDispatch, useSelector} from 'react-redux'
import {toast} from 'react-toastify';
import validator from 'validator'
import { signupUser } from "../../store/auth/actions";
import {AiOutlineFileAdd} from 'react-icons/ai';
import { useNavigate } from "react-router-dom";
import InputField from "../InputField";
import Input from "../Input";
function FacultySignup() {


  const [isAdhaar,setIsAdhaar] = useState(false);
  
  return (
    <div className="p-8 w-full overflow-y-auto">
      <div className="text-2xl font-[600]">Faculty Signup</div>
      <div className="mt-1 font-[500] text-sm text-gray-500">Signup as faculty & get hired for jobs.</div>
      {
        !isAdhaar?<div className="w-[60%] h-[250px] mt-10 border-[1px] border-dashed border-secondary flex-col flex items-center justify-center">
        <AiOutlineFileAdd className="text-4xl text-secondary"/>
        <div className="mt-2 font-[500] font-open">Add Adhaar</div>
        </div>:
        <div className="w-[60%] h-[350px]"></div>
      }
      <div className="mt-5">
        {!isAdhaar&&<button className="px-4 py-2 font-open bg-secondary text-white rounded-md">Upload Adhaar</button>}
      </div>
      <div className="mt-5 space-y-6">
        <Input label='Adhaar Number'/>
        <div className="grid grid-cols-2 gap-6">
          <Input label='Name'/>
          <Input label='DOB'/>          
        </div>
        <Input label='Skills' note='Enter skills separated by comma'/>
        <Input label='Email' note='Enter skills separated by comma'/>
        <div className="grid grid-cols-2 gap-6">
          <Input label='Password'/>
          <Input label='Confirm Password'/>          
        </div>
      </div>
      <div className="mt-6">
        <button className="bg-secondary px-12 py-2 text-white rounded-md">Sign Up</button>
        <div className="mt-1 text-sm">Already have an account? <span className="text-secondary">Login</span></div>
      </div>
    </div>
  );
}

export default FacultySignup;
