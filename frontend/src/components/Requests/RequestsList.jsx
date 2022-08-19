import React, { useState, useEffect } from 'react'
import RequestCard from './RequestCard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRequierements } from '../../store/requirements/actions';

const RequestsList = () => {
    const [selected,setSelected] = useState(1);
    const {requirements, loading} = useSelector(state => state.requirements)
    console.log(requirements, loading)
  return (
    <div className='space-y-4'>
      {
        requirements?.map((req, idx)=>{
          return <RequestCard data={req} selected={selected} setSelected={setSelected} id={idx+1}/>
        })
      }
    </div>
  )
}

export default RequestsList