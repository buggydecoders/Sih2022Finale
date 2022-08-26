import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { MdSearch } from "react-icons/md";
import Logo from "../../assets/DAVV_LOGO.png";
import { RESOURCE_FALLBACK_IMG } from "../../utils/fallbackImages";
import { IoIosArrowForward } from "react-icons/io";
import ManageRequestDrawer from "../../components/ManageRequest/ManageRequestDrawer";
import useQueryParams from "../../hooks/useQueryParams";
import { useSelector, useDispatch } from "react-redux";
import { Pagination } from "@mui/material";
import { fetchRequests } from "../../store/requests/actions";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const Tab = ({ title, selected, setSelected, count, id }) => {
  const isSelected = id == selected;
  const navigate = useNavigate();
  const handleSelect = () => {
    navigate(`/status?tab=${id}`);
    setSelected(id);
  };
  return (
    <div
      onClick={handleSelect}
      className={`${isSelected ? "bg-primary text-white" : "text-gray-700 bg-gray-100"
        } px-5 py-3 text-sm rounded-3xl  hover:bg-primary transition-all flex gap-4 cursor-pointer items-center  hover:text-white`}
    >
      <div className="font-[600]">{title}</div>
      {/* <div className="font-[500]">{count}</div> */}
    </div>
  );
};

const RequestCard = ({ data, tab }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const handleResourceClick = () => {
    if (tab === 'sent') return navigate(`/status/${data._id}`);
    else setIsOpen(true);
  }

  const getColor = (status)=>{
    switch (status) {
      case "cancelled":
        return "red"
        break;
      case "pending":
        return "yellow"
        break;
      case "signed":
        return "green"
        break;
      case "completed":
        return "green"
        break;
      default:
        break;
    }
  }

  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  return (
    <>
      <tr
        onClick={handleResourceClick}
        className="border-b-[1px] hover:bg-lightGray transition-all duration-300 cursor-pointer  dark:border-gray-100"
      >

        <th
          scope="row"
          className="py-5 px-6 font-medium text-gray-900 whitespace-nowrap "
        >
          <div className="flex gap-2 items-center">
            <img
              src={
                tab === "recieved"
                  ? data?.aspirantInstitute?.logo
                  : data?.lendingInstitute?.logo
              }
              className="w-[40px] h-[40px] rounded-full"
            />
            <div className="">
              {tab === "recieved"
                ? data?.aspirantInstitute?.instituteName
                : data?.lendingInstitute?.instituteName}
            </div>
          </div>
        </th>
        <th
          scope="row"
          className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
        >
          <div className="flex gap-2 items-center">
            <img
              src={RESOURCE_FALLBACK_IMG}
              className="w-[40px] h-[40px] rounded-xl"
            />
            <div className="font-open ">{data?.resource?.name}</div>
          </div>
        </th>

        {data.accessType!=='one-time'&&<td className="py-4 px-6 font-open">
          {moment(data?.resource?.durationFrom).format("DD-MM-YYYY")} |{" "}
          {moment(data?.resource?.durationTo).format("DD-MM-YYYY")}
        </td>}

        {data.accessType==='one-time'&&<td className="py-4 px-6 font-open">
          One-Time
        </td>}
        <td className="py-4 px-6">
          <div className={`font-open text-${getColor(data?.status)}-500 font-[700] underline rounded-xl px-3 py-1`}>
            {capitalize(data?.status)}
          </div>
        </td>
        <td className="py-4 px-3 font-open">
          {moment(data?.createdAt).format("DD MMMM YYYY")}
        </td>
        <td className="py-4 px-3 text-gray-700 font-open">
          <IoIosArrowForward size={28} />
        </td>

      </tr>
      <ManageRequestDrawer data={data} isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

const StatusV2 = () => {
  const query = useQueryParams();
  const [tab, setTab] = useState(query("tab") || "recieved");
  const {
    loading: requestsLoading,
    requests,
    totalPages,
    page: activePage,
    limit,
  } = useSelector((state) => state.requests);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRequests(tab, 1, 10, "", ""));
  }, [tab]);

  const handlePaginationChange = (e, value) => {
    dispatch(fetchRequests(tab, value, 10, "", ""));
  };

  return (
    <Layout>
      {requestsLoading === "FETCH_REQUESTS" ? (
        <div>Loading..</div>
      ) : (
        <div className="bg-lightGray py-10 p-16 font-open">
          <div className="">
            <div className="font-[700] text-3xl">Request Status</div>
            <div className="text-base mt-2 font-open text-gray-700">
              Manage and review requests, sent or recieved
            </div>
          </div>
          <div className="mt-7 bg-white rounded-sm p-6">
            <div className="justify-between flex items-center">
              <div className="flex gap-3 items-center">
                <Tab
                  title="Recieved"
                  count={1}
                  id={"recieved"}
                  selected={tab}
                  setSelected={setTab}
                />
                <Tab
                  title="Sent"
                  count={13}
                  id={"sent"}
                  selected={tab}
                  setSelected={setTab}
                />
                <Tab
                  title="Rejected"
                  count={20}
                  id={"rejected"}
                  selected={tab}
                  setSelected={setTab}
                />
                <Tab
                  title="Cancelled"
                  count={0}
                  id={"cancelled"}
                  selected={tab}
                  setSelected={setTab}
                />
                <Tab
                  title="Completed"
                  count={0}
                  id={"completed"}
                  selected={tab}
                  setSelected={setTab}
                />
              </div>
              <div className="font-open">
                <select className="outline-none">
                  <option value="">Last 60 Days</option>
                  <option value="">Last 120 Days</option>
                  <option value="">Last 3 months</option>
                </select>
              </div>
            </div>
            <div className="mt-7 w-full relative flex items-center ">
              <MdSearch className="absolute left-3 text-gray-400" size={22} />
              <input
                className="bg-lightGray w-full py-4 pl-10 font-open outline-none"
                placeholder="Search Request"
              />
            </div>

            <div className="mt-7 overflow-x-auto w-full">
              <table className="w-full text-left text-black">
                <thead className=" text-gray-700 ">
                  <tr className="border-b-[1px] ">
                    <th scope="col" className="py-4 pb-4 px-6">
                      Institute
                    </th>
                    <th scope="col" className="py-4 pb-4 px-6">
                      Resource
                    </th>
                    <th scope="col" className="py-4 pb-4 px-6">
                      Duration
                    </th>
                    <th scope="col" className="py-4 pb-4 px-6">
                      Status
                    </th>
                    <th scope="col" className="py-4 pb-4 px-6">
                      Requested Date
                    </th>
                  </tr>
                  <tr></tr>
                </thead>
                <tbody>
                  {requests?.map((r) => (
                    <RequestCard data={r} tab={tab} />
                  ))}
                </tbody>
              </table>
              <div className="mt-5">
                <Pagination
                  page={activePage}
                  count={totalPages}
                  onChange={handlePaginationChange}
                />
              </div>
            </div>

          </div>
        </div>
      )}
    </Layout>
  );
};

export default StatusV2;
