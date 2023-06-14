import React, { useContext, useState, useEffect, useCallback } from "react";
import AuthContext from "../context/auth/authContext";
import ProfileContext from "../context/profile/profileContext";
import MessageModal from "./MessageModal";
import TaskModal from "./TaskModal";
import Navbar from "./Navbar";
import BalanceTransactions from "./BalanceTransactions";

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
   {messageModal === true ? (
    <MessageModal toggleModal={toggleModal} />
   ) : (
    <BalanceTransactions toggleModal={toggleModal} />
   )}
  </div>
 );
};

export default Home;
