import React from 'react'
import CardCollection from './CardCollection'

const FilterResources = () => {
  return (
    <div className='space-y-5 w-full'>
        <div className='justify-between flex items-center bg-white py-3 px-5'>
            <div className='text-gray-600 text-xl font-[600]'>FILTERS</div>
            <div className='text-secondary underline text-sm cursor-pointer'>Clear all</div>
        </div>
        <CardCollection action='clear all' title={'Location'}/>
        <CardCollection action='clear all' title={'University'}/>
        <CardCollection action='clear all' title={'Budget'}/>
    </div>
  )
}

export default FilterResources