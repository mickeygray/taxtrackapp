import React, { useState, useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/auth/authContext";
import { encode as base64_encode } from "base-64";

const Login = () => {
 const authContext = useContext(AuthContext);

 const {
  isAuthenticated,
  loadToken,
  loadProfile,
  pinLogin,
  forgetDevice,
  rememberDevice,
  otp,
 } = authContext;
 const [ssnString, setSsnString] = useState("");
 const [accessCode, setAccessCode] = useState("");
 const [remember, setRemember] = useState(false);
 const [pin, setPin] = useState("");

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
   loadProfile(encryptedString);
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
  pinLogin(encryptedPin, ttuid);
 };
 const [ttuid, setTtuid] = useState(null);
 useEffect(() => {
  setTtuid(localStorage.getItem("ttuid"));
 }, []);

 if (isAuthenticated) return <Navigate to='/' />;

 return (
  <div className='form-container all-center' style={{ width: "500px" }}>
   <h1>Welcome To Tax Track Beta</h1>
   {ttuid !== null && (
    <>
     <form onSubmit={onSubmit4}>
      <div className='form-group'>
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
     <div>
      {" "}
      <button onClick={() => forgetDevice()}>Forget This Device</button>
     </div>
    </>
   )}
   {otp === null && ttuid === null && (
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

   {otp !== null && ttuid === null && (
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
      Remember This Device
      <input
       type='checkbox'
       checked={remember === true}
       onChange={() => setRemember((prevState) => !prevState)}
      />
     </label>

     {remember === true && (
      <div>
       <h2>
        Please Set A Pincode to Access Tax Track Directly From This Device
       </h2>
       <input type='password' onChange={(e) => setPin(e.target.value)} />
      </div>
     )}
     <input
      type='submit'
      value={remember === true ? "Remember Device" : "Login With OTP"}
      className='btn btn-primary btn-block'
     />
    </form>
   )}
  </div>
 );
};

export default Login;
