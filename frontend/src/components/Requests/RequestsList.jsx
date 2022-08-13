import React, { useState } from 'react'
import RequestCard from './RequestCard'

const RequestsList = () => {
    const [selected,setSelected] = useState(1);
  return (
    <div className='space-y-4'>
        <RequestCard selected={selected} setSelected={setSelected} id={1}/>
        <RequestCard selected={selected} setSelected={setSelected} id={2}/>
        <RequestCard selected={selected} setSelected={setSelected} id={3}/>
        <RequestCard selected={selected} setSelected={setSelected} id={4}/>
        <RequestCard selected={selected} setSelected={setSelected} id={5}/>
    </div>
  )
}

export default RequestsList