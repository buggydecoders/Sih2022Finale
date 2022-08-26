import React, { useState } from "react";
import Logo from "../../assets/DAVV_LOGO.png";
import moment from 'moment'
import { MdPendingActions, MdOutlineCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { RESOURCE_FALLBACK_IMG } from "../../utils/fallbackImages";
import { BsPatchCheck } from "react-icons/bs";
import InputField from "../InputField";
import { useDispatch, useSelector } from "react-redux";
import { editRequest } from "../../store/requests/actions";
import { toast } from "react-toastify";

const Pending = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="border-[1px] bg-gray-500 bg-opacity-10 border-gray-200 rounded-md flex gap-5  px-5 py-3 items-center">
        <div className="w-[60px] flex items-center justify-center h-[60px] rounded-full bg-gray-400">
          <MdPendingActions size={30} className="text-white" />
        </div>
        <div>
          <div className="text-xl font-[600]">
            Awating Contract Confirmation
          </div>
          <div className="text-sm text-gray-600">
            Lending Insitute is evaluating your request, hold on tight!
          </div>
        </div>
      </div>
      <div className="mt-8">
      <div className="text-base font-[600]">Resource Details</div>
      <div className="justify-between flex items-center">
        <div className="flex items-center gap-3 mt-4">
          <img
            src={data?.resource?.images[0].url}
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
      <div className="mt-8 font-semibold">
        Meanwhile, Learn more about the{" "}
        <span className="text-primary ml-2 font-semibold">{data?.aspirantInstitute?.instituteName}</span>
      </div>
      <div className="flex  flex-row justify-between items-center mt-7">
        <div className="flex gap-5 items-center">
          <img src={data?.aspirantInstitute?.logo} className="w-[90px] h-[90px]" />
          <div className="">
            <div className="text-lg font-[600]">
              {data?.aspirantInstitute?.instituteName}
            </div>
            <div className="mt-1 text-gray-500 font-[500] text-sm">
              {data?.aspirantInstitute?.address?.city}, {data?.aspirantInstitute?.address?.state}
            </div>
          </div>
        </div>
        <div className="flex gap-5">
          <button onClick={() => navigate(`/inbox?chat=${data?.aspirantInstitute?._id}`)} className="w-fit py-2 text-xs px-2 border-[1px] border-primary rounded-md bg-primary text-white">
            Send Message
          </button>
          <button className="w-fit py-2 text-xs px-2  border-[1px] border-primary rounded-md text-primary">
            Profile
          </button>
        </div>
      </div>
      <div className="mt-7 font-[600]">Contact Information : </div>
      <div className="mt-3 flex gap-6 items-center ">
        <div className="text-sm">
          <span className="font-[600]">Phone : </span>{" "}
          {data?.lendingInstitute?.phone || "Not Found"}
        </div>
        <div className="text-sm">
          <span className="font-[600]">Email : </span>{" "}
          {data?.lendingInstitute?.email || "Not Found"}
        </div>
      </div>
      <div className="mt-7">
        <div className="mt-4 font-[600]">Contact Person : </div>
        {data?.aspirantInstitute?.contractPerson?.name ? <div className="flex mt-5 justify-between items-center">
          <div className="flex items-center gap-4">
            <img
              src={
                data?.aspirantInstitute?.contactPerson?.image ||
                RESOURCE_FALLBACK_IMG
              }
              className="rounded-full w-[60px] h-[60px]"
            />
            <div className="font-open">
              <div className="font-[500]">
                {data?.aspirantInstitute?.contactPerson?.name}
              </div>
              <div className="text-xs text-gray-600">
                {data?.aspirantInstitute?.contactPerson?.position}
              </div>
            </div>
          </div>
          <div className="flex gap-5 items-center">
            <div className="text-sm">
              <span className="font-[600]">Phone : </span>{" "}
              {data?.aspirantInstitute?.contactPerson?.phone || "Not Found"}
            </div>
            <div className="text-sm">
              <span className="font-[600]">Email : </span>{" "}
              {data?.aspirantInstitute?.contactPerson?.email || "Not Found"}
            </div>
          </div>
        </div> : <div className="text-red-600 mt-4">Unassigned</div>}
      </div>
      <div className="mt-12 flex justify-end">
        <button className="px-7 border-b-[2px] border-b-red-500 text-center text-red-500">Cancel Request</button>
      </div>
    </div>
  );
};


const Confirmed = ({ data }) => {
  const navigate = useNavigate();
  const { loading } = useSelector(state => state.requests);
  const dispatch = useDispatch();

  const handleUpdateSuccess = () => toast(`Canceled Request`);
  const handleUpdateError = () => toast(`Some Error Occured`);
  const handleCancel = () => {
    dispatch(editRequest(data._id, { status: "cancelled" }, handleUpdateSuccess, handleUpdateError));
  }

  return (
    <>
      <div className="border-[1px] bg-green-500 bg-opacity-10 border-green-200 rounded-md flex gap-5  px-5 py-3 items-center">
        <div className="w-[60px] flex items-center justify-center h-[60px] rounded-full bg-green-400">
          <BsPatchCheck size={30} className="text-white" />
        </div>
        <div>
          <div className="text-xl font-[600]">Signed</div>
          <div className="text-sm text-gray-600">
            Wohoo! Your resource has been accepted, wait for the signup the
            contract!
          </div>
        </div>
      </div>
      <div className="flex  flex-row justify-between items-center mt-7">
        <div className="flex gap-5 items-center">
          <img src={data?.aspirantInstitute?.logo} className="w-[90px] rounded-full h-[90px]" />
          <div className="">
            <div className="text-lg font-[600]">
              {data?.aspirantInstitute?.instituteName}
            </div>
            <div className="mt-1 text-gray-500 font-[500] text-sm ">
              {data?.aspirantInstitute?.address?.city}, {data?.aspirantInstitute?.address?.state}
            </div>
          </div>
        </div>
        <div className="flex gap-5">
          <button onClick={() => navigate(`/inbox?chat=${data?.aspirantInstitute?._id}`)} className="w-fit py-2 text-xs px-2 border-[1px] border-primary rounded-md bg-primary text-white">
            Send Message
          </button>
          <button  onClick={()=>navigate(`/institute/${data?.aspirantInstitute?.username}`)} className="w-fit py-2 text-xs px-2  border-[1px] border-primary rounded-md text-primary">
            Profile
          </button>
        </div>
      </div>
      <div className="mt-5">
        {/* <div className="font-[600] font-open">Update Status</div>
        <div className="mt-3 w-full flex items-center gap-4">
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full py-3 px-2 border-secondary border-[1px] rounded-md outline-none">
            <option defaultChecked disabled={true} value="#">Select Status</option>
            <option value="confirmed">Confimed</option>
            <option value="cancelled">Cancelled</option>
            <option value="completed">Completed</option>
          </select>
          <div className="bg-secondary text-white px-6 py-3 rounded-md" onClick={handleUpdate}>{loading ? 'Loading...' : 'Update'}</div>
        </div> */}
        <div className="bg-primary text-center cursor-pointer text-white w-full rounded-lg py-2" onClick={handleCancel}>Cancelled</div>
      </div>
      <div className="mt-6 font-open font-[600]">
        <div className="">Add Comment</div>
        <InputField area={true} />
      </div>
    </>
  )
}

const Approved = ({ data }) => {
  const navigate = useNavigate();
  const { loading } = useSelector(state => state.requests);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("cancelled");
  console.log(status)
  const handleUpdateSuccess = () => toast(`${status} Request`);
  const handleUpdateError = () => toast(`Some Error Occured`);
  const handleUpdate = () => {
    dispatch(editRequest(data._id, { status: status }, handleUpdateSuccess, handleUpdateError));
  }

  return (
    <>
    
      <div className="border-[1px] bg-green-500 bg-opacity-10 border-green-200 rounded-md flex gap-5  px-5 py-3 items-center">
        <div className="w-[60px] flex items-center justify-center h-[60px] rounded-full bg-green-400">
          <BsPatchCheck size={30} className="text-white" />
        </div>
        <div>
          <div className="text-xl font-[600]">Signed</div>
          <div className="text-sm text-gray-600">
            Wohoo! Your resource has been accepted, wait for the signup the
            contract!
          </div>
        </div>
      </div>
      <div className="flex  flex-row justify-between items-center mt-7">
        <div className="flex gap-5 items-center">
          <img src={data?.aspirantInstitute?.logo} className="w-[90px] rounded-full h-[90px]" />
          <div className="">
            <div className="text-lg font-[600]">
              {data?.aspirantInstitute?.instituteName}
            </div>
            <div className="mt-1 text-gray-500 font-[500] text-sm ">
              {data?.aspirantInstitute?.address?.city}, {data?.aspirantInstitute?.address?.state}
            </div>
          </div>
        </div>
        <div className="flex gap-5">
          <button onClick={() => navigate(`/inbox?chat=${data?.aspirantInstitute?._id}`)} className="w-fit py-2 text-xs px-2 border-[1px] border-primary rounded-md bg-primary text-white">
            Send Message
          </button>
          <button  onClick={()=>navigate(`/institute/${data?.aspirantInstitute?.username}`)} className="w-fit py-2 text-xs px-2  border-[1px] border-primary rounded-md text-primary">
            Profile
          </button>
        </div>
      </div>
      <div className="mt-5">
        <div className="font-[600] font-open">Update Status</div>
        <div className="mt-3 w-full flex items-center gap-4">
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full py-3 px-2 border-secondary border-[1px] rounded-md outline-none">
            <option defaultChecked disabled={true} value="#">Select Status</option>
            <option value="cancelled">Cancelled</option>
            <option value="completed">Completed</option>
          </select>
          <div className="bg-secondary cursor-pointer text-white px-6 py-3 rounded-md" onClick={handleUpdate}>{loading ? 'Loading...' : 'Update'}</div>
        </div>
      </div>
      <div className="mt-6 font-open font-[600]">
        <div className="">Add Comment</div>
        <InputField area={true} />
      </div>
    </>
  )
}

const Completed = ({ data }) => {
  const navigate = useNavigate();
  return (<>
    <div className="border-[1px] bg-green-600 bg-opacity-10 border-green-200 rounded-md flex gap-5  px-5 py-3 items-center">
      <div className="w-[60px] flex items-center justify-center h-[60px] rounded-full bg-green-600">
        <BsPatchCheck size={30} className="text-white" />
      </div>
      <div>
        <div className="text-xl font-[600]">Completed</div>
        <div className="text-sm text-gray-600">
          Request completed! Don't forget to give your fellow HEI a nice feedback :)
        </div>
      </div>
    </div>
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
    <div className="flex  flex-row justify-between items-center mt-7">
      <div className="flex gap-5 items-center">
        <img src={data?.aspirantInstitute?.logo} className="w-[90px] rounded-full h-[90px]" />
        <div className="">
          <div className="text-lg font-[600]">
            {data?.aspirantInstitute?.instituteName}
          </div>
          <div className="mt-1 text-gray-500 font-[500] text-sm ">
            {data?.aspirantInstitute?.address?.city}, {data?.aspirantInstitute?.address?.state}
          </div>
        </div>
      </div>
      <div className="flex gap-5">
        <button onClick={() => navigate(`/inbox?chat=${data?.aspirantInstitute?._id}`)} className="w-fit py-2 text-xs px-2 border-[1px] border-primary rounded-md bg-primary text-white">
          Send Message
        </button>
        <button  onClick={()=>navigate(`/institute/${data?.aspirantInstitute?.username}`)} className="w-fit py-2 text-xs px-2  border-[1px] border-primary rounded-md text-primary">
          Profile
        </button>
      </div>
    </div>

    <div className="mt-6 font-open font-[600]">
      <div className="">Feedback</div>
      <InputField area={true} />
      <div className="mt-6 justify-end flex">
        <button className="px-4 py-2 bg-secondary rounded-md text-white">Add Feedback</button>
      </div>
    </div>
  </>)
}

const ProcessRequest = ({ data }) => {
  return (
    <div className="mt-7">
      {data?.status === 'await-sign' && <Pending data={data} />}
      {data?.status === 'signed' && <Confirmed data={data} />}
      {data?.status === 'approved' && <Approved data={data} />}
      {data?.status === 'completed' && <Completed data={data} />}
    </div>
  );
};

export default ProcessRequest;
