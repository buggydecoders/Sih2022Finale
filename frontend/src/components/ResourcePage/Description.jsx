import React from "react";

function Description({ description, descriptionImage }) {
  return (
    <div className="flex justify-between w-full px-10 my-10 space-x-14">
      <div className="w-1/3 flex flex-col space-y-3">
        <h2 className="font-bold text-xl">Description</h2>
        <p className="text-gray-400">{description}</p>
        <p className="text-gray-400">{description}</p>
      </div>
      <div className="w-2/3">
        <img src={descriptionImage} className="max-h-[30rem] object-cover min-w-full" alt="" />
      </div>
    </div>
  );
}

export default Description;
