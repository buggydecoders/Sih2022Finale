import React from "react";
import Button from "../Button";

function ResourceOverview({ resource }) {
  return (
    <div className="flex flex-col w-full my-4">
      <div className="flex w-full">
        <div className="w-1/2 flex items-center">
          <div className="grid grid-rows-5 items-center justify-center space-y-4 w-1/4">
            {resource.images?.map((image, idx) => {
              if (idx > 0) {
                return <img className="h-20 w-20" src={image} alt="" />;
              }
            })}
          </div>

          <div className="w-3/4 p-4">
            <img className="w-full" src={resource.images[0]} alt="" />
          </div>
        </div>

        <div className="flex flex-col space-y-14 w-1/2 p-4">
          <div className="flex justify-between">
            <div className="flex- flex-col">
              <h1 className="text-4xl font-semibold">{resource.name}</h1>
              <p className="text-gray-500 text-md">{resource.type}</p>
              <div className="flex space-x-4 py-2">
                {resource.tags.map((tag, index) => {
                  return (
                    <div className="px-4 py-1 rounded-lg bg-gray-200 text-sm">
                      {tag}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col space-y-4">
              <Button variant="filled">Request</Button>
              <Button variant="outlined">Enquiry</Button>
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <p className="">
              <span className="font-semibold">Duration: </span>
              {resource.duration} Days
            </p>
            <p className="">
              <span className="font-semibold">Collage: </span>
              {resource.duration} Days
            </p>
            <p className="text-gray-400 py-4 px-2">
              <span className="font-semibold text-2xl text-primary">
                {resource.price}
              </span>
              /days
            </p>
            <p className="">
              <span className="font-semibold">Breif: </span>{" "}
              <p className="text-gray-400">{resource.breif}</p>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResourceOverview;
