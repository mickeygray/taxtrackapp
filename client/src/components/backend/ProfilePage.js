import React, { useContext, useState, useEffect } from "react";
import ProfileContext from "../../context/profile/profileContext";
import AuthContext from "../../context/auth/authContext";

import MessageFilter from "./MessageFilter";
import MilestoneGenerator from "./MilestoneGenerator";
import Upload from "./Upload";

const ProfilePage = () => {
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

 const [putState, setPutState] = useState(true);
 const [status, setStatus] = useState("");
 const [update, setUpdate] = useState({});
 const [messageBody, setMessageBody] = useState({});

 useEffect(() => {
  const interval = setInterval(() => {
   getMessages(profile);
  }, 5000);

  return () => clearInterval(interval);
 }, []);

 useEffect(() => {
  if (user && messageBody.name !== user.name) {
   setMessageBody({ ...messageBody, name: user.name });
  }
 }, [user, messageBody]);

 useEffect(() => {
  setProfile(profile);
 }, [profile]);

 const handleInputChange = (e) => {
  setUpdate((prevUpdate) => ({
   ...prevUpdate,
   [e.target.name]: e.target.value,
  }));
 };

 const handleSubmit = (e) => {
  e.preventDefault();
  updateProfile(update, profile);
  setUpdate({});
 };

 const handleSendMessage = () => {
  sendMessage(profile, messageBody);
  setMessageBody({});
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
        {profile.fullName && (
         <>
          {!update.fullName ? (
           <a onClick={() => setUpdate({ fullName: profile.fullName })}>
            Name: {profile.fullName}
           </a>
          ) : (
           <input
            type='text'
            name='fullName'
            placeholder={profile.fullName}
            value={update.fullName || ""}
            onChange={handleInputChange}
           />
          )}
         </>
        )}
       </li>
       <li>
        {profile.email && (
         <>
          {!update.email ? (
           <a onClick={() => setUpdate({ email: profile.email })}>
            Email: {profile.email}
           </a>
          ) : (
           <input
            type='text'
            name='email'
            placeholder={profile.email}
            value={update.email || ""}
            onChange={handleInputChange}
           />
          )}
         </>
        )}
       </li>
       <li>
        {profile.phone && (
         <>
          {!update.phone ? (
           <a onClick={() => setUpdate({ phone: profile.phone })}>
            Phone: {profile.phone}
           </a>
          ) : (
           <input
            type='text'
            name='phone'
            placeholder={profile.phone}
            value={update.phone || ""}
            onChange={handleInputChange}
           />
          )}
         </>
        )}
       </li>
      </ul>
      {Object.keys(update).length > 0 && (
       <button onClick={handleSubmit}>Update Profile</button>
      )}
     </div>

     <div>
      <form>
       <select
        name='status'
        value={status || profile.status}
        onChange={(e) => setStatus(e.target.value)}>
        <option value='Active'>Active - First 3 Months</option>
        <option value='Current'>Active - Current Billing</option>
        <option value='LateOne'>Active - Late 1 Billing Cycle</option>
        <option value='LateTwo'>Active - Late 2 or More Billing Cycles</option>
        <option value='InactiveClient'>Inactive - Client's Choice</option>
        <option value='InactivePayment'>Inactive - Payment Delinquent</option>
        <option value='InactiveCancel'>Inactive - Canceled By ABC</option>
       </select>
      </form>
      <button onClick={() => updateStatus(status, profile)}>
       Update Subscription Status
      </button>
     </div>
     <div>
      <div className='card'>
       Starting Balance: {profile.startingBalance}
       <br />
       Current Balance: {profile.currentBalance || "First Update Not Complete"}
      </div>
     </div>
    </div>

    <div className='card'>
     <p>Send A Message Or Assign A Task</p>
     <div>
      <div className='card'>
       <legend>Name</legend>
       <input
        type='text'
        name='name'
        value={user?.name || ""}
        onChange={handleInputChange}
       />
       <legend>Content</legend>
       <textarea
        name='content'
        value={messageBody.content || ""}
        onChange={(e) =>
         setMessageBody({ ...messageBody, content: e.target.value })
        }
       />
       <br />
       <button className='btn btn-light' onClick={handleSendMessage}>
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
