import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardResources } from "../../store/resources/actions";
import InboxLoading from "../Inbox/InboxLoading";
import ResourceCard from "./ResourceCard";
import { Pagination } from "@mui/material";

const Resources = () => {
  const { list, loading,page,totalPages,limit } = useSelector((state) => state.resources);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDashboardResources());
  }, []);
  const handlePaginationChange = (e, value)=>{
    dispatch(fetchDashboardResources(value,limit));
  }

  if (loading==='FETCH') return <div>Loading...</div>

  
  return (
    <div>
      <div className="space-y-3">
        {list?.map((resource) => {
          return <ResourceCard data={resource} />;
        })}
      </div>
      <div className="mt-6 flex items-center justify-center">
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
