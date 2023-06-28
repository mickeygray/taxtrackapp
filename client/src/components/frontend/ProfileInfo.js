import React from "react";
import calendar from "../../images/calendar.png";

const ProfileInfo = () => {
 return (
  <div className='profile-info'>
   <div className='section'>
    <h2>Your Case Status</h2>
    <div className='item'>
     <div>
      <img src={calendar} style={{ height: "100px", width: "100px" }} /> Joined
      The ABC Tax Track Family On 6/11/2021
     </div>
    </div>
   </div>
   <div className='section'>
    <h2>Document Updates</h2>
    <div className='item'>
     <label>Updates:</label>
     <span>2 new documents</span>
    </div>
   </div>
   <div className='section'>
    <h2>Articles and Information</h2>
    <div className='item'>
     <label>Updates:</label>
     <span>10 new articles</span>
    </div>
   </div>
  </div>
 );
};

export default ProfileInfo;
