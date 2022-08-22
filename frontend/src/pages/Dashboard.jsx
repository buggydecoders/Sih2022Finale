import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardCollection from "../components/Dashboard/CardCollection";
import CollegeProfileCard from "../components/Dashboard/CollegeProfileCard";
import FilterResources from "../components/Dashboard/FilterResources";
import Resources from "../components/Dashboard/Resources";
import Search from "../components/Dashboard/Search";
import InboxLoading from "../components/Inbox/InboxLoading";
import Layout from "../components/Layout";
import { BsClockHistory } from "react-icons/bs";
import { BiBadgeCheck } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { fetchDashboardResources } from "../store/resources/actions";
import { useDispatch } from "react-redux";
import Tab from "../components/Tab";
import { capitalize } from "@mui/material";
import { fetchRequests } from "../store/requests/actions";
import moment from "moment";
import { fetchAllResources } from "../store/myresources/actions";
import Loading from "../components/Loading";

const Dashboard = () => {
  const { loading, list } = useSelector((state) => state.myResources);
  const {
    loading: requestsLoading,
    requests,
    totalPages,
    page: activePage,
    limit,
  } = useSelector((state) => state.requests);
  const { user } = useSelector(state => state.auth);
  const { activeRoom, lastMessage } = useSelector(state => state.chatRoom);


  const navigate = useNavigate();
  const [category, setCategory] = useState("all");

  const [filters, setFilters] = useState({
    university: [],
    location: [],
    budget: [],
  });
  const dispatch = useDispatch();


  useEffect(() => {
    // dispatch(fetchRequests("completed", 1, 3, "", ""));
    dispatch(fetchAllResources(limit))
  }, []);

  useEffect(() => {
    let budget = filters.budget.length > 0 ? filters.budget.join("-") : "";
    let location = filters.location.length > 0 ? filters.location.join("-") : "";
    let university = filters.university.length > 0 ? filters.university.join("-") : "";
    let categoryFetch = category === "all" ? "" : category;
    dispatch(fetchDashboardResources(1, 10, budget, university, location, categoryFetch));
  }, [filters, category]);

  const getColor = (status) => {
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

  const ListedResourceCard = ({ data }) => {
    return (
      <div
        onClick={() => navigate(`/resource/${data?._id}`)}
        className="flex space-x-2 p-2 shadow-sm justify-center items-center cursor-pointer rounded-xl"
      >
        <img
          src={data?.images[0]?.url}
          className="rounded-full w-10 h-10 object-cover"
          alt=""
        />
        <div className="flex flex-col">
          <p className="text-sm font-semibold">
            {data?.name?.substr(0, 20)} {data?.name?.length < 20 ? "" : "..."}
          </p>
          <div className="flex gap-2">
            <div className="flex gap-2 items-center text-xs">
              <BsClockHistory /> {data?.durationFrom || "N/A"}
            </div>
            <div className="flex gap-2 items-center text-xs">
              <BsClockHistory /> {data?.durationTo || "N/A"}
            </div>
          </div>
          <p className="text-xs">
            Price: <span>{data?.price}</span>
          </p>
        </div>
      </div>
    );
  };

  const SharedResourceCard = ({ data }) => {
    return (
      <div
        onClick={() => navigate(`/status/${data?._id}`)}
        className="flex space-x-2 p-2 shadow-sm justify-center items-center cursor-pointer rounded-xl"
      >
        <img
          src={data?.resource?.images[0]?.url}
          className="rounded-full w-10 h-10 object-cover"
          alt=""
        />
        <div className="flex flex-col">
          <p className="text-sm font-semibold">
            {data?.resource?.name?.substr(0, 20)} {data?.resource?.name?.length < 20 ? "" : "..."}
          </p>
          <div className="flex gap-2">
            <div className="flex gap-2 items-center text-xs">
              <BsClockHistory /> {data?.resource?.durationFrom || "N/A"}
            </div>
            <div className="flex gap-2 items-center text-xs">
              <BsClockHistory /> {data?.resource?.durationTo || "N/A"}
            </div>
          </div>
          <p className={`text-xs text-${getColor(data?.status)}-500`}>
            Status: <span>{data?.status}</span>
          </p>
        </div>
      </div>
    );
  };

  const MessageCard = ({ data }) => {
    const isActive = data._id === activeRoom._id;
    let cardUserData = data?.users[0]._id === user._id ? data?.users[1] : data?.users[0];

    let currentLastMessage = isActive ? lastMessage : data?.lastMessage;
    let updatedLastMessage = isActive ? lastMessage?.content : data?.lastMessage?.content || '';
    if (updatedLastMessage?.length > 17) updatedLastMessage = updatedLastMessage?.slice(0, 17) + '..'
    return (
      <div className={`${isActive ? '' : ''} border-b-[1px] cursor-pointer relative border-black border-opacity-10 px-1 py-5`}>
        {isActive && <div className="w-[5px] h-[85%] bg-primary absolute top-[50%] -translate-y-[50%] -left-2"></div>}
        <div className="flex gap-3 items-center">
          <img src={cardUserData?.logo} alt="" className="w-[50px] rounded-full h-[50px]" />
          <div className=" text-sm w-full">
            <div className="flex flex-col w-full">
              <div className="font-semibold text-xs ">{cardUserData?.instituteName?.slice(0, 12)}...</div>
              <div className="text-xs font-[500]  text-gray-500">{moment(currentLastMessage.createdAt).diff(moment(), 'minutes') * -1} min ago</div>
            </div>
            <div className="mt-1 flex items-center justify-between">
              <div className="text-xs font-[500]">{updatedLastMessage}</div>
              <div className="h-[17px] w-[17px] text-white  bg-primary flex items-center justify-center text-xs rounded-full">1</div>
            </div>
          </div>
        </div>

      </div>
    )
  }

  const { rooms } = useSelector(state => state.chatRoom);

  return (
    <Layout>
      <div className="bg-lightGray py-10">
        <div className="grid grid-cols-[1fr_2.8fr_1fr] gap-5 px-10">
          <div className="space-y-6">
            <CollegeProfileCard />
            <CardCollection viewAll="/status" title="Shared Resources">
              <div className="space-y-2">
                {
                  loading ?
                    requests?.map((item, idx) => {
                      return <SharedResourceCard data={item} />;
                    })
                    :
                    <Loading />
                }
              </div>
            </CardCollection>
            <CardCollection viewAll="/profile" title="Listed Resources">
              <div className="space-y-2">
                {list?.splice(7).map((item, idx) => {
                  return <ListedResourceCard data={item} />;
                })}
              </div>
            </CardCollection>
            <CardCollection viewAll="/inbox" redirect="/inbox" title="Enquries">
              {(!rooms || rooms?.length === 0) && <div className="py-20 text-center w-full font-open text-gray-500 font-[500]">No Chats Found</div>}
              {rooms?.length > 0 && rooms?.filter(r => r.lastMessage !== null).map(r => <MessageCard data={r} />)}
            </CardCollection>
          </div>
          <div className="space-y-5">
            <Search />
            <div className="my-3 flex gap-5">
              <Tab
                selected={category}
                setSelected={setCategory}
                title="All"
                id="all"
              />
              <Tab
                selected={category}
                setSelected={setCategory}
                title="Research"
                id="research"
              />
              <Tab
                selected={category}
                setSelected={setCategory}
                title="Virtual"
                id="virtual"
              />
              <Tab
                selected={category}
                setSelected={setCategory}
                title="Product Design"
                id="product-design"
              />
              <select
                onChange={(e) => setCategory(e.target.value)}
                className={`px-5 py-3 outline-none text-sm rounded-3xl bg-gray-100  hover:bg-primary shadow-md transition-all flex gap-4 cursor-pointer items-center  hover:text-white`}
              >
                <option value="" selected disabled>
                  More
                </option>
                <option value="">Remark</option>
              </select>
            </div>
            <Resources />
          </div>
          <div>
            <FilterResources filters={filters} setFilters={setFilters} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
