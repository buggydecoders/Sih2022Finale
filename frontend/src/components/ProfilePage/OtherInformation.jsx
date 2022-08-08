import React from "react";

function OtherInformation(props) {
  const { naacRating, reputationPoints, universityType } = props.data;
  return (
    <div className="w-full p-4 rounded-2xl bg-lightGray my-10">
      <h2 className="font-medium">Other Information</h2>
      <hr className="border border-1 w-20 bg-black" />
      <ul className="pt-4">
        <li>
          <b className="font-semibold text-sm pr-2">NAAC Rating:</b>
          {naacRating}
        </li>
        <li>
          <b className="font-semibold text-sm pr-2">Reputation Points:</b>
          {reputationPoints}
        </li>
        <li>
          <b className="font-semibold text-sm pr-2">University Type:</b>
          {universityType}
        </li>
      </ul>
    </div>
  );
}

export default OtherInformation;
