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
 const expenses =
  (totalExpenses || 0) + (statePayment || 0) + (monthlyPaymentPlan || 0);

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
 const percentageOfIncome = ((expenses / income.totalIncome) * 100).toFixed(2);
 const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
   title: {
    display: true,
    text:
     "Total Monthly Expenses:" +
     expenses.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
     }),
    position: "top",
    font: {
     size: 30, // Set the font size for the legend labels
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
    )} `,
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

 return (
  <div style={{ width: "333px", height: "333px" }}>
   <Pie ref={chartRef} data={data} options={options} />
  </div>
 );
};

const DDIAComparisonCharts = ({
 federalLiability,
 monthlyPaymentPlan,
 statePayment,
 income,
 ddiaSavings,

 adjustedFederalLiability,
 disposableIncome,
 maxOfferDisposableIncome,
}) => {
 // Calculate the remaining liability after reduction

 // Calculate the maximum offer threshold

 // Create data for the pie charts
 const chartsData = [
  {
   title: "Possible Savings",
   data: [
    {
     label: "Federal Liability",
     value: adjustedFederalLiability,
     color: "rgba(54, 162, 235, 0.5)",
    },
    {
     label: "Liability Reduction With Expirations",
     value: federalLiability - adjustedFederalLiability,
     color: "rgba(255, 99, 132, 0.5)",
    },
   ],
  },

  {
   title: "Your Income vs Qualifying Income ",
   data: [
    {
     label: "Your Excess Income",
     value: disposableIncome - maxOfferDisposableIncome,
     color: "rgba(54, 162, 235, 0.5)",
    },
    {
     label: "Offer Qualification Income",
     value: maxOfferDisposableIncome,
     color: "rgba(255, 99, 132, 0.5)",
    },
   ],
  },
  {
   title: "Payment Plans Vs Total Income",
   data: [
    {
     label: "Monthly Collection Amount",
     value: monthlyPaymentPlan,
     color: "rgba(255, 99, 132, 0.5)",
    },
    {
     label: "State Payment Amount",
     value: statePayment,
     color: "rgba(75, 192, 192, 0.5)",
    },
    {
     label: "Your Non Disposable Income",
     value: income - ((monthlyPaymentPlan || 0) + (statePayment || 0)),
     color: "rgba(54, 162, 235, 0.5)",
    },
   ],
  },
 ];

 // Create the options for the pie charts

 return (
  <div className='grid-3'>
   {chartsData.map((chartData, index) => {
    const options = {
     responsive: true,
     maintainAspectRatio: false,
     plugins: {
      legend: {
       display: false,
       position: "bottom",
      },
      subtitle: {
       display: true,
       position: "bottom",
       text:
        index === 0
         ? `This Represents Savings From Filing Taxes`
         : index === 1
         ? `Reducing Your Income By This Amount May Help You Qualify`
         : index === 2
         ? `This is how payments effect your income`
         : ``,
       font: {
        size: 30, // Set the font size for the legend labels
       },
      },

      title: {
       display: true,
       text: chartData.title,
       position: "top",
       font: {
        size: 30, // Set the font size for the legend labels
       },
      },
     },
    };
    return (
     <div key={index} style={{ width: "333px", height: "333px" }}>
      <Pie
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
    );
   })}
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
  layout: {
   padding: 0, // disable padding around the chart area
  },
  legend: {
   display: false, // disable legend to remove padding for it
  },
  maintainAspectRatio: false,
  plugins: {
   title: {
    display: true,
    text: `Plausible Offer Amount: ${(
     (plausibleOfferAmount / federalLiability) *
     100
    ).toFixed(2)}% of Federal Liability`,
    position: "top",
    font: {
     size: 30, // Set the font size for the legend labels
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
     size: 30, // Set the font size for the legend labels
    },
   },
  },
 };

 return <Pie ref={chartRef} data={data} options={options} />;
};

const OfferPaymentPlansChart = ({
 totalIncome,
 federalLiability,
 totalExpenses,
 offerPaymentPlans,
}) => {
 const { settlementCalculation, setSettlementCalculation } =
  useContext(ProfileContext);
 const { shortTerm, deferred, lumpSum } = offerPaymentPlans;

 const chartRefs = [useRef(), useRef(), useRef()];

 // Calculate the remaining income after subtracting the expenses

 // Prepare the data for valid payment plans
 const validPaymentsData = [];
 if (deferred.plausibleOfferAmount <= totalIncome) {
  validPaymentsData.push({
   label: "Deferred Payment Plan",
   subtitle: deferred.term,
   value: deferred.plausibleOfferAmount,
   backgroundColor: "rgba(54, 162, 235, 0.5)",
   borderColor: "#ff6384",
  });
 }
 if (shortTerm.plausibleOfferAmount <= totalIncome) {
  validPaymentsData.push({
   label: "Short Term",
   subtitle: shortTerm.term,
   value: shortTerm.plausibleOfferAmount,
   backgroundColor: "rgba(75, 192, 192, 0.5)",
   borderColor: "#4bc0c0",
  });
 }
 if (lumpSum.plausibleOfferAmount <= totalIncome) {
  validPaymentsData.push({
   label: "Lump Sum",
   subtitle: lumpSum.term,
   value: lumpSum.plausibleOfferAmount,
   backgroundColor: "rgba(54, 162, 235, 0.5)",
   borderColor: "#36a2eb",
  });
 }

 // Create the data for the pie charts
 const pieData = validPaymentsData.map((payment) => ({
  labels: [payment.label, "Total Income"],
  subtitle: payment.subtitle,
  datasets: [
   {
    data: [payment.value, totalIncome],
    backgroundColor: [payment.backgroundColor, "rgba(255, 99, 132, 0.5)"],
    borderColor: [payment.borderColor, "#ff6384", "#36a2eb"],
    borderWidth: 1,
   },
  ],
 }));

 // Create the options for the pie charts

 return (
  <>
   {pieData.map((data, index) => {
    const options = {
     responsive: true,
     maintainAspectRatio: false,
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
       text: data.labels[0],
       position: "top",
       font: {
        size: 30, // Set the font size for the title
       },
      },

      subtitle: {
       display: true,
       text: `Monthly Payment: ${data.datasets[0].data[0].toLocaleString(
        "en-US",
        {
         style: "currency",
         currency: "USD",
        }
       )} for ${data.subtitle} months`,
       position: "bottom",
       font: {
        size: 30, // Set the font size for the title
       },
      },
     },
    };

    return (
     <div
      onClick={() =>
       setSettlementCalculation({
        ...settlementCalculation,
        ["plausibleOfferAmount"]: data.subtitle * data.datasets[0].data[0],
        ["savings"]:
         federalLiability - data.subtitle * data.datasets[0].data[0],
       })
      }
      key={index}
      style={{ width: "333px", height: "333px" }}>
      <Pie ref={chartRefs[index]} data={data} options={options} />
     </div>
    );
   })}
  </>
 );
};

const SettlementChart = () => {
 const { settlementCalculation, setSettlementCalculation } =
  useContext(ProfileContext);
 console.log(settlementCalculation);
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
    <div style={{ display: "flex", justifyContent: "space-between" }}></div>
   ) : (
    <div>
     <h1 className='text-center'>{settlementCalculation.offerStatus}</h1>
     <div className='grid-4'>
      <div style={{ width: "333px", height: "333px" }}>
       <MonthlyExpensesPieChart
        key={`monthly-expenses-${refresh}`}
        income={settlementCalculation.income}
        monthlyExpenses={settlementCalculation.monthlyExpenses}
        monthlyPaymentPlan={settlementCalculation.monthlyPaymentPlan}
        statePayment={settlementCalculation.statePayment}
       />
      </div>
      {settlementCalculation.offerStatus.includes("OIC") && (
       <>
        <div style={{ width: "333px", height: "333px" }}>
         <PlausibleOfferPieChart
          key={`plausible-offer-${refresh}`}
          plausibleOfferAmount={settlementCalculation.plausibleOfferAmount}
          federalLiability={settlementCalculation.federalLiability}
          savings={settlementCalculation.savings}
         />
        </div>
       </>
      )}
      {settlementCalculation.offerStatus.includes("DDIA") && (
       <DDIAComparisonCharts
        key={`ddia-comparison-${refresh}`}
        federalLiability={settlementCalculation.federalLiability}
        adjustedFederalLiability={
         settlementCalculation.adjustedFederalLiability
        }
        monthlyPaymentPlan={settlementCalculation.monthlyPaymentPlan}
        statePayment={settlementCalculation.statePayment}
        monthlyExpenses={settlementCalculation.monthlyExpenses}
        rcpWindow={settlementCalculation.rcpWindow}
        income={settlementCalculation.income.totalIncome}
        ddiaSavings={settlementCalculation.ddiaSavings}
        disposableIncome={settlementCalculation.disposableIncome}
        maxOfferDisposableIncome={
         settlementCalculation.maxOfferDisposableIncome
        }
       />
      )}
     </div>{" "}
     {settlementCalculation.offerStatus.includes("OIC") && (
      <div className='grid-3' style={{ width: "333px", height: "333px" }}>
       <OfferPaymentPlansChart
        key={`offer-payment-plans-${refresh}`}
        totalIncome={settlementCalculation.income.totalIncome}
        totalExpenses={settlementCalculation.monthlyExpenses.totalExpenses}
        federalLiability={settlementCalculation.federalLiability}
        offerPaymentPlans={settlementCalculation.offerPaymentPlans}
       />
      </div>
     )}
    </div>
   )}
  </div>
 );
};

export default SettlementChart;
