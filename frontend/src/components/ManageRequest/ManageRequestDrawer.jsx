import { Drawer } from "@mui/material";
import React from "react";
import { MdClear } from "react-icons/md";

import AcceptAndReview from "./AcceptAndReview";
import AddContract from "./AddContract";
import ProcessRequest from "./ProcessRequest";

const ManageRequestDrawer = ({data, isOpen, setIsOpen }) => {
  const handleClose = () => setIsOpen(false);

  

  return (
    <Drawer open={isOpen} onClose={handleClose} anchor="right">
      <div className="w-[60vw] max-w-[850px] p-6 px-7">
        <div className="items-center flex justify-between">
          <div className="text-2xl font-open font-[700]">
            Manage Requests{" "}
            <div className="text-sm font-[300] mt-1 text-gray-500">
              #89993344343332
            </div>
          </div>
          <MdClear size={24} />
        </div>
        {data?.status==='pending'&&<AcceptAndReview/>}
        {/* <ProcessRequest/> */}

      </div>
    </Drawer>
  );
};

export default ManageRequestDrawer;
