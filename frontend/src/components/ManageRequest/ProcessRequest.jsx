import React from "react";
import Logo from "../../assets/DAVV_LOGO.png";

import { MdPendingActions, MdOutlineCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { RESOURCE_FALLBACK_IMG } from "../../utils/fallbackImages";
import { BsPatchCheck } from "react-icons/bs";
import InputField from "../InputField";

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
      <div className="mt-8 font-semibold">
        Meanwhile, Learn more about the{" "}
        <span className="text-primary ml-2 font-semibold">IET DAVV</span>
      </div>
      <div className="flex  flex-row justify-between items-center mt-7">
        <div className="flex gap-5 items-center">
          <img src={Logo} className="w-[90px] h-[90px]" />
          <div className="">
            <div className="text-lg font-[600]">
              Institute of Engineering & Technology, DAVV
            </div>
            <div className="mt-1 text-gray-500 font-[500] text-sm">
              Indore, Madhya Pradesh
            </div>
          </div>
        </div>
        <div className="flex gap-5">
            <button onClick={()=>navigate(`/inbox?chat=${data?.lendingInstitute?._id}`)} className="w-fit py-2 text-xs px-2 border-[1px] border-primary rounded-md bg-primary text-white">
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
        <div className="flex mt-5 justify-between items-center">
          <div className="flex items-center gap-4">
            <img
              src={
                data?.lendingInstitute?.contactPerson?.image ||
                RESOURCE_FALLBACK_IMG
              }
              className="rounded-full w-[60px] h-[60px]"
            />
            <div className="font-open">
              <div className="font-[500]">
                Vaibhav Jain
              </div>
              <div className="text-xs text-gray-600">
                Faculty of DAVV
              </div>
            </div>
          </div>
          <div className="flex gap-5 items-center">
            <div className="text-sm">
              <span className="font-[600]">Phone : </span>{" "}
              {data?.lendingInstitute?.contactPerson?.phone || "Not Found"}
            </div>
            <div className="text-sm">
              <span className="font-[600]">Email : </span>{" "}
              {data?.lendingInstitute?.contactPerson?.email || "Not Found"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const Confirmed = ()=>{
    return (
        <>
         <div className="border-[1px] bg-green-500 bg-opacity-10 border-green-200 rounded-md flex gap-5  px-5 py-3 items-center">
        <div className="w-[60px] flex items-center justify-center h-[60px] rounded-full bg-green-400">
          <BsPatchCheck size={30} className="text-white" />
        </div>
        <div>
          <div className="text-xl font-[600]">Signed & Paid!</div>
          <div className="text-sm text-gray-600">
            Wohoo! Your resource has been accepted, wait for the signup the
            contract!
          </div>
        </div>
      </div>
      <div className="mt-5">
        <div className="font-[600] font-open">Update Status</div>
        <div className="mt-3 w-full">
            <select className="w-full py-3 px-2 border-secondary border-[2px] rounded-md outline-none">
            <option defaultChecked disabled={true} value="#">Select Status</option>
                <option value="">Confimed</option>
                <option value="">Cancelled</option>
            </select>
        </div>
      </div>
      <div className="mt-6 font-open font-[600]">
        <div className="">Add Comment</div>
        <InputField area={true}/>
      </div>
        </>
    )
}

const ProcessRequest = () => {
  return (
    <div className="mt-7">
      <Confirmed />
    </div>
  );
};

export default ProcessRequest;
