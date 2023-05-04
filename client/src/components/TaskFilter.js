import React, { useContext, useRef, useEffect, useState } from "react";
import ProfileContext from "../context/profile/profileContext";
import Pagination from "./Pagination";
import TaskItem from "./TaskItem";

const Filter = ({ client }) => {
 const profileContext = useContext(ProfileContext);
 const text = useRef("");

 const { filterTasks, clearFilter, filtered, range, tasks, rangeTasks } =
  profileContext;
 const [taskRange, setTaskRange] = useState({
  taskStart: null,
  taskEnd: null,
 });
 useEffect(() => {
  if (filtered === null) {
   text.current.value = "";
  }
 });

 const onChange = (e) => {
  if (text.current.value !== "") {
   filterTasks(e.target.value);
  } else {
   clearFilter();
  }
 };
 const [currentPage, setCurrentPage] = useState(1);
 const postsPerPage = 5;

 const indexOfLastPost = currentPage * postsPerPage;
 const indexOfFirstPost = indexOfLastPost - postsPerPage;

 const currentPosts = tasks.slice(indexOfFirstPost, indexOfLastPost);

 const paginate = (pageNumber) => setCurrentPage(pageNumber);
 useEffect(() => {
  if (filtered === null) {
   text.current.value = "";
  }
 });
 return (
  <div>
   <form>
    <input
     ref={text}
     type='text'
     placeholder='Filter tasks by content...'
     onChange={onChange}
    />
    <div className='grid-2'>
     <input
      type='date'
      name='taskStart'
      onChange={(e) =>
       setTaskRange({ ...taskRange, [e.target.name]: e.target.value })
      }
     />
     <input
      type='date'
      name='taskEnd'
      onChange={(e) =>
       setTaskRange({ ...taskRange, [e.target.name]: e.target.value })
      }
     />
    </div>
   </form>
   <div>
    <button onClick={() => rangeTasks(taskRange)}>Set a Date Range</button>
   </div>
   <div>
    <Pagination
     postsPerPage={postsPerPage}
     totalPosts={tasks.length}
     paginate={paginate}
    />
    {range === null &&
     filtered === null &&
     currentPosts.length > 0 &&
     currentPosts.map((task) => (
      <TaskItem task={task} client={client} key={task._id} />
     ))}

    {range != null &&
     filtered === null &&
     range.map((task) => (
      <TaskItem task={task} client={client} key={task._id} />
     ))}

    {filtered != null &&
     range != null &&
     range
      .filter((element) => filtered.includes(element))
      .map((task) => <TaskItem task={task} client={client} key={task._id} />)}
    {filtered != null &&
     range === null &&
     filtered.map((task) => (
      <TaskItem task={task} client={client} key={task._id} />
     ))}
   </div>
  </div>
 );
};

export default Filter;
