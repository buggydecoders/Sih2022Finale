import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import InputField from '../InputField'

const BasicInfoForm = () => {
    const {user} = useSelector(state=>state.auth);
    const [form,setForm] = useState({
        startDate : '',
        endDate : '',
        note : ''
    });
    const handleChange = (e)=>setForm(prev=>({...prev,[e.target.name]  :e.target.value}));
    const {loading} = useSelector(state=>state.requests);
    const handleSubmit = ()=>{

    }
  return (
    <form onSubmit={handleSubmit} className='px-8'>
        <div className='font-semibold text-2xl'>Duration</div>
        <div className='grid grid-cols-2 gap-5 mt-5'>
            <InputField required={true} name="startDate" value={form.startDate} onChange={handleChange} type="date" label='From' placeholder='Enter Start Date'/>
            <InputField required={true} name="endDate" value={form.endDate} onChange={handleChange} type="date" label='To' placeholder='Enter End Date'/>
        </div>
        <div className=' mt-5'>
            <InputField   disabled={true} value={user.email} type="email" label='Email' placeholder='Enter Email'/>
        </div>
        <div className='mt-5'>
            <InputField required={true} name="note" value={form.note} onChange={handleChange} type="text" area={true} label='Enter note' placeholder='Enter a note for lending institute'/>
        </div>
        <div className='mt-5'>
            <button type='submit' className='px-10 py-3 text-white font-[600]  rounded-xl cursor-pointer bg-secondary w-fit'>Send</button>
        </div>
    </form>
  )
}

export default BasicInfoForm