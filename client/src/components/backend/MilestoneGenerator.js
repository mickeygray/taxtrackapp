import React, { useContext, useState, useEffect } from "react";
import ProfileContext from "../../context/profile/profileContext";

const MilestoneGenerator = () => {
 const profileContext = useContext(ProfileContext);

 const { saveStones, profile, getMilestones, milestones } = profileContext;

 useEffect(() => {
  getMilestones(profile);
 }, []);

 const stone = {
  party: "",
  action: "",
  date: "",
  amount: "",
 };

 const [stones, setStones] = useState(milestones != null ? milestones : []);

 const addStone = () => {
  let newStones = [...stones, stone];

  setStones(newStones);
 };

 const updateStone = (e, i) => {
  let newStones = [...stones];

  newStones[i] = {
   ...newStones[i],
   [e.target.name]: e.target.value,
  };

  setStones(newStones);
 };

 const deleteStone = (i) => {
  let newStones = stones.filter((f) => f.stone !== i.stone);
  setStones(newStones);
 };
 return (
  <div className='card'>
   <div className='grid-2' style={{ width: "300px" }}>
    <button onClick={() => addStone()}>Add Milestone</button>
    <button onClick={() => saveStones(profile, stones)}>Save Milestones</button>
   </div>
   <div>
    <div className='grid-4'>
     {stones.map((i) => {
      return (
       <div key={stones.indexOf(i)} className='card'>
        <span style={{ float: "right" }}>
         <button
          className='btn btn-sm btn-light'
          onClick={() => deleteStone(i)}>
          X
         </button>
        </span>
        {Object.keys(i).map((k) => {
         if (k === "party") {
          return (
           <select
            style={{ marginBottom: "3px" }}
            name={k}
            value={i[k]}
            onChange={(e) => updateStone(e, stones.indexOf(i))}>
            <option value=''>Who Took Action</option>
            <option value='irs'>IRS</option>
            <option value='ABC'>ABC</option>
            <option value='Client'>Client</option>
           </select>
          );
         } else if (k === "action") {
          return (
           <div>
            <select
             style={{ marginBottom: "3px" }}
             name={k}
             value={i[k]}
             onChange={(e) => updateStone(e, stones.indexOf(i))}>
             <option value=''>What Action Was Taken</option>
             <option value='file'>Filed Return</option>
             <option value='amend'>Amended Return</option>
             <option value='refund'>Process Refund</option>
             <option value='CSED'>Debt Expires</option>
             <option value='CNC'>CNC</option>
             <option value='OICSubmit'>Submit OIC</option>
             <option value='OICResponse'>IRS Accepts Offer</option>
             <option value='AbatementSubmit'>Submit Penalty Abatement</option>
             <option value='AbatementResponse'>IRS Accepts Abatement</option>
             <option value='MonthlyPayment'>
              A Years worth of Installment payments
             </option>
             <option value='DDIA Interest'>
              Reduced Interest from Direct Debit
             </option>
             <option value='Levy Release'>Levy Release</option>
             <option value='Garnish Release'>Garnish Release</option>
            </select>
            <p>Custom Milestone</p>
            <input
             type='text'
             placeholder={k}
             name={k}
             onChange={(e) => updateStone(e, stones.indexOf(i))}
            />
           </div>
          );
         } else if (k === "amount") {
          return (
           <input
            type='text'
            placeholder={k}
            value={i[k]}
            name={k}
            onChange={(e) => updateStone(e, stones.indexOf(i))}
           />
          );
         } else if (k === "date") {
          return (
           <input
            placeholder={k}
            value={i[k]}
            type='date'
            onChange={(e) => updateStone(e, stones.indexOf(i))}
            name={k}
           />
          );
         }
        })}
       </div>
      );
     })}
    </div>
   </div>
   <div className='grid-4'>
    {" "}
    {stones.map((s) => (
     <div className='card'>
      <ul>
       <li>{s.party}</li>
       <li>{s.action}</li>
       <li>{s.amount}</li>
       <li>{s.date}</li>
      </ul>
     </div>
    ))}
   </div>
  </div>
 );
};

export default MilestoneGenerator;
