import React, { useState } from 'react'
import ResourceImg from '../../assets/icons/resources-2.png';

import { Button, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import { loginAdmin } from '../../store/adminPanel/actions';
import { adminAuthAPI } from '../../store/adminPanel/services';
import { loginUser } from '../../store/auth/actions';


const Auth = () => {
  const [formData, updateFormData] = useState({});
  const dispatch = useDispatch()

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim()
    });
  };

  const { loading } = useSelector(state => state.auth.loading)

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(loginUser(formData));
  };

  return (
    <div className='bg-lightGray font-open flex flex-col justify-center items-center min-h-[100vh]'>
      <div><img src={ResourceImg} className='w-[60px]' /></div>
      <div className='mt-2 text-xl font-[600]'>Admin Login</div>
      <div className='w-[300px] mt-7 space-y-5'>
        <TextField onChange={handleChange} value={formData.email} name="email" variant="outlined" fullWidth size="small" label='Email' />
        <TextField onChange={handleChange} value={formData.password} name="password" variant="outlined" fullWidth size="small" label='Password' />
        <div className='flex justify-center items-center mt-4'>
          <Button variant='contained' fullWidth onClick={handleSubmit}>{loading ? "loading..." : "Login"}</Button>
        </div>
        <div className='mt-2 text-sm'>
          Forgot password? <span className='text-blue-400 underline font-[600]'>Reset Password</span>
        </div>
      </div>
    </div>
  )
}

export default Auth