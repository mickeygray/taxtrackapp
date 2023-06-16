import React, { useContext, useState, useEffect, useCallback } from "react";
import AuthContext from "../context/auth/authContext";

import MessageModal from "./MessageModal";
import messagesimg from "../images/messages.png";
import Navbar from "./Navbar";
import BalanceTransactions from "./BalanceTransactions";
import ProfileInfo from "./ProfileInfo";

const Home = () => {
 const { profile, logout } = useContext(AuthContext);
 console.log(profile);

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
   {messageModal === true ? (
    <MessageModal toggleModal={toggleModal} />
   ) : (
    <div className='profile-container'>
     <div className='chart-container' style={{ width: "100vw" }}>
      <BalanceTransactions />
     </div>
     <div className='container profile-info-container'>
      <a onClick={toggleModal}>
       <img
        src={messagesimg}
        style={{ borderRadius: "50%", height: "100px", width: "100px" }}
       />
      </a>
      <ProfileInfo />
     </div>
    </div>
   )}
  </div>
 );
};

export default Home;
