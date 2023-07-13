import React, { useContext, useState, useEffect, useRef } from "react";
import ProfileContext from "../../context/profile/profileContext";
import { Pie } from "react-chartjs-2";
import { Chart } from "chart.js";
import Spinner from "../auth/Spinner";

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
 useEffect(() => {
  const chartInstance = chartRef.current;

  // Destroy the previous chart instance if it exists
  if (chartInstance) {
   chartInstance.destroy();
  }

  // Create data for the pie chart
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

  // Render the new chart
  const newChartInstance = new Chart(chartInstance, {
   type: "pie",
   data: data,
  });

  // Store the chart instance in the ref
  chartRef.current = newChartInstance;
 }, [monthlyExpenses]);

 // Calculate the remaining expenses after subtracting state payment and DDIA payment plan

 // Create data for the pie chart

 return <canvas ref={chartRef} />;
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
  <div>
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
