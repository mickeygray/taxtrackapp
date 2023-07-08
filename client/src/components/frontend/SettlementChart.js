import React, { useContext, useState, useEffect } from "react";
import ProfileContext from "../../context/profile/profileContext";

const SettlementChart = () => {
 const { oicChartData } = useContext(ProfileContext);

 console.log(oicChartData);

 return <div>SettlementChart</div>;
};

export default SettlementChart;
