import React, { useState, useContext, useEffect } from "react";
import ProfileContext from "../context/profile/profileContext";
import ClientItem from "./ClientItem";
import LogOut from "./LogOut";
import Pagination from "./Pagination";
import Upload from "./Upload";

const TaxTrackBackEnd = () => {
 const [caseID, setCaseID] = useState("");

 const [file, setFile] = useState(null);

 const [text, setText] = useState("");

 const profileContext = useContext(ProfileContext);

 const { postTHS, profile, addClient, clearClient, profileList, getProfiles } =
  profileContext;

 const [currentPage, setCurrentPage] = useState(1);
 const postsPerPage = 10;

 const indexOfLastPost = currentPage * postsPerPage;
 const indexOfFirstPost = indexOfLastPost - postsPerPage;

 const currentPosts = profileList.slice(indexOfFirstPost, indexOfLastPost);

 const paginate = (pageNumber) => setCurrentPage(pageNumber);

 const onSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData();

  formData.append("CaseID", caseID);
  formData.append("file", file);
  postTHS(formData);
 };

 const [putState, setPutState] = useState(false);

 return (
  <div>
   <LogOut />
   <div className='grid-2 all-center' style={{ width: "600px" }}>
    <div className='card' style={{ width: "300px" }}>
     <Upload putState={putState} />
    </div>

    <div className='card' style={{ width: "300px" }}>
     <h3>Search Clients By Name</h3>
     <i>*An empty query returns all of the records </i>
     <input type='text' name='text' onChange={(e) => setText(e.target.value)} />
     <button onClick={() => getProfiles(text)}>Search</button>
    </div>
   </div>

   <div className='container'>
    <Pagination
     postsPerPage={postsPerPage}
     totalPosts={profileList.length}
     paginate={paginate}
    />
    {currentPosts.length > 0
     ? currentPosts.map((profile) => (
        <ClientItem key={profile._id} profile={profile} />
       ))
     : ""}
   </div>
  </div>
 );
};

export default TaxTrackBackEnd;
