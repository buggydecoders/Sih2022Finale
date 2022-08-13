import React, { useState } from "react";
import Button from "../Button";
import FormInputField from "../FormInputField";
import DummyLogo from '../../assets/icons/dummyLogo.jpg'
import { useSelector } from "react-redux";
import { getFileLink } from "../../utils/generateImageLink";
import {toast} from 'react-toastify';
function OrganizationDetails() {
  const {user} = useSelector(state=>state.auth)
  const [logoFile,setLogoFile] = useState(null);
  const [uploadLoading,setUploadLoading] = useState(false);
  const [logo,setLogo] = useState(user?.logo || DummyLogo)
  const handleFileChange =async (e)=>{
    if (e.target.files.length>0) {
      setLogoFile(e.target.files[0]);
      setUploadLoading(true);
      let link = await getFileLink(e.target.files[0]);
      setUploadLoading(false);
      setLogo(link);
    }
    else {
      setLogoFile(null);
    }
  }

  return (
    <div className="py-4 px-10 flex- flex-col space-y-14">
      <h1 className="text-3xl font-semibold">Organization Detail</h1>
      <div className="">
        <div className="flex flex-col space-y-4">
          <h2 className="font-semibold text-xl">Edit Logo</h2>
          <div className="flex space-x-14 items-center ">
            <div className="relative">
            <input onChange={handleFileChange} type='file' className="absolute opacity-0 top-[50%] left-[50%] -translate-x-[30%] -translate-y-[50%]" />
            <img
              src={logo}
              className="rounded-full w-40 h-40"
              alt=""
            />
            {uploadLoading&&<div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">Loading..</div>}
            </div>
            <div className="flex flex-col space-y-4">
              <Button customClass={logoFile?'animate-bounce':''} variant="filled">Change Logo</Button>
              <Button variant="outlined">Remove Logo</Button>
            </div>
          </div>
        </div>
      </div>

      <form className="flex flex-col">
        <FormInputField
          id="required-email"
          name="email"
          lable="Email"
          type="email"
          placeholder="Your Email"
          required={false}
        />
        <FormInputField
          id="required-password"
          name="password"
          lable="Official Website"
          type="password"
          placeholder="Password"
          required={false}
        />
        <FormInputField
          id="required-password"
          name="password"
          lable="Person Of Contact (POC)"
          type="password"
          placeholder="Password"
          required={false}
        />
      </form>
    </div>
  );
}

export default OrganizationDetails;
