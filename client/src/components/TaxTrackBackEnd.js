import React, { useState, useContext, useEffect } from "react";
import ProfileContext from "../context/profile/profileContext";
import ProfileItem from "./ProfileItem";
import LogOut from "./LogOut";
import Pagination from "./Pagination";
import Upload from "./Upload";
import { CopyToClipboard } from "react-copy-to-clipboard";

const TaxTrackBackEnd = () => {
 const [caseID, setCaseID] = useState("");

 const [file, setFile] = useState(null);

 const [text, setText] = useState("");

 const profileContext = useContext(ProfileContext);

 const {
  postTHS,
  profile,
  newProfile,
  clearProfile,
  profileList,
  getProfiles,
  clearProfiles,
 } = profileContext;

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
 const [returnState, setReturnState] = useState(false);
 useEffect(() => {
  if (newProfile != null) {
   setReturnState((prevState) => !prevState);
   const timer = setTimeout(() => {
    setReturnState((prevState) => !prevState);
    clearProfile();
   }, 5000);
   return () => clearTimeout(timer);
  }
 }, [newProfile, profileContext]);

 console.log(profileList);
 return (
  <div>
   <LogOut />
   <div className='grid-2 all-center' style={{ width: "600px" }}>
    <div className='card' style={{ width: "300px" }}>
     <Upload putState={putState} />

     {returnState === true && (
      <>
       <p>Successfully Created Case for {profile && profile.fullName}</p>
       <CopyToClipboard text={`${profile && profile.fullName}`}>
        <button>Copy Name</button>
       </CopyToClipboard>
      </>
     )}
    </div>

    <div className='card' style={{ width: "300px", height: "274px" }}>
     <h3>Search Clients By Name</h3>
     <i>*An empty query returns all of the records </i>
     <br />
     <br />
     <input type='text' name='text' onChange={(e) => setText(e.target.value)} />
     <div className='grid-2'>
      <button onClick={() => getProfiles(text)}>Search</button>
      <button onClick={() => clearProfiles()}>Clear Results</button>
     </div>
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
        <ProfileItem key={profile._id} profile={profile} />
       ))
     : ""}
   </div>
  </div>
 );
};

export default TaxTrackBackEnd;
