import React from 'react'
import {FiSearch} from 'react-icons/fi';

const Search = () => {
  return (
    <div className='bg-white px-5 py-5 rounded-sm'>
        <div className='text-xl font-[500]'>Search Resource</div>
        <div className='mt-5 grid grid-cols-[3.2fr_1fr] gap-4'>
            <div className='flex items-center relative'>
                <FiSearch className='absolute left-3 text-gray-400'/>
                <input className='w-full rounded-md bg-lightGray outline-none py-3 pl-10' placeholder='Find Resources'/>
            </div>
            <div className='w-full'>
                <select className='bg-lightGray rounded-md outline-none w-full py-3 px-3'>
                    <option value="Newest">Newest</option>
                    <option value="Oldest">Oldest</option>
                </select>
            </div>
        </div>
        <div className='mt-4 w-full py-3 rounded-md cursor-pointer hover:bg-opacity-80 hover:text-white transition-all duration-500 font-[400] text-center bg-secondary bg-opacity-10 text-secondary'>
            0 Resources Found
        </div>
    </div>
  )
}

export default Search