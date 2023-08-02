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
 formResponse,
 ddiaSavings,
 expirations,
 adjustedFederalLiability,
 disposableIncome,
 maxOfferDisposableIncome,
}) => {
 console.log(ddiaSavings);
 // Calculate the remaining liability after reduction
 const currentYear = new Date().getFullYear() + 6;
 const expiringFederalLiability = formResponse.taxLiabilities
  .filter((liability) => liability.plaintiff === "irs")
  .map((liability) => {
   const parseAmountValue = (amount) => {
    if (typeof amount === "string") {
     return parseFloat(amount.replace("$", ""));
    }
    return amount;
   };
   const portion = parseAmountValue(liability.amount) / liability.years.length;
   const expiringPortion = portion * 0.75;

   console.log(expirations);
   const ddiaPortions = expirations[0].map((year) =>
    year <= currentYear ? expiringPortion : portion
   );

   return ddiaPortions.reduce((total, portion) => total + portion, 0);
  })[0];

 // Create data for the pie charts
 const chartsData = [
  {
   title: "Possible Savings",
   data: [
    {
     label: "Federal Liability",
     value:
      federalLiability -
      (federalLiability -
       adjustedFederalLiability +
       (adjustedFederalLiability - expiringFederalLiability)),
     color: "rgba(75, 192, 192, 0.5)",
    },
    {
     label: "Filing Corrections",
     value: federalLiability - adjustedFederalLiability,
     color: "#8B008B",
    },
    {
     label: "Potential Expiring Debt",
     value: adjustedFederalLiability - expiringFederalLiability,
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
         ? `Max Portion of Your Debt That May Expire`
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

const SixYearCharts = ({
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
     label: "Filing Corrections",
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
  labels: [payment.label, "Remaining Income"],
  subtitle: payment.subtitle,
  datasets: [
   {
    data: [payment.value, totalIncome - payment.value],
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

const CncIncomeMaintenance = ({ income, expenses, federalLiability }) => {
 // Proportions of total income

 const minimumPlausibleOfferAmount = () => {
  const minimumPaymentAmount = () => {
   let percentage;

   // Set percentage based on sliding scale
   if (federalLiability <= 10000) {
    percentage = 1; // 100%
   } else if (federalLiability > 10000 && federalLiability <= 25000) {
    percentage = 0.1; // 10%
   } else if (federalLiability > 25000 && federalLiability <= 50000) {
    percentage = 0.05; // 5%
   } else if (federalLiability > 50000 && federalLiability <= 75000) {
    percentage = 0.025; // 2.5%
   } else if (federalLiability > 75000 && federalLiability <= 100000) {
    percentage = 0.01; // 1%
   } else {
    percentage = 0.01; // 1% for any liability over 100,000
   }

   // Calculate the minimum payment amount
   const minPayment = (federalLiability / 72) * percentage;

   return minPayment;
  };
  const offerPayment = income * 0.05 + income - expenses;

  const averageIncrease = (minimumPaymentAmount() + offerPayment) / 2;

  return averageIncrease;
 };

 const data = {
  labels: ["Total Income", "Income Increase"],
  datasets: [
   {
    label: "Your Total Income",
    data: [income, minimumPlausibleOfferAmount()],
    backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
    borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
    borderWidth: 1,
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
    text: `Increasing Your Income May Change Your Status `,
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
    text: `This means a pre-tax income of ${(
     (minimumPlausibleOfferAmount() + income) /
     0.8
    ).toLocaleString("en-US", {
     style: "currency",
     currency: "USD",
    })} may change your designation`,
    position: "bottom",
    font: {
     size: 20, // Set the font size for the legend labels
    },
   },
  },
 };
 return <Pie data={data} options={options} />;
};
const TaxSummary = ({
 totalExpenses,
 totalIncome,
 collectionWindow,
 monthlyCollectionAmount,
 plausibleOfferAmount,
 determination,
}) => {
 return (
  <div className='summary-container grid-3'>
   <div className='summary-section'>
    <h2>Total Expenses Calculation</h2>
    <p>
     We calculated your total expenses by considering the cost of living in your
     state, as well as any payments you may have to make to settle your debt.
     This came to a total of ${totalExpenses} per month.
    </p>
   </div>
   <div className='summary-section'>
    <h2>Income Calculation</h2>
    <p>
     Your total income was calculated by taking into account all of your revenue
     sources, then subtracting a basic tax of 20 percent. This resulted in a
     total income of ${totalIncome} per month.
    </p>
   </div>
   <div className='summary-section'>
    <h2>Collection Window Calculation</h2>
    <p>
     We calculated your average collection window based on the years you stated
     you owed with the newest and oldest being used to make an average. This
     came to {collectionWindow / 12} years.
    </p>
   </div>
   <div className='summary-section'>
    <h2>Monthly Collection Amount Calculation</h2>
    <p>
     Your monthly collection amount was calculated by taking your total income
     after expenses. This resulted in a monthly collection amount of $
     {totalIncome - totalExpenses}.
    </p>
   </div>
   <div className='summary-section'>
    <h2>Plausible Offer Amount Calculation</h2>
    <p>
     We predicted the amount you could reasonably offer the IRS to settle your
     debt by multiplying your collection amount by the number of months the Irs
     could reasonably collect. This came to a total offer amount of $
     {plausibleOfferAmount}.
    </p>
   </div>
   <div className='summary-section'>
    <h2>Settlement Determination</h2>
    <p>
     We determined the best option for your tax situation based on all these
     calculations and considering various settlement options. The best option
     for you was determined to be: {determination}.
    </p>
   </div>
  </div>
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
  <div style={{ backgroundColor: "#77d215" }}>
   {settlementCalculation === null ? (
    <div style={{ display: "flex", justifyContent: "space-between" }}></div>
   ) : (
    <div>
     <div>
      {" "}
      <h1 className='text-center'>{settlementCalculation.offerStatus}</h1>
      {settlementCalculation.offerStatus.includes("CNC") && (
       <div>
        <p className='text-center'>
         Income level maintenance required until 12/31/
         {Math.max(...settlementCalculation.expirations)}
        </p>
       </div>
      )}
      <div className='grid-4'>
       {settlementCalculation.offerStatus.includes("OIC") && (
        <div className='oic-container'>
         <div className='grid-2 oic-topdiv '>
          <div style={{ width: "333px", height: "333px" }}>
           <MonthlyExpensesPieChart
            key={`monthly-expenses-${refresh}`}
            income={settlementCalculation.income}
            monthlyExpenses={settlementCalculation.monthlyExpenses}
            monthlyPaymentPlan={settlementCalculation.monthlyPaymentPlan}
            statePayment={settlementCalculation.statePayment}
           />
          </div>
          <div style={{ width: "333px", height: "333px" }}>
           <PlausibleOfferPieChart
            key={`plausible-offer-${refresh}`}
            plausibleOfferAmount={settlementCalculation.plausibleOfferAmount}
            federalLiability={settlementCalculation.federalLiability}
            savings={settlementCalculation.savings}
           />
          </div>
         </div>
         <div
          className='oic-bottomdiv grid-3'
          style={{ width: "333px", height: "333px" }}>
          <OfferPaymentPlansChart
           key={`offer-payment-plans-${refresh}`}
           totalIncome={settlementCalculation.income.totalIncome}
           totalExpenses={settlementCalculation.monthlyExpenses.totalExpenses}
           federalLiability={settlementCalculation.federalLiability}
           offerPaymentPlans={settlementCalculation.offerPaymentPlans}
          />
         </div>
        </div>
       )}{" "}
       {settlementCalculation.offerStatus.includes("Offer Or Payment Plan") && (
        <div className='oic-container'>
         <div className='grid-2 oic-topdiv'>
          <div style={{ width: "333px", height: "333px" }}>
           <MonthlyExpensesPieChart
            key={`monthly-expenses-${refresh}`}
            income={settlementCalculation.income}
            monthlyExpenses={settlementCalculation.monthlyExpenses}
            monthlyPaymentPlan={settlementCalculation.monthlyPaymentPlan}
            statePayment={settlementCalculation.statePayment}
           />
          </div>
          <div style={{ width: "333px", height: "333px" }}>
           <PlausibleOfferPieChart
            key={`plausible-offer-${refresh}`}
            plausibleOfferAmount={settlementCalculation.plausibleOfferAmount}
            federalLiability={settlementCalculation.federalLiability}
            savings={settlementCalculation.savings}
           />
          </div>
         </div>{" "}
         <h1>Offer Information</h1>
         <div
          className='grid-3 oic-bottomdiv'
          style={{ width: "333px", height: "333px" }}>
          <OfferPaymentPlansChart
           key={`offer-payment-plans-${refresh}`}
           totalIncome={settlementCalculation.income.totalIncome}
           totalExpenses={settlementCalculation.monthlyExpenses.totalExpenses}
           federalLiability={settlementCalculation.federalLiability}
           offerPaymentPlans={settlementCalculation.offerPaymentPlans}
          />
         </div>
         <h1>Payment Plan Information</h1>
         <DDIAComparisonCharts
          key={`ddia-comparison-${refresh}`}
          federalLiability={settlementCalculation.federalLiability}
          adjustedFederalLiability={
           settlementCalculation.adjustedFederalLiability
          }
          monthlyPaymentPlan={settlementCalculation.monthlyPaymentPlan}
          statePayment={settlementCalculation.statePayment}
          monthlyExpenses={settlementCalculation.monthlyExpenses}
          formResponse={settlementCalculation.formResponse}
          expirations={settlementCalculation.expirations}
          rcpWindow={settlementCalculation.rcpWindow}
          income={settlementCalculation.income.totalIncome}
          ddiaSavings={settlementCalculation.ddiaSavings}
          disposableIncome={settlementCalculation.disposableIncome}
          maxOfferDisposableIncome={
           settlementCalculation.maxOfferDisposableIncome
          }
         />
        </div>
       )}
       {settlementCalculation.offerStatus.includes("DDIA") && (
        <div className='grid-4' style={{ paddingLeft: "0px" }}>
         <div style={{ width: "333px", height: "333px" }}>
          <MonthlyExpensesPieChart
           key={`monthly-expenses-${refresh}`}
           income={settlementCalculation.income}
           monthlyExpenses={settlementCalculation.monthlyExpenses}
           monthlyPaymentPlan={settlementCalculation.monthlyPaymentPlan}
           statePayment={settlementCalculation.statePayment}
          />
         </div>
         <DDIAComparisonCharts
          key={`ddia-comparison-${refresh}`}
          federalLiability={settlementCalculation.federalLiability}
          adjustedFederalLiability={
           settlementCalculation.adjustedFederalLiability
          }
          monthlyPaymentPlan={settlementCalculation.monthlyPaymentPlan}
          statePayment={settlementCalculation.statePayment}
          monthlyExpenses={settlementCalculation.monthlyExpenses}
          formResponse={settlementCalculation.formResponse}
          expirations={settlementCalculation.expirations}
          rcpWindow={settlementCalculation.rcpWindow}
          income={settlementCalculation.income.totalIncome}
          ddiaSavings={settlementCalculation.ddiaSavings}
          disposableIncome={settlementCalculation.disposableIncome}
          maxOfferDisposableIncome={
           settlementCalculation.maxOfferDisposableIncome
          }
         />
        </div>
       )}
      </div>{" "}
      {settlementCalculation.offerStatus.includes("CNC") && (
       <div style={{ marginLeft: "2px" }}>
        <div className='cnc-topdiv grid-2'>
         <div style={{ width: "333px", height: "333px" }}>
          <MonthlyExpensesPieChart
           key={`monthly-expenses-${refresh}`}
           income={settlementCalculation.income}
           monthlyExpenses={settlementCalculation.monthlyExpenses}
           monthlyPaymentPlan={settlementCalculation.monthlyPaymentPlan}
           statePayment={settlementCalculation.statePayment}
          />
         </div>
         <div style={{ width: "333px", height: "333px" }}>
          <CncIncomeMaintenance
           income={settlementCalculation.income.totalIncome}
           expenses={settlementCalculation.monthlyExpenses.totalExpenses}
           federalLiability={settlementCalculation.federalLiability}
          />
         </div>
        </div>
       </div>
      )}
      {settlementCalculation.offerStatus.includes("Year") && (
       <div className='grid-4 six-yearcontainer'>
        <div style={{ width: "333px", height: "333px" }}>
         <MonthlyExpensesPieChart
          key={`monthly-expenses-${refresh}`}
          income={settlementCalculation.income}
          monthlyExpenses={settlementCalculation.monthlyExpenses}
          monthlyPaymentPlan={settlementCalculation.monthlyPaymentPlan}
          statePayment={settlementCalculation.statePayment}
         />
        </div>
        <SixYearCharts
         key={`six-year-${refresh}`}
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
       </div>
      )}
     </div>
     <div>
      <TaxSummary
       totalExpenses={settlementCalculation.monthlyExpenses.totalExpenses}
       totalIncome={settlementCalculation.income.totalIncome}
       collectionWindow={settlementCalculation.rcpWindow}
       monthlyCollectionAmount={settlementCalculation.plausibleOfferAmount}
       plausibleOfferAmount={settlementCalculation.plausibleOfferAmount}
       determination={settlementCalculation.offerStatus}
      />
     </div>
    </div>
   )}
  </div>
 );
};

export default SettlementChart;
