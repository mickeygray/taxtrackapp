import React, { useContext, useState } from "react";
import AuthContext from "../../context/auth/authContext";
import { usePasswordValidation } from "../../utils/usePasswordValidation";
import {
 Typography,
 Button,
 Card,
 CardContent,
 TextField,
} from "@mui/material";
import styled from "styled-components";

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

const ValidationList = styled.ul`
 list-style: none;
 padding: 0;
 margin: 0;
`;

const ValidationItem = styled.li`
 color: ${(props) => (props.isValid ? "green" : "red")};
`;

const PasswordCreator = ({ email, isAdmin }) => {
 const { savePin, saveAdminPin } = useContext(AuthContext);
 const [pin, setPin] = useState({ firstPassword: "", secondPassword: "" });
 const [validLength, hasNumber, upperCase, lowerCase, match, specialChar] =
  usePasswordValidation({
   firstPassword: pin.firstPassword,
   secondPassword: pin.secondPassword,
  });

 const onChangePin = (e) => {
  setPin({ ...pin, [e.target.name]: e.target.value });
 };

 const onSubmit = async (e) => {
  e.preventDefault();
  if (
   match &&
   validLength &&
   hasNumber &&
   upperCase &&
   lowerCase &&
   specialChar
  ) {
   if (isAdmin) {
    // Call saveAdminPin for admin users
    await saveAdminPin(email, pin.firstPassword);
   } else {
    // Call savePin for client profiles
    await savePin(email, pin.firstPassword);
   }
   // Reset form or redirect user
  } else {
   // Show error or validation feedback
  }
 };
 return (
  <CustomCard>
   <CardContent>
    <Typography variant='h6'>Create Your Password</Typography>
    <CustomTextField
     label='Password'
     variant='outlined'
     type='password'
     name='firstPassword'
     value={pin.firstPassword}
     onChange={onChangePin}
     fullWidth
    />
    <CustomTextField
     label='Confirm Password'
     variant='outlined'
     type='password'
     name='secondPassword'
     value={pin.secondPassword}
     onChange={onChangePin}
     fullWidth
    />
    <ValidationList>
     <ValidationItem isValid={validLength}>
      At least 12 characters
     </ValidationItem>
     <ValidationItem isValid={hasNumber}>Includes a number</ValidationItem>
     <ValidationItem isValid={upperCase}>
      Includes an uppercase letter
     </ValidationItem>
     <ValidationItem isValid={lowerCase}>
      Includes a lowercase letter
     </ValidationItem>
     <ValidationItem isValid={specialChar}>
      Includes a special character
     </ValidationItem>
     <ValidationItem isValid={match}>Passwords match</ValidationItem>
    </ValidationList>
    <CustomButton variant='contained' onClick={onSubmit}>
     Create Password
    </CustomButton>
   </CardContent>
  </CustomCard>
 );
};

export default PasswordCreator;
