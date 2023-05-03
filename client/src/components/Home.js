import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/auth/authContext";
import ProfileContext from "../context/profile/profileContext";
import logo from "../images/TaxTrackLogo.jpg";
import bubble from "../images/bubble.png";
import exclamation from "../images/exclamation.png";
import MessageModal from "./MessageModal";
import TaskModal from "./TaskModal";
import Navbar from "./Navbar";
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
 return (
  <div>
   <Navbar />
   {taskModal === true && <TaskModal tasks={tasks} />}
   {messageModal === true && <MessageModal />}
   {messageModal === false && (
    <div
     className='grid-3 '
     style={{ marginLeft: "218px", marginTop: "100px" }}>
     <div>
      <Link
       to='/balancetransactions'
       className='btn btn-primary'
       style={{ borderRadius: "50%", height: "200px", width: "200px" }}>
       <h3 className='all-center' style={{ marginTop: "50px" }}>
        Path To <br /> Zero
       </h3>
      </Link>
     </div>
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
    </div>
   )}
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

export default Home;
