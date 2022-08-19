import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import { BsClockHistory } from "react-icons/bs";
import { BiBadgeCheck } from "react-icons/bi";

function ResourceOverview({ resource }) {
  const [active, setActive] = useState(0);
  const navigate = useNavigate()

  return (
    <div className="flex flex-col w-full my-4">
      <div className="flex w-full">
        <div className="w-1/2 flex items-center">
          <div className="grid grid-rows-5 items-center justify-center space-y-4 w-1/4">
            {resource?.images?.length && resource?.images?.map((image, idx) => {
              return (
                <img
                  className="h-20 w-20 object-cover cursor-pointer"
                  src={image?.url}
                  alt=""
                  onClick={() => {
                    setActive(idx);
                  }}
                />
              );
            })}
          </div>

          <div className="p-4">
            <img className="w-92 h-92 object-cover" src={resource?.images?.length && resource?.images[active]?.url} alt="" />
          </div>
        </div>

        <div className="flex flex-col space-y-14 w-1/2 p-4">
          <div className="flex justify-between">
            <div className="flex- flex-col">
              <h1 className="text-4xl font-semibold">{resource?.name}</h1>
              <p className="text-gray-500 text-md">{resource?.category}</p>
              {/* <div className="flex space-x-4 py-2">
                {resource.tags.map((tag, index) => {
                  return (
                    <div className="px-4 py-1 rounded-lg bg-gray-200 text-sm">
                      {tag}
                    </div>
                  );
                })}
              </div> */}
            </div>
            <div className="flex flex-col space-y-4">
              <Button variant="outlined" onClick={() => navigate(`/inbox?chat=${resource?.instituteId._id}`)}  >Send Enquiry</Button>
              <Button variant="filled" onClick={() => navigate(`/send-request/${resource?._id}`)}>Send Request</Button>
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <p className="">
              <span className="font-semibold">Duration: </span>
              <div className="mt-3 flex gap-10">
                <div className="flex gap-2 items-center text-sm">
                  <BsClockHistory /> {resource?.durationFrom || "N/A"}
                </div>
                <div className="flex gap-2 items-center text-sm">
                  <BsClockHistory /> {resource?.durationTo || "N/A"}
                </div>
              </div>
            </p>
            <p className="">
              <span className="font-semibold">Collage: </span>
              {/* {resource.duration} Days */}
            </p>
            <p className="text-gray-400 py-4 px-2">
              <span className="font-semibold text-2xl text-primary">
                {resource?.price}
              </span>
              /days
            </p>
            <p className="">
              <span className="font-semibold">Breif: </span>{" "}
              <p className="text-gray-400">{resource?.description}</p>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResourceOverview;
