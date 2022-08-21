import React, { useEffect, useState } from 'react'
import FilterCheckbox from '../Dashboard/FilterCheckbox'
const stringComparison = require('string-comparison');
const {cosine} = stringComparison;

const FilterComponent = ({title,options,addSelected,removeSelected,selected}) => {
    const [filteredOptions,setFilteredOptions] = useState(options);
    useEffect(()=>{
      setFilteredOptions(options);
    }, [options])
    const [search,setSearch] = useState('');
    useEffect(()=>{
      filterOptions(search);
    }, [search])
    let idToData = {};
    options.map(o=>{idToData[o.label]=o});

    const filterOptions = (query) => {
      let sortedList = cosine.sortMatch(query, options.map(o=>o.label));
      sortedList = sortedList.reverse();
      let maxRating = 0;
      for (let i = 0; i < sortedList.length; ++i) {
        if (sortedList[i].rating > maxRating) maxRating = sortedList[i].rating;
      }
      let accuracy = maxRating - 0.2;
      let finalOptions = sortedList.filter((r) => r.rating >= accuracy);
      finalOptions = finalOptions.map(m=>(idToData[m.member]));
      setFilteredOptions(finalOptions)
    };

  return (
    <div>
        <div className='flex flex-col'>
            <input type='text' value={search} className='w-full border-b-[1px] outline-none' onChange={(e)=>setSearch(e.target.value)} placeholder={`Search ${title}`}/>
            <div className='mt-4 space-y-3 max-h-[250px] overflow-y-auto'>
                {filteredOptions.map(o=><FilterCheckbox selected={selected} key={o.value} value={o.value} addSelected={addSelected} removeSelected={removeSelected} label={o.label}/>)}
            </div>
        </div>
    </div>
  )
}

export default FilterComponent