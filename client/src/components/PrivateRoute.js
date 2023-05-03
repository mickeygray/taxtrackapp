import React, { useContext } from "react";

import AuthContext from "../context/auth/authContext";
import Login from "./Login";

const PrivateRoute = ({ component: Component }) => {
 const authContext = useContext(AuthContext);

 const { isAuthenticated, profile } = authContext;

 if (isAuthenticated === true && profile !== null) return <Component />;
 if (isAuthenticated === false) return <Login />;
};

export default PrivateRoute;
