import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useParams,useNavigate} from 'react-router-dom';
import Layout from '../components/Layout'
import BasicInfoForm from '../components/Send-Request/BasicInfoForm'
import Confirmation from '../components/Send-Request/Confirmation'
import ExchangePage from '../components/Send-Request/ExchangePage'
import Payment from '../components/Send-Request/Payment'
import PaymentInfo from '../components/Send-Request/PaymentInfo'
import Progress from '../components/Send-Request/Progress'
import ResourceCard from '../components/Send-Request/ResourceCard'
import SignContract from '../components/Send-Request/SignContract'
import { checkRequestExists } from '../store/requests/actions';
import { fetchSingleResource } from '../store/resources/actions';
import {toast} from 'react-toastify';
const SendRequest = () => {

  const {loading : resourceLoading, resource} = useSelector(state=>state.resources);
  const {loading : requestLoading} = useSelector(state=>state.requests);
  const navigate = useNavigate();
  const {id : resourceId} = useParams();
  const dispatch = useDispatch();
  useEffect(()=>{
    const existsCallback = (data)=>{
      navigate(`/status/${data.request.id}`);
      toast('Request already exists! You cannot put another request until that one is completed.');
    }
    dispatch(fetchSingleResource(resourceId));
    dispatch(checkRequestExists(resourceId, existsCallback));
  }, [])

  if (!resourceLoading) {
  console.log(resource || 'FETCHED RESOURCE');
  }

  return (
    <Layout >
        {(requestLoading || resourceLoading)?<div>Loading...</div>:<div className='py-16 px-10 bg-lightGray'>
            <div className='text-4xl font-bold'>Send Request</div>
            <div className='mt-2 text-gray-400'>Your resource is just a few clicks away. </div>
            <div className='mt-8 grid grid-cols-[2.3fr_1fr] gap-5'>
              <div className=''>
                <BasicInfoForm/>
                {/* <ExchangePage/> */}
              </div>
              <ResourceCard/>
              {/* <PaymentInfo/> */}
            </div>
        </div>}
    </Layout>
  )
}

export default SendRequest