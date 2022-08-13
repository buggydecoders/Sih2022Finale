import React from 'react'
import InputField from '../InputField'

const BasicInfoForm = () => {
  return (
    <div className='px-8'>
        <div className='font-semibold text-2xl'>Duration</div>
        <div className='grid grid-cols-2 gap-5 mt-5'>
            <InputField type="date" label='From' placeholder='Enter Start Date'/>
            <InputField type="date" label='To' placeholder='Enter End Date'/>
        </div>
        <div className='grid grid-cols-2 gap-5 mt-5'>
            <InputField type="email" label='Email' placeholder='Enter Email'/>
            <InputField type="phone" label='Phone' placeholder='Phone Number'/>
        </div>
        <div className='mt-5'>
            <InputField type="text" area={true} label='Enter note' placeholder='Enter a note for lending institute'/>
        </div>
        <div className='mt-5'>
            <div className='px-10 py-3 text-white font-[600]  rounded-xl cursor-pointer bg-secondary w-fit'>Send</div>
        </div>
    </div>
  )
}

export default BasicInfoForm