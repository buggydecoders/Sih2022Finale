import React from 'react'
import {FiSearch} from 'react-icons/fi';

const Search = () => {
  return (
    <div className='py-5 px-5 bg-lightGray'>
        <div className='flex items-center relative'>
            <FiSearch size={20} className='text-gray-400 absolute left-4'/>
            <input type="text" className='w-full bg-white outline-none py-4 pl-16' placeholder='Search with Request ID/ Resource ID'/>
        </div>
    </div>
  )
}

export default Search