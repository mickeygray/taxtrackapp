import React from "react";

const MessageItem = ({ message }) => {
 const { name, content, date } = message;

 return (
  <div className='card'>
   <div>{date}</div>
   <div>{name}:</div>
   <div>{content}</div>
  </div>
 );
};

export default MessageItem;
