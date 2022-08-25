import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../../components/Layout'
import BasicInfoForm from '../../components/Send-Request/BasicInfoForm'
import Confirmation from '../../components/Send-Request/Confirmation'
import ExchangePage from '../../components/Send-Request/ExchangePage'
import Payment from '../../components/Send-Request/Payment'
import PaymentInfo from '../../components/Send-Request/PaymentInfo'
import Progress from '../../components/Send-Request/Progress'
import ResourceCard from '../../components/Send-Request/ResourceCard'
import SignContract from '../../components/Send-Request/SignContract'
import { fetchSingleRequest } from '../../store/requests/actions'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import Completed from '../../components/Send-Request/Completed'
const RequestStatus = () => {
  const { loading, activeRequest: requestData } = useSelector(state => state.requests)
  const dispatch = useDispatch();
  const { id: requestId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const errorCallback = () => {
      navigate('/not-found')
    }
    dispatch(fetchSingleRequest(requestId, null, errorCallback));
  }, [])

  const [cancelled, setCancelled] = useState(-1);

  const RenderComponent = () => {
    switch (requestData.status) {
      case 'pending': return <Confirmation data={requestData} />
      case 'accepted': return <Confirmation data={requestData} />
      case 'cancelled': return <Confirmation cancelled={true} data={requestData} />
      case 'await-sign': return <SignContract data={requestData} />
      case 'approved': return <ExchangePage data={requestData} />
      case 'completed' : return  <Completed data={requestData} />
    }
  }

  return (
    <Layout >
      {loading ? <div>Loading...</div> : <div className='py-16 px-10 bg-lightGray'>
        <div className='text-4xl font-bold'>Request Status</div>
        <div className='mt-2 text-gray-400'>Your resource is just a few clicks away. </div>
        <div className='mt-4'><Progress cancelled={cancelled} status={requestData.status} /></div>
        <div className='mt-8 grid grid-cols-[2.3fr_1fr] gap-5'>
          <div className=''>
            <RenderComponent />
          </div>
          <ResourceCard data={{ ...requestData.resource, instituteId: requestData.lendingInstitute }} institute={requestData.lendingInstitute} />
          {/* <PaymentInfo/> */}
        </div>
      </div>}
    </Layout>
  )
}

export default RequestStatus