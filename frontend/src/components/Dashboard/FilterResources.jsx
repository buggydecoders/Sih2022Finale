import React from 'react'
import CardCollection from './CardCollection'
import FilterCheckbox from './FilterCheckbox'

const locations = ['Indore', 'Bhopal', 'Salem'];
const Universities = ['DAVV', 'TIME', 'SONA'];
const Budget = ['5000-3000', '4000-6000'];

const FilterResources = () => {
  return (
    <div className='space-y-5 w-full'>
        <div className='justify-between flex items-center bg-white py-3 px-5'>
            <div className='text-gray-600 text-xl font-[600]'>FILTERS</div>
            <div className='text-secondary underline text-sm cursor-pointer'>Clear all</div>
        </div>
        <CardCollection action='clear all' title={'Location'}>
          {locations.map(l=><FilterCheckbox title={l}/>)}
        </CardCollection>
        <CardCollection action='clear all' title={'University'}>
        {Universities.map(l=><FilterCheckbox title={l}/>)}

        </CardCollection>
        <CardCollection action='clear all' title={'Budget'}>
        {Budget.map(l=><FilterCheckbox title={l}/>)}
        </CardCollection>
    </div>
  )
}

export default FilterResources