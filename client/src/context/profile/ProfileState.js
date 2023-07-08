import React, { useReducer } from "react";
import ProfileContext from "./profileContext";
import ProfileReducer from "./profileReducer";
import axios from "axios";
import {
 ADD_CLIENT,
 PUT_CANOPY,
 CLEAR_CLIENT,
 GET_PROFILES,
 SEND_MESSAGE,
 SET_QUAL,
 CLEAR_QUAL,
 GET_MESSAGES,
 FILTER_MESSAGES,
 RANGE_MESSAGES,
 UPDATE_MESSAGE,
 DELETE_MESSAGE,
 UPDATE_STATUS,
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
  oicChartData: null,
  filtered: null,
  range: null,
 };

 const [state, dispatch] = useReducer(ProfileReducer, initialState);

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

 const setQualificationResult = (qualificationResult) => {
  dispatch({
   type: SET_QUAL,
   payload: qualificationResult,
  });
 };

 const clearQualificationResult = () => {
  dispatch({ type: CLEAR_QUAL });
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
    updateProfile,
    setQualificationResult,
    clearQualificationResult,
    message: state.message,
    oicChartData: state.oicChartData,
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
