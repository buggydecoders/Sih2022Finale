import React, {useState} from 'react'
import {MdArrowBackIosNew,MdArrowForwardIos} from 'react-icons/md';
const Pagination = () => {
    const [value, setValue] = useState(0);
    const handleChange = ()=>{

    }
  return (
    <div className='py-6 px-10 bg-lightGray flex justify-between items-center'>
        <div className='font-[600] text-gray-400'>1-7 out of 63</div>
        <div className='flex items-center gap-3'>
            <div className='font-[600]'>Requests per page</div>
            <select className='bg-white py-4 px-4 outline-none' value={value} onChange={handleChange}>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={20}>20</option>
            </select>
            <div className='flex gap-2'>
                <div className='py-4 px-5 opacity-50 bg-white rounded-md'>
                    <MdArrowBackIosNew/>
                </div>
                <div className='py-4 px-5 bg-white rounded-md'>
                    <MdArrowForwardIos/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Pagination