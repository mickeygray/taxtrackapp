import React, { useContext, useState, useEffect } from "react";
import ProfileContext from "../context/profile/profileContext";
import AuthContext from "../context/auth/authContext";

import TaskFilter from "./TaskFilter";
import MessageFilter from "./MessageFilter";
import MilestoneGenerator from "./MilestoneGenerator";
import Upload from "./Upload";

const ProfileItem = ({ profile }) => {
 const { startingBalance, currentBalance, fullName, addDate, ssn } = profile;

 const profileContext = useContext(ProfileContext);
 const authContext = useContext(AuthContext);
 const { user } = authContext;
 const {
  putCanopy,

  sendMessage,
  setTask,
  getMessages,
  getTasks,
  setProfile,
  updateStatus,
  updateProfile,
 } = profileContext;

 const [file, setFile] = useState(null);
 const [view, setView] = useState(false);
 const [status, setStatus] = useState("");
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

 const [taskBody, setTaskBody] = useState({
  type: "",
  priority: "",
  description: "",
  date: "",
 });

 const [messageView, setMessageView] = useState(false);
 const [taskView, setTaskView] = useState(false);
 const [style, setStyle] = useState({
  backgroundColor: "black",
  color: "white",
 });
 const onSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData();

  formData.append("file", file);
  putCanopy(formData, profile);
 };

 useEffect(() => {
  if (messageView === true) {
   getMessages(profile);
   setTaskView(false);
  } else if (taskView === true) {
   getTasks(profile);
   setMessageView(false);
  }
 }, [profileContext, messageView, taskView]);

 const openProfile = () => {
  setView((prevState) => !prevState);
  setProfile(profile);
 };
 useEffect(() => {
  if (profile.status === "Active" || profile.status === "Current") {
   setStyle({ ...style, backgroundColor: "green" });
  } else if (profile.status === "LateOne" || profile.status === "LateTwo") {
   setStyle({ color: "black", backgroundColor: "yellow" });
  } else if (
   profile.status === "InactiveClient" ||
   profile.status === "InactivePayment" ||
   profile.status === "InactiveCancel"
  ) {
   setStyle({ ...style, backgroundColor: "red" });
  }
 }, []);

 const [putState, setPutState] = useState(true);

 const [update, setUpdate] = useState({
  fullName: "",
  email: "",
  phone: "",
  ssn: "",
 });

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
  <>
   {view === false ? (
    <div className='card lead' style={style}>
     <span style={{ float: "right" }}></span>
     <div className='grid-3'>
      <div>
       Client Name:
       {profile.fullName}
      </div>
      <div>Subscription Start: {profile.addDate}</div>
      <div>Status: {profile.status}</div>
      <div>
       {" "}
       <button onClick={() => openProfile()}>View Profile</button>{" "}
      </div>{" "}
     </div>{" "}
    </div>
   ) : (
    <div className='card bg-dark'>
     <span style={{ float: "right" }}>
      {" "}
      <button onClick={() => setView((prevState) => !prevState)}>X</button>
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
         <li>
          {" "}
          {ssnPut === false ? (
           <a onClick={() => setSsnput((prevState) => !prevState)}>
            SSN: {profile.ssn}
           </a>
          ) : (
           <input
            type='text'
            name='ssn'
            placeholder={profile.ssn}
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
          <option value='LateTwo'>
           Active - Late 2 or More Billing Cycles
          </option>
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
        <div className='card'>
         <legend>Task Type</legend>
         <select
          onChange={(e) =>
           setTaskBody({ ...taskBody, [e.target.name]: e.target.value })
          }
          name='type'
          id=''>
          <option>-Select a Task-</option>
          <option value='paperwork'>Submit Paperwork</option>
          <option value='call'>Call For An Update</option>
          <option value='payment'>Make a Payment</option>
         </select>
         <legend>Priorty</legend>
         <select
          onChange={(e) =>
           setTaskBody({ ...taskBody, [e.target.name]: e.target.value })
          }
          name='priority'
          id=''>
          <option>-How Important?-</option>
          <option value='urgent'>Urgent</option>
          <option value='normal'>Normal</option>
          <option value='whenever'>Whenever</option>
         </select>
         <legend>Description</legend>
         <textarea
          onChange={(e) =>
           setTaskBody({ ...taskBody, [e.target.name]: e.target.value })
          }
          name='description'></textarea>
         <br />
         <button className='btn' onClick={() => setTask(profile, taskBody)}>
          Create A New Task
         </button>
        </div>
       </div>
      </div>
      <div className='card'>
       <div>
        <button
         onClick={() => {
          setMessageView((prevState) => !prevState);
         }}>
         {" "}
         {messageView === false ? "View Messages" : "Hide Messages"}
        </button>
        <button
         onClick={() => {
          setTaskView((prevState) => !prevState);
         }}>
         {" "}
         {taskView === false ? "View Tasks" : "Hide Tasks"}
        </button>
        <div>
         {messageView === true && (
          <div>
           <MessageFilter profile={profile} />
          </div>
         )}

         {taskView === true && (
          <div>
           <TaskFilter profile={profile} />
          </div>
         )}
        </div>
       </div>
      </div>
     </div>
     <div>
      <MilestoneGenerator />
     </div>
    </div>
   )}
  </>
 );
};

export default ProfileItem;
