import React from 'react'
import ResourceImg from '../../assets/icons/resources-2.png';

import { Button, TextField } from '@mui/material';

const Auth = () => {
  return (
    <div className='bg-lightGray font-open flex flex-col justify-center items-center min-h-[100vh]'>
        <div><img src={ResourceImg} className='w-[60px]'/></div>
        <div className='mt-2 text-xl font-[600]'>Admin Login</div>
        <div className='w-[300px] mt-7 space-y-5'>
        <TextField variant="outlined" fullWidth size="small" label='Email'/>
        <TextField variant="outlined" fullWidth size="small" label='Password'/>
        <div className='flex justify-center items-center mt-4'>
        <Button variant='contained' fullWidth>Login</Button>
        </div>
        <div className='mt-2 text-sm'>
          Forgot password? <span className='text-blue-400 underline font-[600]'>Reset Password</span>
        </div>
        </div>
    </div>
  )
}

export default Auth