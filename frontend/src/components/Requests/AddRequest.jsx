import React from 'react'
import {GrAddCircle} from 'react-icons/gr'

function AddRequest({setAddSidebar}) {
  return (
    <div onClick={() => setAddSidebar(true)} className='border-dashed flex space-x-2 items-center justify-center border-2 font-semibold my-3 rounded-lg text-center py-2 w-full cursor-pointer'>
      <p>Add Request</p>
      <GrAddCircle/>
    </div>
  )
}

export default AddRequest