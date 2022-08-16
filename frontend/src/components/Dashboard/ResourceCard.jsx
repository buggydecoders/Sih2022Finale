import React from "react";
import DummyResource from "../../assets/Resources/3dPrinter.png";
import { BsClockHistory } from "react-icons/bs";
import { BiBadgeCheck } from "react-icons/bi";
import Button from "../Button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { saveForLater } from "../../store/resources/actions";

const SaveButton = (id) => {
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();

  const handleSaveForLater = () => {
    setActive((prev) => !prev);
    dispatch(saveForLater(id));
  };

  return (
    <div
      onClick={() => handleSaveForLater()}
      className={`${
        active ? "bg-opacity-100" : " bg-opacity-5"
      } py-3 cursor-pointer relative rounded-md text-secondary bg-secondary group overflow-hidden`}
    >
      <div className="w-full top-0 left-0 z-[0] h-[400px] absolute bg-secondary ease-in-out -translate-x-[500px] group-hover:translate-x-0 transition-all duration-500"></div>
      <div
        className={`w-fit px-3 flex rounded-md relative z-[10] ${
          active ? "text-white" : "group-hover:text-white"
        } gap-4 duration-150 ease-in-out items-center `}
      >
        {active ? "Saved" : "Save for later"} <BiBadgeCheck />
      </div>
    </div>
  );
};

const ResourceCard = ({ data }) => {
  const {
    _id,
    category,
    conditions,
    createdAt,
    description,
    images,
    instituteId,
    isActive,
    isVacant,
    name,
    price,
    state,
    updatedAt,
    durationFrom,
    durationTo,
  } = data;

  return (
    <div className="bg-white w-full px-6 py-4 rounded-md">
      <div className="flex justify-between items-start">
        <div className="flex items-start gap-4">
          <div className="">
            <img alt="" src={images[0].url} className="w-[150px]"/>
          </div>
          <div className="">
            <div className="text-2xl font-bold text-gray-500">{name}</div>
            <div className="mt-2 text-gray-400">
              {instituteId.instituteName}
            </div>
            <div className="mt-3 flex gap-10">
              <div className="flex gap-2 items-center text-sm">
                <BsClockHistory /> {durationFrom}
              </div>
              <div className="flex gap-2 items-center text-sm">
                <BsClockHistory /> {durationTo}
              </div>
            </div>
          </div>
        </div>

        <div className="shrink-0">
          <SaveButton id={_id} />
        </div>
      </div>
      <div className="mt-3 text-sm text-gray-400">{description}</div>
      <hr className="my-3" />
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-6 text-lg">
          <div className="font-[500]">
            <span className="mr-1 text-secondary">₹</span>
            {price}
            <span className="ml-2 text-sm text-gray-400">/Day</span>
          </div>
          <div className="flex gap-1"></div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outlined">Send Enquiry</Button>
          <Button variant="filled">Send Enquiry</Button>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;
