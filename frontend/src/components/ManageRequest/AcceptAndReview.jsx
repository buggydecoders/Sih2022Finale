import React from 'react'
import InputField from "../InputField";
import Logo from "../../assets/DAVV_LOGO.png";
import { RESOURCE_FALLBACK_IMG } from "../../utils/fallbackImages";
import moment from 'moment';
import {useDispatch,useSelector} from 'react-redux'
import { editRequest } from '../../store/requests/actions';
import {useNavigate} from 'react-router-dom'

const AcceptAndReview = ({data}) => {
  const dispatch = useDispatch();
  const {loading} = useSelector(state=>state.requests);
  const changeStatus = (status)=>{
    dispatch(editRequest(data?._id, {status}));
  }
  const navigate = useNavigate()
  
  return (
    <>
    <div className="mt-8">
      <div className="text-base font-[600]">Resource Details</div>
      <div className="justify-between flex items-center">
        <div className="flex items-center gap-3 mt-4">
          <img
            src={RESOURCE_FALLBACK_IMG}
            className="w-[80px] h-[80px] rounded-md"
          />
          <div className="font-open">
            <div className="font-[600]">{data?.resource?.name}</div>
            <div className="text-sm text-gray-500">on : {moment(data?.createdAt).format('DD MMMM YYYY')}</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="underline text-primary cursor-pointer" onClick={()=>navigate(`/resource/${data?.resource?._id}`)}>More about Resource</div>
        </div>
      </div>
    </div>
    <div className="mt-8">
      <div className="text-base font-[600]">Institute Details</div>
      <div className="mt-3 flex justify-between items-center">
        <div className="flex gap-3 font-open items-center">
          <img src={Logo} className="w-[80px] h-[80px] " />
          <div>
            <div className="font-[600]">
              {data?.aspirantInstitute?.instituteName}
            </div>
            <div className="text-sm text-gray-600">{data?.aspirantInstitute?.address?.city}, {data?.aspirantInstitute?.address?.state}</div>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="px-3 py-1 font-open text-sm text-primary border-primary border-[2px] rounded-xl" onClick={()=>navigate(`/inbox?chat=${data?.aspirantInstitute?._id}`)}>
            Send Message
          </button>
          <button onClick={()=>navigate(`/institute/${data?.aspirantInstitute?.username}`)} className="px-3 py-1 font-open text-sm text-white bg-primary border-[2px] rounded-xl">
            View Profile
          </button>
        </div>
      </div>
    </div>
    <div className="mt-7">
        <InputField value={data?.note} area={true} disabled={true} label="Note"/>
    </div>
    <div className="mt-6 flex gap-6 justify-end items-center">
        <button className="px-5 py-2 border-[1px] border-primary text-primary rounded-md" onClick={()=>changeStatus('cancelled')}>Reject</button>
        <button className="px-5 py-2 bg-primary text-white rounded-md" onClick={()=>changeStatus('accepted')}>Accept</button>
    </div>
  </>
  )
}

export default AcceptAndReview