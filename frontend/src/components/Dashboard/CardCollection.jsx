import React from 'react'
import { useNavigate } from 'react-router-dom'

const CardCollection = ({title,action,children,viewAll,handleClearAll}) => {
  const navigate = useNavigate()
  return (
    <div className='px-5 py-6 w-full bg-white rounded-md' onClick={()=>navigate(viewAll)}>
        <div className='flex justify-between items-center'>
            <div className='font-[600] text-primary text-lg '>{title}</div>
            <div onClick={handleClearAll} className='text-gray-500 underline text-sm cursor-pointer'>{action?action:'view all'}</div>
        </div>
        <div className='mt-4'>
          {children}
        </div>
    </div>
  )
}

export default CardCollection