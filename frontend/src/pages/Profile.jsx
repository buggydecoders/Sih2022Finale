import React from "react";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import AllResources from "../components/ProfilePage/AllResources";
import Location from "../components/ProfilePage/Location";
import OtherInformation from "../components/ProfilePage/OtherInformation";
import POC from "../components/ProfilePage/POC";
import ProfileCard from "../components/ProfilePage/ProfileCard";
import Status from "../components/ProfilePage/Status";

function Profile() {
  const data = {
    naacRating: "A++",
    reputationPoints: "4+",
    universityType: "State University",
  };

  return (
    <Layout>
      {/* <Navbar /> */}
      <div className="py-10 flex w-11/12 mx-auto justify-between">
        <div className="flex flex-col w-3/4">
          <Status/>
          <OtherInformation data={data} />
          <AllResources />
        </div>

        <div className="px-10 ml-8 border-l-2 boder border-gray-200 flex flex-col items-center w-1/4">
          <ProfileCard/>
          <POC/>
          <Location/>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
