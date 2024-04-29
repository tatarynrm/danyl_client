
import { Navigate, Outlet } from "react-router-dom";

import { useSelector } from "react-redux";
import { useEffect } from "react";


const PrivateRoutes = ({ children }) => {
  const token = window.localStorage.getItem("token");
  const isAuth = useSelector((state) => state.auth.isAuth);

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
