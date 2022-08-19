import React, { useEffect } from "react";
import Layout from "../components/Layout";
import Search from "../components/Status/Search";
import Pagination from "../components/Pagination";
import ResourceItem from "../components/ResourceItem";
import ResourceImg from '../assets/Resources/3dPrinter.png'
import { useDispatch, useSelector } from "react-redux";

export const ProductItem = () => {
  return (
    <div className="px-3 py-3 border-[1px] border-gray-300 rounded-xl">
      <div className="">
        <img src={ResourceImg} className="w-[130px]" alt="" />
      </div>
      <div className="font-[500] mt-7">
        3d Printer (Lightning version with 32 Gb Ram)
      </div>
      <div className="text-sm text-gray-500 font-[500] mt-1">IET, DAVV</div>
      <div className="text-primary font-bold mt-2 text-lg">
        Rs. 1500{" "}
        <span className="text-gray-500 font-[400] text-sm ml-2">/ DAY</span>
      </div>
      <div className="w-full text-center bg-secondary text-white py-2 rounded-xl mt-3 bg-opacity-95 cursor-pointer">
        Request Resource
      </div>
    </div>
  );
};


const SavedItems = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(fetchSavedResources())
  }, []);

  const savedResources = useSelector(state => state?.resources?.savedItems)
  return (
    <Layout>
      <div className="px-16 py-10">
        <div className="text-3xl font-[700] mb-6">Saved Items</div>
        <Search />
        <div className="grid-cols-5 grid mt-12 gap-10">
          {
            savedResources?.map((savedItem) => {
              return <ResourceItem data={savedItem} />
            })
          }
        </div>
      </div>
      <Pagination />
    </Layout>
  );
};

export default SavedItems;
