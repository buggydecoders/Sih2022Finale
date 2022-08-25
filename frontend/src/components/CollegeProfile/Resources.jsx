import React, { useEffect, useState } from "react";
import { MdIncompleteCircle, MdOutlineScience } from "react-icons/md";
import { FiPackage } from "react-icons/fi";
import AddResourceDrawer from "../Resource/AddResourceDrawer";
import { useDispatch, useSelector } from "react-redux";
import { deleteResource, fetchAllResources } from "../../store/myresources/actions";
import { Pagination } from "@mui/material";
import { RESOURCE_FALLBACK_IMG } from "../../utils/fallbackImages";
import { MdDelete } from "react-icons/md";
import { TbRobot } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { serverInstance } from "../../utils/serverInstance";
import {toast} from 'react-toastify'
const ResourceItem = ({ data }) => {
  const navigate = useNavigate();

  return (
    <>
      <div onClick={()=>navigate(`/resource/${data?._id}`)} className="p-3 rounded-md">
        <div className="w-full rounded-md bg-white p-2 h-[210px] relative">
         
          <img src={data?.images[0]?.url || RESOURCE_FALLBACK_IMG} className="w-full h-full absolute object-cover top-0 left-0 rounded-xl border-[1px]" />
        </div>
        <div className="mt-3 font-[500] font-open">
          {data?.name}
        </div>
        <div className="text-gray-400 text-xs font-open mt-1">
          {data?.durationFrom || "NA"} - {data?.durationTo || "NA"}
        </div>
        <div className="font-[600] font-open">₹{data?.price}</div>
      </div>
      
    </>
  );
};

const CategoryType = ({
  title,
  icon,
  value,
  categoryState,
  setCategoryState,
}) => {
  let isSelected = categoryState === value;
  return (
    <div
      onClick={() => setCategoryState(value)}
      className={`${isSelected ? "text-white bg-gray-600" : "text-gray-500"
        } p-1 font-open px-5 hover:bg-gray-600 cursor-pointer hover:text-white transition-all duration-500   border-[1px] border-gray-400 rounded-md flex gap-5 items-center`}
    >
      <div>{title}</div>
      {icon}
    </div>
  );
};


const Resources = ({user}) => {
  // const { loading, list, page, limit, state, category, totalPages } =useSelector((state) => state.myResources);
  const [loading,setLoading] = useState(false);
  const [list,setList] = useState([]);
  const [page,setPage] = useState(1);
  const [state,setState] = useState('all');
  const [category,setCategory] = useState('all');
  const [totalPages,setTotalPages] = useState(1);
  const [error,setError] = useState(false);




  const fetchUserResources = async(state,category,page)=>{
    try {
      setLoading(true);
    const result = await serverInstance.get(`/auth/get-resources/${user._id}?page=${page || 1}&limit=${10}&state=${state || ''}&category=${category || ''}`);
    setList(result.data.resources);
    setTotalPages(result.data.totalPages);
    setPage(result.data.page);
    }catch(err) {
      console.log(err);
      setError(err?.response?.data?.message || 'Something went wrong');
      toast(err?.response?.data?.message);
    }finally{
      setLoading(false);

    }
    
  }

  useEffect(() => {
    fetchUserResources();
  }, []);


  const handlePaginationChange = (e, value) => {
    fetchUserResources(state,category,value);
  };

  const handleCategoryChange = async(value) => {
    await fetchUserResources(state,value,1);
    setCategory(value);
  };

  return (
    <div className=" p-5 px-5 rounded-xl">
      <div className="flex gap-6 items-center justify-between">
        <div className="text-gray-600 text-2xl font-[600]">Resources</div>
        
      </div>
      <div className="text-sm text-gray-400 mt-1">
        Showing resources associated with Insitute of Engineering & Technology
      </div>
      <div className="mt-5 gap-5 flex justify-between items-center">
        <div className="flex items-center gap-5">
          <CategoryType
            categoryState={category}
            setCategoryState={handleCategoryChange}
            value="all"
            isSelected={true}
            title="All"
            icon={<MdIncompleteCircle />}
          />
          <CategoryType
            categoryState={category}
            setCategoryState={handleCategoryChange}
            value="research"
            title="Research"
            icon={<MdOutlineScience />}
          />
          <CategoryType
            categoryState={category}
            setCategoryState={handleCategoryChange}
            value="productDesign"
            title="Product Design"
            icon={<FiPackage />}
          />
          <CategoryType
            categoryState={category}
            setCategoryState={handleCategoryChange}
            value="virtual"
            title="Virtual"
            icon={<TbRobot />}
          />
        </div>
        
      </div>
      <div className="mt-5 gap-5 grid grid-cols-4">
        {loading?<div>Loading...</div>:list?.map((r, idx) => (
          <ResourceItem data={r} key={idx} />
        ))}
      </div>
      <div className="mt-6">
        <Pagination
          page={page}
          count={totalPages}
          onChange={handlePaginationChange}
        />
      </div>
    
    </div>
  );
};

export default Resources;
