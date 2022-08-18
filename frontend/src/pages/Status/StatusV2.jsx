import React, { useState } from "react";
import Layout from "../../components/Layout";
import { MdSearch } from "react-icons/md";
import Logo from "../../assets/DAVV_LOGO.png";
import { RESOURCE_FALLBACK_IMG } from "../../utils/fallbackImages";
import {IoIosArrowForward} from 'react-icons/io';
import ManageRequestDrawer from "../../components/ManageRequest/ManageRequestDrawer";
const StatusV2 = () => {
  const Tab = ({ title, selected, setSelected, count, id }) => {
    return (
      <div
        className={`${
          selected ? "bg-primary text-white" : "text-gray-700"
        } px-5 py-3 text-sm rounded-3xl bg-gray-100 hover:bg-primary transition-all flex gap-4 cursor-pointer items-center  hover:text-white`}
      >
        <div className="font-[600]">{title}</div>
        <div className="font-[500]">{count}</div>
      </div>
    );
  };

  const RequestCard = () => {
    const [isOpen,setIsOpen] =useState(false);
    return (
      <>
      <tr onClick={()=>setIsOpen(true)} class="border-b-[1px] hover:bg-lightGray transition-all duration-300 cursor-pointer  dark:border-gray-100">
        <th
          scope="row"
          class="py-5 px-6 font-medium text-gray-900 whitespace-nowrap "
        >
          
          <div className="flex gap-2 items-center">
            <img src={Logo} className='w-[40px] h-[40px] rounded-full'/>
            <div className="">Institute of Engineering & Technology, DAVV</div>
          </div>
        </th>
        <th
          scope="row"
          class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
        >
          <div className="flex gap-2 items-center">
            <img src={RESOURCE_FALLBACK_IMG} className='w-[40px] h-[40px] rounded-xl'/>
            <div className="font-open ">Meths Lab</div>
          </div>
        </th>
        <td class="py-4 px-6 font-open">
        13 July 2022 - 14 July 2022
        </td>
        <td class="py-4 px-6">
          <div className="font-open text-green-500 font-[700] underline rounded-xl px-3 py-1">Done</div>
        </td>
        <td class="py-4 px-3 font-open">13 July 2022</td>
        <td class="py-4 px-3 text-gray-700 font-open"><IoIosArrowForward size={28}/></td>
      </tr>
      <ManageRequestDrawer isOpen={isOpen} setIsOpen={setIsOpen}/>
      </>
    );
  };

  return (
    <Layout>
      <div className="bg-lightGray py-10 p-16 font-open">
        <div className="">
          <div className="font-[700] text-3xl">Request Status</div>
          <div className="text-base mt-2 font-open text-gray-700">
            Manage and review requests, sent or recieved
          </div>
        </div>
        <div className="mt-7 bg-white rounded-sm p-6">
          <div className="justify-between flex items-center">
            <div className="flex gap-3 items-center">
              <Tab title="Recieved" count={1} />
              <Tab title="Sent" count={13} />
              <Tab title="Rejected" count={20} />
              <Tab title="Cancelled" count={0} />
            </div>
            <div className="font-open">
              <select className="outline-none">
                <option value="">Last 60 Days</option>
                <option value="">Last 120 Days</option>
                <option value="">Last 3 months</option>
              </select>
            </div>
          </div>
          <div className="mt-7 w-full relative flex items-center ">
            <MdSearch className="absolute left-3 text-gray-400" size={22} />
            <input
              className="bg-lightGray w-full py-4 pl-10 font-open outline-none"
              placeholder="Search Request"
            />
          </div>

          <div className="mt-7 overflow-x-auto w-full">
            <table class="w-full text-left text-black">
              <thead class=" text-gray-700 ">
                <tr className="border-b-[1px] ">
                  <th scope="col" class="py-4 pb-4 px-6">
                    Institute
                  </th>
                  <th scope="col" class="py-4 pb-4 px-6">
                    Resource
                  </th>
                  <th scope="col" class="py-4 pb-4 px-6">
                    Duration
                  </th>
                  <th scope="col" class="py-4 pb-4 px-6">
                    Status
                  </th>
                  <th scope="col" class="py-4 pb-4 px-6">
                    Requested Date
                  </th>
                </tr>
                <tr></tr>
              </thead>
              <tbody>
                <RequestCard/>
                <RequestCard/>
                <RequestCard/>
                <RequestCard/>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StatusV2;
