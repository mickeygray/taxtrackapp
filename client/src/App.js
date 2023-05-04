import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ProfileState from "./context/profile/ProfileState";
import AuthState from "./context/auth/AuthState";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Login2 from "./components/Login2";
import TaxTrackBackEnd from "./components/TaxTrackBackEnd";
import PrivateRoute from "./components/PrivateRoute";
import BalanceTransactions from "./components/BalanceTransactions";

import { gapi } from "gapi-script";

const clientId =
 "228458250661-snd3uf70bgrdekaqv5db1us3v1nlrovg.apps.googleusercontent.com";
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
      <Route exact path='/login' element={<Login />} />
      <Route exact path='/authorizedlogin' element={<Login2 />} />
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
