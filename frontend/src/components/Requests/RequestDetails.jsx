import React from "react";
import ResourceImg from "../../assets/Resources/3dPrinter.png";
import { BiBadgeCheck } from "react-icons/bi";
import { useSelector } from "react-redux";
import moment from 'moment'
import { useNavigate } from "react-router-dom";

const RequestDetails = ({ selected }) => {
  const { requirements, loading } = useSelector(state => state.requirements)
  const data = requirements[selected]

  const navigate = useNavigate()
  return (
    <div className="bg-white shadow-md px-6 py-5">
      <div className="flex items-center gap-2">
        <div className="">
          {/* <img src={data?.aspirantInstitute?.logo} className="w-[90px] rounded-full" /> */}
        </div>
        <div className="font-semibold w-full text-black text-lg flex justify-between">
          <div>
            <div>{data?.name}</div>
            <div className="text-sm text-gray-400 font-[500]">{data?.name}</div>
          </div>
          <div className="text-sm text-gray-400">Posted {moment(data?.updatedAt).fromNow()}</div>
        </div>
      </div>
      <div className="mt-7">
        <div className="font-semibold">Request Overview</div>
        <div className="text-sm font-[500] text-gray-600 mt-3">
          {
            data?.description
          }
        </div>
        <div className="mt-7">
          <div className="font-semibold">Duration</div>
          <div className="flex gap-5 text-sm items-center mt-3 ">
            <div className="text-gray-500 font-[500]  flex">
              <span className="font-semibold text-black mr-2">From : </span> {data?.durationFrom}
            </div>
            <div className="text-gray-500 font-[500]">
              <span className="font-semibold text-black mr-2">To : </span> {data?.durationTo}
            </div>
          </div>
        </div>
        <div className="mt-7">
          <div className="font-semibold">Other Details</div>
          <div className="mt-3 text-sm flex items-start gap-20">
            <div>
              <div className="font-semibold">Budget</div>
              <div className="font-[500] mt-1">{data?.budget}</div>
            </div>
            <div>
              <div className="font-semibold">25 Successful Shares</div>
              <div className="flex items-center mt-1">
                <span className="text-blue-600">
                  <BiBadgeCheck />
                </span>
                <div className="text-gray-600 text-sm">
                  Verified University (4.5)
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <div className="font-semibold">University Details</div>
          <div className="flex justify-between mt-3 items-center">
            <div className="flex items-center gap-2">
              <div className="">
                <img src={data?.aspirantInstitute?.logo} className="w-[65px] rounded-full" />
              </div>
              <div className="font-semibold text-black">
                {data?.aspirantInstitute?.instituteName}
                <div className="text-sm text-gray-400">{data?.aspirantInstitute?.address?.city}, {data?.aspirantInstitute?.address?.state}</div>
              </div>

            </div>
            {/* <div className="text-sm">
              <div className="font-semibold">Reputation P.</div>
              <div className="text-gray-700">4.5</div>
            </div> */}
          </div>
        </div>
        <div className="mt-8 flex items-center font-[500] gap-8">
          <button className="px-12 text-white py-2 bg-primary border-[1px] rounded-md">Fullfil Request</button>
          <button className="px-12 py-2 border-primary text-primary border-[1px] rounded-md" onClick={() => navigate(`/inbox?chat=${data?.aspirantInstitute?._id}`)}>Message</button>
        </div>
      </div>
    </div>
  );
};

export default RequestDetails;
