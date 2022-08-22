import React from 'react'
import ResourceImg from '../../assets/Resources/3dPrinter.png';
import { AiOutlineBank } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { editRequest } from '../../store/requests/actions';


const PaymentOption = () => {
  return (
    <div className='py-4 w-full px-5 bg-gray-50 border-[1px] shadow-md border-gray-300 rounded-md items-center flex gap-3'>
      <div className='w-[20px] h-[20px] border-[1px] border-gray-400 rounded-full'></div>
      <div className='flex gap-5 items-center'>
        <div className='w-[70px] text-white h-[50px] rounded-md bg-gray-600 flex items-center justify-center'>
          <AiOutlineBank size={32} />
        </div>
        <div className='font-[700]'>Direct Transfer to Bank
          <div className='font-[500] text-gray-500 text-sm'>Bank Transfer to lending institute</div>

        </div>
      </div>
    </div>
  )
}

const Payment = ({ data }) => {
  const dispatch = useDispatch()

  const handlePayment = () => {
    const successCallback = () => toast('Payment Succesful')
    const errorCallBack = () => toast("Error")
    dispatch(editRequest(data?._id, { status: "approved" }, successCallback, errorCallBack));
  }

  return (
    <div>
      <div className='py-3 bg-white px-5 rounded-xl'>
        <div className='text-2xl font-semibold'>Payment</div>
        <div className='text-sm text-gray-600'>Time to pay!</div>
        <div className='mt-7 flex items-center justify-between'>
          <div className='flex  gap-5 items-center'>
            <img src={ResourceImg} className='w-[130px]' />
            <div>
              <div className='text-lg font-semibold text-black'>{data?.resource?.name}</div>
              <div className='text-sm font-[600] text-gray-600'>{data?.lendingInstitute?.address?.street}, {data?.lendingInstitute?.address?.city}, {data?.lendingInstitute?.address?.state}</div>
            </div>
          </div>
          <div className='w-fit bg-gray-200 text-gray-800 px-4 py-2 font-[600] rounded-md text-sm'>Change details</div>
        </div>

        <div className='mt-10'>
          <div className='text-lg font-[600] text-gray-700'>Payment Methods</div>
          <div className='mt-7 space-y-3'>
            <PaymentOption />
          </div>
        </div>

        <div className="w-full relative">
          <button type='button' className='bg-primary px-6 py-2 my-4 rounded-lg text-white absolute right-0' onClick={handlePayment}>Pay and Proceed</button>
        </div>
      </div>
    </div>
  )
}

export default Payment