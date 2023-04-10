import React, { useState, useContext, useEffect } from "react";
import ProfileContext from "../context/profile/profileContext";
import AuthContext from "../context/auth/authContext";
const TaskItem = ({ task }) => {
 const profileContext = useContext(ProfileContext);
 const { clearTask } = profileContext;
 const authContext = useContext(AuthContext);
 const { profile } = authContext;

 const { type, priority, date, description, _id } = task;
 const [style, setStyle] = useState({
  backgroundColor: "white",
  width: "300px",
 });
 useEffect(() => {
  if (priority === "whenever") {
   setStyle({ ...style, backgroundColor: "green" });
  } else if (priority === "normal") {
   setStyle({ ...style, color: "black", backgroundColor: "yellow" });
  } else if (priority === "urgent") {
   setStyle({ ...style, backgroundColor: "red" });
  }
 }, []);

 return (
  <div style={style} className='card'>
   <span style={{ float: "right" }}>
    <button onClick={() => clearTask(profile, _id)}>Done</button>
   </span>
   <div>
    <h4>{type}</h4>
    <p>{description}</p>
   </div>
  </div>
 );
};

export default TaskItem;
