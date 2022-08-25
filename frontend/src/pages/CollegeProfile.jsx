import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import BannerAndProfile from "../components/CollegeProfile/BannerAndProfile";
import ContactInfo from "../components/CollegeProfile/ContactInfo";
import Resources from "../components/CollegeProfile/Resources";
import SideBarInformation from "../components/CollegeProfile/SideBarInformation";
import useQueryParams from "../hooks/useQueryParams";
import { serverInstance } from "../utils/serverInstance";

const CollegeProfile = () => {
  const [fetchedUser, setFetchedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const fetchUserData = async () => {
    try {
      setLoading(true);
      const {slug} = params;
      const fetchedData = await serverInstance.get(
        `/auth/get-institute/${slug}`
      );
      setFetchedUser(fetchedData.data.institute);
    } catch (err) {
      console.log(err);
      navigate("/not-found");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <Layout>
        {loading?<div>Loading...</div>:
      <div className="p-4 gap-6 bg-lightGray grid grid-cols-[4fr_1.3fr]">
        <div className="">
          <BannerAndProfile user={fetchedUser} />
          <ContactInfo user={fetchedUser}/>
          <Resources user={fetchedUser}/>
        </div>
        <SideBarInformation user={fetchedUser}/>
      </div>}
    </Layout>
  );
};

export default CollegeProfile;
