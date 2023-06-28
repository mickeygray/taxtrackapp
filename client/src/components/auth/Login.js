import React, { useState, useContext, useEffect, useCallback } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import RegistrationAuthenticator from "./RegistrationAuthenticator";
import LoginForm from "./LoginForm";
import ResetPassword from "./ResetPassword";
import AlertContext from "../../context/alert/alertContext";
import closingsignup from "../../images/closing-signup-updt-202210-2-png.png";
import herosubs from "../../images/envoy-home-hero-subs-icon-1-svg.svg";
import herosubs2 from "../../images/envoy-home-hero-subs-icon-6-png.png";

const Login = () => {
 const authContext = useContext(AuthContext);
 const { error, clearErrors, profileAuthenticated, userAuthenticated } =
  authContext;
 const alertContext = useContext(AlertContext);
 const { setAlert } = alertContext;

 const [registerState, setRegisterState] = useState(false);
 const [resetState, setResetState] = useState(false);

 const toggleRegister = useCallback(() => {
  setRegisterState((prevState) => !prevState);
 }, []);

 const toggleReset = useCallback(() => {
  setResetState((prevState) => !prevState);
 }, []);

 useEffect(() => {
  if (error != null) {
   setAlert(error, "danger");
   clearErrors();
  }
 }, [error, authContext, setAlert]);

 if (profileAuthenticated) return <Navigate to='/home' />;
 if (userAuthenticated) return <Navigate to='/backend' />;

 return (
  <div>
   <div className='login-page'>
    <div className='div'>
     <div className='group'>
      <div className='overlap'>
       <div>
        {" "}
        <div>
         {registerState === false && resetState === false && <LoginForm />}

         {resetState === true && <ResetPassword toggleReset={toggleReset} />}

         {registerState === true && (
          <RegistrationAuthenticator toggleRegister={toggleRegister} />
         )}
        </div>
       </div>
      </div>
     </div>
     <div className='frame-4'>
      <h1 className='welcome-to-the-tax'>
       <span className='span'>
        Welcome to the
        <br />
       </span>
       <span className='text-wrapper-9'>Tax Track</span>
      </h1>
      <p className='p'>
       Invest spare change, invest while you bank, earn bonus investments, grow
       your knowledge and more.
      </p>
     </div>
     <div className='overlap-2'>
      <img
       className='closing-signup-updt'
       alt='Closing signup updt'
       src={closingsignup}
      />
      <img
       className='envoy-home-hero-subs'
       alt='Envoy home hero subs'
       src={herosubs}
      />
      <img className='img' alt='Envoy home hero subs' src={herosubs2} />
     </div>
    </div>
   </div>
  </div>
 );
};

export default Login;
