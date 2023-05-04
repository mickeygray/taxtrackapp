import React, { useState, useContext } from "react";
import ProfileContext from "../context/profile/profileContext";
const BackEndMessageItem = ({ message, client }) => {
 const profileContext = useContext(ProfileContext);

 const { deleteMessage, updateMessage } = profileContext;

 const [update, setUpdate] = useState({
  date: "",
  name: "",
  content: "",
  _id: message._id,
 });

 const { content, name, date } = message;

 const [messageState, setMessageState] = useState(false);

 return (
  <div className='card'>
   <span style={{ float: "right" }}>
    <button onClick={() => deleteMessage(client, message._id)}>X</button>
   </span>
   {messageState === false && (
    <div>
     <ul>
      <li> Sent From : {name}</li>
     </ul>
     <p>{content}</p>
    </div>
   )}
   {messageState === true && (
    <div>
     <legend>Message</legend>
     <textarea
      name='content'
      value={update.content}
      placeholder={content}
      onChange={(e) =>
       setUpdate({ ...update, [e.target.name]: e.target.value })
      }></textarea>
    </div>
   )}

   {messageState === false && (
    <button
     onClick={() => {
      setMessageState((prevState) => !prevState) &&
       setUpdate({ content, name, date });
     }}>
     Update Message
    </button>
   )}
   {messageState === true && (
    <button
     onClick={() =>
      updateMessage(client, update) &&
      setMessageState((prevState) => !prevState)
     }>
     Update Message
    </button>
   )}
  </div>
 );
};

export default BackEndMessageItem;
