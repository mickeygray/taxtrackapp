import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import ProfileContext from "../context/profile/profileContext";
import AuthContext from "../context/auth/authContext";
import MessageItem from "./MessageItem";
const MessageModal = ({ toggleModal }) => {
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
  <div className='container'>
   <span style={{ float: "right" }}>
    <button onClick={toggleModal}>X</button>
   </span>
   <div style={{ width: "500px" }} className='all-center2'>
    <div className='chat-container chat-messages'>
     {messages.map((message, index) => (
      <div
       key={index}
       className={`chat-bubble ${
        message.name === profile.firstName ? "sender" : "receiver"
       }`}>
       {message.content}
       <div className='from-date'>
        <span className='from'>{message.name}</span> -{" "}
        <span className='date'>
         {new Date(message.date).toLocaleDateString()}
        </span>
       </div>
      </div>
     ))}
    </div>

    <div className='all-center'>
     <textarea
      className='p-1 m-1'
      value={text}
      onChange={(e) => setText(e.target.value)}></textarea>

     <button className='btn btn-dark' onClick={() => submitPost(text)}>
      Send Message
     </button>
    </div>
   </div>
  </div>
 );
};

export default MessageModal;
