import React, { useState, useContext, useEffect, useCallback } from "react";
import AuthContext from "../../context/auth/authContext";
import PasswordCreator from "./PasswordCreator";

const RegistrationAuthenticator = () => {
 const authContext = useContext(AuthContext);

 const { verifyAccount } = authContext;

 //State
 const [code, setCode] = useState("");
 const [ssn, setSsn] = useState("");

 const onChangeSsn = (e) => {
  setSsn(e.target.value);
 };

 //Create The 2FA Token With Encoded SSN String
 const onSsn = (e) => {
  e.preventDefault();
  verifyAccount({ code, ssn });
  setSsn("");
 };

 return (
  <>
   <div>
    {" "}
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
   </div>
   <div>
    <PasswordCreator />
   </div>
  </>
 );
};

export default RegistrationAuthenticator;
