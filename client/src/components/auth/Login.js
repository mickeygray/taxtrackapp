import React, { useContext, useState, useEffect } from "react";
import {
 Grid,
 Card,
 CardContent,
 TextField,
 Button,
 Typography,
} from "@mui/material";
import styled from "styled-components";
import { Navigate } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";
import Base64 from "crypto-js/enc-base64";
import OTPFlow from "./OTPFlow";

const GridContainer = styled(Grid)`
 display: grid;
 place-items: center;
 padding: 20px;
`;

const ContentArea = styled.div`
 position: relative; // Set position to relative
 max-width: 500px;
 width: 100%;
 text-align: center;
`;

const ImageFormWrapper = styled.div`
 position: relative; // Set position to relative
`;

const DesignImage = styled.img`
 position: absolute;
 max-width: 100%;
 width: 500px;
 height: 600px;
 opacity: 0.5;
 z-index: 1;
 left: calc(50% - 260px);
`;

const TextContent = styled.div`
 position: absolute;
 left: 50%;
 transform: translate(-50%, 150%);
 top: 100px;
 z-index: 2; // Ensure it's below the form
 color: black; // Optional: Change text color for visibility
 text-shadow: 0px 0px 8px rgba(0, 0, 0, 0.8); // Optional: Add text shadow for readability
`;

const LoginFormWrapper = styled(Card)`
 && {
  // Increase specificity
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 360px;
  padding: 20px;
  z-index: 3;
  background-color: transparent !important; // Ensure override
  box-shadow: none !important; // Ensure override
  border: none !important; // Ensure override
 }
`;
const SubmitButton = styled.input`
 width: 100%;
 background-color: #3f51b5; // Color for the primary variant
 color: white;
 padding: 10px 15px;
 margin: 8px 0;
 border: none;
 border-radius: 4px;
 cursor: pointer;
 font-size: 0.875rem;
 text-transform: uppercase;
 &:hover {
  background-color: #303f9f; // Darken the color slightly on hover
 }
 &:focus {
  outline: none; // Remove the default outline on focus
 }
`;

const CustomTextField = styled(TextField)`
 && {
  background-color: transparent; // Initial background color
  color: #fff; // Set the initial text color for contrast
  transition: background-color 0.3s; // Smooth transition for background color

  .MuiInputBase-input {
   // Style the input text
   color: #000; // Text color
  }

  &:focus-within {
   // Apply this style when the TextField is focused
   background-color: white; // Change background color to white

   .MuiOutlinedInput-notchedOutline {
    // Change the border color if needed
    border-color: #3f51b5; // Example: Change border color to match primary color
   }

   .MuiInputBase-input {
    // Style the input text for focused state
    color: #000; // Ensure the text color is visible on white background
   }
  }
 }
`;

const Login = () => {
 const {
  pinLogin,
  adminLogin,
  profileAuthenticated,
  userAuthenticated,
  rememberMe,
  toggleIsAdmin,
  isAdmin,
 } = useContext(AuthContext);
 const { setAlert } = useContext(AlertContext);

 const [pin, setPin] = useState({ password: "", email: "" });
 const [showOTPFlow, setShowOTPFlow] = useState(false);

 useEffect(() => {
  if (rememberMe) {
   const storedPin = localStorage.getItem("rememberedPin");
   if (storedPin) {
    setPin(JSON.parse(Base64.parse(storedPin)));
   }
  }
 }, [rememberMe]);

 const onChangePin = (e) => setPin({ ...pin, [e.target.name]: e.target.value });

 const onLogin = (e) => {
  e.preventDefault();
  if (pin.email === "" || pin.password === "") {
   setAlert("Please fill in all fields", "danger");
  } else {
   isAdmin ? adminLogin(pin) : pinLogin(pin);
  }
 };

 if (profileAuthenticated) return <Navigate to='/home' />;
 if (userAuthenticated) return <Navigate to='/admin/home' />;
 return (
  <GridContainer>
   <ContentArea>
    <ImageFormWrapper>
     <DesignImage
      src={process.env.PUBLIC_URL + "/images/Chart1.png"}
      alt='Tax Track'
     />
     {!showOTPFlow ? (
      <LoginFormWrapper>
       <form style={{ background: "none" }} onSubmit={onLogin}>
        <CustomTextField
         label='Email'
         variant='outlined'
         name='email'
         fullWidth
         margin='normal'
         value={pin.email}
         onChange={onChangePin}
        />
        <CustomTextField
         label='Password'
         variant='outlined'
         name='password'
         fullWidth
         margin='normal'
         type='password'
         value={pin.password}
         onChange={onChangePin}
        />
        <SubmitButton
         type='submit'
         value={isAdmin ? "Admin Log In" : "Log In"}
        />
       </form>
       <Button variant='contained' onClick={() => setShowOTPFlow(true)}>
        {isAdmin ? "Register New Admin" : "Complete Tax Hub Profile"}
       </Button>
      </LoginFormWrapper>
     ) : (
      <OTPFlow isAdmin={isAdmin} />
     )}
    </ImageFormWrapper>
    {!showOTPFlow && (
     <TextContent>
      <Typography variant='h4' gutterBottom>
       Welcome to Tax Track
      </Typography>
      <Typography variant='subtitle1' gutterBottom>
       Track your IRS information, manage finances, and stay informed.
      </Typography>
     </TextContent>
    )}
   </ContentArea>
  </GridContainer>
 );
};

export default Login;
