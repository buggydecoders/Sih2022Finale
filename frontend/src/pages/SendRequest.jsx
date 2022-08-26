  import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import BasicInfoForm from "../components/Send-Request/BasicInfoForm";
import Confirmation from "../components/Send-Request/Confirmation";
import ExchangePage from "../components/Send-Request/ExchangePage";
import Payment from "../components/Send-Request/Payment";
import PaymentInfo from "../components/Send-Request/PaymentInfo";
import Progress from "../components/Send-Request/Progress";
import ResourceCard from "../components/Send-Request/ResourceCard";
import SignContract from "../components/Send-Request/SignContract";
import { checkRequestExists } from "../store/requests/actions";
import { fetchSingleResource } from "../store/resources/actions";
import { toast } from "react-toastify";
import moment from "moment";
import WaitSvg from "../assets/illustrations/wait.svg";
import RequestSuccess from "../components/Send-Request/RequestSuccess";
const SendRequest = () => {

  //getting data from the redux state
  const { loading: resourceLoading, resource } = useSelector(
    (state) => state.resources
  );

  const { loading: requestLoading } = useSelector((state) => state.requests);


  const navigate = useNavigate();
  const { id: resourceId } = useParams();
  const dispatch = useDispatch();

  //local state
  const [pageLoad, setPageLoad] = useState(false);
  const [isVacant, setIsVacant] = useState(true);
  const [requestSuccess,setRequestSuccess] = useState(false);

  useEffect(() => {
    setPageLoad(true);
    const existsCallback = (data) => {
      navigate(`/status/${data.request._id}`);
      toast(
        "Request already exists! You cannot put another request until that one is completed."
      );
    };
    const resourceSuccessCallback = (data) => {
      if (data.category==='virtual') return setPageLoad(false);
      setIsVacant(
        moment().isBetween(moment(data.durationFrom), moment(data.durationTo))
      );
      setPageLoad(false);
    };
    const resourceErrorCallback=(err)=>{
      console.log(err);
      navigate('/not-found', {replace : false})
    }
    dispatch(fetchSingleResource(resourceId, resourceSuccessCallback,resourceErrorCallback));
    dispatch(checkRequestExists(resourceId, existsCallback));
  }, []);


  if (!isVacant && !resourceLoading && !(requestLoading==="CHECK_REQ") && !pageLoad)
    return (
      <Layout>
        <div className="flex flex-col items-center min-h-[70vh] justify-center">
          <div>
            <img src={WaitSvg} className="w-[500px]" />
          </div>
          <div className="mt-5 text-lg font-[600] w-[40%] text-center mx-auto">
            :( Oops! The resource you're looking for is not vacant. You can text
            the insitute for further updates.
          </div>
          <div className="flex gap-4">
            <button
              onClick={() =>
                navigate(`/inbox?chat=${resource?.instituteId?._id}`)
              }
              className="text-sm font-open font-[600] text-white rounded-md border-[1px] border-primary  mt-4 py-2 px-3  bg-primary"
            >
              Send Message
            </button>
            <button
              onClick={() =>
                toast("You will be notified once the resource is available")
              }
              className="text-sm font-open font-[600] text-primary rounded-md  mt-4 py-2 px-3 border-[1px] border-primary"
            >
              Subscribe Notification
            </button>
          </div>
        </div>
      </Layout>
    );

  return (
    <Layout>
      {(requestLoading==="CHECK_REQ") || resourceLoading || pageLoad ? (
        <div>Loading...</div>
      ) : requestSuccess?<RequestSuccess successId={requestSuccess}/>:(
        <div className="py-16 px-10 bg-lightGray">
          <div className="text-4xl font-bold">Send Request</div>
          <div className="mt-2 text-gray-400">
            Your resource is just a few clicks away.{" "}
          </div>
          <div className="mt-8 grid grid-cols-[2.3fr_1fr] gap-5">
            <div className="">
              <BasicInfoForm success={requestSuccess} setSuccess={setRequestSuccess} resource={resource} />
              {/* <ExchangePage/> */}

            </div>
            <ResourceCard data={resource} />
            {/* <PaymentInfo/> */}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default SendRequest;
