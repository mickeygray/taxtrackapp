import React, { useEffect, useState, useContext } from "react";
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
import AuthContext from "./context/auth/authContext";

const App = () => {
 // Run this effect only once on the initial mount

 // Run this effect whenever the clientId changes

 return (
  <GoogleOAuthProvider
   clientId={
    "228458250661-snd3uf70bgrdekaqv5db1us3v1nlrovg.apps.googleusercontent.com "
   }>
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
