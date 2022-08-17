import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Layout from "../Layout";

const InboxLoading = () => {
  return (
    <Layout>
      <div className="grid grid-cols-[1.2fr_4fr] gap-5">
        <div>
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="rectangular" width={"100%"} height={"80vh"} />
        </div>
        <div>
          <div className="space-y-3">
            <div className="grid grid-cols-[1fr_5fr] items-center justify-center">
              <Skeleton variant="circular" width={150} height={150} />
              <Skeleton variant="rectangular" width="100%" height="150px" />
            </div>
            <div className="mt-5 space-y-5">
                <Skeleton variant='text'/>
                <Skeleton variant='text'/>
                <Skeleton variant='text'/>
                <Skeleton variant='text'/>
                <Skeleton variant='text'/>
                <Skeleton variant='text'/>
                <Skeleton variant='text'/>
                <Skeleton variant='text'/>
                <Skeleton variant='text'/>
                <Skeleton variant='text'/>
                
            </div>
           
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InboxLoading;
