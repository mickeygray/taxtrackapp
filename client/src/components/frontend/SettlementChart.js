import React, { useContext, useState, useEffect, useRef } from "react";
import ProfileContext from "../../context/profile/profileContext";
import { Pie } from "react-chartjs-2";
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

const SettlementChart = () => {
 const { settlementCalculation } = useContext(ProfileContext);

 if (settlementCalculation === null) {
  // Return null or display a loading indicator if settlementCalculation is null
  return <Spinner />;
 }

 const { monthlyExpenses, monthlyPaymentPlan, statePayment } =
  settlementCalculation;
 return (
  <div style={{ width: "400px", height: "400px" }}>
   {settlementCalculation != null && (
    <MonthlyExpensesPieChart
     monthlyExpenses={monthlyExpenses}
     monthlyPaymentPlan={monthlyPaymentPlan}
     statePayment={statePayment}
    />
   )}
  </div>
 );
};

export default SettlementChart;
