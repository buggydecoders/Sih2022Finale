import React, { useEffect, useState } from "react";
import UGCLogo from "../UGCLogo";
import { BiLockOpenAlt } from "react-icons/bi";
import FormInputField from "../FormInputField";
import {useDispatch, useSelector} from 'react-redux'
import {toast} from 'react-toastify';
import validator from 'validator'
import { signupUser } from "../../store/auth/actions";
import { useNavigate } from "react-router-dom";
function SignupForm() {
  const [form,setForm] = useState({
    email : '',
    aisheCode : '',
    password : '',
    confirmPassword : ''
  })
  const dispatch = useDispatch();
  const {loading} = useSelector(state=>state.auth);
  const [error,setError] = useState(false);
  const handleChange = (e)=>{
    setError(false);
    setForm(prev=>({...prev,[e.target.name] : e.target.value}));
  }
  const navigate = useNavigate();

  const handleSubmit = (e)=>{
    e.preventDefault();
    if (!validator.isEmail(form.email)) return setError('Please enter a valid email');
    if (form.aisheCode.length!=6) return setError('Enter a valid Aishe code');
    if (!validator.equals(form.password,form.confirmPassword)) return setError('Confirm Password & Password dont match');
    const successCallback = ()=>navigate('/login');
    const errorCallBack = (err)=>setError(err);
    dispatch(signupUser(form,successCallback,errorCallBack));
  }
  
  return (
    <div className="flex flex-col p-8 space-y-6 w-7/12">
      {/* Logo Section  */}
      <div className="">
        <UGCLogo />
      </div>

      {/* Login Heading Section  */}
      <div className="">
        <div className="text-3xl font-bold text-[#383838] flex space-x-1">
          <BiLockOpenAlt />
          <h1 className={`${error?'text-red-500':''}`}>{error?'Error':'Signup'}</h1>

        </div>
        <p className={`${error?'text-red-500':'text-[#373737]'} font-[500] text-base  pt-2`}>
          {error? error : "Login to share, request and enquire about resources"}
        </p>
      </div>

      {/* Login Form  */}
      <form onSubmit={handleSubmit} className="flex flex-col w-3/4 py-4">
        <FormInputField
          id="required-email"
          name="email"
          label="Institute Email"
          type="email"
          placeholder="institute@education.edu.in"
          required={true}
          value={form.email}
          onChange={handleChange}
          
        />
        <FormInputField
          id="aishe-code"
          name="aisheCode"
          label="AISHE CODE"
          type="text"
          placeholder="U-2020"
          required={true}
          value={form.aisheCode}
          onChange={handleChange}
        />
        <div className="flex justify-between space-x-4">
          <FormInputField
            id="required-password"
            name="password"
            label="Password"
            type="password"
            placeholder="Password"
            required={true}
            value={form.password}
            onChange={handleChange}
          />
          <FormInputField
            id="confirm-password"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="Confirm Password"
            required={true}
            value={form.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <div className="">
          <button
            type="submit"
            disabled={loading}
            className="my-2 py-5 px-4 orangeGradient text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-3xl "
          >
            {loading?'Loading...':'Signup'}
          </button>
          <p className="font-semibold text-sm my-4">
            Already have account?
            <a href="/login" className="text-primary px-1">
              Login
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;
