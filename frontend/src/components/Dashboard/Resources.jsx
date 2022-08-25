import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardResources } from "../../store/resources/actions";
import InboxLoading from "../Inbox/InboxLoading";
import ResourceCard from "./ResourceCard";
import { Pagination } from "@mui/material";
import Loading from "../Loading";
import { serverInstance } from "../../utils/serverInstance";
import { fetchDashboardResourcesAPI } from "../../store/resources/services";

const Resources = ({totalPages,handlePageChange,page,resources,loading}) => {

  return (<>
    <div>
      <div className="space-y-3">
        {!loading?resources?.length>0?resources?.map((resource) => {
          return <ResourceCard data={resource} />;
        }):<div>No Resource was found</div>:<Loading/>}
      </div>
      <div className="mt-6 flex items-center justify-center">
        <Pagination
          page={page}
          count={totalPages}
          onChange={handlePageChange}
        />
      </div>
    </div></>
  );
};

export default Resources;
