import React, { useState, useContext, useEffect, useCallback } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import RegistrationAuthenticator from "./RegistrationAuthenticator";
import styled, { css, keyframes } from "styled-components";
import LoginForm from "./LoginForm";
import ResetPassword from "./ResetPassword";
import AlertContext from "../../context/alert/alertContext";

const GridContainer = styled.div`
 display: grid;
 grid-template-columns: 1fr 1fr;
 gap: 20px;
 max-width: 1200px;
 margin: auto;
`;

const DesignWrapper = styled.div`
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center;
`;

const DesignImage = styled.img`
 width: 100%;
 max-width: 400px;
 opacity: 0.7;
 margin-top: 20px;
`;

const LoginPage = styled.div`
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center;
`;

const LoginFormWrapper = styled.div`
 text-align: center;
 margin-top: 50px;
`;

const Heading = styled.h1`
 font-size: 40px;
 font-weight: bold;
`;

const SubHeading = styled.p`
 font-size: 20px;
`;

const ContentOverlay = styled.div`
 position: absolute;
 top: 45%;
 left: 35%;
 transform: translate(-50%, -50%);
 text-align: center;
 z-index: 1;
`;
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
  <GridContainer>
   <DesignWrapper>
    {" "}
    <DesignImage
     className='envoy-home-hero-subs'
     alt='Envoy home hero subs'
     src={process.env.PUBLIC_URL + "/images/Chart1.png"}
     style={{ height: "400px", width: "300px" }}
    />
    <ContentOverlay>
     <Heading>
      <span>Welcome to Tax Track</span>
     </Heading>
     <SubHeading>
      Track your IRS information, manage finances, and stay informed.
     </SubHeading>
    </ContentOverlay>
   </DesignWrapper>
   <LoginPage>
    <LoginFormWrapper>
     {" "}
     <div>
      {registerState === false && resetState === false && <LoginForm />}

      {resetState === true && <ResetPassword toggleReset={toggleReset} />}

      {registerState === true && (
       <RegistrationAuthenticator toggleRegister={toggleRegister} />
      )}
     </div>
    </LoginFormWrapper>
   </LoginPage>
  </GridContainer>
 );
};

export default Login;
