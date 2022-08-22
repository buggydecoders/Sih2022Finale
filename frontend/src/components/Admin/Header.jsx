import React from 'react'
import {AiOutlineBell, AiOutlineSetting, AiOutlineUser} from 'react-icons/ai'
const Header = () => {
    const Search = ()=>{
        return (
            <div className='flex items-center '>
                <div className='flex items-center'>
                <input placeholder='Search for resources' className='px-4 text-sm w-[350px] shadow-sm py-2 rounded-l-xl bg-lightGray'/>
                </div>
                <div className='px-6 py-2 bg-primary relative -left-5 shadow-sm text-white rounded-xl'>Search</div>
            </div>
        )
    }
  return (
    <div className='bg-white py-5 px-10'>
        <div className='justify-between flex items-center'>
        <Search/>
        <div className='flex gap-4 text-2xl opacity-50 items-start'>
            <AiOutlineBell/>
            <AiOutlineSetting/>
        </div>
        </div>
    </div>
  )
}

export default Header