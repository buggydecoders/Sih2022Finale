import React, { useEffect } from "react";
import DummyResource from "../../assets/Resources/3dPrinter.png";
import { BsClockHistory } from "react-icons/bs";
import { BiBadgeCheck } from "react-icons/bi";
import Button from "../Button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSavedItem, deleteSavedItem } from "../../store/resources/actions";
import { RESOURCE_FALLBACK_IMG } from "../../utils/fallbackImages";
import {useNavigate} from 'react-router-dom'

const SaveButton = ({resourceId}) => {
  const {savedItems,loading} = useSelector(state=>state.resources); 
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();


  useEffect(()=>{
    let isActive = savedItems.map(s=>s._id).includes(resourceId)
    setActive(isActive);
  }, [savedItems])
  

  const handleSaveForLater = () => {
    if (active) {
      dispatch(deleteSavedItem(resourceId, ()=>setActive(false)));
    }else {
      dispatch(addSavedItem(resourceId, ()=>setActive(true)));
    }
  };

  return (
    <div
      onClick={() => handleSaveForLater()}
      className={`${
        active ? "bg-opacity-100" : " bg-opacity-5"
      } py-3 cursor-pointer relative rounded-md text-secondary bg-secondary group overflow-hidden`}
    >
      <div className="w-full top-0 left-0 z-[0] h-[400px] absolute bg-secondary ease-in-out -translate-x-[500px] group-hover:translate-x-0 transition-all duration-500"></div>
      <div
        className={`w-fit px-3 flex rounded-md relative z-[10] ${
          active ? "text-white" : "group-hover:text-white"
        } gap-4 duration-150 ease-in-out items-center `}
      >
        {loading===`SAVE-${resourceId}`?'Loading..':active ? "Saved" : "Save for later"} <BiBadgeCheck />
      </div>
    </div>
  );
};

const ResourceCard = ({ data }) => {
  const navigate = useNavigate();
 
  return (
    <div className="bg-white w-full px-6 py-4 rounded-md">
      <div className="flex justify-between items-start">
        <div onClick={()=>navigate(`/resource/${data?._id}`)} className="flex items-start gap-4 cursor-pointer">
          <div className="">
            <img alt="" src={data?.images[0]?.url || RESOURCE_FALLBACK_IMG} className="w-[150px] h-[150px] rounded-lg"/>
          </div>
          <div className="">
            <div className="text-2xl font-bold text-gray-500">{data?.name || 'Not Found'}</div>
            <div className="mt-2 text-gray-400">
              {data?.instituteId?.instituteName || 'Not Found'}
            </div>
            <div className="mt-3 flex gap-10">
              <div className="flex gap-2 items-center text-sm">
                <BsClockHistory /> {data?.durationFrom || "N/A"}
              </div>
              <div className="flex gap-2 items-center text-sm">
                <BsClockHistory /> {data?.durationTo || "N/A"}
              </div>
            </div>
          </div>
        </div>

        <div className="shrink-0">
          <SaveButton resourceId={data._id} />
        </div>
      </div>
      <div className="mt-3 text-sm text-gray-400">{data?.description?.substr(0, 300)}{data?.description < 300 ? "" : "..."}</div>
      <hr className="my-3" />
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-6 text-lg">
          <div className="font-[500]">
            <span className="mr-1 text-secondary">₹</span>
            {data?.price || "N/A"}
            <span className="ml-2 text-sm text-gray-400">/Day</span>
          </div>
          <div className="flex gap-1"></div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outlined"  onClick={()=>navigate(`/inbox?chat=${data?.instituteId?._id}`)}  >Send Enquiry</Button>
          <Button variant="filled" onClick={()=>navigate(`/send-request/${data?._id}`)}>Send Request</Button>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;
