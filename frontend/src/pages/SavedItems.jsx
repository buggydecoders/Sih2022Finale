import React from "react";
import Layout from "../components/Layout";
import Search from "../components/Status/Search";
import Pagination from "../components/Pagination";
import ResourceItem from "../components/ResourceItem";


const SavedItems = () => {
  return (
    <Layout>
      <div className="px-16 py-10">
        <div className="text-3xl font-[700] mb-6">Status</div>
        <Search />
        <div className="grid-cols-5 grid mt-12 gap-10">
          <ResourceItem  />
          <ResourceItem  />
          <ResourceItem  />
          <ResourceItem  />
          <ResourceItem  />
          <ResourceItem  />
        </div>
      </div>
      <Pagination/>
    </Layout>
  );
};

export default SavedItems;
