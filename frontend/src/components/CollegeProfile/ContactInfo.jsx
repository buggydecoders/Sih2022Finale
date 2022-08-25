import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const POCDetails = ({data}) => {
  return (
    <div className="flex items-center justify-between mt-5 gap-5">
      <div className="flex items-center gap-5">
        <div className="">
          <img src={data?.image} className="w-[120px] h-[120px] rounded-full" alt="" />
        </div>
        <div>
          <div className="font-[500] text-xl trakcin text-gray-600">
            {data?.name}
          </div>
          <div className="text-sm text-gray-400">{data?.position}</div>
        </div>
      </div>
      <div className="flex gap-3 flex-col items-start">
        <a  href={`mailto:${data?.email}`} className=" text-gray-500 border-b-primary border-b-[1px]">
          {data?.email}
        </a>
        <a  href={`tel:${data?.phone}`} className=" text-gray-500 border-b-primary border-b-[1px]">
          {data?.phone || 'Unset'}
        </a>
      </div>
    </div>
  );
};

const ContactInfo = ({user}) => {

  return (
    <div className="p-5 font-open">
      <div className=" flex justify-between">
        <div className="text-gray-600 text-2xl font-[600]">
          Contact Information
        </div>
        <Link to="/inbox" className="border-b-primary border-b-[2px] text-primary">
          Send Message
        </Link>
      </div>
      <div className="mt-5 font-open space-y-5">
        {/* <div className='py-2 flex items-center gap-5 border-b-[1px] border-b-gray-300'>
                <span className='font-semibold text-gray-400'>Phone : </span>
                <div>+91 7039900010</div>
            </div> */}
        <div className="py-2 flex items-center gap-5 border-b-[1px] border-b-gray-300">
          <span className="font-semibold text-gray-400">Email : </span>
          <a href={`mailto:${user?.email}`}>{user?.email}</a>
        </div>
        <div className="py-2 flex items-center gap-5 border-b-[1px] border-b-gray-300">
          <span className="font-semibold text-gray-400">Website : </span>
          <div>{user?.website?<a href={user?.website}>{user?.website}</a>:<div>Not updated</div>}</div>
        </div>
      </div>
      <div className="mt-8">
        <div className="text-lg font-semibold text-gray-600">
          Person of Contact
        </div>
        {user?.contactPerson?.name?<POCDetails data={user?.contactPerson}/>:<div className="border-b-[1px] mt-4 text-red-500">
        Contact Person not assigned
        </div>}
      </div>
    </div>
  );
};

export default ContactInfo;
