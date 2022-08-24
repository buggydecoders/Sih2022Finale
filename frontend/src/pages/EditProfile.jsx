import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { RiBuilding4Line } from "react-icons/ri";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import OrganizationDetails from "../components/EditProfile/OrganizationDetails";
import Security from "../components/EditProfile/Security";
import slugify  from 'slugify';
import POCDetails from "../components/EditProfile/POCDetails"
import useQueryParams from "../hooks/useQueryParams";
import {useNavigate} from 'react-router-dom'
import ActivateAccount from "../components/EditProfile/ActivateAccount";


const slugifyValue = (value)=>slugify(value,'-').toLowerCase();

function EditProfile() {
  const active = "cursor-pointer bg-gray-100 px-3 py-1";
  const navItem = "cursor-pointer px-3 py-1";
  const query = useQueryParams();
  console.log(query);
  const tabGroups = [
    { name: "Organization", tabs: ["Organization Details", "Contact Person Details"] },
    { name: "Profile", tabs: ["Security", "Activate Account"] },
  ];
  const [activeTab, setActiveTab] = useState(query('tab') || slugifyValue(tabGroups[0].tabs[0]));

  const TabsGroup = ({ name, tabs }) => {
    return (
      <div className="p-4">
        <div className="flex space-x-2 font-medium text-gray-500 text-base items-center">
          <RiBuilding4Line />
          <h1 className="">{name}</h1>
        </div>
        <ul className="flex flex-col space-y-2 py-4 ml-6 font-medium">
          {tabs?.map((tab, idx) => {
            return <Tab name={tab} value={slugifyValue(tab)} index={idx} />;
          })}
        </ul>
      </div>
    );
  };

  const Tab = ({ name, index,value }) => {
    const navigate = useNavigate();
    return (
      <li
        className={activeTab === value ? active : navItem}
        onClick={() => {
          navigate(`/edit-profile?tab=${value}`)
          setActiveTab(value);
        }}
        key={index}
      >
        {name}
      </li>
    );
  };

  const returnComponent = (active) => {
    let slugified = slugify(active, '-');
    slugified = slugified.toLowerCase();
    switch (slugify(active, '-').toLowerCase()) {
      case "organization-details":
        return <OrganizationDetails />

      case "security":
        return <Security />

      case "contact-person-details":
        return <POCDetails/>

      case "activate-account":
        return <ActivateAccount/>

      default:
    }
  };

  return (
    <Layout>
      <div className="flex w-full font-open">
        <div className="flex flex-col p-4 w-1/4 border-r-2 min-h-screen">
          <Link
            to="/profile"
            className="flex space-x-2 font-semibold text-xl items-center p-4 cursor-pointer"
          >
            <IoIosArrowBack />
            <h1 className="">Edit Profile</h1>
          </Link>

          {tabGroups?.map((tabGroup, index) => {
            return <TabsGroup name={tabGroup.name} tabs={tabGroup.tabs} />;
          })}
        </div>

        <div className="flex flex-col p-4 w-3/4">{returnComponent(activeTab)}</div>
      </div>
    </Layout>
  );
}

export default EditProfile;
