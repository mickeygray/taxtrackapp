import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/auth/authContext";
import ProfileContext from "../context/profile/profileContext";
import logo from "../images/TaxTrackLogo.jpg";
import bubble from "../images/bubble.png";
import exclamation from "../images/exclamation.png";
import TaxCalculator from "./TaxCalculator";
import MessageModal from "./MessageModal";
import TaskModal from "./TaskModal";
import Burger from "./Burger";

const TaxPlanning = () => {
 const { profile, logout } = useContext(AuthContext);
 const [messageModal, toggleMessageModal] = useState(false);
 const [taskModal, toggleTaskModal] = useState(false);
 const { getTasks, tasks } = useContext(ProfileContext);
 const [style, setStyle] = useState({ backgroundColor: "black" });
 useEffect(() => {
  const interval = setInterval(() => {
   getTasks(profile);
  }, 5000);

  return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
 }, []);

 useEffect(() => {
  if (tasks.length === 0) {
   setStyle({ backgroundColor: "black" });
  } else if (tasks.length > 0) {
   setStyle({ backgroundColor: "yellow" });
  }
 }, [tasks.length]);
 console.log(profile);
 return (
  <div className='container'>
   <Burger />
   <div className='all-center'>
    <Link to='/'>
     <img
      src={logo}
      alt='Tax Track'
      style={{ height: "200px", width: "200px" }}
     />
    </Link>
    <h3>Welcome To Tax Track {profile.fullName}</h3>
    <button onClick={() => logout()}>Log Out</button>
   </div>
   <div>
    {taskModal === true && <TaskModal tasks={tasks} />}
    {messageModal === true && <MessageModal />}
    {messageModal === false && <TaxCalculator />}
   </div>
   <div className='grid-2' style={{ marginTop: "50px" }}>
    <div className='all-center'>
     <a
      style={style}
      onClick={() => toggleTaskModal((prevState) => !prevState)}>
      <img src={exclamation} style={{ height: "150px", width: "150px" }} />
     </a>
    </div>
    <div className='all-center'>
     <a onClick={() => toggleMessageModal((prevState) => !prevState)}>
      <img src={bubble} style={{ height: "150px", width: "150px" }} />
     </a>
    </div>
   </div>
  </div>
 );
};

export default TaxPlanning;
