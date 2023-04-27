import React, { useReducer } from "react";
import ProfileContext from "./profileContext";
import ProfileReducer from "./profileReducer";
import axios from "axios";
import {
 POST_THS,
 ADD_CLIENT,
 PUT_CANOPY,
 CLEAR_CLIENT,
 GET_PROFILES,
 SET_TASK,
 SEND_MESSAGE,
 POST_CALC,
 GET_MESSAGES,
 FILTER_MESSAGES,
 FILTER_TASKS,
 RANGE_MESSAGES,
 RANGE_TASKS,
 UPDATE_MESSAGE,
 DELETE_MESSAGE,
 GET_TASKS,
 UPDATE_STATUS,
 GET_ZIP,
 CLEAR_TASK,
 GET_RULES,
} from "../types";

const ProfileState = (props) => {
 const initialState = {
  client: null,
  clientList: [],
  message: null,
  messages: [],
  task: null,
  filtered: null,
  rules: null,
  range: null,
  tasks: [],
  zipdata: null,
 };

 const [state, dispatch] = useReducer(ProfileReducer, initialState);
 //Tax Calculator Post
 const postCalc = async (calc) => {
  const config = {
   headers: {
    "Content-Type": "application/json",
   },
  };

  await axios.post("/api/leads/calc", calc, config);

  dispatch({
   type: POST_CALC,
   payload: calc,
  });
 };

 const getZip = async (zip) => {
  const config = {
   headers: {
    "Content-Type": "application/json",
   },
  };

  const res = await axios.get(`/api/profiles/zips?q=${zip}`, config);
  dispatch({ type: GET_ZIP, payload: res.data });
 };

 const getRules = async () => {
  const config = {
   headers: {
    "Content-Type": "application/json",
   },
  };

  const res = await axios.get(`/api/profiles/rules`, config);
  dispatch({ type: GET_RULES, payload: res.data });
 };

 //Get Profiles Needs a Search
 const getProfiles = async (text) => {
  const config = {
   headers: {
    "Content-Type": "application/json",
   },
  };
  const res = await axios.get(`/api/profiles?q=${text}`, config);

  dispatch({
   type: GET_PROFILES,
   payload: res.data,
  });
 };

 const getMessages = async (client) => {
  const config = {
   headers: {
    "Content-Type": "application/json",
   },
  };
  const res = await axios.get(`/api/profiles/${client._id}/messages`, config);
  dispatch({
   type: GET_MESSAGES,
   payload: res.data,
  });
 };

 const filterMessages = (text) => {
  dispatch({ type: FILTER_MESSAGES, payload: text });
 };

 const filterTasks = (text) => {
  dispatch({ type: FILTER_TASKS, payload: text });
 };

 const getTasks = async (client) => {
  const config = {
   headers: {
    "Content-Type": "application/json",
   },
  };
  const res = await axios.get(`/api/profiles/${client._id}/tasks`, config);
  dispatch({
   type: GET_TASKS,
   payload: res.data,
  });
 };

 const updateMessage = async (client, message) => {
  const config = {
   headers: {
    "Content-Type": "application/json",
   },
  };

  const messageItem = { ...message, clientId: client._id };

  const res = await axios.put(
   `/api/profiles/${client._id}/messages/${message._id}`,
   messageItem,
   config
  );
  dispatch({
   type: UPDATE_MESSAGE,
   payload: res.data,
  });
  getMessages(client);
 };

 const postTHS = async (formData) => {
  const config = {
   headers: {
    "Content-Type": "multipart/form-data",
   },
  };
  const res = await axios.post("/api/profiles", formData, config);

  dispatch({
   type: POST_THS,
   payload: res.data,
  });
 };

 const putCanopy = async (formData, client) => {
  const config = {
   headers: {
    "Content-Type": "multipart/form-data",
   },
  };
  const res = await axios.put(`/api/profiles/${client._id}`, formData, config);

  dispatch({
   type: PUT_CANOPY,
   payload: res.data,
  });
 };

 const putDocs = async (formData, profile) => {
  const config = {
   headers: {
    "Content-Type": "multipart/form-data",
   },
  };
  const res = await axios.put(
   `/api/profiles/${profile._id}/docs`,
   formData,
   config
  );

  dispatch({
   type: PUT_CANOPY,
   payload: res.data,
  });
 };
 const updateStatus = async (status, client) => {
  const config = {
   headers: {
    "Content-Type": "application/json",
   },
  };
  const res = await axios.put(
   `/api/profiles/${client._id}/status`,
   { status: status },
   config
  );

  dispatch({
   type: UPDATE_STATUS,
   payload: res.data,
  });
 };

 const addClient = (client) => {
  dispatch({
   type: ADD_CLIENT,
   payload: client,
  });
 };

 const clearClient = () => {
  dispatch({ type: CLEAR_CLIENT });
 };
 const sendMessage = async (client, messageBody) => {
  const config = {
   headers: {
    "Content-Type": "application/json",
   },
  };
  const res = await axios.post(
   `/api/profiles/${client._id}/messages`,
   messageBody,
   config
  );

  dispatch({
   type: SEND_MESSAGE,
   payload: res.data,
  });

  getMessages(client);
 };

 const setTask = async (client, taskBody) => {
  const config = {
   headers: {
    "Content-Type": "application/json",
   },
  };
  const res = await axios.post(
   `/api/profiles/${client._id}/tasks`,
   taskBody,
   config
  );

  dispatch({
   type: SET_TASK,
   payload: res.data,
  });
 };

 const rangeTasks = (taskRange) => {
  dispatch({
   type: RANGE_TASKS,
   payload: taskRange,
  });
 };

 const rangeMessages = (messageRange) => {
  dispatch({
   type: RANGE_MESSAGES,
   payload: messageRange,
  });
 };

 const deleteMessage = async (profile, _id) => {
  const res = await axios.delete(
   `/api/profiles/${profile._id}/messages/${_id}`
  );
  dispatch({
   type: DELETE_MESSAGE,
   payload: res.data,
  });
  getMessages(profile);
 };

 const clearTask = async (profile, _id) => {
  const res = await axios.delete(`/api/profiles/${profile._id}/tasks/${_id}`);
  dispatch({
   type: CLEAR_TASK,
   payload: res.data,
  });
  getTasks(profile);
 };

 return (
  <ProfileContext.Provider
   value={{
    postTHS,
    putCanopy,
    addClient,
    getProfiles,
    clearClient,
    sendMessage,
    getMessages,
    setTask,
    getTasks,
    updateMessage,
    getZip,
    filterMessages,
    filterTasks,
    rangeTasks,
    clearTask,
    rangeMessages,
    deleteMessage,
    updateStatus,
    putDocs,
    postCalc,
    getRules,
    message: state.message,
    range: state.range,
    messages: state.messages,
    task: state.task,
    filtered: state.filtered,
    rules: state.rules,
    tasks: state.tasks,
    client: state.client,
    clientList: state.clientList,
    zipdata: state.zipdata,
   }}>
   {props.children}
  </ProfileContext.Provider>
 );
};

export default ProfileState;
