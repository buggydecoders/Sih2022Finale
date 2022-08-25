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

const ResourceItem = ({ data }) => {
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false);
  const handleDelete = () => {
    dispatch(deleteResource(data._id));
  };

  return (
    <>
      <div onClick={() => setIsOpen(true)} className="p-3 rounded-md">
        <div className="w-full rounded-md bg-white p-2 h-[210px] relative">
          <MdDelete
            className="absolute z-10 top-2 right-2 text-2xl cursor-pointer bg-white rounded-full p-1"
            onClick={() => handleDelete()}
          />
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
      <AddResourceDrawer data={data} isEdit={true} isOpen={isOpen} setIsOpen={setIsOpen} />
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

const Resources = () => {
  const { loading, list, page, limit, state, category, totalPages } =useSelector((state) => state.myResources);
  const [firstRender, setFirstRender] = useState(false);
  const dispatch = useDispatch();
  const [addSidebar, setAddSidebar] = useState(false);

  useEffect(() => {
    dispatch(fetchAllResources());
  }, []);

  const handlePaginationChange = (e, value) => {
    dispatch(fetchAllResources(category, state, value, limit));
  };

  const handleCategoryChange = (value) => {
    dispatch(fetchAllResources(state, value, limit));
  };

  return (
    <div className=" p-5 px-5 rounded-xl">
      <div className="flex gap-6 items-center justify-between">
        <div className="text-gray-600 text-2xl font-[600]">Resources</div>
        <div
          className="text-primary font-open px-5 py-[2px] cursor-pointer flex items-center gap-3 rounded-md border-[1px] border-primary hover:text-white hover:bg-primary transition-all"
          onClick={() => setAddSidebar(true)}
        >
          Add Resource
        </div>
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
        <select
          defaultValue={state}
          value={state}
          onChange={(e) =>
            fetchAllResources(category, e.target.value, 1, limit)
          }
          className="bg-transparent px-5 py-1 border-b-[1px]  border-gray-400 rounded-md font-open text-gray-600 outline-none"
        >
          <option value="">My Resources</option>
          <option value="all">All</option>
          <option value="shared">Shared Resources</option>
          <option value="available">Available</option>
          <option value="draft">Drafts</option>
        </select>
      </div>
      <div className="mt-5 gap-5 grid grid-cols-4">
        {list?.map((r, idx) => (
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
      <AddResourceDrawer isOpen={addSidebar} setIsOpen={setAddSidebar} />
    </div>
  );
};

export default Resources;
