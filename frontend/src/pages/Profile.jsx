import React from "react";
import Navbar from "../components/Navbar";
import OtherInformation from "../components/ProfilePage/OtherInformation";
import ProfileCard from "../components/ProfilePage/ProfileCard";

function Profile() {
  const data = {
    naacRating: "A++",
    reputationPoints: "4+",
    universityType: "State University",
  };

  return (
    <div>
      <Navbar />
      <div className="py-10 flex w-11/12 mx-auto">
        <div className="flex flex-col w-2/3">
          <div className="flex justify-between">
            <ProfileCard
              for="Resources"
              main={150}
              sub="Resources"
              achievement={3}
            />
            <ProfileCard
              for="Resources"
              main={150}
              sub="Resources"
              achievement={3}
            />
            <ProfileCard
              for="Resources"
              main={150}
              sub="Resources"
              achievement={3}
            />
          </div>

          <OtherInformation data={data} />
        </div>
      </div>
    </div>
  );
}

export default Profile;
