import React, { useContext } from "react";
import Burger from "./Burger";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import AuthContext from "../context/auth/authContext";
const Navbar = () => {
 const { profile, logout } = useContext(AuthContext);
 return (
  <div className='grid-3' style={{ backgroundColor: "#728C69" }}>
   <div>
    <Burger />
   </div>
   <div className='all-center'>
    <Link to='/'>
     <img
      src={logo}
      alt='Tax Track'
      style={{ height: "100px", width: "100px", backgroundColor: "#728C69" }}
     />
    </Link>
    <h3>Welcome To Tax Track {profile.fullName}</h3>
   </div>
   <div className='m-2 p-2'>
    <span style={{ float: "right" }}>
     {" "}
     <button onClick={() => logout()}>Log Out</button>
    </span>
   </div>
  </div>
 );
};

export default Navbar;
