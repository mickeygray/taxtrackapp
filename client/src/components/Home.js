import React, { useContext, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/auth/authContext";
import ProfileContext from "../context/profile/profileContext";

import exclamation from "../images/exclamation.png";
import MessageModal from "./MessageModal";
import TaskModal from "./TaskModal";
import Navbar from "./Navbar";
import zero from "../images/pathto0.png";
import sherpa from "../images/sherpa.png";
import messagesimg from "../images/messages.png";
import forest from "../images/forest.mp4";
const Home = () => {
 const { tasks, getTasks } = useContext(ProfileContext);

 const { profile, logout } = useContext(AuthContext);
 console.log(profile);

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
 const [messageModal, toggleMessageModal] = useState(false);
 const [taskModal, toggleTaskModal] = useState(false);

 const toggleModal = useCallback(() => {
  toggleMessageModal((prevState) => !prevState);
 }, []);
 /*
     <div>
      <Link
       to='/taxreturns'
       className='btn btn-primary'
       style={{ borderRadius: "50%", height: "200px", width: "200px" }}>
       <h3 className='all-center' style={{ marginTop: "50px" }}>
        Tax <br /> Returns
       </h3>
      </Link>
     </div>
     <div>
      <Link
       to='/taxplanning'
       className='btn btn-primary'
       style={{ borderRadius: "50%", height: "200px", width: "200px" }}>
       <h3 className='all-center' style={{ marginTop: "50px" }}>
        Tax <br /> Planning
       </h3>
      </Link>
     </div>
     */

 return (
  <div>
   <Navbar />
   {taskModal === true && <TaskModal tasks={tasks} />}
   {messageModal === true && <MessageModal toggleModal={toggleModal} />}
   {messageModal === false && (
    <div className='grid-hero all-center p-3'>
     <div className='overlay'>
      <p style={{ backgroundColor: "black" }}>
       <video
        autoPlay
        muted
        loop
        style={{
         opacity: "35%",
         width: "100vw",
         zIndex: "-2",
         overflow: "hidden",
        }}>
        <source src={forest} type='video/mp4' />
       </video>
      </p>
     </div>
     <div className='solscopy grid-3'>
      <div>
       <a onClick={() => toggleTaskModal((prevState) => !prevState)}>
        <img
         src={sherpa}
         style={{ borderRadius: "50%", height: "200px", width: "200px" }}
        />
       </a>
      </div>
      <div>
       <Link to='/balancetransactions'>
        <img
         style={{ borderRadius: "50%", height: "200px", width: "200px" }}
         src={zero}
         alt='tax track path to zero'
        />
       </Link>
      </div>
      <div>
       <a onClick={() => toggleMessageModal((prevState) => !prevState)}>
        <img
         src={messagesimg}
         style={{ borderRadius: "50%", height: "200px", width: "200px" }}
        />
       </a>
      </div>
     </div>
    </div>
   )}
  </div>
 );
};

export default Home;
