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
       Number(transaction.amount.replace(/[^0-9.-]+/g, "")) > 0 &&
       rules &&
       rules
        .filter((f) => f.code === transaction.code)
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
       m.type &&
       m.type.includes("debit") &&
       Number(m.amount.replace(/[^0-9.-]+/g, "")) > 0 &&
       Number(m.amount.replace(/[^0-9.-]+/g, ""));
      const credit =
       m.type &&
       m.type.includes("credit") &&
       Number(m.amount.replace(/[^0-9.-]+/g, "")) > 0 &&
       Number(m.amount.replace(/[^0-9.-]+/g, "")) * -1;

      if (credit != 0 && isNumber(credit)) return { x: i, y: credit };
      if (debit != 0 && isNumber(debit)) return { x: i, y: debit };
     })
     .filter((e) => e != undefined),
   ]);
   /*

   */
  }
 }, [rules, profileContext]);

 const savings =
  Number(profile.startingBalance.replace(/[^0-9.-]+/g, "")) -
  Number(profile.totalBalance.replace(/[^0-9.-]+/g, ""));
 const data = transArr.map((m, i) => {
  const obj = {
   x: i,
   y: transArr
    .map((t) => t.y)
    .slice(0, i)
    .reduce((a, b) => a + b, 0),
  };
  return obj;
 });

 const data2 = [];
 let prev = 100;
 let prev2 = 80;
 for (let i = 0; i < 1000; i++) {
  prev += 5 - Math.random() * 10;
  data.push({ x: i, y: prev });
  prev2 += 5 - Math.random() * 10;
  data2.push({ x: i, y: prev2 });
 }

 const labels = [
  ...profile.milestones.map((m) => m.date),
  ...profile.accountTransactions
   .filter((f) => new Date(f.date) > new Date("1/1/2013"))
   .map((m) => m.date)
   .filter((x, i, a) => a.indexOf(x) == i),
 ]
  .filter((x, i, a) => a.indexOf(x) == i)
  .sort((a, b) => Date.parse(a) - Date.parse(b));

 const dataoptions = {
  labels,
  datasets: [
   {
    label: "Path To Zero",
    data: data,
    borderColor: "white",
    radius: 0,
    borderWidth: 10,
    backgroundColor: "white",
    lineTension: ".5",
    borderDash: [10, 5],
   },
   {
    label: "IRS Correspondances",
    data: data2,
    radius: 0,
    borderColor: "white",
    borderWidth: 10,
    lineTension: ".5",
    backgroundColor: "rgba(53, 162, 235, 0.5)",
   },
  ],
 };

 var now = new Date();
 var current;
 if (now.getMonth() == 11) {
  current = new Date(now.getFullYear() + 1, 0, 1);
 } else {
  current = new Date(now.getFullYear(), now.getMonth() + 1, 1);
 }

 console.log(data);

 console.log(ctx);

 const [totalDuration, setTotalDuration] = useState(0);

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

 const config = {
  type: "line",
  data: {
   labels: labels,
   datasets: [
    {
     label: "Path To Zero",
     data: data,
     borderColor: "white",
     radius: 0,
     borderWidth: 10,
     backgroundColor: "white",
     lineTension: ".5",
     //borderDash: [10, 5],
    },

    /*
    {
     label: "IRS Correspondances",
     data: data2,
     radius: 0,
     borderColor: "white",
     borderWidth: 10,
     lineTension: ".5",
     backgroundColor: "rgba(53, 162, 235, 0.5)",
    },*/
   ],
  },
  options: {
   responsive: true,
   animation: {
    initial: false,
    x: {
     type: "number",
     easing: "linear",
     duration: totalDuration,
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
   },
   interaction: {
    intersect: false,
   },
   plugins: {
    legend: false,
   },
   tooltip: {
    callbacks: {
     title: function (context) {
      return `${profile.milestones[context[0].dataIndex].party} ${
       profile.milestones[context[0].dataIndex].action
      }`;
     },
     afterTitle: function (context) {
      return `${profile.accountTransactions[context[0].dataIndex].period} ${
       profile.accountTransactions[context[0].dataIndex].description
      }`;
     },
    },
   },
   scales: {
    x: {
     type: "linear",
    },
   },
  },
 };

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

 return (
  <div>
   <Navbar />
   {taskModal === true && <TaskModal tasks={tasks} />}
   {messageModal === true && <MessageModal />}
   {messageModal === false && (
    <div>
     <div className='all-center' style={{ backgroundColor: "#99EDC3" }}>
      <h3 className='text-center'>
       Your Latest Balance Is {profile.totalBalance}. <br /> So far you've
       eliminated ${savings.toLocaleString()} in debt!
      </h3>
      <h3 className='text-center'>
       We will update your account again on {current.toLocaleDateString()}.
      </h3>
     </div>
     <Line config={config} data={config.data} />
    </div>
   )}
  </div>
 );
};

export default BalanceTransactions;
