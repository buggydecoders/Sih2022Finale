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
import { getFileLink } from "../../utils/generateImageLink";
import axios from "axios";
import { serverInstance } from "../../utils/serverInstance";
function FacultySignup() {


  const [isAdhaar,setIsAdhaar] = useState(false);
  const [adhaarData,setAdhaarData] = useState();
  const [adhaarLoading,setAdhaarLoading] = useState(false);

  const [uploadedFile,setUploadedFile] = useState(null);
  const [form,setForm] = useState({
    email : '',
    password : '',
    name : '',
    confirmPassword : '',
    dob : '',
    resume : '',
    adhaarNumber : '',
    skills : '',
  });


  const handleChange = (e)=>setForm(prev=>({...prev,[e.target.name]  : e.target.value}));
  const handleFilechange = (e)=>{
    if (e?.target?.files?.length>0) {
      setUploadedFile(e.target.files[0]);
    }
    else {
      setUploadedFile(null);
    }
  
  }

  const handleAdhaarCheck = async()=>{
    setAdhaarLoading(true);
    const url = await getFileLink(uploadedFile);
    try {
      const formImgData = new FormData();
      formImgData.append('adhaarUrl', url);

      const result = await serverInstance.post('https://67ce-115-247-148-6.in.ngrok.io/aadhar/',formImgData);
      let adhaarNumberFetched = result.data.adhaarNumber.includes(',')?result.data.adhaarNumber.split(',')[0]:result.data.adhaarNumber;
      let dobFetched = result.data.date.includes(',')?result.data.date.split(',')[0]:result.data.date;
      let name = result.data.name;
      if (!dobFetched && !name && !adhaarNumberFetched) {
        toast('Please add a clear Image, This img is not valid');
         setUploadedFile(null);
      }
      else {
        setForm(prev=>({...prev,name,adhaarNumber : adhaarNumberFetched,dob : dobFetched}))
        setIsAdhaar(true);
      }
    }catch(err) {
      console.log(err);
      toast(err?.message || 'Soomething went wrong!');
    }finally{
      setAdhaarLoading(false);
    }
    
  }

  
  return (
    <div className="p-8 w-full overflow-y-auto">
      <div className="text-2xl font-[600]">Faculty Signup</div>
      <div className="mt-1 font-[500] text-sm text-gray-500">Signup as faculty & get hired for jobs.</div>
      {
        !isAdhaar?<div className="w-[60%] h-[250px] mt-10 border-[1px] relative border-dashed border-secondary flex-col flex items-center justify-center">
        {!uploadedFile&&<AiOutlineFileAdd className="text-4xl text-secondary"/>}
       {!uploadedFile&&<input className="-translate-x-[50%] opacity-0 -translate-y-[50%] top-[50%] left-[50%]" type="file" onChange={handleFilechange}/>}
       {uploadedFile&&<div className="-translate-x-[50%] absolute w-full h-full -translate-y-[50%] flex flex-col items-center justify-center top-[50%] left-[50%]">
      <div className="font-[600] text-secondary text-lg ">{uploadedFile?.name}</div>
      <button className="mt-1 px-5 py-1 bg-red-500 text-white" onClick={()=>setUploadedFile(null)}>Remove</button>
      </div>}
        {!uploadedFile&&<div className="mt-2 font-[500] font-open">Add Adhaar</div>}
        </div>:
        <div className="w-[60%] h-[350px]"></div>
      }
      <div className="mt-5">
        {!isAdhaar&&<button disabled={adhaarLoading} onClick={handleAdhaarCheck} className="px-4 py-2 font-open bg-secondary text-white rounded-md">{adhaarLoading?'Loading..':'Upload Adhaar'}</button>}
      </div>
      {isAdhaar&&<div className="mt-5 space-y-6">
        <Input onChange={handleChange} label='Adhaar Number'/>
        <div className="grid grid-cols-2 gap-6">
          <Input value={form.name} onChange={handleChange} label='Name'/>
          <Input value={form.dob} onChange={handleChange} label='DOB'/>          
        </div>
        <Input value={form.skills} onChange={handleChange} label='Skills' note='Enter skills separated by comma'/>
        <Input value={form.email} onChange={handleChange} label='Email' note='Enter skills separated by comma'/>
        <div className="grid grid-cols-2 gap-6">
          <Input value={form.password} onChange={handleChange} label='Password'/>
          <Input value={form.confirmPassword} onChange={handleChange} label='Confirm Password'/>          
        </div>
      </div>}
      {isAdhaar&&<div className="mt-6">
        <button className="bg-secondary px-12 py-2 text-white rounded-md">Sign Up</button>
        <div className="mt-1 text-sm">Already have an account? <span className="text-secondary">Login</span></div>
      </div>}
    </div>
  );
}

export default FacultySignup;
