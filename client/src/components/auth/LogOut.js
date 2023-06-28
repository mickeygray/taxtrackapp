import React, { useContext } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import AuthContext from "../../context/auth/authContext";
import { Navigate } from "react-router-dom";
const clientid =
 "228458250661-snd3uf70bgrdekaqv5db1us3v1nlrovg.apps.googleusercontent.com";

const LogOut = () => {
 const authContext = useContext(AuthContext);
 const { user, loadUser, isAuthenticated, logout } = authContext;

 const onSuccess = (res) => {
  loadUser(res);
 };

 const onLogoutSuccess = () => {
  logout();
 };
 const onFailure = (res) => {
  console.log("login failure res:", res);
 };

 return (
  <div className='bg-primary card '>
   <span style={{ float: "right" }} id='signOutButton'>
    <GoogleLogout
     clientId={clientid}
     buttonText='Log Out'
     onLogoutSuccess={onLogoutSuccess}
    />
   </span>

   <div>
    <h2>ABCTaxTrack.com</h2>
    <h3>Hello {user.givenName}</h3>
   </div>
  </div>
 );
};

export default LogOut;
