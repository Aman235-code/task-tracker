import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../store/auth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useUser();

  if (loading) return <div>Loading...</div>;

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
