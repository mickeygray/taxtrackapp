import React, { useContext, useRef, useEffect, useState } from "react";
import ProfileContext from "../context/profile/profileContext";
import Pagination from "./Pagination";
import BackEndMessageItem from "./BackEndMessageItem";
const Filter = ({ client }) => {
 const profileContext = useContext(ProfileContext);
 const text = useRef("");

 const {
  filterMessages,
  clearFilter,
  filtered,
  range,
  messages,
  rangeMessages,
 } = profileContext;
 const [messageRange, setMessageRange] = useState({
  messageStart: null,
  messageEnd: null,
 });

 const [currentPage, setCurrentPage] = useState(1);
 const postsPerPage = 5;

 const indexOfLastPost = currentPage * postsPerPage;
 const indexOfFirstPost = indexOfLastPost - postsPerPage;

 const currentPosts = messages.slice(indexOfFirstPost, indexOfLastPost);

 const paginate = (pageNumber) => setCurrentPage(pageNumber);
 useEffect(() => {
  if (filtered === null) {
   text.current.value = "";
  }
 });

 const onChange = (e) => {
  if (text.current.value !== "") {
   filterMessages(e.target.value);
  } else {
   clearFilter();
  }
 };

 return (
  <div>
   <form>
    <input
     ref={text}
     type='text'
     placeholder='Filter messages...'
     onChange={onChange}
    />
    <div className='grid-2'>
     <input
      type='date'
      name='messageStart'
      onChange={(e) =>
       setMessageRange({ ...messageRange, [e.target.name]: e.target.value })
      }
     />
     <input
      type='date'
      name='messageEnd'
      onChange={(e) =>
       setMessageRange({ ...messageRange, [e.target.name]: e.target.value })
      }
     />
    </div>
   </form>
   <div>
    <button onClick={() => rangeMessages(messageRange)}>
     Set a Date Range
    </button>
   </div>
   <div>
    <Pagination
     postsPerPage={postsPerPage}
     totalPosts={messages.length}
     paginate={paginate}
    />
    {range === null &&
     filtered === null &&
     currentPosts.length > 0 &&
     currentPosts.map((message) => (
      <BackEndMessageItem message={message} client={client} key={message._id} />
     ))}

    {range != null &&
     filtered === null &&
     range.map((message) => (
      <BackEndMessageItem message={message} client={client} key={message._id} />
     ))}

    {filtered != null &&
     range != null &&
     range
      .filter((element) => filtered.includes(element))
      .map((message) => (
       <BackEndMessageItem
        message={message}
        client={client}
        key={message._id}
       />
      ))}
    {filtered != null &&
     range === null &&
     filtered.map((message) => (
      <BackEndMessageItem message={message} client={client} key={message._id} />
     ))}
   </div>
  </div>
 );
};

export default Filter;
