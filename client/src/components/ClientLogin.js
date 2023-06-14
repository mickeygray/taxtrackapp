import React, { useState, useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/auth/authContext";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";

import { usePasswordValidation } from "../utils/usePasswordValidation";

const ClientLogin = () => {
 const authContext = useContext(AuthContext);

 const {
  isAuthenticated,
  verifyAccount,
  email,
  clearEmail,
  clearOtp,
  pinLogin,
  savePin,
  otp,
  resetPassword,
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

 const onChangeSsn = (e) => {
  setSsn(e.target.value);
 };

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

 //Create The 2FA Token With Encoded SSN String
 const onSsn = (e) => {
  e.preventDefault();

  verifyAccount({ code, ssn });
  setSsn("");
 };

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

 //Login
 const onLogin = (e) => {
  e.preventDefault();
  pinLogin(pin.firstPassword, emailAddress);
 };

 const onReset = (e) => {
  e.preventDefault();
  savePin(emailAddress, pinString);
 };
 if (isAuthenticated) return <Navigate to='/' />;

 return (
  <>
   <div
    className='grid-2'
    style={{ backgroundColor: "#7cde31", height: "187px" }}>
    <div className='m-2'>
     <Link to='/'>
      <img
       src={logo}
       alt='Tax Track'
       style={{ height: "100px", width: "100px" }}
      />
     </Link>
     <h5>Welcome To Tax Track</h5>
    </div>
    <div className='p-2 m-2'>
     <span style={{ float: "right" }}>
      {" "}
      {registerState === false && (
       <button
        className='btn btn-primary'
        onClick={() => setRegisterState((prevState) => !prevState)}>
        {registerState === false
         ? "Register New Account"
         : "Login With My Credentials"}
       </button>
      )}
      {registerState === true && pinState === false && (
       <button
        className='btn btn-primary'
        onClick={() => setRegisterState((prevState) => !prevState)}>
        {registerState === false
         ? "Register New Account"
         : "Login With My Credentials"}
       </button>
      )}
     </span>

     <br />
     <br />
    </div>
   </div>
   <br />
   <br />
   <div className='form-container all-center' style={{ width: "500px" }}>
    {pinState === false && registerState === false && resetState === false && (
     <>
      <form onSubmit={onLogin}>
       <div className='form-group'>
        <label htmlFor='Email'>Email Address</label>
        <input
         type='email'
         name='emailAddress'
         value={emailAddress}
         onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor='Pin Code'>Password</label>
        <input
         type='password'
         name='firstPassword'
         value={pin.firstPassword}
         onChange={onChangePin}
        />
       </div>
       <input
        type='submit'
        value='Login'
        className='btn btn-primary btn-block'
       />
      </form>
      <button
       className='btn btn-light btn-sm'
       onClick={() => resetPassword(emailAddress)}>
       Forgot Password
      </button>
     </>
    )}

    {resetState === true && (
     <form onSubmit={onReset}>
      <div className='form-group'>
       <label htmlFor='Token'>Your One Time Access Code</label>
       <input
        type='password'
        name='matchCode'
        value={matchCode}
        onChange={(e) => setMatchCode(e.target.value)}
        required
       />
      </div>
     </form>
    )}

    {matchCode === resetCode && resetState === true && (
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
          {pin.firstPassword.length >= 12 && (
           <i className='fa-solid fa-check' />
          )}
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
          {lowerCase === true && <i className='fa-solid fa-check' />}A Lower
          Case Letter
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
    )}

    {pinState === false && registerState === true && (
     <form onSubmit={onSsn}>
      <div className='form-group'>
       <label htmlFor='Email'>Registration Code</label>
       <input
        type='text'
        name='code'
        value={code}
        onChange={(e) => setCode(e.target.value)}
        required
       />
       <label htmlFor='Social'>Social Secruity Number</label>
       <input
        id='ssn'
        type='password'
        name='ssn'
        value={ssn}
        onChange={onChangeSsn}
        required
       />
      </div>

      <input
       type='submit'
       value='Verify Identity'
       className='btn btn-primary btn-block'
      />
     </form>
    )}

    {pinState === true && registerState === true && (
     <form onSubmit={onPin}>
      <>
       <div className='card' style={{ width: "300px" }}>
        <h2>Please Enter A Secure Password</h2>
        <ul>
         <li>
          {pin.firstPassword.length >= 12 && (
           <i className='fa-solid fa-check' />
          )}
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
          {lowerCase === true && <i className='fa-solid fa-check' />}A Lower
          Case Letter
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
         value='Create Secure Password'
         className='btn btn-primary btn-block'
        />
        <button
         className='btn btn-primary btn-block'
         onClick={() => {
          setPinState(false) && setRegisterState(false);
         }}>
         Start Over
        </button>
       </div>
      </>
     </form>
    )}
   </div>
  </>
 );
};

export default ClientLogin;
