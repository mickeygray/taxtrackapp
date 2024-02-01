import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

import Spinner from "./Spinner";

const PrivateRoute = ({ component: Component }) => {
 const authContext = useContext(AuthContext);
 const { profileAuthenticated, userAuthenticated, loading } = authContext;

 console.log(profileAuthenticated);
 if (loading) return <Spinner />;

 if (profileAuthenticated || userAuthenticated) {
  return <Component />;
 }
 return <Navigate to='/' />;
};

export default PrivateRoute;
