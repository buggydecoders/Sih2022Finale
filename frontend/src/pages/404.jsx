import React from 'react'

import NotFoundImg1 from '../assets/illustrations/not-found-1.svg'
import NotFoundImg2 from '../assets/illustrations/not-found-2.svg'
import NotFoundImg3 from '../assets/illustrations/not-found-3.svg'
import Layout from '../components/Layout'
import {useNavigate} from 'react-router-dom'
const NotFound = () => {
    let arr = [NotFoundImg1,NotFoundImg2,NotFoundImg3];
    const navigate = useNavigate();
  return (
    <Layout>
    <div className='min-h-[83vh] flex items-center flex-col justify-center '>
        <div>
            <img src={arr[Math.floor(Math.random()*3)]} className='w-[400px]'/>
        </div>
        <div className='text-xl mt-8 font-[600]'>Oops! The page you're looking for was not found :(</div>
        <button onClick={()=>navigate('/')} className='mt-6 rounded-md  bg-primary text-white font-[600] px-6 py-3 w-fit'>Let's take you back to home</button>
    </div>
    </Layout>
  )
}

export default NotFound