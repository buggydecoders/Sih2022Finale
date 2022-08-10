import React from 'react'
import Layout from '../components/Layout'
import FilterBar from '../components/Requests/FilterBar'
import RequestCard from '../components/Requests/RequestCard'
import RequestDetails from '../components/Requests/RequestDetails'
import RequestsList from '../components/Requests/RequestsList'
import SearchBar from '../components/Requests/SearchBar'

const Requests = () => {
  return (
    <Layout>
    <div className='bg-lightGray px-16 py-10 grid grid-cols-[2fr_4fr] gap-10'>
        <div>
            <FilterBar/>
            <div className='mt-10'>
                <RequestsList/>
            </div>
        </div>
        <div>
            <SearchBar/>
            <div className='mt-10'>
                <RequestDetails/>
            </div>

        </div>
    </div>
    </Layout>
  )
}

export default Requests