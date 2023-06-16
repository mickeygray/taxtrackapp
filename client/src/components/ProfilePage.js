import React, { useContext, useState, useEffect } from "react";
import ProfileContext from "../context/profile/profileContext";
import AuthContext from "../context/auth/authContext";

import MessageFilter from "./MessageFilter";
import MilestoneGenerator from "./MilestoneGenerator";
import Upload from "./Upload";

const ProfilePage = () => {
 useEffect(() => {
  getMessages(profile);
 }, []);

 const profileContext = useContext(ProfileContext);
 const authContext = useContext(AuthContext);
 const { user } = authContext;
 const {
  putCanopy,
  updateProfile,
  sendMessage,
  setProfile,
  updateStatus,
  getMessages,
  profile,
 } = profileContext;
 const { startingBalance, currentBalance, fullName, addDate, email, phone } =
  profile;
 const [putState, setPutState] = useState(true);
 const [status, setStatus] = useState("");
 const [update, setUpdate] = useState({
  fullName: "",
  email: "",
  phone: "",
  ssn: "",
 });
 const [messageBody, setMessageBody] = useState({
  name: "",
  content: "",
  date: "",
 });
 useEffect(() => {
  if (user != null && messageBody.name != user.name) {
   setMessageBody({ ...messageBody, name: user.name });
  }
 }, [user, authContext, messageBody]);

 const [fnPut, setFnput] = useState(false);
 const [emPut, setEmput] = useState(false);
 const [pnPut, setPnput] = useState(false);
 const [ssnPut, setSsnput] = useState(false);

 const clearBools = () => {
  setFnput(false);
  setEmput(false);
  setPnput(false);
  setSsnput(false);
 };

 return (
  <div className='card bg-dark'>
   <span style={{ float: "right" }}>
    {" "}
    <button onClick={() => setProfile(null)}>X</button>
   </span>
   <div className='all-center'>
    <Upload putState={putState} />
   </div>
   <div className='grid-3'>
    <div className='card'>
     <div>
      <ul>
       <li>
        {fnPut === false ? (
         <a onClick={() => setFnput((prevState) => !prevState)}>
          Name: {profile.fullName}
         </a>
        ) : (
         <input
          type='text'
          name='fullName'
          placeholder={profile.fullName}
          onChange={(e) =>
           setUpdate({ ...update, [e.target.name]: e.target.value })
          }
         />
        )}
       </li>
       <li>
        {" "}
        {emPut === false ? (
         <a onClick={() => setEmput((prevState) => !prevState)}>
          Email: {profile.email}
         </a>
        ) : (
         <input
          type='text'
          name='email'
          placeholder={profile.email}
          onChange={(e) =>
           setUpdate({ ...update, [e.target.name]: e.target.value })
          }
         />
        )}
       </li>
       <li>
        {" "}
        {pnPut === false ? (
         <a onClick={() => setPnput((prevState) => !prevState)}>
          Phone: {profile.phone}
         </a>
        ) : (
         <input
          type='text'
          name='phone'
          placeholder={profile.phone}
          onChange={(e) =>
           setUpdate({ ...update, [e.target.name]: e.target.value })
          }
         />
        )}
       </li>
      </ul>
      {(fnPut && (
       <button
        onClick={() => {
         updateProfile(update, profile);
         clearBools();
         setProfile(profile);
        }}>
        Update Profile
       </button>
      )) ||
       (emPut && (
        <button
         onClick={() => {
          updateProfile(update, profile);
          clearBools();
         }}>
         Update Profile
        </button>
       )) ||
       (pnPut && (
        <button
         onClick={() => {
          updateProfile(update, profile);
          clearBools();
         }}>
         Update Profile
        </button>
       )) ||
       (ssnPut && (
        <button
         onClick={() => {
          updateProfile(update, profile);
          clearBools();
         }}>
         Update Profile
        </button>
       ))}
     </div>

     <div>
      <form>
       <select
        name='status'
        value={(status && status) || profile.status}
        onChange={(e) => setStatus(e.target.value)}>
        <option value='Active'>Active - First 3 Months</option>
        <option value='Current'>Active - Current Billing</option>
        <option value='LateOne'>Active - Late 1 Billing Cycle</option>
        <option value='LateTwo'>Active - Late 2 or More Billing Cycles</option>
        <option value='InactiveClient'>Inactive - Client's Choice</option>
        <option value='InactivePayment'>Inactive - Payment Deliqnuent</option>
        <option value='InactiveCancel'>Inactive - Canceled By ABC</option>
       </select>
      </form>
      <button onClick={() => updateStatus(status, profile)}>
       Update Subscription Status
      </button>
     </div>
     <div>
      <div className='card'>
       Starting Balance : {startingBalance}
       <br />
       Current Balance : {currentBalance || "First Update Not Complete"}
      </div>
     </div>
    </div>

    <div className='card'>
     <p>Send A Message Or Assign A Task</p>
     <div>
      <div className='card'>
       <legend>Name</legend>
       <input
        onChange={(e) =>
         setMessageBody({ ...messageBody, [e.target.name]: e.target.value })
        }
        type='text'
        name='name'
        value={user.name}
       />
       <legend>Content</legend>
       <textarea
        onChange={(e) =>
         setMessageBody({ ...messageBody, [e.target.name]: e.target.value })
        }
        name='content'
       />
       <br />
       <button
        className='btn btn-light'
        onClick={() => sendMessage(profile, messageBody)}>
        Create A New Message
       </button>
      </div>
     </div>
    </div>
    <div className='card'>
     <MessageFilter profile={profile} />
    </div>
   </div>
   <div>
    <MilestoneGenerator />
   </div>
  </div>
 );
};

export default ProfilePage;
