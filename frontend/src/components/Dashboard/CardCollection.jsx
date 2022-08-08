import React from 'react'

const CardCollection = ({title,action}) => {
  return (
    <div className='px-5 py-6 w-full bg-white rounded-md'>
        <div className='flex justify-between items-center'>
            <div className='font-[600] text-primary text-lg '>{title}</div>
            <div className='text-gray-500 underline text-sm'>{action?action:'view all'}</div>
        </div>
    </div>
  )
}

export default CardCollection