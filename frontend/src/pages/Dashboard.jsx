import React from "react";
import { useSelector } from "react-redux";
import CardCollection from "../components/Dashboard/CardCollection";
import CollegeProfileCard from "../components/Dashboard/CollegeProfileCard";
import FilterResources from "../components/Dashboard/FilterResources";
import Resources from "../components/Dashboard/Resources";
import Search from "../components/Dashboard/Search";
import InboxLoading from "../components/Inbox/InboxLoading";
import Layout from "../components/Layout";
import { BsClockHistory } from "react-icons/bs";
import { BiBadgeCheck } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { loading, list } = useSelector((state) => state.myResources);
  const navigate = useNavigate()

  const Card = ({ data }) => {
    return (
      <div onClick={()=>navigate(`/resource/${data?._id}`)} className="flex space-x-2 p-2 shadow-sm justify-center items-center cursor-pointer rounded-xl">
        <img src={data?.images[0].url} className="rounded-full w-10 h-10 object-cover" alt="" />
        <div className="flex flex-col">
          <p className="text-sm font-semibold">{data?.name.substr(0,20)} {data?.name.length < 20? "" : "..."}</p>
          <div className="flex gap-2">
            <div className="flex gap-2 items-center text-xs">
              <BsClockHistory /> {data?.durationFrom || "N/A"}
            </div>
            <div className="flex gap-2 items-center text-xs">
              <BsClockHistory /> {data?.durationTo || "N/A"}
            </div>
          </div>
          <p className="text-xs">Price: <span>{data?.price}</span></p>
        </div>
      </div>
    )
  }
  return (
    <Layout>
      <div className="bg-lightGray py-10">
        <div className="grid grid-cols-[1fr_2.8fr_1fr] gap-5 px-10">
          <div className="space-y-6">
            <CollegeProfileCard />
            <CardCollection title="Shared Resources" />
            <CardCollection title="Listed Resources">
              <div className="space-y-2">
                {
                  list?.splice(7).map((item, idx) => {
                    return <Card data={item} />
                  })
                }
              </div>
            </CardCollection>
            <CardCollection title="Enquries" />
          </div>
          <div className="space-y-5">
            <Search />
            <Resources />
          </div>
          <div>
            <FilterResources />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
