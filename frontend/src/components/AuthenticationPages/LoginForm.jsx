import React, { useState } from "react";
import UGCLogo from "../UGCLogo";
import { BiLockOpenAlt } from "react-icons/bi";
import FormInputField from "../FormInputField";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/auth/actions";
import { useNavigate } from "react-router-dom";
import validator from 'validator'
function LoginForm() {
  const [form,setForm] = useState({
    email : '',
    password : ''
  });
  const [error,setError] = useState(false);
  const dispatch = useDispatch();
  const {loading} = useSelector(state=>state.auth);
  const navigate = useNavigate();
  const handleSubmit  =(e)=>{
    e.preventDefault();
    if (!validator.isEmail(form.email)) return setError('Please enter a valid email');
    const successCallback = ()=>navigate('/');
    const errorCallBack = (err)=>setError(err);
    dispatch(loginUser(form,successCallback,errorCallBack));
  }
  const handleChange= (e)=> {
    setError('');
    setForm(prev=>({...prev,[e.target.name] : e.target.value}));
  }

  return (
    <div className="flex flex-col px-8 w-7/12">
      {/* Logo Section  */}
      <div className="py-6">
        <UGCLogo />
      </div>

      {/* Login Heading Section  */}
      <div className="py-4">
        <div className={`${error?'text-red-500':'text-[#383838]'} text-3xl font-bold  flex space-x-1`}>
          <BiLockOpenAlt />
          <h1>{error?'Error':'Login'}</h1>
        </div>
        <p className={`${error?'text-red-500':'text-[#373737]'} text-base  pt-2`}>
          {error?error:'Login to share, request and enquire about resources'}
        </p>
      </div>

      {/* Login Form  */}
      <form onSubmit={handleSubmit} className="flex flex-col w-3/4 py-8">
        <FormInputField onChange={handleChange} id="required-email" name="email" label="Email" type="email" placeholder="Your Email" required={true}/>
        <FormInputField onChange={handleChange} id="required-password" name="password" label="Password" type="password" placeholder="Password" required={true}/>

        <div className="flex justify-between my-2">
          <label className="flex items-center space-x-3 mb-3">
            <input
              type="checkbox"
              name="checked-demo"
              className="form-tick appearance-none bg-white bg-check h-6 w-6 border border-gray-300 rounded-md checked:bg-primary checked:border-transparent focus:outline-none"
            />
            <span className="text-gray-700 font-normal text-sm">Remember Me</span>
          </label>

          <a href="/" className="text-primary text-sm">
            Forgot Password?
          </a>
        </div>

        <div className="">
          <button
            type="submit"
            disabled={loading}
            className="my-2 py-5 px-4 orangeGradient text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-3xl "
          >
            {loading?'Loading...':'LOGIN'}
          </button>
          <p className="font-semibold text-sm my-4">
            Not registered yet?{" "}
            <a href="/signup" className="text-primary">
              Create an Account
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
