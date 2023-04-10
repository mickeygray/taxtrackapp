import React, { useState, useContext, useEffect } from "react";

import ProfileContext from "../context/profile/profileContext";
import AuthContext from "../context/auth/authContext";
import MessageItem from "./MessageItem";
const MessageModal = () => {
 const profileContext = useContext(ProfileContext);
 const { sendMessage, getMessages, messages } = profileContext;
 const authContext = useContext(AuthContext);
 const { profile } = authContext;

 useEffect(() => {
  getMessages(profile);
 }, []);

 const [text, setText] = useState("");
 const submitPost = (text) => {
  const curDate = new Date();

  sendMessage(profile, {
   name: profile.firstName,
   content: text,
   date: curDate,
  });
  setText("");
 };
 return (
  <div>
   {" "}
   <div>
    {messages.map((m) => (
     <MessageItem key={m._id} message={m} />
    ))}
   </div>
   <div>
    <textarea value={text} onChange={(e) => setText(e.target.value)}></textarea>
    <button className='btn btn-primary' onClick={() => submitPost(text)}>
     Send Message
    </button>
   </div>
  </div>
 );
};

export default MessageModal;
