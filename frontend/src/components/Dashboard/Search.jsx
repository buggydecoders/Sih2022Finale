import React, { useState } from 'react'
import { FiSearch } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux'
import { searchResource } from '../../store/resources/actions';
import { ImCross } from 'react-icons/im'
import { SearchDashboardResources } from '../../store/dashboard/actions';

const Search = () => {
    const dispatch = useDispatch()
    const [searchTerm, setSearchTerm] = useState("");
    const handleSubmit = (reset) => {
        reset ? dispatch(SearchDashboardResources("")) : dispatch(SearchDashboardResources(searchTerm))
        if(reset) setSearchTerm("")
    }
    const { resources, loading } = useSelector(state => state.dashboard)

    return (
        <div className='bg-white px-5 py-5 rounded-sm'>
            <div className='text-xl font-[500]'>Search Resource</div>
            <div className='mt-5 grid grid-cols-[3.2fr_1fr] gap-4'>
                <div className='flex items-center relative'>
                    <FiSearch className='absolute left-3 text-gray-400 cursor-pointer' onClick={() => handleSubmit(false)} />
                    <input onKeyPress={event => event.key === 'Enter' ? handleSubmit() : null} disabled={loading === "SEARCH-RESOURCE"} className='w-full rounded-md bg-lightGray outline-none py-3 pl-10' value={searchTerm} placeholder='Find Resources' onChange={(e) => { setSearchTerm(e.target.value) }} />
                    {searchTerm===""? null : <ImCross className='absolute right-3 text-gray-400 cursor-pointer' onClick={() => handleSubmit(true)} />}
                </div>
                <div className='w-full'>
                    <select className='bg-lightGray rounded-md outline-none w-full py-3 px-3'>
                        <option value="Newest">Newest</option>
                        <option value="Oldest">Oldest</option>
                    </select>
                </div>
            </div>
            <div className='mt-4 w-full py-3 rounded-md cursor-pointer hover:bg-opacity-80 hover:text-white transition-all duration-500 font-[400] text-center bg-secondary bg-opacity-10 text-secondary'>
                {resources.length} Resources Found
            </div>
        </div>
    )
}

export default Search