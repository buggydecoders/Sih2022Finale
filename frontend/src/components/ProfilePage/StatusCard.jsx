import React from 'react'
import {BsFillCheckSquareFill} from 'react-icons/bs'
import {RiCalendar2Line} from 'react-icons/ri'
import {MdAccountBalanceWallet} from 'react-icons/md'
import {BsFillEyeFill} from 'react-icons/bs'

function StatusCard(props) {

  const Icon = ({icon})=>{
    switch (icon) {
      case 1: 
        return <RiCalendar2Line className='h-8 w-8'/>
        break;
      case 2: 
        return <MdAccountBalanceWallet className='h-8 w-8'/>
        break;
      case 3: 
        return <BsFillEyeFill className='h-8 w-8'/>
        break;
      default:
        break;
    }
  }
  return (
    <div className='bg-lightGray w-full mx-8 flex justify-between p-4 rounded-2xl'>
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

        <div className="grayGradient text-gray-600 rounded-full h-16 w-16 p-1 flex justify-center items-center">
            <Icon icon={props.icon}/>
        </div>
    </div>
  )
}

export default StatusCard