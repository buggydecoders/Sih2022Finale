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
import { fetchDashboardResourcesAPI } from "../store/resources/services";
import { toast } from "react-toastify";
import { fetchInstitutes, fetchStates } from "../store/filters/actions";



const Dashboard = () => {

  const [category, setCategory] = useState("all");
  const [resources,setResources] = useState([]);
  const [loading,setLoading] = useState(false);
  const [activePage,setActivePage] = useState(1);
  const [totalPages,setTotalPages] = useState(1);
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    university: [],
    location: [],
    budget: [],
  });
  const dispatch = useDispatch();

  const fetchData = async(page,limit,budget,university,location,categoryFetch)=>{
    try {
    setLoading(true);
    const result = await fetchDashboardResourcesAPI(page,limit,budget,university,location,categoryFetch);
    setResources(result.data.resources);
    setTotalPages(result.data.totalPages);
    }catch(err) {
      console.log(err);
      toast(err?.response?.data?.message || 'SOmething went wrong!');
      navigate('/not-found');
    }finally{
      setTimeout(()=>{
        setLoading(false);
      }, 2000)
    }
  }
  

  useEffect(()=>{
    dispatch(fetchInstitutes());
    dispatch(fetchStates());
  }, [])



  useEffect(()=>{
    let budget = filters.budget.length > 0 ? filters.budget.join("-") : "";
    let location = filters.location.length > 0 ? filters.location.join("-") : "";
    let university = filters.university.length > 0 ? filters.university.join("-") : "";
    let categoryFetch = category === "all" ? "" : category;
    fetchData(activePage,10,budget,university,location,categoryFetch);
    // setTotalPages()
  }, [filters,activePage]);


  


  return (
    <Layout>
      <div className="bg-lightGray py-10">
        <div className="grid grid-cols-[1fr_2.8fr_1fr] gap-5 px-10">
          <div className="space-y-6">
            <CollegeProfileCard />
            <CardCollection viewAll="/status" title="Shared Resources">
              
            </CardCollection>
            <CardCollection viewAll="/profile" title="Listed Resources">
              
            </CardCollection>
            <CardCollection viewAll="/inbox" redirect="/inbox" title="Enquries">
            
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
            <Resources  loading={loading} totalPages={totalPages} page={activePage} setActivePage={setActivePage} resources={resources} />
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