import React, { useContext } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import AuthContext from "../context/auth/authContext";
import { Navigate } from "react-router-dom";

const EmployeeLogin = () => {
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

 if (isAuthenticated) return <Navigate to='/backend' />;
 return (
  <div className='bg-primary card '>
   {isAuthenticated === false ? (
    <div className='all-center' id='signInButton'>
     <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      buttonText='Login'
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={"single_host_origin"}
      isSignedIn={true}
     />
    </div>
   ) : (
    <span style={{ float: "right" }} id='signOutButton'>
     <GoogleLogout
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      buttonText='Log Out'
      onLogoutSuccess={onLogoutSuccess}
     />
    </span>
   )}

   {isAuthenticated === false ? (
    <div className='all-center'>
     {" "}
     <h3>Welcome To Tax Track</h3>
     <h4>Please authenticate your Anderson Bradshaw Work Email To Coninue</h4>
    </div>
   ) : (
    <div>
     <h2>ABCTaxTrack.com</h2>
     <h3>Hello {user.givenName}</h3>
    </div>
   )}
  </div>
 );
};
export default EmployeeLogin;
