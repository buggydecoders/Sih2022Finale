import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import InputField from '../InputField'
import {useDispatch} from 'react-redux';
import { sendRequest } from '../../store/requests/actions';
import {toast} from 'react-toastify';
import moment from 'moment';
const BasicInfoForm = ({resource,success,setSuccess}) => {
    const {user} = useSelector(state=>state.auth);
    const [form,setForm] = useState({
        startDate : '',
        endDate : '',
        note : '',
        accessType : 'one-time'
    });
    const handleChange = (e)=>setForm(prev=>({...prev,[e.target.name]  :e.target.value}));
    const {loading} = useSelector(state=>state.requests);
    const dispatch = useDispatch();
    const handleSubmit = (e)=>{
        e.preventDefault();
        if (resource.category!=='virtual') {
        if (moment(form.startDate).isBefore(moment())) return toast('Start date cannot be a past date');
        const isStartDateHigher = moment(form.endDate).diff(form.startDate)<=0;
        if (isStartDateHigher) return toast('End date must be after start date!');
        
        const isDurationCorrect = moment(form.startDate).isBetween(moment(resource.durationFrom),moment(resource.durationTo)) && moment(form.endDate).isBetween(moment(resource.durationFrom),moment(resource.durationTo));
        if (!isDurationCorrect) return toast('You have asked for a different duration than availablity, Please contact the insitute for that.');
        }

        let dataToSend = {resourceId : resource._id, ...form}
        const successCallback = (data)=>{
            setSuccess(data.request._id);
        }
        dispatch(sendRequest(dataToSend, successCallback))
    }
  return (
    <form onSubmit={handleSubmit} className='px-8'>
        {resource.category==='virtual'&&<select onChange={handleChange} name='accessType' placeholder={'Select Access Type'} className='w-full py-3 mb-5 px-2 border-[1px] border-gray-300 rounded-lg outline-none focus:shadow-sm'>
            <option value="one-time">One Time</option>
            <option value="duration">Duration based</option>
        </select>}
        <div className='font-semibold text-2xl'>Duration</div>
        {(form.accessType==='duration' || resource.category!=='virtual')&&<div className='grid grid-cols-2 gap-5 mt-5'>
            <InputField required={true} name="startDate" value={form.startDate} onChange={handleChange} type="date" label='From' placeholder='Enter Start Date'/>
            <InputField required={true} name="endDate" value={form.endDate} onChange={handleChange} type="date" label='To' placeholder='Enter End Date'/>
        </div>}
        <div className=' mt-5'>
            <InputField   disabled={true} value={user.email} type="email" label='Email' placeholder='Enter Email'/>
        </div>
        <div className='mt-5'>
            <InputField required={true} name="note" value={form.note} onChange={handleChange} type="text" area={true} label='Enter note' placeholder='Enter a note for lending institute'/>
        </div>
        <div className='mt-5'>
            <button type='submit' disabled={loading} className='px-10 py-3 text-white font-[600]  rounded-xl cursor-pointer bg-secondary w-fit'>{loading?'Loading...':'Send'}</button>
        </div>
    </form>
  )
}

export default BasicInfoForm