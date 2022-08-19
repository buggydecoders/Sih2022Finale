import React, {useState} from 'react'
import Layout from '../components/Layout'
import AddRequest from '../components/Requests/AddRequest'
import AddRequestDrawer from '../components/Requests/AddRequestDrawer'
import FilterBar from '../components/Requests/FilterBar'
import RequestDetails from '../components/Requests/RequestDetails'
import RequestsList from '../components/Requests/RequestsList'
import SearchBar from '../components/Requests/SearchBar'

const Requests = () => {
    const [addSidebar, setAddSidebar] = useState(false);
    return (
        <Layout>
            <div className='bg-lightGray px-16 py-10 grid grid-cols-[2fr_4fr] gap-10'>
                <div>
                    <FilterBar />
                    <div className='mt-10 flex flex-col'>
                        <AddRequest setAddSidebar={setAddSidebar} />
                        <RequestsList />
                    </div>
                </div>
                <div>
                    <SearchBar />
                    <div className='mt-10'>
                        <RequestDetails />
                    </div>
                </div>
                <AddRequestDrawer isOpen={addSidebar} setIsOpen={setAddSidebar} />
            </div>
        </Layout>
    )
}

export default Requests