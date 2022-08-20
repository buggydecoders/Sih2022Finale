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
const Dashboard = () => {
  const { loading, list } = useSelector((state) => state.resources);
  const navigate = useNavigate();
  const [category, setCategory] = useState("all");

  const [filters, setFilters] = useState({
    university: [],
    location: [],
    budget: [],
  });
  const dispatch = useDispatch();

  useEffect(() => {
    let budget = filters.budget.length > 0 ? filters.budget.join("-") : "";
    let location =
      filters.location.length > 0 ? filters.location.join("-") : "";
    let university =
      filters.university.length > 0 ? filters.university.join("-") : "";
    let categoryFetch = category === "all" ? "" : category;
    dispatch(
      fetchDashboardResources(
        1,
        10,
        budget,
        university,
        location,
        categoryFetch
      )
    );
  }, [filters, category]);

  const Card = ({ data }) => {
    return (
      <div
        onClick={() => navigate(`/resource/${data?._id}`)}
        className="flex space-x-2 p-2 shadow-sm justify-center items-center cursor-pointer rounded-xl"
      >
        <img
          src={data?.images[0].url}
          className="rounded-full w-10 h-10 object-cover"
          alt=""
        />
        <div className="flex flex-col">
          <p className="text-sm font-semibold">
            {data?.name.substr(0, 20)} {data?.name.length < 20 ? "" : "..."}
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
  return (
    <Layout>
      <div className="bg-lightGray py-10">
        <div className="grid grid-cols-[1fr_2.8fr_1fr] gap-5 px-10">
          <div className="space-y-6">
            <CollegeProfileCard />
            <CardCollection title="Shared Resources" />
            <CardCollection title="Listed Resources">
              <div className="space-y-2">
                {list?.splice(7).map((item, idx) => {
                  return <Card data={item} />;
                })}
              </div>
            </CardCollection>
            <CardCollection title="Enquries" />
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
              onChange={(e)=>setCategory(e.target.value)}
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
