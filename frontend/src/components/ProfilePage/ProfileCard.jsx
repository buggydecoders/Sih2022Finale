import React from 'react'
import {BsFillCheckSquareFill} from 'react-icons/bs'
import {RiCalendar2Line} from 'react-icons/ri'

function ProfileCard(props) {
  return (
    <div className='bg-lightGray flex p-4 rounded-2xl'>
        <div className="flex flex-col">
            <p className='text-xl font-medium'>{props.main}+</p>
            <p className='text-sm'>{props.sub}</p>

            {
                props.for === "Resources"?
                <p className='text-xs text-green-500 font-medium flex items-center'>{props.achievement} Today <span className='pl-1'><BsFillCheckSquareFill/></span></p>
                :
                <p className='text-xs text-green-500 font-medium flex items-center'>{props.achievement} Higher <span className='pl-1'><BsFillCheckSquareFill/></span></p>
            }
        </div>

        <div className="bg-gray-100 text-gray-600 ml-10 rounded-full h-16 w-16 p-1 flex justify-center items-center">
            <RiCalendar2Line className='h-8 w-8'/>
        </div>
    </div>
  )
}

export default ProfileCard