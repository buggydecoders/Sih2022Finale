import React from "react";

function ResourceCard(props) {
  const { image, name, price, university } = props.data;
  return (
    <div className="bg-white border border-black flex- flex-col px-4 py-2 m-5">
      <img src={image} alt={name} className="" />
      <div className="my-2">
        <p className="text-black font-medium">{name}</p>
        <p className="text-gray-500 text-xs">{university}</p>
        <p className="text-primary font-semibold">
          {price} <span className="text-gray-500 font-light">/day</span>
        </p>
      </div>
      <button className="bg-secondary text-white w-full py-1 my-1 rounded">
        Edit Resource
      </button>
    </div>
  );
}

export default ResourceCard;
