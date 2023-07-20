import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ProfileState from "./context/profile/ProfileState";
import AuthState from "./context/auth/AuthState";
import "./App.css";
import Home from "./components/frontend/Home";
import Login from "./components/auth/Login";
import Navbar from "./components/auth/Navbar";
import Alerts from "./components/auth/Alerts";
import TaxTrackBackEnd from "./components/backend/TaxTrackBackEnd";
import PrivateRoute from "./components/auth/PrivateRoute";
import AlertState from "./context/alert/AlertState";
import { gapi } from "gapi-script";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Landing from "./components/frontend/Landing";
import axios from "axios";
import Profile from "./components/frontend/Home";

const App = () => {
 const [clientId, setClientId] = useState("");

 useEffect(() => {
  const getGoogleClientId = async () => {
   try {
    const res = await axios.get("/api/auth/env");
    setClientId(res.data);
   } catch (err) {
    console.error(err);
   }
  };
  getGoogleClientId();
 }, []); // Run this effect only once on the initial mount

 useEffect(() => {
  if (clientId.length > 0) {
   const start = () => {
    gapi.client.init({
     clientId: clientId,
     scope: "",
    });
   };
   gapi.load("client:auth2", start);
  }
 }, [clientId]); // Run this effect whenever the clientId changes

 return (
  <GoogleOAuthProvider clientId={clientId}>
   <AuthState>
    <ProfileState>
     <AlertState>
      <Router>
       <Navbar />
       <div className='all-center'>
        <Alerts />
       </div>
       <Routes>
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/' element={<Landing />} />
        <Route path='/home' element={<PrivateRoute component={Home} />} />
        <Route
         path='/backend'
         element={<PrivateRoute component={TaxTrackBackEnd} />}
        />
       </Routes>
      </Router>
     </AlertState>
    </ProfileState>
   </AuthState>
   {/* Note: You cannot have any comment here, as it's not a valid JSX syntax */}
  </GoogleOAuthProvider>
 );
};

export default App;
