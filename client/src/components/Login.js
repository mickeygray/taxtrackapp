import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/auth/authContext";
import { encode as base64_encode } from "base-64";

const Login = () => {
 const authContext = useContext(AuthContext);

 const { isAuthenticated, loadToken, token, loadProfile } = authContext;
 const [ssnString, setSsnString] = useState("");
 const [accessCode, setAccessCode] = useState("");

 const onChange = (e) => setSsnString(e.target.value);

 const onSubmit = (e) => {
  const encryptedString = base64_encode(ssnString).split().reverse().toString();
  e.preventDefault();
  loadToken(encryptedString);
 };
 const onSubmit2 = (e) => {
  if (accessCode === token) {
   e.preventDefault();
   const encryptedString = base64_encode(ssnString)
    .split()
    .reverse()
    .toString();
   loadProfile(encryptedString);
  }
 };

 if (isAuthenticated) return <Navigate to='/' />;

 return (
  <div className='form-container'>
   <h1>Welcome To Tax Track Beta</h1>

   {token === null ? (
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
   ) : (
    <form onSubmit={onSubmit2}>
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
     <input type='submit' value='Login' className='btn btn-primary btn-block' />
    </form>
   )}
  </div>
 );
};

export default Login;
