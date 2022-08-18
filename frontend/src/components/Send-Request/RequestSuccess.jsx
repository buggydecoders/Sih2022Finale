import React from "react";
import DoneImg from "../../assets/illustrations/done.svg";
import { useNavigate } from "react-router-dom";

const RequestSuccess = ({ successId }) => {
  const navigate = useNavigate();
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center">
      <img src={DoneImg} className="w-[350px] mx-auto" />
      <div className="mt-8 text-2xl font-bold text-center text-primary">
        Your resource request has been made successfully⭐
      </div>
      <button
        onClick={() => navigate(`/status/${successId}`)}
        className="mt-6 bg-primary text-white font-semibold rounded-md px-5 py-3 w-fit "
      >
        Check Status
      </button>
    </div>
  );
};

export default RequestSuccess;
