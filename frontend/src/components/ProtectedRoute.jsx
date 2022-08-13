import React from "react";
import { Outlet, Navigate } from "react-router-dom";

//redux
import { useSelector } from "react-redux";

const ProtectedRoute = ({ restricted, access, scope }) => {
  const isLoggedin = useSelector((state) => state.auth).isLoggedin;
  const profile = useSelector((state) => state.auth).user;

  if (access === "public")
    return isLoggedin && restricted ? (
      <>
        {profile?.role === "admin" ? (
          <Navigate to="/admin" replace />
        ) : (
          <Navigate to="/profile" replace />
        )}
      </>
    ) : (
      <Outlet />
    );
  else if (access === "private")
    return isLoggedin ? (
      scope?.split(",")?.includes(profile?.role) ? (
        <Outlet />
      ) : (
        <>
          {profile?.role === "admin" ? (
            <Navigate to="/admin" replace />
          ) : (
            <Navigate to="/" replace />
          )}
        </>
      )
    ) : (
      <Navigate to="/login" />
    );
};

export default ProtectedRoute;
