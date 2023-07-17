import React, { useContext, useState, useEffect, useRef } from "react";
import ProfileContext from "../../context/profile/profileContext";
import { Pie, Bar } from "react-chartjs-2";
import {
 Chart as ChartJS,
 CategoryScale,
 LinearScale,
 PointElement,
 LineElement,
 BarElement,
 ArcElement,
 Tooltip,
 Legend,
 registerables as registerablesJS,
} from "chart.js";
import useResizeParentNode from "../../utils/useResizeParentNode";
import Spinner from "../auth/Spinner";
ChartJS.register(
 CategoryScale,
 LinearScale,
 PointElement,
 LineElement,
 BarElement,
 ArcElement,
 Tooltip,
 Legend
);

ChartJS.register(...registerablesJS);

const MonthlyExpensesPieChart = ({
 monthlyExpenses,
 monthlyPaymentPlan,
 statePayment,
 income,
}) => {
 const chartRef = useRef(null);

 const {
  totalExpenses,
  autoCost,
  housingExpense,
  healthCareExpense,
  livingExpenses,
 } = monthlyExpenses;

 const {
  food,
  housekeepingSupplies,
  apparelAndServices,
  personalCare,
  miscellaneous,
 } = livingExpenses;

 let expenseTitle = totalExpenses;

 if (statePayment !== undefined) expenseTitle += statePayment;
 if (monthlyPaymentPlan !== undefined) expenseTitle += monthlyPaymentPlan;

 const data = {
  labels: [
   "Auto Cost",
   "Housing Expense",
   "Health Care Expense",
   "Food",
   "Housekeeping Supplies",
   "Apparel and Services",
   "Personal Care",
   "Miscellaneous",
   "State Payment",
   "DDIA Payment Plan",
  ],
  datasets: [
   {
    data: [
     autoCost,
     housingExpense,
     healthCareExpense,
     food,
     housekeepingSupplies,
     apparelAndServices,
     personalCare,
     miscellaneous,
     statePayment,
     monthlyPaymentPlan,
    ],
    backgroundColor: [
     "#FF6384",
     "#36A2EB",
     "#FFCE56",
     "#FF4500",
     "#32CD32",
     "#8B008B",
     "#FFA500",
     "#00CED1",
     "#FF1493",
     "#FFD700",
    ],
    hoverBackgroundColor: [
     "#FF6384",
     "#36A2EB",
     "#FFCE56",
     "#FF4500",
     "#32CD32",
     "#8B008B",
     "#FFA500",
     "#00CED1",
     "#FF1493",
     "#FFD700",
    ],
   },
  ],
 };
 const percentageOfIncome = (
  (totalExpenses / income.totalIncome) *
  100
 ).toFixed(2);
 const options = {
  responsive: true,

  plugins: {
   title: {
    display: true,
    text:
     "Total Monthly Expenses:" +
     expenseTitle.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
     }),
    position: "top",
    font: {
     size: 40, // Set the font size for the legend labels
    },
   },
   subtitle: {
    display: true,
    text: `${percentageOfIncome}% of your allowable income : ${income.totalIncome.toLocaleString(
     "en-US",
     {
      style: "currency",
      currency: "USD",
     }
    )}`,
    position: "bottom",
    font: {
     size: 40,
    },
   },
   legend: {
    display: false,

    labels: {
     font: {
      size: 15, // Set the font size for the legend labels
     },
    },
   },
  },
 };

 // Calculate the remaining expenses after subtracting state payment and DDIA payment plan

 // Create data for the pie chart

 return <Pie ref={chartRef} data={data} options={options} />;
};

const DDIAComparisonCharts = ({
 federalLiability,
 reducedLiability,
 monthlyPaymentPlan,
 statePayment,
 monthlyExpenses,
 monthlyCollectionAmount,
 rcpWindow,
}) => {
 // Calculate the remaining liability after reduction

 // Calculate the maximum offer threshold
 const maxOfferThreshold = (0.79 * federalLiability) / rcpWindow;

 // Create data for the pie charts
 const chartsData = [
  {
   title: "Federal Liability vs Reduced Liability",
   data: [
    {
     label: "Federal Liability",
     value: federalLiability,
     color: "rgba(54, 162, 235, 0.5)",
    },
    {
     label: "Reduced Liability",
     value: reducedLiability,
     color: "rgba(255, 99, 132, 0.5)",
    },
   ],
  },
  {
   title: "Federal Payment vs State Payment",
   data: [
    {
     label: "Federal Payment",
     value: monthlyPaymentPlan,
     color: "rgba(75, 192, 192, 0.5)",
    },
    {
     label: "State Payment",
     value: statePayment,
     color: "rgba(255, 205, 86, 0.5)",
    },
   ],
  },
  {
   title: "Payment vs Expenses",
   data: [
    {
     label: "Payment",
     value: monthlyPaymentPlan + statePayment,
     color: "rgba(54, 162, 235, 0.5)",
    },
    {
     label: "Expenses",
     value: monthlyExpenses,
     color: "rgba(255, 99, 132, 0.5)",
    },
   ],
  },
  {
   title: "Monthly Collection Amount vs Maximum Offer Threshold",
   data: [
    {
     label: "Monthly Collection Amount",
     value: monthlyCollectionAmount,
     color: "rgba(75, 192, 192, 0.5)",
    },
    {
     label: "Maximum Offer Threshold",
     value: maxOfferThreshold,
     color: "rgba(255, 205, 86, 0.5)",
    },
   ],
  },
 ];

 // Create the options for the pie charts
 const options = {
  responsive: true,

  plugins: {
   legend: {
    display: false,
    position: "bottom",
   },
  },
 };

 console.log(chartsData);

 return (
  <div>
   {chartsData.map((chartData, index) => (
    <div key={index}>
     <h3>{chartData.title}</h3>
     <Pie
      style={{ width: "100%", height: "100%" }}
      data={{
       labels: chartData.data.map((data) => data.label),
       datasets: [
        {
         data: chartData.data.map((data) => data.value),
         backgroundColor: chartData.data.map((data) => data.color),
         borderColor: chartData.data.map((data) => data.color),
         borderWidth: 1,
        },
       ],
      }}
      options={options}
     />
    </div>
   ))}
  </div>
 );
};

const PlausibleOfferPieChart = ({
 plausibleOfferAmount,
 federalLiability,
 savings,
}) => {
 const chartRef = useRef(null);

 const data = {
  labels: ["Plausible Offer Amount", "Remaining Federal Liability"],
  datasets: [
   {
    data: [plausibleOfferAmount, federalLiability - plausibleOfferAmount],
    backgroundColor: ["#FF6384", "#36A2EB"],
    hoverBackgroundColor: ["#FF6384", "#36A2EB"],
   },
  ],
 };

 const options = {
  responsive: true,

  plugins: {
   title: {
    display: true,
    text: `Plausible Offer Amount: ${(
     (plausibleOfferAmount / federalLiability) *
     100
    ).toFixed(2)}% of Federal Liability`,
    position: "top",
    font: {
     size: 40, // Set the font size for the legend labels
    },
   },
   legend: {
    display: false,

    labels: {
     font: {
      size: 20, // Set the font size for the legend labels
     },
    },
   },
   subtitle: {
    display: true,
    text: `Savings: ${savings.toLocaleString("en-US", {
     style: "currency",
     currency: "USD",
    })}`,
    position: "bottom",
    font: {
     size: 40, // Set the font size for the legend labels
    },
   },
  },
 };

 return (
  <Pie
   style={{ width: "100%", height: "100%" }}
   ref={chartRef}
   data={data}
   options={options}
  />
 );
};

const OfferPaymentPlansChart = ({
 totalIncome,
 totalExpenses,
 offerPaymentPlans,
}) => {
 const { shortTerm, deferred, offerLumpSumHigh, offerLumpSumLow } =
  offerPaymentPlans;

 const chartRefs = [useRef(), useRef(), useRef(), useRef()];

 // Calculate the remaining income after subtracting the expenses
 const remainingIncome = totalIncome - totalExpenses;

 // Prepare the data for valid payment plans
 const validPaymentsData = [];
 if (shortTerm <= remainingIncome) {
  validPaymentsData.push({
   label: "Short Term",
   value: shortTerm,
   backgroundColor: "rgba(75, 192, 192, 0.5)",
   borderColor: "#4bc0c0",
  });
 }
 if (offerLumpSumHigh <= remainingIncome) {
  validPaymentsData.push({
   label: "Offer Lump Sum High",
   value: offerLumpSumHigh,
   backgroundColor: "rgba(54, 162, 235, 0.5)",
   borderColor: "#36a2eb",
  });
 }
 if (offerLumpSumLow <= remainingIncome) {
  validPaymentsData.push({
   label: "Offer Lump Sum Low",
   value: offerLumpSumLow,
   backgroundColor: "rgba(255, 205, 86, 0.5)",
   borderColor: "#ffcd56",
  });
 }
 if (deferred <= remainingIncome) {
  validPaymentsData.push({
   label: "Deferred",
   value: deferred,
   backgroundColor: "rgba(54, 162, 235, 0.5)",
   borderColor: "#ff6384",
  });
 }

 // Create the data for the pie charts
 const pieData = validPaymentsData.map((payment) => ({
  labels: [payment.label, ""],
  datasets: [
   {
    data: [payment.value, totalExpenses],
    backgroundColor: [payment.backgroundColor, "rgba(255, 99, 132, 0.5)"],
    borderColor: [payment.borderColor, "#ff6384", "#36a2eb"],
    borderWidth: 1,
   },
  ],
 }));

 // Create the options for the pie charts
 const options = {
  responsive: true,

  plugins: {
   legend: {
    display: false,
    position: "bottom",
    labels: {
     font: {
      size: 16, // Set the font size for the legend labels
     },
    },
   },
   title: {
    display: true,
    text: () => {
     // Get the title dynamically based on the validPaymentsData
     const titles = validPaymentsData.map((payment) => payment.label);
     return titles;
    },
    position: "top",
    font: {
     size: 40, // Set the font size for the title
    },
   },

   subtitle: {
    display: true,
    text: () => {
     // Get the title dynamically based on the validPaymentsData
     const amount = validPaymentsData.map((payment) => payment.value);
     return `${amount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
     })} Monthly Payment `;
    },
    position: "bottom",
    font: {
     size: 40, // Set the font size for the title
    },
   },
  },
 };

 return (
  <div>
   {pieData.map((data, index) => (
    <div key={index} style={{ width: "366px", height: "366px" }}>
     <div style={{ width: "100%", height: "100%" }}>
      <Pie
       style={{ width: "100%", height: "100%" }}
       ref={chartRefs[index]}
       data={data}
       options={options}
      />
     </div>
    </div>
   ))}
  </div>
 );
};

const DeferredChart = () => {
 const chartRef = useRef(null);

 useEffect(() => {
  const canvas = chartRef.current;
  canvas.setAttribute("width", "366");
  canvas.setAttribute("height", "366");
  const ctx = canvas.getContext("2d");

  const chart = new ChartJS(ctx, {
   type: "pie",
   data: {
    labels: ["Deferred"],
    datasets: [
     {
      data: [1],
      backgroundColor: ["rgba(255, 99, 132, 0.5)"],
      borderColor: ["rgba(255, 99, 132, 1)"],
      borderWidth: 1,
     },
    ],
   },
   options: {
    responsive: true,
    maintainAspectRatio: 1,
    plugins: {
     legend: {
      display: false, // Set to false to hide the legend
     },
     title: {
      display: true,
      text: "Deferred",
      font: {
       size: 20,
      },
     },
    },
   },
  });

  return () => {
   chart.destroy();
  };
 }, []);

 return (
  <div
   style={{
    display: "inline-block",
    position: "relative",
    width: "500px",
   }}>
   <canvas ref={chartRef}></canvas>
  </div>
 );
};

const SettlementChart = () => {
 const { settlementCalculation } = useContext(ProfileContext);

 // Use the custom hook to adjust the size of the parent node for each chart

 // Keep track of a refresh state that will force a re-render of the charts
 const [refresh, setRefresh] = useState(false);

 useEffect(() => {
  // Update the charts when settlementCalculation changes
  // You may need to set up the data and options for each chart
  // and update the state to trigger re-rendering.
  setRefresh((prevState) => !prevState);
 }, [settlementCalculation]);

 return (
  <div id='settlementchart'>
   {settlementCalculation === null ? (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
     <div style={{ width: "33%", height: "366px" }}>
      <DeferredChart />
     </div>
     <div style={{ width: "33%", height: "366px" }}>
      <DeferredChart />
     </div>
     <div style={{ width: "33%", height: "366px" }}>
      <DeferredChart />
     </div>
    </div>
   ) : (
    <div>
     <h1>{settlementCalculation.offerStatus}</h1>
     <div className='grid-3'>
      <div style={{ width: "366px", height: "366px" }}>
       <MonthlyExpensesPieChart
        style={{ width: "100%", height: "100%" }}
        key={`monthly-expenses-${refresh}`}
        income={settlementCalculation.income}
        monthlyExpenses={settlementCalculation.monthlyExpenses}
        monthlyPaymentPlan={settlementCalculation.monthlyPaymentPlan}
        statePayment={settlementCalculation.statePayment}
       />
      </div>
      {settlementCalculation.offerStatus.includes("OIC") && (
       <>
        <div style={{ width: "366px", height: "366px" }}>
         <PlausibleOfferPieChart
          key={`plausible-offer-${refresh}`}
          plausibleOfferAmount={settlementCalculation.plausibleOfferAmount}
          federalLiability={settlementCalculation.federalLiability}
          savings={settlementCalculation.savings}
         />
        </div>
        <div style={{ width: "366px", height: "366px" }}>
         <OfferPaymentPlansChart
          key={`offer-payment-plans-${refresh}`}
          totalIncome={settlementCalculation.income.totalIncome}
          totalExpenses={settlementCalculation.monthlyExpenses.totalExpenses}
          offerPaymentPlans={settlementCalculation.offerPaymentPlans}
         />
        </div>
       </>
      )}
      {settlementCalculation.offerStatus.includes("DDIA") && (
       <DDIAComparisonCharts
        key={`ddia-comparison-${refresh}`}
        federalLiability={settlementCalculation.federalLiability}
        reducedLiability={settlementCalculation.reducedLiability}
        monthlyPaymentPlanPayment={settlementCalculation.monthlyPaymentPlan}
        statePayment={settlementCalculation.statePayment}
        monthlyExpenses={settlementCalculation.monthlyExpenses}
        rcpWindow={settlementCalculation.rcpWindow}
       />
      )}
     </div>
    </div>
   )}
  </div>
 );
};

export default SettlementChart;
