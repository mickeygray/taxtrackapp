import React, { useState, useContext, useEffect } from "react";

import ProfileContext from "../context/profile/profileContext";
import AuthContext from "../context/auth/authContext";
import TaskItem from "./TaskItem";

const TaskModal = ({ tasks }) => {
 const profileContext = useContext(ProfileContext);

 const authContext = useContext(AuthContext);
 const { profile } = authContext;

 return (
  <div>{tasks && tasks.map((t) => <TaskItem key={tasks._id} task={t} />)}</div>
 );
};

export default TaskModal;
