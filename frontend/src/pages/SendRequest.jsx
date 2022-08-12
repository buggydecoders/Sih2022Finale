import React from 'react'
import Layout from '../components/Layout'
import BasicInfoForm from '../components/Send-Request/BasicInfoForm'
import Confirmation from '../components/Send-Request/Confirmation'
import Payment from '../components/Send-Request/Payment'
import PaymentInfo from '../components/Send-Request/PaymentInfo'
import Progress from '../components/Send-Request/Progress'
import ResourceCard from '../components/Send-Request/ResourceCard'
import SignContract from '../components/Send-Request/SignContract'

const SendRequest = () => {
  return (
    <Layout >
        <div className='py-16 px-10 bg-lightGray'>
            <div className='text-4xl font-bold'>Send Request</div>
            <div className='mt-2 text-gray-400'>Your resource is just a few clicks away. </div>
            <div className='mt-4'><Progress/></div>
            <div className='mt-8 grid grid-cols-[2.3fr_1fr] gap-5'>
              <div className=''>
                {/* <BasicInfoForm/> */}
                {/* <Confirmation/> */}
                {/* <SignContract/> */}
                <Payment/>
              </div>
              {/* <ResourceCard/> */}
              <PaymentInfo/>
            </div>
        </div>
    </Layout>
  )
}

export default SendRequest