import React from "react";
import { useSelector } from "react-redux";
import CardCollection from "../components/Dashboard/CardCollection";
import CollegeProfileCard from "../components/Dashboard/CollegeProfileCard";
import FilterResources from "../components/Dashboard/FilterResources";
import Resources from "../components/Dashboard/Resources";
import Search from "../components/Dashboard/Search";
import InboxLoading from "../components/Inbox/InboxLoading";
import Layout from "../components/Layout";

const Dashboard = () => {
  return (
    <Layout>
      <div className="bg-lightGray py-10">
        <div className="grid grid-cols-[1fr_2.8fr_1fr] gap-5 px-10">
          <div className="space-y-6">
            <CollegeProfileCard />
            <CardCollection title="Shared Resources" />
            <CardCollection title="Listed Resources" />
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
