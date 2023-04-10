import React, { useState, useContext, useEffect } from "react";
import ProfileContext from "../context/profile/profileContext";
import AuthContext from "../context/auth/authContext";
import {
 Chart as ChartJS,
 CategoryScale,
 LinearScale,
 PointElement,
 LineElement,
 Title,
 Tooltip,
 Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";
const TaxCalculator = () => {
 const profileContext = useContext(ProfileContext);
 const { postCalc, getZip, zipdata } = profileContext;

 const authContext = useContext(AuthContext);
 const { profile } = authContext;
 const [incomeEq, setIncomeEq] = useState("");
 const povertyCheck = () => {
  if (
   parseInt(
    profile.taxReturnData[profile.taxReturnData.length - 1].adjustedGrossIncome
   ) < parseInt(zipdata.medianincome)
  ) {
   setIncomeEq("Below Average");
  } else if (
   parseInt(
    profile.taxReturnData[profile.taxReturnData.length - 1].adjustedGrossIncome
   ) > parseInt(zipdata.medianincome) &&
   parseInt(
    profile.taxReturnData[profile.taxReturnData.length - 1].adjustedGrossIncome
   ) < parseInt(zipdata.meanincome)
  ) {
   setIncomeEq("Average");
  } else if (
   parseInt(
    profile.taxReturnData[profile.taxReturnData.length - 1].adjustedGrossIncome
   ) > parseInt(zipdata.meanincome)
  ) {
   setIncomeEq("Above Average");
  }
 };
 useEffect(() => {
  if (zipdata != null) {
   povertyCheck();
  } else {
   getZip(profile.zip);
  }
 }, [zipdata]);

 console.log(incomeEq);

 const allowables = [
  {
   people: 1,
   deduction: 723,
  },
  {
   people: 2,
   deduction: 1292,
  },
  {
   people: 3,
   deduction: 1473,
  },
  {
   people: 4,
   deduction: 1740,
  },
 ];

 return <div className='all-center'>Coming soon OIC estimate.</div>;
};

export default TaxCalculator;
