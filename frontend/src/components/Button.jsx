import React from 'react'
import cls from 'classnames';
const Button = ({children, variant,customClass, ...props}) => {
   let extClass;
   switch(variant) {
    case 'outlined' : extClass = 'border-[1px] border-primary text-primary';
    break;
    case 'filled'  : extClass='border-[1px] bg-primary text-white';
    break;
    default : extClass=''
   }
  return (
    <button {...props} className={cls('px-4 py-2 rounded-xl', extClass , {customClass : customClass})}>{children}</button>
  )
}

export default Button