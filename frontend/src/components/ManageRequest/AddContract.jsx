import React, { useState } from "react";
import { GrDown } from "react-icons/gr";
import InputField from "../InputField";

const ContractCard = ({ selected, setSelected, id }) => {
  const isSelected = id === selected;

  return (
    <div>
      <div
        onClick={() => setSelected(id)}
        className={`${
          isSelected
            ? "bg-secondary text-white"
            : "hover:bg-secondary  hover:bg-opacity-10"
        } px-5 flex cursor-pointer justify-between items-center w-full rounded-md font-open py-3 transition-all bg-lightGray`}
      >
        <div>
          <div
            className={`${
              isSelected ? "text-gray-200" : "text-gray-400"
            } text-xs `}
          >
            12 Januray 2022
          </div>
          <div className="font-[600]">Virtual Resource Contract</div>
        </div>
        <div>
          <GrDown />
        </div>
      </div>
      {isSelected && (
        <div className="bg-lightgray">
          <InputField value='These are contract terms...' disabled={true} area={true} rows={10} />
        </div>
      )}
    </div>
  );
};

const AddContract = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="mt-6 w-full">
      <div className="text-base font-semibold">Add Contract</div>
      <div className="text-xs text-secondary underline font-[500]">Add New</div>
      <div className="mt-5 w-full ">
        <div className="space-y-3">
          <ContractCard selected={selected} setSelected={setSelected} id={1} />
          <ContractCard selected={selected} setSelected={setSelected} id={2} />
          <ContractCard selected={selected} setSelected={setSelected} id={3} />
        </div>
      </div>
      <div className="mt-5 flex justify-end items-center gap-5">
        <button className="py-2 px-5 border-b-[1px] text-red-600 border-red-600 font-[500]">Cancel Request</button>
        <button disba className=" bg-secondary text-white px-5 py-2 rounded-md">Send Contract</button>
      </div>
    </div>
  );
};

export default AddContract;
