
import React, { useEffect } from "react";
import Layout from "../components/Layout";
import Breadcrum from "../components/Breadcrum";
import ResourceOverview from "../components/ResourcePage/ResourceOverview";
import Description from "../components/ResourcePage/Description";
import SimilarResources from "../components/ResourcePage/SimilarResources";
import Accordian from "../components/ResourcePage/Accordian";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleResource } from "../store/resources/actions";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";

function Resource() {
  const { id } = useParams();
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchSingleResource(id))
  }, []);

  const { loading, resource } = useSelector(
    (state) => state.resources
  );

  if(loading==="FETCH-RESOURCE") return(
    <Loading/>
  );

  return (
    <Layout>
      <div className="p-10 flex flex-col w-full">
        <Breadcrum category={resource?.category} name={resource?.name} />
        <ResourceOverview resource={resource} />
        <Description description={resource?.description} descriptionImage={resource?.descriptionImage} />
        <SimilarResources similar={resource.similar} />
        <div className="p-10">
          <Accordian heading="Condition of Use" content={resource?.conditions || ""} _id="One" />
          <Accordian heading="Instructions" content={resource?.instructions || ""} _id="Two" />
        </div>
      </div>
    </Layout>
  );
}

export default Resource;
