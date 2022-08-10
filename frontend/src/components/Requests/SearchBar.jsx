import React from 'react'
import {FiSearch} from 'react-icons/fi';

const SearchBar = () => {
  return (
    <div className=' flex w-fit items-center relative'>
            <div className='absolute right-0 px-6 bg-secondary h-full flex items-center justify-center rounded-md text-white'>
                <FiSearch/>
            </div>
            <input placeholder='Search' className='py-3 bg-white outline-none rounded-md px-5 w-[500px] shadow-md'/>
    </div>
  )
}

export default SearchBar