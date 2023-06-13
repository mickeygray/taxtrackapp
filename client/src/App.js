import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ProfileState from "./context/profile/ProfileState";
import AuthState from "./context/auth/AuthState";
import "./App.css";
import Home from "./components/Home";
import ClientLogin from "./components/ClientLogin";
import EmployeeLogin from "./components/EmployeeLogin";
import TaxTrackBackEnd from "./components/TaxTrackBackEnd";
import PrivateRoute from "./components/PrivateRoute";
import BalanceTransactions from "./components/BalanceTransactions";

import { gapi } from "gapi-script";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const App = () => {
 useEffect(() => {
  const start = () => {
   gapi.client.init({
    clientId: clientId,
    scope: "",
   });
  };

  gapi.load("client:auth2", start);
 }, []);
 return (
  <AuthState>
   <ProfileState>
    <Router>
     <Routes>
      <Route exact path='/login' element={<ClientLogin />} />
      <Route exact path='/authorizedlogin' element={<EmployeeLogin />} />
      <Route path='/' element={<PrivateRoute component={Home} />} />
      <Route
       path='/backend'
       element={<PrivateRoute component={TaxTrackBackEnd} />}
      />
      <Route
       path='/balancetransactions'
       element={<PrivateRoute component={BalanceTransactions} />}
      />
     </Routes>
    </Router>
   </ProfileState>
  </AuthState>
 );
};

export default App;
