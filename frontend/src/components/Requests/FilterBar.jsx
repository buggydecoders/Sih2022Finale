import React, { useState } from 'react'

const FilterItem = ({title,selected,setSelected})=>{
    const isSelected = title===selected;
    return (
        <div onClick={()=>setSelected(title)} className={`${isSelected?'bg-secondary   rounded-md text-white':'font-semibold text-gray-600'} w-full text-center py-3`}>{title}</div>
    )
}

const FilterBar = () => {
    const [selected,setSelected] = useState('Best Matches');
  return (
    <div className='w-full'>
        <div className='bg-white grid grid-cols-3  items-center shadow-md cursor-pointer'>
            <FilterItem selected={selected} setSelected={setSelected} title='Best Matches'/>
            <FilterItem selected={selected} setSelected={setSelected} title='Featured'/>
            <FilterItem selected={selected} setSelected={setSelected} title='My Requests'/>
        </div>
    </div>
  )
}

export default FilterBar