import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { RiBuilding4Line } from "react-icons/ri";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import OrganizationDetails from "../components/EditProfile/OrganizationDetails";
import Security from "../components/EditProfile/Security";
import POCDetails from "../components/EditProfile/POCDetails"
function EditProfile() {
  const active = "cursor-pointer bg-gray-100 px-3 py-1";
  const navItem = "cursor-pointer px-3 py-1";
  const tabGroups = [
    { name: "Organization", tabs: ["Organization Details", "Contact Person Details"] },
    { name: "Profile", tabs: ["Security", "Additional Settings"] },
  ];
  const [activeTab, setActiveTab] = useState(tabGroups[0].tabs[0]);

  const TabsGroup = ({ name, tabs }) => {
    return (
      <div className="p-4">
        <div className="flex space-x-2 font-medium text-gray-500 text-base items-center">
          <RiBuilding4Line />
          <h1 className="">{name}</h1>
        </div>
        <ul className="flex flex-col space-y-2 py-4 ml-6 font-medium">
          {tabs?.map((tab, idx) => {
            return <Tab name={tab} index={idx} />;
          })}
        </ul>
      </div>
    );
  };

  const Tab = ({ name, index }) => {
    return (
      <li
        className={activeTab === name ? active : navItem}
        onClick={() => {
          setActiveTab(name);
        }}
        key={index}
      >
        {name}
      </li>
    );
  };

  const returnComponent = (active) => {
    switch (active) {
      case "Organization Details":
        return <OrganizationDetails />

      case "Security":
        return <Security />

      case "Contact Person Details":
        return <POCDetails/>

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
