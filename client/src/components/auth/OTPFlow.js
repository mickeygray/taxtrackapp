import React, { useState, useContext } from "react";
import AuthContext from "../../context/auth/authContext";
import {
 Typography,
 Button,
 Card,
 CardContent,
 TextField,
} from "@mui/material";
import styled from "styled-components";
import PasswordCreator from "./PasswordCreator"; // Ensure this path is correct

// Assuming these styles are similar to the ones in your Login component
const CustomCard = styled(Card)`
 && {
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 360px;
  padding: 20px;
  z-index: 3;
  background-color: transparent !important;
  box-shadow: none !important;
  border: none !important;
 }
`;

const CustomTextField = styled(TextField)`
 && {
  background-color: transparent;
  color: #fff;
  transition: background-color 0.3s;
  margin: 10px 0;

  .MuiInputBase-input {
   color: #000;
  }

  &:focus-within {
   background-color: white;
   .MuiOutlinedInput-notchedOutline {
    border-color: #3f51b5;
   }
   .MuiInputBase-input {
    color: #000;
   }
  }
 }
`;

const CustomButton = styled(Button)`
 && {
  margin: 10px 0;
  background-color: #3f51b5;
  &:hover {
   background-color: #303f9f;
  }
 }
`;
const Container = styled.div`
 display: flex;
 justify-content: center;
 align-items: center;
 height: 100vh;
`;

const OTPFlow = () => {
 const {
  sendOtp,
  sendAdminOtp,
  verifyOtp,
  verifyAdminOtp,
  otpSent,
  adminOtpSent,
  userVerified,
  adminVerified,
  isAdmin,
 } = useContext(AuthContext);

 const [email, setEmail] = useState("");
 const [clientOtp, setClientOtp] = useState("");

 // Choose the appropriate states and functions based on isAdmin
 const otpHasBeenSent = isAdmin ? adminOtpSent : otpSent;
 const userHasBeenVerified = isAdmin ? adminVerified : userVerified;
 const handleSendOtp = isAdmin
  ? () => sendAdminOtp(email)
  : () => sendOtp(email);
 const handleVerifyOtp = isAdmin
  ? () => verifyAdminOtp(email, clientOtp)
  : () => verifyOtp(email, clientOtp);

 return (
  <Container>
   {!otpHasBeenSent && (
    <CustomCard>
     <CardContent>
      <Typography variant='h5'>
       Register New {isAdmin ? "Admin" : "User"}{" "}
      </Typography>
      <CustomTextField
       label='Email Address'
       fullWidth
       value={email}
       onChange={(e) => setEmail(e.target.value)}
      />
      <CustomButton variant='contained' onClick={handleSendOtp}>
       Send OTP
      </CustomButton>
     </CardContent>
    </CustomCard>
   )}

   {otpHasBeenSent && !userHasBeenVerified && (
    <CustomCard>
     <CardContent>
      <Typography variant='h5'>Enter OTP</Typography>
      <CustomTextField
       label='OTP'
       fullWidth
       value={clientOtp}
       onChange={(e) => setClientOtp(e.target.value)}
      />
      <CustomButton variant='contained' onClick={handleVerifyOtp}>
       Verify OTP
      </CustomButton>
     </CardContent>
    </CustomCard>
   )}

   {userHasBeenVerified && (
    // Use the PasswordCreator component for creating a secure password
    <PasswordCreator email={email} isAdmin={isAdmin} />
   )}
  </Container>
 );
};

export default OTPFlow;
