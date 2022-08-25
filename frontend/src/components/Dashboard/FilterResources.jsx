import React, { useState } from "react";
import { useEffect } from "react";
import FilterComponent from "../FilterComponent/FilterComponent";
import CardCollection from "./CardCollection";
import FilterCheckbox from "./FilterCheckbox";
import { useDispatch, useSelector } from "react-redux";
import { fetchInstitutes, fetchStates } from "../../store/filters/actions";

const locations = ["Indore", "Bhopal", "Salem"];
const Universities = ["DAVV", "TIME", "SONA"];
const Budget = [{label : "<1000", value : "0-1000"}, {label : "1000-5000", value : "1000-5000"}, {label : "5000-10000", value : "5000-10000"}, {value : "10000-15000", label : "10000-15000"}, {value : "15000-5000000000", label : ">15000"}];

const FilterResources = ({ filters, setFilters }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchInstitutes());
    dispatch(fetchStates());
  }, []);
  const {institutes,states,loading} = useSelector(state=>state.filters);
  
  // console.log(insitutes, states);
  return (
    <div className="space-y-5 w-full">
      <div className="justify-between flex items-center bg-white py-3 px-5">
        <div className="text-gray-600 text-xl font-[600]">FILTERS</div>
        <div onClick={()=>setFilters({location : [],university : [],budget : []})} className="text-secondary underline text-sm cursor-pointer">
          Clear all
        </div>
      </div>
      <CardCollection handleClearAll={()=>setFilters(prev=>({...prev,location : []})) } action="clear all" title={"Location"}>
        <FilterComponent
          selected={filters.location}
          title="Location"
          removeSelected={(value) =>
            setFilters((prev) => ({
              ...prev,
              location: prev.location.filter((p) => p !== value),
            }))
          }
          addSelected={(value) =>
            setFilters((prev) => ({
              ...prev,
              location: [...prev.location, value],
            }))
          }
          options={states}
        />
      </CardCollection>
      <CardCollection handleClearAll={()=>setFilters(prev=>({...prev,university : []})) } action="clear all" title={"University"}>
       {loading==='INSTITUTES'?<div>Loading..</div>:<FilterComponent
          selected={filters.university}
          title="University"
          removeSelected={(value) =>
            setFilters((prev) => ({
              ...prev,
              university: prev.university.filter((p) => p !== value),
            }))
          }
          addSelected={(value) =>
            setFilters((prev) => ({
              ...prev,
              university: [...prev.university, value],
            }))
          }
          options={institutes}
        />}
      </CardCollection>
      <CardCollection handleClearAll={()=>setFilters(prev=>({...prev,budget : []})) } action="clear all" title={"Budget"}>
        <FilterComponent
          selected={filters.budget}
          title="Budget"
          removeSelected={(value) =>
            setFilters((prev) => ({ ...prev, budget: [] }))
          }
          addSelected={(value) =>
            setFilters((prev) => ({ ...prev, budget: [value] }))
          }
          options={Budget}
        />
      </CardCollection>
    </div>
  );
};

export default FilterResources;

// ./auth/get-institutes
