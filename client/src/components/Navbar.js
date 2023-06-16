import React, { useContext } from "react";

import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import AuthContext from "../context/auth/authContext";
import goodbye from "../images/goodbye.png";
const Navbar = () => {
 const { profile, logout } = useContext(AuthContext);
 return (
  <div className='grid-2 bg-primary' style={{ height: "187px" }}>
   <div className='m-2'>
    <Link to='/'>
     <img
      src={logo}
      alt='Tax Track'
      style={{ height: "100px", width: "100px" }}
     />
    </Link>
    <h5>
     Welcome To Tax Track <br /> {profile.fullName}
    </h5>
   </div>
   <div className='p-2 m-2'>
    <span style={{ float: "right" }}>
     {" "}
     <a onClick={() => logout()}>
      {" "}
      <img
       src={goodbye}
       style={{ borderRadius: "50%", height: "100px", width: "100px" }}
      />
     </a>
    </span>

    <br />
    <br />
   </div>
  </div>
 );
};

export default Navbar;
