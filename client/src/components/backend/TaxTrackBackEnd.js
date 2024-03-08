import React, { useState, useContext, useEffect } from "react";
import ProfileContext from "../../context/profile/profileContext";
import ProfileItem from "./ProfileItem";
import Pagination from "./Pagination";
import Upload from "./Upload";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ProfilePage from "./ProfilePage";
import SearchComponent from "./SearchComponent";

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

 return (
  <div style={{ height: "100vh", backgroundColor: "#f5f5dc" }}>
   <div className='grid-2 all-center' style={{ width: "600px" }}>
    <div>
     <Upload putState={putState} />

     {returnState === true && (
      <>
       <p>Successfully Created Case for {newProfile && newProfile.fullName}</p>
       <CopyToClipboard text={`${newProfile && newProfile.fullName}`}>
        <button>Copy Name</button>
       </CopyToClipboard>
      </>
     )}
    </div>

    <SearchComponent />
   </div>

   <div className='container'>
    <Pagination
     postsPerPage={postsPerPage}
     totalPosts={profileList.length}
     paginate={paginate}
    />
    {profile === null && currentPosts.length > 0
     ? currentPosts.map((profile) => (
        <ProfileItem key={profile._id} profile={profile} />
       ))
     : ""}

    {profile != null && <ProfilePage />}
   </div>
  </div>
 );
};

export default TaxTrackBackEnd;
