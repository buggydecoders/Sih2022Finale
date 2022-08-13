import React from 'react'
import Layout from '../components/Layout'
import AddContract from '../components/RecievedRequest/AddContract'
import ConfirmationComponent from '../components/RecievedRequest/ConfirmationComponent'
import RequestDetails from '../components/RecievedRequest/RequestDetails'
import Status from '../components/RecievedRequest/Status'
import ResourceCard from '../components/Send-Request/ResourceCard'


const RecievedRequest = () => {
  return (
    <Layout>
         <div className='py-16 px-10 bg-lightGray'>
            <div className='text-3xl font-bold'>Recieved Request #009</div>
            <div className='text-sm text-gray-500'>You can either accept your reject this request based on the requirement</div>
            <div className='mt-8 grid grid-cols-[2.3fr_1fr] gap-5'>
              <div className=''>
                {/* <AddContract/> */}
                {/* <Status/> */}
                {/* <ConfirmationComponent/> */}
                {/* <RequestDetails/> */}
              </div>
              <ResourceCard/>
            </div>
            {/* <div className='mt-8'>
            <AddContract/>
            </div> */}
        </div>
    </Layout>
  )
}

export default RecievedRequest