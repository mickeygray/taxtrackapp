import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/auth/authContext";
import ProfileContext from "../context/profile/profileContext";
import logo from "../images/TaxTrackLogo.jpg";
import bubble from "../images/bubble.png";
import exclamation from "../images/exclamation.png";
import TaxReturnItem from "./TaxReturnItem";
import MessageModal from "./MessageModal";
import TaskModal from "./TaskModal";
import Burger from "./Burger";

const TaxReturns = () => {
 const { profile, logout } = useContext(AuthContext);

 const { putDocs, getTasks, tasks } = useContext(ProfileContext);
 const [messageModal, toggleMessageModal] = useState(false);
 const [taskModal, toggleTaskModal] = useState(false);
 const [file, setFile] = useState(false);

 const [transactionView, setTransactionView] = useState(false);

 const onSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData();

  formData.append("file", file);
  putDocs(formData, profile);
 };
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

   {taskModal === true && <TaskModal tasks={tasks} />}
   {messageModal === true && <MessageModal />}
   {messageModal === false && (
    <div>
     <h3>Your Filed Tax Returns</h3>

     <div className='grid-4'>
      {profile.taxReturnData
       .filter((f) => f.adjustedGrossIncome !== "0")
       .map((taxReturn) => (
        <TaxReturnItem
         taxReturn={taxReturn}
         key={profile.accountTransactions.findIndex((x) => x === taxReturn)}
        />
       ))}
     </div>

     <div className='all-center'>
      If you receive any new tax documents for next years filings, you can
      upload them here.
      <form onSubmit={onSubmit}>
       <input
        type='file'
        name='file'
        onChange={(e) => setFile(e.target.files[0])}
       />
       <input type='submit' value='Upload Tax Documents' />
      </form>
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

export default TaxReturns;
