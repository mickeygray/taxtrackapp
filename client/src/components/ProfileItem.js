import React, { useContext, useState, useEffect } from "react";
import ProfileContext from "../context/profile/profileContext";
import AuthContext from "../context/auth/authContext";

import TaskFilter from "./TaskFilter";
import MessageFilter from "./MessageFilter";
import MilestoneGenerator from "./MilestoneGenerator";
import Upload from "./Upload";

const ProfileItem = ({ profile }) => {
 const profileContext = useContext(ProfileContext);
 const authContext = useContext(AuthContext);

 const { putCanopy, getMessages, setProfile, clearProfiles } = profileContext;

 const [style, setStyle] = useState({
  backgroundColor: "black",
  color: "white",
 });

 const openProfile = (profile) => {
  setProfile(profile);
  clearProfiles();
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

 return (
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
     <button onClick={() => openProfile(profile)}>View Profile</button>{" "}
    </div>{" "}
   </div>{" "}
  </div>
 );
};

export default ProfileItem;
