import React, { useState } from 'react'
import {MdIncompleteCircle, MdOutlineScience} from 'react-icons/md';
import {FiPackage} from 'react-icons/fi';
import AddResourceDrawer from '../Resource/AddResourceDrawer';

const ResourceItem = ()=>{
    const [isOpen,setIsOpen] = useState(false);
    return(
    <>
    <div onClick={()=>setIsOpen(true)} className= 'p-3 rounded-md'>
        <div className='w-full rounded-md bg-white p-2 h-[210px]'>
            <img src=''/>
        </div>
        <div className='mt-3 font-[500] font-open'>
            Printer with 3d Function
        </div>
        <div className='text-gray-400 text-xs font-open mt-1'>13 July-14 July 2022</div>
        <div className='font-[600] font-open'>$120</div>
    </div>
    <AddResourceDrawer isOpen={isOpen} setIsOpen={setIsOpen}/>
    </>)
}

const CategoryType = ({title,icon,isSelected})=>{
    return (
        <div className={`${isSelected?'text-white bg-gray-600':'text-gray-500'} p-1 font-open px-5 hover:bg-gray-600 cursor-pointer hover:text-white transition-all duration-500   border-[1px] border-gray-400 rounded-md flex gap-5 items-center`}>
            <div>{title}</div>
            {icon}
        </div>
    )
}

const Resources = () => {
  return (
    <div className=' p-5 px-5 rounded-xl'>
        <div className='text-gray-600 text-2xl font-[600]'>Resources</div>
        <div className='text-sm text-gray-400 mt-1'>Showing resources associated with Insitute of Engineering & Technology</div>
        <div className='mt-5 gap-5 flex justify-between items-center'>
            <div className='flex items-center gap-5'>
            <CategoryType isSelected={true} title='All' icon={<MdIncompleteCircle/>}/>
            <CategoryType title='Research' icon={<MdOutlineScience/>}/>
            <CategoryType title='Product Design' icon={<FiPackage/>}/>
            </div>
            <select className='bg-transparent px-5 py-1 border-b-[1px]  border-gray-400 rounded-md font-open text-gray-600 outline-none'>
                <option value="">My Resources</option>
                <option value="">Shared Resources</option>
                <option value="">Drafts</option>
            </select>
        </div>
        <div className='mt-5 gap-5 grid grid-cols-4'>
            <ResourceItem/>
            <ResourceItem/>
            <ResourceItem/>
            <ResourceItem/>
            <ResourceItem/>
        </div>
    </div>
  )
}

export default Resources