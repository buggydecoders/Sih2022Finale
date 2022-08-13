import React from 'react'
import {AiOutlineBank} from 'react-icons/ai';
const PaymentInfo = () => {
  return (
    <div className='bg-white py-4 font-[500] px-6'>
        <div className='flex gap-3 items-center'>
            <div className='w-[60px] flex items-center justify-center rounded-full h-[60px] bg-primary bg-opacity-20 text-primary'>
                <AiOutlineBank size={26}/>
            </div>
            <div className='font-semibold'>
                Bank Transfer
            <div className='text-sm text-gray-400'>Direct Bank Transfer Payment</div>
        
            </div>
        </div>
        <hr className='my-6'/>
        <div className='space-y-2 text-sm'>
        <div className='flex justify-between items-center font-[500] text-gray-600'>
            <div className='text-gray-500'>Subtotal</div>
            <div className='text-black'>Rs. 5000</div>
        </div>
        <div className='flex justify-between items-center font-[500] text-gray-600'>
            <div className='text-gray-500'>Coupon Discount</div>
            <div className='text-black'>Rs. 0</div>
        </div>
        </div>
        <hr  className='my-3'/>
        <div className='flex justify-between items-center font-[500] text-gray-600'>
            <div className='text-gray-600'>Total</div>
            <div className='text-black text-lg font-[700]'>Rs. 5000</div>
        </div>
        <div className='mt-6'>
            <button className='w-full py-3 bg-primary text-white rounded-md'>Make Payment</button>
        </div>
    </div>
  )
}

export default PaymentInfo