import React, { useRef } from 'react'

const InputField = ({label, placeholder,area,rows, ...props}) => {
    const ref = useRef();
    const handleFocusOn = ()=>{
        if (props.type && props.type==='date') {
            ref.current.type = 'date'
        }
    }
    const handleFocusOff = ()=>{
        if (props.type && props.type==='date') {
            ref.current.type = 'text'
        }
    }
  return (
    <div>
        <div className='font-[600] text-gray-500'>{label}</div>
        <div className='mt-2 w-full'>
            {!area&&<input onFocus={handleFocusOn} onBlur={handleFocusOff} ref={ref} {...props} placeholder={placeholder} className='w-full py-3 px-2 border-[1px] border-gray-300 rounded-lg outline-none focus:shadow-sm'/>}
            {area&&<textarea rows={rows || 5} onFocus={handleFocusOn} onBlur={handleFocusOff} ref={ref} {...props} placeholder={placeholder} className='w-full py-3 px-2 border-[1px] border-gray-300 rounded-lg outline-none focus:shadow-sm'/>}
        </div>
    </div>
  )
}

export default InputField