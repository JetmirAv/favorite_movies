import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getAuth } from "../../store/authSlice";
import { useAppSelector } from "../../store/hooks";

const AuthRoute: React.FC = () => {
  const { user } = useAppSelector(getAuth);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default AuthRoute;
