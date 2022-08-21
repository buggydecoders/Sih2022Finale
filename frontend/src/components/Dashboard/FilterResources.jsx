import React, { useState } from 'react'
import FilterComponent from '../FilterComponent/FilterComponent';
import CardCollection from './CardCollection'
import FilterCheckbox from './FilterCheckbox'

const locations = ['Indore', 'Bhopal', 'Salem'];
const Universities = ['DAVV', 'TIME', 'SONA'];
const Budget = ['1000-2000', '2000-5000', '5000-7000', '7000-15000', '15000+'];

const FilterResources = ({filters,setFilters}) => {

 console.log(filters);
  return (
    <div className='space-y-5 w-full'>
      <div className='justify-between flex items-center bg-white py-3 px-5'>
        <div className='text-gray-600 text-xl font-[600]'>FILTERS</div>
        <div className='text-secondary underline text-sm cursor-pointer'>Clear all</div>
      </div>
      <CardCollection action='clear all' title={'Location'}>
        <FilterComponent selected={filters.location} title='Location' removeSelected={(value)=>setFilters(prev=>({...prev, location : prev.location.filter(p=>p!==value)}))} addSelected={(value)=>setFilters(prev=>({...prev, location : [...prev.location,value]}))}  options={locations.map(l=>({value : l,label : l}))}/>
      </CardCollection>
      <CardCollection action='clear all' title={'University'}>
      <FilterComponent selected={filters.university} title='University' removeSelected={(value)=>setFilters(prev=>({...prev, university : prev.university.filter(p=>p!==value)}))} addSelected={(value)=>setFilters(prev=>({...prev, university : [...prev.university,value]}))}  options={Universities.map(l=>({value : l,label : l}))}/>
    
      </CardCollection>
      <CardCollection action='clear all' title={'Budget'}>
      <FilterComponent selected={filters.budget} title='Budget' removeSelected={(value)=>setFilters(prev=>({...prev, budget : []}))} addSelected={(value)=>setFilters(prev=>({...prev, budget : [value]}))}  options={Budget.map(l=>({value : l,label : l}))}/>
      
      </CardCollection>
    </div>
  )
}

export default FilterResources

// ./auth/get-institutes