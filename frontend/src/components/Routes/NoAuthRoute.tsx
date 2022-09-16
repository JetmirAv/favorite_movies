import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getAuth } from "../../store/authSlice";
import { useAppSelector } from "../../store/hooks";

const NoAuthRoute: React.FC = () => {
  const { user } = useAppSelector(getAuth);

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default NoAuthRoute;
