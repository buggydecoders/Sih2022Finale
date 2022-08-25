import React from "react";
import { GrTransaction } from "react-icons/gr";
import { useSelector } from "react-redux";
const InfoCard = ({ count, title, text, icon }) => {
  return (
    <div className="bg-white font-open hover:shadow-2xl rounded-xl p-6 w-72 h-36 cursor-pointer flex items-center justify-between hover:bg-primary hover:text-white group transition">
      <div>
        <div className="font-medium text-2xl">{count}</div>
        <div className="text-gray-600 font-[500] dark:text-gray-500 text-sm tracking-wide group-hover:text-white">
          {title}
        </div>
        <div className="text-green-700 dark text-[0.7rem] mt-1 group-hover:text-white">
          {text}
        </div>
      </div>
      <div className="bg-gray-100 group-hover:shadow-2xl transition-all duration-1000 rounded-full h-[60px] shadow-sm w-[60px] flex items-center justify-center">
        {icon}
      </div>
    </div>
  );
};

const TitleInfo = ({title,value}) => {
  return (
    <div className="py-4 border-b-[1px]">
      <div className="font-[500] text-gray-500">{title}</div>
      <div className="mt-1 font-[600] text-lg">{value}</div>
    </div>
  );
};

const SideBarInformation = ({user}) => {

  return (
    <div>
      <div className="space-y-3">
        <InfoCard
          count={375}
          text="+2% from last week"
          title="Resources Shared"
          icon={<GrTransaction size={22} />}
        />
        <InfoCard
          count={375}
          text="+2% from last week"
          title="Resources Shared"
          icon={<GrTransaction size={22} />}
        />
        <div className="mt-12 font-open">
            <TitleInfo title='NAAC Rating' value={user?.naac}/>
            <TitleInfo title='Reputation Points' value={user?.reputationPoint || 'Unset'}/>
        </div>
        <div className="mt-6 font-open">
        <div className="font-[500] text-gray-500">Location</div>
        <div className="mt-4 space-y-1">

            <div><span className="font-[300] text-sm text-gray-600">Street : </span>{user?.address?.street}</div>
            <div><span className="font-[300] text-sm text-gray-600">City,State : </span>{user?.address?.city}, {user?.address?.state}</div>
            <div><span className="font-[300] text-sm text-gray-600">Pincode : </span>{user?.address?.pincode}</div>

        </div>
        <div className="py-10">
        {/* eslint-disable-next-line */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3681.2656451339208!2d75.87759341496154!3d22.681152885127144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fcc03e36712d%3A0xb6f3c2bf734a7c!2sIET%20DAVV!5e0!3m2!1sen!2sin!4v1659984500701!5m2!1sen!2sin"
          width="300"
          height="300"
          style={{border: 0}}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
        </div>
      </div>
    </div>
  );
};

export default SideBarInformation;
