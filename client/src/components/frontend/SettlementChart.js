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

 const options = {
  plugins: {
   title: {
    display: true,
    text:
     "Total Monthly Expenses:" +
     expenseTitle.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
     }),
    position: "bottom",
   },
  },
 };

 // Calculate the remaining expenses after subtracting state payment and DDIA payment plan

 // Create data for the pie chart

 return <Pie ref={chartRef} data={data} options={options} />;
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
  plugins: {
   title: {
    display: true,
    text: `Plausible Offer Amount: ${(
     (plausibleOfferAmount / federalLiability) *
     100
    ).toFixed(2)}% of Federal Liability`,
    position: "top",
   },
   subtitle: {
    display: true,
    text: `Savings: ${savings.toLocaleString("en-US", {
     style: "currency",
     currency: "USD",
    })}`,
    position: "bottom",
   },
  },
 };

 return <Pie ref={chartRef} data={data} options={options} />;
};

const OfferPaymentPlansChart = ({
 totalIncome,
 totalExpenses,
 offerPaymentPlans,
}) => {
 const { shortTerm, deferred, offerLumpSumHigh, offerLumpSumLow } =
  offerPaymentPlans;

 // Calculate the remaining income after subtracting the expenses
 const remainingIncome = totalIncome - totalExpenses;
 console.log(remainingIncome);
 // Prepare the data for valid payment plans
 const validPaymentsData = [];
 if (shortTerm <= remainingIncome) {
  validPaymentsData.push({
   label: "Short Term",
   value: shortTerm,
   backgroundColor: "rgba(75, 192, 192, 0.5)",
   borderColor: "#4bc0c0",
  });
 } else if (offerLumpSumHigh <= remainingIncome) {
  validPaymentsData.push({
   label: "Offer Lump Sum High",
   value: offerLumpSumHigh,
   backgroundColor: "rgba(54, 162, 235, 0.5)",
   borderColor: "#36a2eb",
  });
 } else if (offerLumpSumLow <= remainingIncome) {
  validPaymentsData.push({
   label: "Offer Lump Sum Low",
   value: offerLumpSumLow,
   backgroundColor: "rgba(255, 205, 86, 0.5)",
   borderColor: "#ffcd56",
  });
 } else if (deferred <= remainingIncome) {
  validPaymentsData.push({
   label: "Deferred",
   value: deferred,
   backgroundColor: "rgba(255, 99, 132, 0.5)",
   borderColor: "#ff6384",
  });
 }

 // Create the data for the pie charts
 const pieData = validPaymentsData.map((payment) => ({
  labels: [
   payment.label,
   "Expenses",
   remainingIncome > 0 && "Remaining Income",
  ],
  datasets: [
   {
    data: [
     payment.value,
     totalExpenses,
     remainingIncome > 0 && remainingIncome,
    ],
    backgroundColor: [
     payment.backgroundColor,
     "rgba(255, 99, 132, 0.5)",
     "rgba(54, 162, 235, 0.5)",
    ],
    borderColor: [payment.borderColor, "#ff6384", "#36a2eb"],
    borderWidth: 1,
   },
  ],
 }));

 // Create the options for the pie charts
 const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
   legend: {
    display: true,
    position: "bottom",
   },
  },
 };
 console.log(pieData);
 return (
  <div>
   {pieData.map((data, index) => (
    <div key={index}>
     <h3>{validPaymentsData[index].label}</h3>
     <Pie data={data} options={options} />
    </div>
   ))}
  </div>
 );
};

const SettlementChart = () => {
 const { settlementCalculation } = useContext(ProfileContext);

 if (settlementCalculation === null) {
  // Return null or display a loading indicator if settlementCalculation is null
  return <Spinner />;
 }

 const {
  monthlyExpenses,
  monthlyPaymentPlan,
  statePayment,
  plausibleOfferAmount,
  federalLiability,
  savings,
  income,
  offerPaymentPlans,
 } = settlementCalculation;

 console.log(settlementCalculation);

 if (settlementCalculation != null) {
  return (
   <div>
    {" "}
    <MonthlyExpensesPieChart
     monthlyExpenses={monthlyExpenses}
     monthlyPaymentPlan={monthlyPaymentPlan}
     statePayment={statePayment}
    />
    {settlementCalculation.offerStatus.includes("OIC") && (
     <>
      <PlausibleOfferPieChart
       plausibleOfferAmount={plausibleOfferAmount}
       federalLiability={federalLiability}
       savings={savings}
      />
      <OfferPaymentPlansChart
       totalIncome={income.totalIncome}
       totalExpenses={monthlyExpenses.totalExpenses}
       offerPaymentPlans={offerPaymentPlans}
      />
     </>
    )}
   </div>
  );
 }
};

export default SettlementChart;
