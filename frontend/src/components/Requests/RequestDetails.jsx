import React from "react";
import ResourceImg from "../../assets/Resources/3dPrinter.png";
import { BiBadgeCheck } from "react-icons/bi";

const RequestDetails = () => {
  return (
    <div className="bg-white shadow-md px-6 py-5">
      <div className="flex items-center gap-2">
        <div className="">
          <img src={ResourceImg} className="w-[90px] rounded-md" />
        </div>
        <div className="font-semibold w-full text-black text-lg flex justify-between">
            <div>
                <div>Looking for a Classroom full of people</div>
                <div className="text-sm text-gray-400 font-[500]">University of Capetown</div>
            </div>
            <div className="text-sm text-gray-400">Posted 3 days ago</div>
        </div>
      </div>
      <div className="mt-7">
        <div className="font-semibold">Request Overview</div>
        <div className="text-sm font-[500] text-gray-600 mt-3">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab,
          reiciendis veritatis labore eum veniam, temporibus consectetur
          voluptate eligendi, eaque beatae quas minus deleniti in quis fuga modi
          saepe iusto quasi?
          <br /><br/>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro aliquid
          sunt eaque provident veritatis voluptatum aperiam quaerat inventore
          accusamus asperiores. Voluptatibus, sapiente. Qui tempora nostrum
          suscipit ipsa praesentium consequuntur necessitatibus dolorum tenetur
          earum est, labore laudantium perferendis eveniet non fugiat.
          <br /><br/>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo,
          assumenda!
        </div>
        <div className="mt-7">
          <div className="font-semibold">Duration</div>
          <div className="flex gap-5 text-sm items-center mt-3 ">
          <div className="text-gray-500 font-[500]  flex">
            <span className="font-semibold text-black mr-2">From : </span> 13 May
            2022
          </div>
          <div className="text-gray-500 font-[500]">
            <span className="font-semibold text-black mr-2">To : </span> 16 May 2022
          </div>
        </div>
        </div>
        <div className="mt-7">
          <div className="font-semibold">Other Details</div>
          <div className="mt-3 text-sm flex items-start gap-20">
            <div>
              <div className="font-semibold">Budget</div>
              <div className="font-[500] mt-1">Rs. 5000</div>
            </div>
            <div>
              <div className="font-semibold">25 Successful Shares</div>
              <div className="flex items-center mt-1">
                <span className="text-blue-600">
                  <BiBadgeCheck />
                </span>
                <div className="text-gray-600 text-sm">
                  Verified University (4.5)
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <div className="font-semibold">University Details</div>
          <div className="flex justify-between mt-3 items-center">
            <div className="flex items-center gap-2">
              <div className="">
                <img src={ResourceImg} className="w-[65px] rounded-md" />
              </div>
              <div className="font-semibold text-black">
                Institute of Engineering & Technology, DAVV
                <div className="text-sm text-gray-400">Indore, India</div>
              </div>
            
            </div>
            <div className="text-sm">
              <div className="font-semibold">Reputation P.</div>
              <div className="text-gray-700">4.5</div>
            </div>
          </div>
        </div>
        <div className="mt-8 flex items-center font-[500] gap-8">
            <button className="px-12 text-white py-2 bg-primary border-[1px] rounded-md">Fullfil Request</button>
            <button className="px-12 py-2 border-primary text-primary border-[1px] rounded-md">Message</button>
        </div>
      </div>
    </div>
  );
};

export default RequestDetails;
