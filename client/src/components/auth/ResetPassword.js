import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import PasswordCreator from "./PasswordCreator";

const ResetPassword = () => {
 const authContext = useContext(AuthContext);

 const {} = authContext;

 //State

 const [matchCode, setMatchCode] = useState("");

 return (
  <>
   <div>
    {" "}
    <form>
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
   </div>
   <div>
    <PasswordCreator />
   </div>
  </>
 );
};

export default ResetPassword;
