import React from "react";
import Layout from "../components/Layout";
import Navigation from "../components/Status/Navigation";
import Search from "../components/Status/Search";
import StatusTable from "../components/Status/StatusTable";

const Status = () => {
  return (
    <Layout>
      <div className="px-16 py-10">
        <div className="text-3xl font-[700] mb-6">Status</div>
        <Search />
        <div className="grid mt-5 grid-cols-[6fr_1fr] gap-12">
            <StatusTable/>
            <Navigation/>
        </div>
      </div>
    </Layout>
  );
};

export default Status;
