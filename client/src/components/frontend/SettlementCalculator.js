import React from "react";
import SettlementForm from "./SettlementForm";
import SettlementChart from "./SettlementChart";
const SettlementCalculator = () => {
 return (
  <div className='grid-2'>
   <div>
    <SettlementForm />{" "}
   </div>
   <div>
    <SettlementChart />{" "}
   </div>
  </div>
 );
};

export default SettlementCalculator;
