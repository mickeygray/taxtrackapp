import React, { useContext } from "react";
import AuthContext from "../../context/auth/authContext";
const MessageItem = ({ message }) => {
 const { name, content, date } = message;
 const { profile } = useContext(AuthContext);
 return (
  <div className='text-left' style={{ width: "400px" }}>
   {name === profile.fullName ? (
    <div className='message tx' style={{ float: "right" }}>
     <span className='bubble r-caret'>{content}</span>
    </div>
   ) : (
    <div class='message rx' style={{ float: "left" }}>
     <span className='bubble l-caret'>{content}</span>
    </div>
   )}
  </div>
 );
};

export default MessageItem;
