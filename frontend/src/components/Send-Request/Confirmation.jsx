import React from "react";
import { MdPendingActions, MdOutlineCancel } from "react-icons/md";
import { CgSmileSad } from "react-icons/cg";
import { ProductItem } from "../../pages/SavedItems";
import UniLogo from "../../assets/DAVV_LOGO.png";
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

const Pending = () => {
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
        Meanwhile, Learn more about the IET, DAVV
      </div>
      <div className="flex items-center justify-between mt-7">
        <div className="flex gap-5 items-center">
          <img src={UniLogo} className="w-[120px]" />
          <div className="">
            <div className="text-lg font-[600]">
              Institute of Engineering & Tech. DAVV
            </div>
            <div className="mt-1 text-gray-500 font-[500] text-sm">
              Indore, India
            </div>
          </div>
        </div>
        <div className="flex gap-5">
          <button className="w-fit py-2 px-3 border-[1px] border-primary rounded-md bg-primary text-white">
            Send Message
          </button>
          <button className="w-fit py-2 px-3 border-[1px] border-primary rounded-md text-primary">
            Profile
          </button>
        </div>
      </div>
      <div className="mt-5 font-[600]">Contact Information : </div>
      <div className="space-y-1 mt-3">
        <div className="text-sm">
          <span className="font-[600]">Phone : </span> +91 7049930190
        </div>
        <div className="text-sm">
          <span className="font-[600]">Email : </span> ietdavv@edu.co.in
        </div>
      </div>
    </div>
  );
};



const Confirmation = () => {
  return (
    <div className="">
      {/* <Pending /> */}
      {/* <Cancelled/> */}
    </div>
  );
};

export default Confirmation;
