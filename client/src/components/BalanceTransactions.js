import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/auth/authContext";
import ProfileContext from "../context/profile/profileContext";
import logo from "../images/TaxTrackLogo.jpg";
import bubble from "../images/bubble.png";
import question from "../images/question.jpg";
import exclamation from "../images/exclamation.png";
import TransactionItem from "./TransactionItem";
import MessageModal from "./MessageModal";
import TaskModal from "./TaskModal";
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
import { Line } from "react-chartjs-2";
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

 const { profile } = useContext(AuthContext);

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

 const { tasks, getTasks, getRules, rules } = useContext(ProfileContext);

 const [messageModal, toggleMessageModal] = useState(false);
 const [taskModal, toggleTaskModal] = useState(false);

 const [transactionView, setTransactionView] = useState(false);

 var now = new Date();
 var current;
 if (now.getMonth() == 11) {
  current = new Date(now.getFullYear() + 1, 0, 1);
 } else {
  current = new Date(now.getFullYear(), now.getMonth() + 1, 1);
 }

 const options = {
  responsive: true,
  interaction: {
   mode: "index",
  },
  plugins: {
   legend: {
    position: "top",
   },
   title: {
    display: true,
    text: "The Track to 0",
   },
   /* tooltip: {
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
   },*/
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

 const [transArr, setTransArr] = useState([]);

 useEffect(() => {
  if (rules != null) {
   setTransArr([
    0,
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
     .map((m) => {
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

      if (credit != 0) return credit;
      if (debit != 0) return debit;
     })
     .filter((e) => e !== undefined),
   ]);
  }
 }, [rules, profileContext]);

 const labels = profile.accountTransactions
  .map((m) => m.date)
  .sort((a, b) => Date.parse(a) - Date.parse(b));

 const data = {
  labels,
  datasets: [
   {
    label: "Tax Track Path To 0",
    data: stoneArr,
    borderColor: "rgb(255, 99, 132)",
    backgroundColor: "rgba(255, 99, 132, 0.5)",
   },
   {
    label: "IRS Correspondances",
    data: transArr.map((m, i) =>
     transArr.slice(0, i).reduce((a, b) => a + b, 0)
    ),
    borderColor: "rgb(53, 162, 235)",
    backgroundColor: "rgba(53, 162, 235, 0.5)",
   },
  ],
 };

 useEffect(() => {
  if (tasks && tasks.length === 0) {
   setStyle({ backgroundColor: "black" });
  } else if (tasks && tasks.length > 0) {
   setStyle({ backgroundColor: "yellow" });
  }
 }, [tasks.length]);

 return (
  <div className='container'>
   <Burger />
   <div className='all-center'>
    <Link to='/'>
     <img
      src={logo}
      alt='Tax Track'
      style={{ height: "200px", width: "200px" }}
     />
    </Link>
    <h3>Welcome To Tax Track {profile.fullName}</h3>
   </div>
   {taskModal === true && <TaskModal tasks={tasks} />}
   {messageModal === true && <MessageModal />}
   {messageModal === false && (
    <div>
     <h2 className='text-center'>
      Your Current Balance Is {profile.totalBalance}.{" "}
     </h2>
     <h3 className='text-center'>
      We will update your account again on {current.toLocaleDateString()}.
     </h3>
     <Line options={options} data={data} />;
     <div className='all-center'>
      <a onClick={() => setTransactionView((prevState) => !prevState)}>
       <img
        src={question}
        alt='Tax Track'
        style={{ height: "100px", width: "100px" }}
       />{" "}
       <h5>Learn More</h5>
      </a>
     </div>
     <div className='grid-4'>
      {transactionView === true &&
       profile.accountTransactions.map((transaction) => (
        <TransactionItem
         transaction={transaction}
         key={profile.accountTransactions.findIndex((x) => x === transaction)}
        />
       ))}
     </div>
    </div>
   )}
   -
   <div className='grid-2' style={{ marginTop: "50px" }}>
    <div className='all-center'>
     <a
      style={style}
      onClick={() => toggleTaskModal((prevState) => !prevState)}>
      <img src={exclamation} style={{ height: "150px", width: "150px" }} />
     </a>
    </div>
    <div className='all-center'>
     <a onClick={() => toggleMessageModal((prevState) => !prevState)}>
      <img src={bubble} style={{ height: "150px", width: "150px" }} />
     </a>
    </div>
   </div>
  </div>
 );
};

export default BalanceTransactions;
