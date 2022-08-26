import React from "react";
import { Link } from "react-router-dom";
import InputField from "../InputField";

const ExchangePage = ({data}) => {
  const isNotOneTime = data.accessType!=='one-time' || data.resource.category!=='virtual';
  return (
    <div className="py-3">
      <div className="text-2xl font-semibold">Request Active</div>
      <div className="text-green-500 text-sm font-[600]">
       
      </div>
      <div className="mt-8 grid grid-cols-4 bg-white px-6 shadow-md py-4 rounded-md">
        {isNotOneTime&&<div className="">
          <div className="font-[700] text-sm text-gray-500">From</div>
          <div className="font-semibold ">{data?.startDate}</div>
        </div>}
        {isNotOneTime&&<div className="">
          <div className="font-[700] text-sm text-gray-500">To</div>
          <div className="font-semibold ">{data?.endDate}</div>
        </div>}
        {!isNotOneTime&&<div className="">
          <div className="font-[700] text-sm text-gray-500">Access Type</div>
          <div className="font-semibold ">One Time</div>
        </div>}

        <div className="">
          <div className="font-[700] text-sm text-gray-500">Status</div>
          <div className="font-semibold text-green-500">{data?.status}</div>
        </div>
        <div className="">
          <div className="font-[700] text-sm text-gray-500">
            Reputation Points
          </div>
          <div className="font-semibold">4.5</div>
        </div>
      </div>
      <div className="mt-14">
        <div className=""><span className="font-semibold">Token ID : </span>{data?.tokenId}</div>
        <div className=""><span className="font-semibold">Token URI : </span>{data?.tokenURI}</div>
        <div className=""><span className="font-semibold">Access Link : </span>{<Link to={`/viewer/${data?.accessToken}`}>Viewer</Link>}</div>
      </div>
      <div className="mt-10">
        <div className="text-lg font-[600]">Add Comment</div>
        <hr className="my-5" />
        {/* <div className='grid grid-cols-[1fr_2fr]'>
        <InputField area={true} label='Comment'/>
      </div> */}
      </div>
    </div>
  );
};

export default ExchangePage;
