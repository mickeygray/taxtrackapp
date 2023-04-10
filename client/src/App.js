import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ProfileState from "./context/profile/ProfileState";
import AuthState from "./context/auth/AuthState";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import BalanceTransactions from "./components/BalanceTransactions";
import TaxReturns from "./components/TaxReturns";
import TaxPlanning from "./components/TaxPlanning";
const App = () => {
 return (
  <AuthState>
   <ProfileState>
    <Router>
     <Routes>
      <Route exact path='/login' element={<Login />} />
      <Route path='/' element={<PrivateRoute component={Home} />} />
      <Route
       path='/balancetransactions'
       element={<PrivateRoute component={BalanceTransactions} />}
      />
      <Route
       path='/taxreturns'
       element={<PrivateRoute component={TaxReturns} />}
      />
      <Route
       path='/taxplanning'
       element={<PrivateRoute component={TaxPlanning} />}
      />
     </Routes>
    </Router>
   </ProfileState>
  </AuthState>
 );
};

export default App;
