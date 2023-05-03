import React, { useState, useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/auth/authContext";
import { encode as base64_encode } from "base-64";
import logo from "../images/logo.png";

const Login = () => {
 const authContext = useContext(AuthContext);

 const {
  isAuthenticated,
  loadToken,
  loadProfile,
  verifyToken,
  pinLogin,
  forgetDevice,
  rememberDevice,
  otp,
 } = authContext;
 const [ssnString, setSsnString] = useState("");
 const [accessCode, setAccessCode] = useState("");
 const [remember, setRemember] = useState(false);
 const [pinState, setPinstate] = useState(false);
 const [otpState, setOtpstate] = useState(false);
 const [pin, setPin] = useState("");
 const [email, setEmail] = useState("");

 const onChange = (e) => setSsnString(e.target.value);

 const onSubmit = (e) => {
  const encryptedString = base64_encode(ssnString).split().reverse().toString();
  e.preventDefault();
  loadToken(encryptedString);
 };
 const onSubmit2 = (e) => {
  if (accessCode === otp) {
   e.preventDefault();
   const encryptedString = base64_encode(ssnString)
    .split()
    .reverse()
    .toString();
   verifyToken(encryptedString);
  } else {
   e.preventDefault();
  }
 };

 const onSubmit3 = (e) => {
  if (accessCode === otp) {
   e.preventDefault();
   const encryptedString = base64_encode(ssnString)
    .split()
    .reverse()
    .toString();
   rememberDevice(pin, encryptedString);
  }
 };

 const onSubmit4 = (e) => {
  e.preventDefault();
  const encryptedPin = base64_encode(pin).split().reverse().toString();
  pinLogin(encryptedPin, email);
  setPinstate((prevState) => !prevState);
 };

 if (isAuthenticated) return <Navigate to='/' />;

 return (
  <div className='form-container all-center' style={{ width: "500px" }}>
   <h1>
    <img src={logo} />
   </h1>
   {pinState === false && otpState === false && (
    <div className='grid-2'>
     <button
      className='btn btn-primary btn-sm'
      onClick={() => setPinstate((prevState) => !prevState)}>
      Login With Pin
     </button>
     <button
      className='btn btn-primary btn-sm'
      onClick={() => setOtpstate((prevState) => !prevState)}>
      Login With OTP
     </button>
    </div>
   )}
   {pinState === true && (
    <>
     <form onSubmit={onSubmit4}>
      <div className='form-group'>
       <label htmlFor='Social'>Email Address</label>
       <input
        id='email'
        type='email'
        name='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
       />
       <label htmlFor='Social'>Pin Code</label>
       <input
        id='pin'
        type='password'
        name='pin'
        value={pin}
        onChange={(e) => setPin(e.target.value)}
       />
      </div>
      <input
       type='submit'
       value='Login With Pin'
       className='btn btn-primary btn-block'
      />
     </form>
     <div></div>
    </>
   )}
   {pinState === false && otpState === true && otp === null && (
    <form onSubmit={onSubmit}>
     <div className='form-group'>
      <label htmlFor='Social'>Social Secruity Number</label>
      <input
       id='ssnString'
       type='password'
       name='ssnString'
       value={ssnString}
       onChange={onChange}
       required
      />
     </div>
     <input type='submit' value='Login' className='btn btn-primary btn-block' />
    </form>
   )}

   {pinState === false && otpState === true && otp !== null && (
    <form onSubmit={remember === true ? onSubmit3 : onSubmit2}>
     <div className='form-group'>
      <label htmlFor='Token'>Your One Time Access Code</label>
      <input
       id='accessCode'
       type='password'
       name='accessCode'
       value={accessCode}
       onChange={(e) => setAccessCode(e.target.value)}
       required
      />
     </div>

     <label>
      Set a Pincode
      <input
       type='checkbox'
       checked={remember === true}
       onChange={() => setRemember((prevState) => !prevState)}
      />
     </label>

     {remember === true && (
      <div className='card' style={{ width: "300px" }}>
       <h2>
        Please Set A Pincode to Access Tax Track Directly From This Device
       </h2>
       <input type='password' onChange={(e) => setPin(e.target.value)} />
      </div>
     )}
     <input
      type='submit'
      value={remember === true ? "Create Pin" : "Login With OTP"}
      className='btn btn-primary btn-block'
     />
    </form>
   )}
  </div>
 );
};

export default Login;
