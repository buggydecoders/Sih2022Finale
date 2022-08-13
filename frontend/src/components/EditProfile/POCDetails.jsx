import React, { useState } from "react";
import Button from "../Button";
import FormInputField from "../FormInputField";
import DummyLogo from '../../assets/icons/dummyLogo.jpg'
import { useDispatch, useSelector } from "react-redux";
import { getFileLink } from "../../utils/generateImageLink";
import {toast} from 'react-toastify';
import { updateUser } from "../../store/auth/actions";
function POCDetails() {
  const {user,loading} = useSelector(state=>state.auth)
  const [logoFile,setLogoFile] = useState(null);
  const [uploadLoading,setUploadLoading] = useState(false);
  const [logo,setLogo] = useState(user?.contactPerson?.image || DummyLogo)
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

  const [form,setForm] = useState({
    image : user?.contactPerson?.image || "",
    name : user?.contactPerson?.name || "",
    email : user?.contactPerson?.email || "",
    position : user?.contactPerson?.position || "",
    
  });
  const dispatch = useDispatch();


  const handleUpdateSubmit = (e)=>{
    e.preventDefault();
    dispatch(updateUser({contactPerson : {...form, image : logo}}, ()=>toast('POC Updated Successfully!'), (err)=>toast(err)));
  }

  const handleChange  = (e)=>{
    setForm(prev=>({...prev,[e.target.name] : e.target.value}));
  }
  return (
    <div className="py-4 px-10 flex- flex-col space-y-14">
      <h1 className="text-3xl font-semibold">POC Detail</h1>
      <div className="">
        <div className="flex flex-col space-y-4">
          <h2 className="font-semibold text-xl">Edit Profile Picture</h2>
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
              <Button variant="outlined">Remove Photo</Button>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleUpdateSubmit} className="flex flex-col">
        <FormInputField
          id="required-email"
          onChange={handleChange}
          name="name"
          lable="Full Name"
          type="text"
          placeholder="Your Full Name"
          required={false}
          value={form.name}
        />
        <FormInputField
          id="required-password"
          name="email"
          lable="Enter Email"
          onChange={handleChange}
          type="email"
          placeholder="POC Email"
          value={form.email}
          required={false}
        />
        <FormInputField
          id="required-password"
          name="position"
          lable="POC Position"
          type="text"
          onChange={handleChange}
          value={form.position}
          placeholder="Position"
          required={false}
        />
        <div className="flex  justify-center w-fit">
        <Button type="submit" variant="filled">{loading?'Loading..':'Save Settings'}</Button>
        </div>
      </form>
      
      
    </div>
  );
}

export default POCDetails;
