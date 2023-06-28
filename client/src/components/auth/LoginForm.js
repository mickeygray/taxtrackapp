import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";
import Base64 from "crypto-js/enc-base64";
const LoginForm = () => {
 const authContext = useContext(AuthContext);
 const alertContext = useContext(AlertContext);
 const { setAlert } = alertContext;
 const { pinLogin, resetPassword, rememberMe, toggleRememberMe } = authContext;

 // State
 const [pin, setPin] = useState({ password: "", email: "" });

 useEffect(() => {
  // Load pin value from localStorage if rememberMe is enabled
  if (rememberMe) {
   const storedPin = localStorage.getItem("rememberedPin");
   if (storedPin) {
    setPin(JSON.parse(Base64.parse(storedPin)));
   }
  }
 }, [rememberMe]);

 const onChangePin = (e) => {
  setPin({ ...pin, [e.target.name]: e.target.value });
 };

 useEffect(() => {
  // Store pin value in localStorage if rememberMe is enabled
  if (rememberMe) {
   const str = Base64.stringify(JSON.stringify(pin));
   localStorage.setItem("rememberedPin", str);
  }
 }, [rememberMe, pin]);

 // Login
 const onLogin = (e) => {
  e.preventDefault();
  if (pin.email === "" || pin.password === "") {
   setAlert("Please fill in all fields", "danger");
  } else {
   pinLogin(pin);
  }
 };

 return (
  <div>
   <>
    <form onSubmit={onLogin}>
     <div className='form-group'>
      <label htmlFor='Email'>Email Address</label>
      <input
       type='email'
       name='email'
       value={pin.email}
       onChange={onChangePin}
      />
      <label htmlFor='Password'>Password</label>
      <input
       type='password'
       name='password'
       value={pin.password}
       onChange={onChangePin}
      />
     </div>
     <div className='form-group form-check'>
      <input
       type='checkbox'
       className='form-check-input'
       id='rememberMe'
       checked={rememberMe}
       onChange={toggleRememberMe}
      />
      <label className='form-check-label' htmlFor='rememberMe'>
       Remember Me
      </label>
     </div>
     <input type='submit' value='Login' className='btn btn-primary btn-block' />
    </form>
    <button
     className='btn btn-light btn-sm'
     onClick={() => resetPassword(pin.email)}>
     Forgot Password
    </button>
   </>
  </div>
 );
};

export default LoginForm;
