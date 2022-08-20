import React, { useState } from 'react'
import CardCollection from './CardCollection'
import FilterCheckbox from './FilterCheckbox'

const locations = ['Indore', 'Bhopal', 'Salem'];
const Universities = ['DAVV', 'TIME', 'SONA'];
const Budget = ['5000-3000', '4000-6000'];

const FilterResources = () => {
  const [filterLocations, setFilterLocations] = useState([]);
  const [filterUniversities, setFilterUniversities] = useState([]);
  const [filterBudget, setFilterBudget] = useState([]);
  let filter = {
    locations: filterLocations,
    universities: filterUniversities,
    budget: filterBudget
  }

  console.log(filter)
  return (
    <div className='space-y-5 w-full'>
      <div className='justify-between flex items-center bg-white py-3 px-5'>
        <div className='text-gray-600 text-xl font-[600]'>FILTERS</div>
        <div className='text-secondary underline text-sm cursor-pointer'>Clear all</div>
      </div>
      <CardCollection action='clear all' title={'City'}>
        {locations.map((l, idx) => <FilterCheckbox title={l} idx={idx} data={filterLocations} setData={setFilterLocations} />)}
      </CardCollection>
      <CardCollection action='clear all' title={'University'}>
        {Universities.map((l, idx) => <FilterCheckbox title={l} idx={idx} data={filterUniversities} setData={setFilterUniversities} />)}

      </CardCollection>
      <CardCollection action='clear all' title={'Budget'}>
        {Budget.map((l, idx) => <FilterCheckbox title={l} idx={idx} data={filterBudget} setData={setFilterBudget} />)}
      </CardCollection>
    </div>
  )
}

export default FilterResources