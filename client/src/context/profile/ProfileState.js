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
 SET_PROFILE,
 UPLOAD_FILE,
 SET_MILESTONES,
 CLEAR_PROFILE,
 CLEAR_PROFILES,
 UPDATE_PROFILE,
} from "../types";

const ProfileState = (props) => {
 const initialState = {
  profile: null,
  newProfile: null,
  profileList: [],
  message: null,
  milestones: [],
  messages: [],

  filtered: null,

  range: null,

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

 const clearProfile = () => {
  dispatch({
   type: CLEAR_PROFILE,
  });
 };

 const getMessages = async (profile) => {
  const config = {
   headers: {
    "Content-Type": "application/json",
   },
  };
  const res = await axios.get(`/api/profiles/${profile._id}/messages`, config);
  dispatch({
   type: GET_MESSAGES,
   payload: res.data,
  });
 };

 const filterMessages = (text) => {
  dispatch({ type: FILTER_MESSAGES, payload: text });
 };

 const getMilestones = async (profile) => {
  const config = {
   headers: {
    "Content-Type": "application/json",
   },
  };
  const res = await axios.get(
   `/api/profiles/${profile._id}/milestones`,
   config
  );

  console.log(res.data);
  dispatch({
   type: SET_MILESTONES,
   payload: res.data,
  });
 };

 const updateMessage = async (profile, message) => {
  const config = {
   headers: {
    "Content-Type": "application/json",
   },
  };

  const messageItem = { ...message, profileId: profile._id };

  const res = await axios.put(
   `/api/profiles/${profile._id}/messages/${message._id}`,
   messageItem,
   config
  );
  dispatch({
   type: UPDATE_MESSAGE,
   payload: res.data,
  });
  getMessages(profile);
 };

 const uploadFile = async (caseID, data) => {
  const config = {
   headers: {
    "Content-Type": "application/json",
   },
  };

  const obj = { caseID, data };
  const res = await axios.post(`/api/profiles`, obj, config);

  dispatch({
   type: UPLOAD_FILE,
   payload: res.data,
  });
 };

 const putCanopy = async (data, profile) => {
  const config = {
   headers: {
    "Content-Type": "application/json",
   },
  };
  const res = await axios.put(`/api/profiles/${profile._id}`, data, config);

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
 const updateStatus = async (status, profile) => {
  const config = {
   headers: {
    "Content-Type": "application/json",
   },
  };
  const res = await axios.put(
   `/api/profiles/${profile._id}/status`,
   { status: status },
   config
  );

  dispatch({
   type: UPDATE_STATUS,
   payload: res.data,
  });
 };

 const updateProfile = async (update, profile) => {
  const config = {
   headers: {
    "Content-Type": "application/json",
   },
  };
  const res = await axios.put(
   `/api/profiles/${profile._id}/info`,
   update,
   config
  );
  setProfile(res.data);
  dispatch({
   type: UPDATE_PROFILE,
   payload: res.data,
  });
 };

 const addClient = (profile) => {
  dispatch({
   type: ADD_CLIENT,
   payload: profile,
  });
 };

 const clearClient = () => {
  dispatch({ type: CLEAR_CLIENT });
 };

 const clearProfileList = () => {
  dispatch({ type: CLEAR_PROFILES });
 };
 const sendMessage = async (profile, messageBody) => {
  const config = {
   headers: {
    "Content-Type": "application/json",
   },
  };
  const res = await axios.post(
   `/api/profiles/${profile._id}/messages`,
   messageBody,
   config
  );

  dispatch({
   type: SEND_MESSAGE,
   payload: res.data,
  });

  getMessages(profile);
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

 const setProfile = (profile) => {
  dispatch({
   type: SET_PROFILE,
   payload: profile,
  });
 };

 const clearProfiles = () => {
  dispatch({
   type: CLEAR_PROFILES,
  });
 };

 return (
  <ProfileContext.Provider
   value={{
    addClient,
    setProfile,
    getProfiles,
    clearProfiles,
    clearClient,
    sendMessage,
    getMessages,
    updateMessage,
    filterMessages,
    rangeMessages,
    deleteMessage,
    updateStatus,
    uploadFile,
    clearProfile,
    getMilestones,
    getRules,
    updateProfile,
    message: state.message,
    range: state.range,
    messages: state.messages,

    newProfile: state.newProfile,
    filtered: state.filtered,

    profile: state.profile,
    profileList: state.profileList,
   }}>
   {props.children}
  </ProfileContext.Provider>
 );
};

export default ProfileState;
