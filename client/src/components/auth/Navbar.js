import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";
import goodbye from "../../images/goodbye.png";
import { useGoogleLogin } from "@react-oauth/google";
import { useLocation } from "react-router-dom";
import { Sign } from "crypto";
import authContext from "../../context/auth/authContext";

const Navbar = ({ toggleRegister }) => {
 const location = useLocation();
 const {
  clientId,
  profile,
  logout,
  profileAuthenticated,
  userAuthenticated,
  authenticateUser,
  getGoogleClientId,
  clearGoogleClientId,
 } = useContext(AuthContext);
 const { setAlert } = useContext(AlertContext);
 // Define your Google OAuth configuration

 // Handle successful Google login
 const handleGoogleLoginSuccess = async (response) => {
  try {
   authenticateUser(response.access_token);
  } catch (error) {
   setAlert(error.message, "error");
  }
 };

 // Handle Google login failure
 const handleGoogleLoginFailure = (error) => {
  setAlert(error.message, "error");
 };

 // Handle successful Google logout
 const handleGoogleLogoutSuccess = () => {};

 // Handle Google logout failure
 const handleGoogleLogoutFailure = (error) => {
  // Handle the error
  // e.g., display an error message, redirect to an error page, etc.
  // Example: show error message using setAlert
  setAlert(error.message, "error");
 };
 const signIn = useGoogleLogin({
  clientId: clientId,
  onSuccess: handleGoogleLoginSuccess,
  onFailure: handleGoogleLoginFailure,
  scope: "openid",
  responseType: "id_token",
  accessType: "offline",
 });
 useEffect(() => {
  if (clientId != null) {
   signIn();
   clearGoogleClientId();
  }
 }, [clientId, authContext]);

 return (
  <div className='nav navbar grid-2 bg-primary' style={{ height: "187px" }}>
   <div className='m-2'>
    <Link to='/'>
     <img
      src={logo}
      alt='Tax Track'
      style={{ height: "100px", width: "100px" }}
     />
    </Link>

    <h5>
     Welcome To Tax Track <br /> {profileAuthenticated && profile.fullName}
    </h5>
   </div>
   <div className='p-2 m-2'>
    <span style={{ float: "right" }}>
     {profileAuthenticated || userAuthenticated ? (
      <a onClick={() => logout()}>
       <img
        src={goodbye}
        style={{ borderRadius: "50%", height: "100px", width: "100px" }}
        alt='Logout'
       />
      </a>
     ) : (
      <>
       {location.pathname === "/login" && (
        <ul>
         <li>
          {" "}
          <button className='btn btn-primary' onClick={toggleRegister}>
           <i className='fa fa-user-plus' aria-hidden='true'></i> Register New
           Account
          </button>
         </li>
         <li>
          <button
           className='btn btn-primary'
           onClick={() => getGoogleClientId()}>
           <i className='fa fa-sign-in' aria-hidden='true'></i> Adminstrative
           Login
          </button>
         </li>
        </ul>
       )}
       {location.pathname === "/" && (
        <Link to='/login' className='btn btn-primary'>
         Login To Tax Track
        </Link>
       )}
      </>
     )}
    </span>
    <br />
    <br />
   </div>
  </div>
 );
};

export default Navbar;
