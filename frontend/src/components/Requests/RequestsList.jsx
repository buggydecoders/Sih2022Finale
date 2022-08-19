import React, { useState, useEffect } from 'react'
import RequestCard from './RequestCard'
import { useSelector } from 'react-redux'

const RequestsList = ({selected, setSelected}) => {
    const {requirements, loading} = useSelector(state => state.requirements)
  return (
    <div className='space-y-4'>
      {
        requirements?.map((req, idx)=>{
          return <RequestCard data={req} selected={selected} setSelected={setSelected} id={idx}/>
        })
      }
    </div>
  )
}

export default RequestsList