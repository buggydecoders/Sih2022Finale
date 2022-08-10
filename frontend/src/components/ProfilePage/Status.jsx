import React from "react";
import StatusCard from "./StatusCard";

function Status() {
  return (
    <div className="flex justify-between">
      <StatusCard for="Resources" main={150} sub="Resources" achievement={3} icon={1}/>
      <StatusCard
        for="Total Revenue"
        main={4500}
        sub="Total Revenue"
        achievement={3}
        icon={2}
      />
      <StatusCard for="Resources" main={150} sub="Resources" achievement={3} icon={3}/>
    </div>
  );
}

export default Status;
