import React from "react";
import ResourceCard from "../ResourceCard";

function ResourcesList(props) {
  return (
    <div className={"flex flex-col"}>
      <div className="grid grid-cols-4">
        {props.resources?.map((resource, index) => {
          return <ResourceCard data={resource} draft={props.draft}/>;
        })}
      </div>
    </div>
  );
}

export default ResourcesList;
