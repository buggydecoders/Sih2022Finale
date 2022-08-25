import React, { useEffect, useState } from "react";
import { GrDown } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchContracts } from "../../store/contracts/actions";
import { editRequest } from "../../store/requests/actions";
import InputField from "../InputField";

const ContractCard = ({ selected, setSelected, data }) => {
  const isSelected = data?._id === selected;

  return (
    <div>
      <div
        onClick={() => setSelected(data?._id)}
        className={`${isSelected
            ? "bg-secondary text-white"
            : "hover:bg-secondary  hover:bg-opacity-10"
          } px-5 flex cursor-pointer justify-between items-center w-full rounded-md font-open py-3 transition-all bg-lightGray`}
      >
        <div>
          <div
            className={`${isSelected ? "text-gray-200" : "text-gray-400"
              } text-xs `}
          >
            {data?.createdAt}
          </div>
          <div className="font-[600]">{data?.title}</div>
        </div>
        <div>
          <GrDown />
        </div>
      </div>
      {isSelected && (
        <div className="bg-lightgray">
          <InputField value={data?.terms} disabled={true} area={true} rows={10} />
        </div>
      )}
    </div>
  );
};

const AddContract = ({ data }) => {
  const [selected, setSelected] = useState(null);
  const dispatch = useDispatch();
  const { loading: contractLoading, contracts } = useSelector(state => state.contracts)
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchContracts(1, 10));
  }, [])

  console.log(data._id)

  const handleSend = () => {
    if (!selected) return toast('Please select a contract before continuing!');
    const successCallback = () => toast('Request has been updated to await-signature')
    dispatch(editRequest(data?._id, { contract: selected, status: 'await-sign' }, successCallback));
  }

  return (
    <div className="mt-6 w-full">
      <div className="text-base font-semibold">Add Contract</div>
      <div className="text-xs text-secondary underline font-[500]" onClick={() => navigate('/contracts')}>Add New</div>
      <div className="mt-5 w-full ">
        <div className="space-y-3">
          {contractLoading ? <div>Loading...</div> : contracts?.length === 0 ? <div>No Contracts were found, Please create one</div> : contracts?.map(c => <ContractCard data={c} selected={selected} setSelected={setSelected} />)}
        </div>
      </div>
      <div className="mt-5 flex justify-end items-center gap-5">
        <button className="py-2 px-5 border-b-[1px] text-red-600 border-red-600 font-[500]">Cancel Request</button>
        <button disba className=" bg-secondary text-white px-5 py-2 rounded-md" onClick={handleSend}>Send Contract</button>
      </div>
    </div>
  );
};

export default AddContract;
