import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";

import { usePasswordValidation } from "../../utils/usePasswordValidation";
const PasswordCreator = () => {
 const authContext = useContext(AuthContext);

 const {
  email,
  clearEmail,
  clearOtp,

  savePin,
  otp,
 } = authContext;

 //SSN String Creation
 const [code, setCode] = useState("");
 const [ssn, setSsn] = useState("");
 const [emailAddress, setEmail] = useState("");
 const [resetCode, setResetCode] = useState("");
 const [matchCode, setMatchCode] = useState("");

 useEffect(() => {
  if (email != null) {
   setEmail(email);
   clearEmail();
   setPinState((prevState) => !prevState);
  }
 }, [email, authContext]);

 useEffect(() => {
  if (otp != null) {
   setResetCode(otp);
   clearOtp();
   setResetState((prevState) => !prevState);
  }
 }, [otp, authContext]);

 //Pin String Creation

 const [pin, setPin] = useState({ firstPassword: "", secondPassword: "" });

 const [validLength, hasNumber, upperCase, lowerCase, match, specialChar] =
  usePasswordValidation({
   firstPassword: pin.firstPassword,
   secondPassword: pin.secondPassword,
  });

 const [pinString, setPinString] = useState("");

 const onChangePin = (e) => {
  setPin({ ...pin, [e.target.name]: e.target.value });
 };

 //State Management
 const [pinState, setPinState] = useState(false);
 const [passwordState, setPasswordState] = useState(true);
 const [secondPasswordState, setSecondPasswordState] = useState(true);
 const [registerState, setRegisterState] = useState(false);
 const [resetState, setResetState] = useState(false);

 //Save Password
 const onPin = (e) => {
  e.preventDefault();
  setPinString(
   validLength === true &&
    hasNumber === true &&
    upperCase === true &&
    lowerCase === true &&
    match === true &&
    specialChar === true &&
    pin.firstPassword
  );
  if (pinString.length > 0) {
   savePin(emailAddress, pinString);
   setPinState((prevState) => !prevState);
   setRegisterState((prevState) => !prevState);
  }
 };

 return (
  <form onSubmit={onPin}>
   <>
    <div className='card' style={{ width: "300px" }}>
     <label htmlFor='Email'>Your Email Address</label>
     <input
      type='email'
      name='emailAddress'
      value={emailAddress}
      onChange={(e) => setEmail(e.target.value)}
     />
     <h2>Please Enter A Secure Password</h2>
     <ul>
      <li>
       {pin.firstPassword.length >= 12 && <i className='fa-solid fa-check' />}
       At least 12 characters
       {pin.firstPassword.length > 0 &&
        pin.firstPassword.length < 12 &&
        `     ${pin.firstPassword.length}/12`}
      </li>
      <li>
       {" "}
       {upperCase === true && <i className='fa-solid fa-check' />} A Capital
       Letter
      </li>
      <li>
       {lowerCase === true && <i className='fa-solid fa-check' />}A Lower Case
       Letter
      </li>
      <li>
       {specialChar === true && <i className='fa-solid fa-check' />}A Special
       Character
      </li>
      <li>
       {hasNumber === true && <i className='fa-solid fa-check' />}A Number
      </li>
     </ul>
     {match === false && pin.secondPassword.length > 0 && (
      <i>Please ensure your passwords match.</i>
     )}
     <div className='all-center'>
      <div className='grid-2d'>
       <input
        style={{ width: "200px" }}
        name='firstPassword'
        value={pin.firstPassword}
        minLength={12}
        required
        type={passwordState === true ? "password" : "text"}
        onChange={onChangePin}
       />

       <button
        style={{ height: "10px", width: "10px" }}
        className='btn btn-sm'
        onClick={() => setPasswordState((prevState) => !prevState)}>
        <i className='fa-solid fa-eye'></i>
       </button>
      </div>
      <i>Please Reenter Your Password</i>
      <div className='grid-2d'>
       <input
        style={{ width: "200px" }}
        name='secondPassword'
        value={pin.secondPassword}
        onPaste={() => {
         return false;
        }}
        onDrop={() => {
         return false;
        }}
        autoComplete='off'
        minLength={12}
        required
        type={secondPasswordState === true ? "password" : "text"}
        onChange={onChangePin}
       />

       <button
        style={{ height: "10px", width: "10px" }}
        className='btn btn-sm'
        onClick={() => setSecondPasswordState((prevState) => !prevState)}>
        <i className='fa-solid fa-eye'></i>
       </button>
      </div>
     </div>

     <input
      type='submit'
      value='Reset Password'
      className='btn btn-primary btn-block'
     />
     <button
      className='btn btn-primary btn-block'
      onClick={() => {
       setPinState(false) && setResetState(false);
      }}>
      Start Over
     </button>
    </div>
   </>
  </form>
 );
};

export default PasswordCreator;
