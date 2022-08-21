import React from "react";
import { MdPendingActions, MdOutlineCancel } from "react-icons/md";
import { CgSmileSad } from "react-icons/cg";
import { ProductItem } from "../../pages/SavedItems";
import UniLogo from "../../assets/DAVV_LOGO.png";
import { RESOURCE_FALLBACK_IMG } from "../../utils/fallbackImages";
import { useNavigate } from 'react-router-dom'

const Cancelled = () => {
  return (
    <div>
      <div className="border-[1px] bg-red-500 bg-opacity-10 border-gray-200 rounded-md flex gap-5  px-5 py-3 items-center">
        <div className="w-[60px] flex items-center justify-center h-[60px] rounded-full bg-red-400">
          <CgSmileSad size={30} className="text-white" />
        </div>
        <div>
          <div className="text-xl font-[600]">
            Your request was not accepeted!
          </div>
          <div className="text-sm text-gray-600">
            Don't worry you can request for this resource again once its
            available!
          </div>
        </div>
      </div>

      <div className="mt-7">
        <div className="text-lg font-semibold">Checkout similar resources</div>
        <div className="w-[70px] h-[2px] bg-black mt-1"></div>
        <div className="mt-8 grid grid-cols-4 gap-7">
          <ProductItem />
          <ProductItem />
        </div>
      </div>
    </div>
  );
};

const Pending = ({ data }) => {
  const navigate = useNavigate();
  console.log(data)
  return (
    <div>
      <div className="border-[1px] bg-gray-500 bg-opacity-10 border-gray-200 rounded-md flex gap-5  px-5 py-3 items-center">
        <div className="w-[60px] flex items-center justify-center h-[60px] rounded-full bg-gray-400">
          <MdPendingActions size={30} className="text-white" />
        </div>
        <div>
          <div className="text-xl font-[600]">Awating Confirmation</div>
          <div className="text-sm text-gray-600">
            Lending Insitute is evaluating your request, hold on tight!
          </div>
        </div>
      </div>
      <div className="mt-8 font-semibold">
        Meanwhile, Learn more about the <span className="text-primary ml-2 font-semibold">{data?.lendingInstitute?.instituteName}</span>
      </div>
      <div className="flex items-center justify-between mt-7">
        <div className="flex gap-5 items-center">
          <img src={data?.lendingInstitute?.logo} className="w-[120px]" />
          <div className="">
            <div className="text-lg font-[600]">
              {data?.lendingInstitute?.instituteName}
            </div>
            <div className="mt-1 text-gray-500 font-[500] text-sm">
              {data?.lendingInstitute?.address?.city} , {data?.lendingInstitute?.address?.state}
            </div>
          </div>
        </div>
        <div className="flex gap-5">
          <button onClick={() => navigate(`/inbox?chat=${data?.lendingInstitute?._id}`)} className="w-fit py-2 px-3 border-[1px] border-primary rounded-md bg-primary text-white">
            Send Message
          </button>
          <button className="w-fit py-2 px-3 border-[1px] border-primary rounded-md text-primary">
            Profile
          </button>
        </div>
      </div>
      <div className="mt-5 font-[600]">Contact Information : </div>
      <div className="mt-3 flex gap-6 items-center ">
        <div className="text-sm">
          <span className="font-[600]">Phone : </span> {data?.lendingInstitute?.phone || 'Not Found'}
        </div>
        <div className="text-sm">
          <span className="font-[600]">Email : </span> {data?.lendingInstitute?.email || 'Not Found'}
        </div>
      </div>
      <div className="mt-6">
        <div className="mt-4 font-[600]">Contact Person : </div>
        <div className="flex mt-5 justify-between items-center">
          <div className="flex items-center gap-4">
            <img src={data?.lendingInstitute?.contactPerson?.image || RESOURCE_FALLBACK_IMG} className='rounded-full w-[120px] h-[120px]' />
            <div className="font-open text-lg">
              <div className="font-[500]">{data?.lendingInstitute?.contactPerson?.name}</div>
              <div className="text-base text-gray-600">{data?.lendingInstitute?.contactPerson?.position}</div>
            </div>
          </div>
          <div className="flex gap-5 items-center">
            <div className="text-sm">
              <span className="font-[600]">Phone : </span> {data?.lendingInstitute?.contactPerson?.phone || 'Not Found'}
            </div>
            <div className="text-sm">
              <span className="font-[600]">Email : </span> {data?.lendingInstitute?.contactPerson?.email || 'Not Found'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



const Confirmation = ({ data, cancelled }) => {
  return (
    <div className="">
      {!cancelled ? <Pending data={data} /> : <Cancelled />}
    </div>
  );
};

export default Confirmation;
