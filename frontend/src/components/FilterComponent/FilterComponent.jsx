import React, { useState } from 'react'
import FilterCheckbox from '../Dashboard/FilterCheckbox'



const FilterComponent = ({title,options,addSelected,removeSelected,selected}) => {
    const [filteredOptions,setFilteredOptions] = useState(options);
    const [search,setSearch] = useState('');

  return (
    <div>
        <div className='flex flex-col'>
            <input type='text' value={search} className='w-full border-b-[1px] outline-none' onChange={(e)=>setSearch(e.target.value)} placeholder={`Search ${title}`}/>
            <div className='mt-4 space-y-3'>
                {options.map(o=><FilterCheckbox selected={selected} key={o.value} value={o.value} addSelected={addSelected} removeSelected={removeSelected} label={o.label}/>)}
            </div>
        </div>
    </div>
  )
}

export default FilterComponent