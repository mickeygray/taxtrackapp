import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/auth/authContext";
import ProfileContext from "../context/profile/profileContext";
import logo from "../images/TaxTrackLogo.jpg";
import bubble from "../images/bubble.png";

import exclamation from "../images/exclamation.png";

import MessageModal from "./MessageModal";
import TaskModal from "./TaskModal";
import Navbar from "./Navbar";
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
import { Line, Chart } from "react-chartjs-2";
import Burger from "./Burger";
import profileContext from "../context/profile/profileContext";
//Chart.defaults.global.legend.display = false;
const BalanceTransactions = () => {
 ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
 );

 const { profile, logout } = useContext(AuthContext);

 const [stoneArr, setStoneArr] = useState([
  ...profile.milestones.map(
   (m, i) =>
    Number(profile.startingBalance.replace(/[^0-9.-]+/g, "")) -
    profile.milestones
     .slice(0, i)
     .map(({ amount }) => parseFloat(amount))
     .reduce((a, b) => a + b, 0)
  ),
 ]);

 const [transArr, setTransArr] = useState([]);
 // const [data, setData] = useState([]);
 const ctx =
  document.querySelector("#root canvas") &&
  document.querySelector("#root canvas").getContext("2d");

 const { tasks, getTasks, getRules, rules } = useContext(ProfileContext);

 const [messageModal, toggleMessageModal] = useState(false);
 const [taskModal, toggleTaskModal] = useState(false);

 const [transactionView, setTransactionView] = useState(false);
 useEffect(() => {
  function isNumber(x) {
   return parseFloat(x) == x;
  }
  if (rules != null) {
   setTransArr([
    ...profile.accountTransactions
     .map((transaction, i) => {
      const type =
       transaction.amount &&
       rules &&
       rules
        .filter((f) => parseInt(f.code) === parseInt(transaction.code))
        .map((r) => r.type)
        .toString();

      if (type !== false) {
       const obj = {
        ...transaction,
        type,
       };
       return obj;
      } else {
       return transaction;
      }
     })
     .map((m, i) => {
      const debit =
       m.type && m.type.includes("debit") && m.amount > 0 && m.amount;
      const credit =
       m.type && m.type.includes("credit") && m.amount != 0 && m.amount;

      console.log(credit, "credit");
      if (credit != 0 && isNumber(credit))
       return {
        x: m.date,
        y: credit,
        tooltip1: m.description,
        tooltip2: m.period,
       };
      if (debit != 0 && isNumber(debit))
       return {
        x: m.date,
        y: debit,
        tooltip1: m.description,
        tooltip2: m.period,
       };
     })
     .filter((f) => f != undefined)

     .sort((a, b) => Date.parse(a.x) - Date.parse(b.x)),
   ]);
  }
 }, [rules, profileContext]);

 const savings =
  profile.startingBalance &&
  Number(profile.startingBalance.replace(/[^0-9.-]+/g, "")) -
   Number(profile.currentBalance.replace(/[^0-9.-]+/g, ""));
 const mappedData = transArr.map((t, i) => {
  const obj = {
   ...t,
   y: transArr
    .map((t) => t.y)
    .slice(0, i)
    .reduce((a, b) => a + b, 0),
  };
  return obj;
 });

 var now = new Date();
 var current;
 if (now.getMonth() == 11) {
  current = new Date(now.getFullYear() + 1, 0, 1);
 } else {
  current = new Date(now.getFullYear(), now.getMonth() + 1, 1);
 }

 const [totalDuration, setTotalDuration] = useState(10000);

 useEffect(() => {
  let timer1 = setTimeout(() => setTotalDuration(10000), 20000);

  // this will clear Timeout
  // when component unmount like in willComponentUnmount
  // and show will not change to true
  return () => {
   clearTimeout(timer1);
  };
 }, []);
 const delayBetweenPoints = totalDuration / transArr.length;

 const previousY = (ctx) =>
  ctx.index === 0
   ? ctx.chart.scales.y.getPixelForValue(100)
   : ctx.chart
      .getDatasetMeta(ctx.datasetIndex)
      .data[ctx.index - 1].getProps(["y"], true).y;

 const footer = (tooltipItems) => {
  let sum = 0;

  return "Sum: " + sum;
 };

 const data = {
  labels: mappedData.map((m) => m.x),
  datasets: [
   {
    label: "Path To Zero",
    data: mappedData,
    borderColor: "white",
    radius: 20,
    fill: false,
    borderWidth: 10,
    backgroundColor: "white",
    lineTension: ".5",
    tooltip: {
     callbacks: {
      title: "Yes",
     },
    },
   },
  ],
 };
 const options = {
  responsive: true,
  /* animation: {
   x: {
    type: "number",
    easing: "linear",
    duration: 30000,
    from: NaN,
    delay(ctx) {
     if (ctx.type !== "data" || ctx.yStarted) {
      return 0;
     }
     ctx.yStarted = true;
     return ctx.index * delayBetweenPoints;
    },
   },
   y: {
    type: "number",
    easing: "linear",
    duration: totalDuration,
    from: previousY, // previousY,
    delay(ctx) {
     if (ctx.type !== "data" || ctx.yStarted) {
      return 0;
     }
     ctx.yStarted = true;
     return ctx.index * delayBetweenPoints;
    },
   },
  },*/
  interaction: {
   // intersect: false,
   mode: "index",
  },
  plugins: {
   legend: { display: false },
   tooltip: {
    callbacks: {
     title: function (context) {
      return {};
     },
     labelTextColor: function (context) {
      return "#543453";
     },
    },
   },
  },
  scales: {
   y: {
    display: false, // Hide Y axis labels
   },
   x: {
    display: false, // Hide X axis labels
   },
  },
 };

 console.log(options.plugins.tooltip.callbacks.labelTextColor);

 const [style, setStyle] = useState({ backgroundColor: "black" });
 useEffect(() => {
  getRules();
  const interval = setInterval(() => {
   getTasks(profile);
  }, 5000);

  return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
 }, []);

 useEffect(() => {
  if (tasks && tasks.length === 0) {
   setStyle({ backgroundColor: "black" });
  } else if (tasks && tasks.length > 0) {
   setStyle({ backgroundColor: "yellow" });
  }
 }, [tasks.length]);

 console.log(data);

 return (
  <div>
   <Navbar />
   {taskModal === true && <TaskModal tasks={tasks} />}
   {messageModal === true && <MessageModal />}
   {messageModal === false && (
    <div className='container grid-2c' style={{ height: "77vh" }}>
     <Line data={data} options={options} />
     <div className='' style={{ backgroundColor: "#99EDC3" }}>
      <h3 className='text-center'>
       Your Latest Balance Is {profile.currentBalance}. <br /> So far you've
       eliminated ${savings && savings.toLocaleString()} in debt!
      </h3>
      <h3 className='text-center'>
       We will update your account again on {current.toLocaleDateString()}.
      </h3>
     </div>
    </div>
   )}
  </div>
 );
};

export default BalanceTransactions;
