import React from 'react'
import {BiDetail} from 'react-icons/bi';
import cls from 'classnames';
const Step = ({title,side,state})=>{

    
    
    return (
        <div className={`items-${side || 'end'}  flex flex-col gap-1`}>
            <div className={cls('flex items-center gap-2 font-[600] text-sm ', {'opacity-40 text-gray-400' : state==='inactive'}, {'text-blue-500' : state==='active' || state==='done'})}>
                <BiDetail/> {title}
            </div>
            <div className={cls('mt-2', {'rounded-full flex items-center justify-center border-[2px] border-blue-500 w-[20px] h-[20px] animate-pulse' : state==='active'})}>
                <div className={cls('w-[15px] h-[15px] bg-blue-500 rounded-full', {'bg-gray-300' : state==='inactive'})}></div>
            </div>
        </div>
    )
}

const Progress = () => {
  return (
    <div>
        <div className='flex justify-between items-center relative z-[100] top-[10px]'>
            <Step title="Confirmation" side="start" state='done'/>
            <Step title="Sign Contract" side="center" state='active'/>
            <Step title="Payment" side="center" state='inactive'/>
            <Step title="Exchange duration" side="end" state='inactive'/>
        </div>
        <div className='w-full relative h-[2px] bg-gray-300 z-[1]'>
            <div className='h-full w-[49%] bg-blue-500 absolute'></div>
        </div>
    </div>
  )
}

export default Progress