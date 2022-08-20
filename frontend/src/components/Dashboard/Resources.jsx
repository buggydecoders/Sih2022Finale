import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardResources } from "../../store/resources/actions";
import InboxLoading from "../Inbox/InboxLoading";
import ResourceCard from "./ResourceCard";
import { Pagination } from "@mui/material";
import Loading from "../Loading";

const Resources = () => {
  const { list, loading,page,totalPages,limit } = useSelector((state) => state.resources);
  const dispatch = useDispatch();

  const handlePaginationChange = (e, value)=>{
    dispatch(fetchDashboardResources(value,limit));
  }

  const searchLoading = useSelector(state => state.resources.loading)
  if (loading==='FETCH' || searchLoading==="SEARCH-RESOURCE") return <Loading/>

  
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
