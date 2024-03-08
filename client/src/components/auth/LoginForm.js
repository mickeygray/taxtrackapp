import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";
import Base64 from "crypto-js/enc-base64";

const LoginForm = () => {
 const {
  pinLogin,
  adminLogin,
  resetPassword,
  rememberMe,
  toggleRememberMe,
  isAdmin,
 } = useContext(AuthContext);
 const { setAlert } = useContext(AlertContext);

 // State for login form fields
 const [pin, setPin] = useState({ email: "", password: "" });

 useEffect(() => {
  // Load pin value from localStorage if rememberMe is enabled
  if (rememberMe && !isAdmin) {
   // Assuming remember me is not used for admin login for security reasons
   const storedPin = localStorage.getItem("rememberedPin");
   if (storedPin) {
    setPin(JSON.parse(Base64.parse(storedPin).toString()));
   }
  }
 }, [rememberMe, isAdmin]);

 const onChangePin = (e) => {
  setPin({ ...pin, [e.target.name]: e.target.value });
 };

 useEffect(() => {
  // Store pin value in localStorage if rememberMe is enabled
  if (rememberMe && !isAdmin) {
   const str = Base64.stringify(JSON.stringify(pin));
   localStorage.setItem("rememberedPin", str);
  }
 }, [rememberMe, pin, isAdmin]);

 const onLogin = (e) => {
  e.preventDefault();
  if (pin.email === "" || pin.password === "") {
   setAlert("Please fill in all fields", "danger");
  } else {
   // Use adminLogin if isAdmin is true, otherwise use pinLogin
   isAdmin ? adminLogin(pin) : pinLogin(pin);
  }
 };

 return (
  <div>
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
    {!isAdmin && ( // Hide remember me option for admin login
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
    )}
    <input
     type='submit'
     value={isAdmin ? "Admin Login" : "Login"}
     className='btn btn-primary btn-block'
    />
   </form>
   {!isAdmin && ( // Optionally hide reset password for admin
    <button
     className='btn btn-light btn-sm'
     onClick={() => resetPassword(pin.email)}>
     Forgot Password
    </button>
   )}
  </div>
 );
};

export default LoginForm;
