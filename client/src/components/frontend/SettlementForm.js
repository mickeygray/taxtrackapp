import React, { useContext, useState, useCallback } from "react";
import {
 TextField,
 Button,
 Checkbox,
 IconButton,
 FormControl,
 ListItemText,
 InputLabel,
 Box,
 Grid,
 Select,
 MenuItem,
 FormControlLabel,
 Collapse,
 Typography,
} from "@mui/material";
import {
 ExpandMore,
 ExpandLess,
 Delete,
 Edit,
 VisibilityOff,
} from "@mui/icons-material"; // U
import useExpenseData from "../../utils/useExpenseData";
import TaxLiabilitiesItem from "./TaxLiabilitiesItem";
import ProfileContext from "../../context/profile/profileContext";
import styled, { css } from "styled-components";
const formControlMixin = css`
 width: 100%;
 height: 40px;
 padding: 8px;
 font-size: 0.875rem;
 border-radius: 8px;
 box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
 background-color: #fff;
 position: relative; /* Add position relative */
 transition: box-shadow 0.3s ease;

 /* Additional styles for TextField and Select */
 & label {
  position: absolute; /* Add position absolute */
  top: -5px; /* Adjust the top value to move the label above the input */
  left: -5px; /* Adjust the left value to move the label to the left */
  font-size: 1rem;
 }

 & legend {
  font-size: 0.6rem;
 }

 &:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
 }
`;

const SettlementFormContainer = styled.div`
 background-color: #f9f9f9;
 overflow-x: hidden;
 width: 100%; /* Set the width to 100% */
 max-width: 400px; /* Set the maximum width */
 border-radius: 16px; /* Reasonable value for border-radius */
 box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
 transition: box-shadow 0.3s ease;
 padding: 16px; /* Reasonable value for padding */
 overflow: auto;
 transform-style: preserve-3d;
 backface-visibility: hidden;
 transform: ${({ formVisible }) =>
  formVisible ? "rotateY(0)" : "rotateY(180deg)"};
 transform-origin: center;
 transition: transform 0.5s ease;
`;

const SettlementFormInputLabel = styled(InputLabel)`
 color: #3f51b5;
 font-size: 16px;
 margin-bottom: 5px;
`;

const SettlementFormSectionTitle = styled(Typography)`
 color: #3f51b5;
`;

const SettlementFormControlFullWidth = styled(FormControl)`
 ${formControlMixin}
`;

const SettlementFormTextField = styled(TextField)`
 border-color: #f4f4f4;
 ${formControlMixin}
 & .MuiInputBase-root,
  & .MuiInputBase-input {
  height: 40px; /* Add this to set the height to 40px */

  box-shadow: none;
 }
`;

const SettlementFormButton = styled(Button)`
 margin-top: 10px;
 font-size: 0.875rem;
`;

const SettlementFormSelect = styled(Select)`
 ${formControlMixin}
 width: 100%;
`;

const SettlementFormSectionContainer = styled(Grid)`
 display: grid;
 place-items: center; // Center the content both horizontally and vertically
 gap: 16px; /* Add spacing of 16px between items */
 padding: 16px; /* Add padding to the box */
 margin-bottom: -10px;
`;

const SettlementFormExpenseGridFormControl = styled(FormControl)`
 width: 100px;
 margin-right: 16px;
 margin-top: 5px;
`;

const SettlementForm = () => {
 const profileContext = useContext(ProfileContext);
 const { setSettlementCalculation } = profileContext;
 const { housing, auto, healthCareExpenses, livingExpenses, states } =
  useExpenseData();
 const [formVisible, setFormVisible] = useState(true);
 const [formResponse, setFormResponse] = useState({
  taxLiabilities: [
   { plaintiff: "irs", amount: 0, payment: 0, years: [], unfiledYears: [] },
   { plaintiff: "state", amount: 0, payment: 0, years: [], unfiledYears: [] },
  ],
  incomes: [{ type: "", amount: 0 }],
  state: "",
  carsOwned: 0,
  residents: 0,
  residents65: 0,
 });

 function calculateTotalExpenses() {
  const { state, carsOwned, residents, residents65 } = formResponse;

  const region = Object.values(auto).find((region) =>
   region.states.includes(state)
  );
  const autoCost = region
   ? carsOwned > 1
     ? region.twoCars
     : region.oneCar
   : 0;

  const housingCost = housing.find((item) => item.state === state);
  const familySize = `familyOf${residents}`;
  const housingExpense = housingCost ? housingCost[familySize] : 0;

  const residentsUnder65 = parseInt(residents) - (parseInt(residents65) || 0);

  const healthCareExpense =
   healthCareExpenses.under65 * parseInt(residentsUnder65) +
   healthCareExpenses.over65 * parseInt(residents65);

  const livingExpensesData = livingExpenses[familySize];

  const totalExpenses =
   autoCost + housingExpense + healthCareExpense + livingExpensesData.total;

  return {
   totalExpenses,
   autoCost,
   housingExpense,
   healthCareExpense,
   livingExpenses: livingExpensesData,
  };
 }

 function calculateCollectionWindow() {
  const { taxLiabilities, extenuatingCircumstances } = formResponse;

  const oldestTaxYear = Math.min(
   ...taxLiabilities.map((liability) => Math.min(...liability.years))
  );
  const newestTaxYear = Math.max(
   ...taxLiabilities.map((liability) => Math.max(...liability.years))
  );

  const csedYears = taxLiabilities
   .filter((f) => f.plaintiff === "irs")
   .map((liability) => {
    const years = liability.years.map((year) => parseInt(year) + 10);
    return years;
   });

  const averageYears = (newestTaxYear + oldestTaxYear) / 2 + 10;

  const collectionWindow =
   (parseInt(averageYears) - parseInt(new Date().getFullYear())) * 12;

  console.log(csedYears);
  return { expirations: csedYears, collectionWindow };
 }

 function calculateTotalIncome() {
  const { incomes } = formResponse;

  const totalWages =
   incomes
    .filter((income) => income.type === "salary")
    .reduce((sum, income) => sum + parseFloat(income.amount), 0) * 0.8;

  const totalPassiveIncome =
   incomes
    .filter((income) => income.type === "passive")
    .reduce((sum, income) => sum + parseFloat(income.amount), 0) * 0.8;

  const totalIncome = totalWages + totalPassiveIncome;

  const wageIncomePercentage = (totalWages / totalIncome) * 100;

  const passiveIncomePercentage = (totalPassiveIncome / totalIncome) * 100;

  return {
   totalIncome,
   totalWages,
   totalPassiveIncome,
   wageIncomePercentage,
   passiveIncomePercentage,
  };
 }

 function calculateMonthlyCollectionAmount() {
  const totalExpenses = calculateTotalExpenses().totalExpenses;
  const { totalIncome } = calculateTotalIncome();

  const monthlyCollectionAmount = totalIncome - totalExpenses;

  return monthlyCollectionAmount;
 }

 function calculatePlausibleOfferAmount() {
  const monthlyCollectionAmount = calculateMonthlyCollectionAmount();
  const collectionWindow = calculateCollectionWindow().collectionWindow;
  const plausibleOfferAmount = monthlyCollectionAmount * collectionWindow;

  return plausibleOfferAmount;
 }

 function determineSettlementCalculation() {
  const parseAmountValue = (amount) => {
   if (typeof amount === "string") {
    return parseFloat(amount.replace("$", ""));
   }
   return amount;
  };
  const plausibleOfferAmount = calculatePlausibleOfferAmount();

  const rcpWindow = calculateCollectionWindow().collectionWindow;
  const adjustedFederalLiability = formResponse.taxLiabilities
   .filter((liability) => liability.plaintiff === "irs")
   .map((liability) => {
    const portion = parseAmountValue(liability.amount) / liability.years.length;
    const unfiledPortion = portion * 0.85;
    const filedPortions = liability.years.map((year) =>
     liability.unfiledYears.includes(year) ? unfiledPortion : portion
    );
    return filedPortions.reduce((total, portion) => total + portion, 0);
   })[0];

  const adjustedStateLiability =
   formResponse.taxLiabilities
    .filter((liability) => liability.plaintiff === "state")
    .map((liability) => {
     const portion =
      parseAmountValue(liability.amount) / liability.years.length;
     const unfiledPortion = portion * 0.85;
     const filedPortions = liability.years.map((year) =>
      liability.unfiledYears.includes(year) ? unfiledPortion : portion
     );
     return filedPortions.reduce((total, portion) => total + portion, 0);
    })[0] || 0;

  const federalLiability = formResponse.taxLiabilities
   .filter((liability) => liability.plaintiff === "irs")
   .map((liability) => parseAmountValue(liability.amount))[0];

  const stateLiability = formResponse.taxLiabilities
   .filter((liability) => liability.plaintiff === "state")
   .map((liability) => parseAmountValue(liability.amount))[0];

  const income = calculateTotalIncome();

  if (calculateMonthlyCollectionAmount() < 50) {
   return {
    offerStatus: "CNC",
    federalLiability,
    expirations: calculateCollectionWindow().expirations[0],
    formResponse,
    income,
    savings: federalLiability,
    rcpWindow,
    plausibleOfferAmount,
    monthlyExpenses: calculateTotalExpenses(),
   };
  }

  if (plausibleOfferAmount <= 0.79 * federalLiability) {
   if (
    plausibleOfferAmount >= 0.5 * federalLiability &&
    plausibleOfferAmount <= 0.79 * federalLiability
   ) {
    let statePayment = stateLiability / rcpWindow || 0;

    if (statePayment > 0) {
     let monthlyExpenses =
      calculateTotalExpenses().totalExpenses + statePayment;
     let updatedPlausibleOfferAmount = calculatePlausibleOfferAmount();

     while (
      updatedPlausibleOfferAmount < 0.3 * federalLiability &&
      statePayment > 0
     ) {
      statePayment *= 0.75;
      monthlyExpenses = calculateTotalExpenses().totalExpenses + statePayment;
      updatedPlausibleOfferAmount = calculatePlausibleOfferAmount();
     }
     return {
      offerStatus: "OIC WITH STATE PAYMENT",
      statePayment,
      stateLiability,
      adjustedStateLiability,
      federalLiability,
      adjustedFederalLiability,
      formResponse,
      income,

      rcpWindow,
      plausibleOfferAmount:
       updatedPlausibleOfferAmount > 0
        ? updatedPlausibleOfferAmount
        : plausibleOfferAmount,
      monthlyExpenses,
      savings: federalLiability - plausibleOfferAmount,
      offerPaymentPlans: {
       shortTerm: {
        plausibleOfferAmount: (plausibleOfferAmount * 0.8) / 24,
        term: 24,
       },
       lumpSum: {
        plausibleOfferAmount: (plausibleOfferAmount * 0.4) / 5,
        term: 5,
       },
       deferred: {
        plausibleOfferAmount: plausibleOfferAmount / rcpWindow,
        term: rcpWindow,
       },
      },
     };
    } else {
     const monthlyPaymentPlan = adjustedFederalLiability / 72;

     return {
      federalLiability,
      expirations: calculateCollectionWindow().expirations,
      monthlyPaymentPlan,
      formResponse,
      stateLiability,
      adjustedStateLiability,
      federalLiability,
      adjustedFederalLiability,
      income,
      monthlyExpenses: calculateTotalExpenses(),
      disposableIncome: calculateMonthlyCollectionAmount(),
      maxOfferDisposableIncome: (federalLiability * 0.79) / rcpWindow,
      offerStatus: "Offer Or Payment Plan",
      rcpWindow,
      plausibleOfferAmount,
      monthlyExpenses: calculateTotalExpenses(),
      offerPaymentPlans: {
       shortTerm: {
        plausibleOfferAmount: (plausibleOfferAmount * 0.8) / 24,
        term: 24,
       },
       lumpSum: {
        plausibleOfferAmount: (plausibleOfferAmount * 0.4) / 5,
        term: 5,
       },
       deferred: {
        plausibleOfferAmount: plausibleOfferAmount / rcpWindow,
        term: rcpWindow,
       },
      },
      ddiaSavings: federalLiability - adjustedFederalLiability,
      savings: federalLiability - plausibleOfferAmount,
     };
    }
   } else {
    return {
     offerStatus: "OIC",
     stateLiability,
     adjustedStateLiability,
     federalLiability,

     adjustedFederalLiability,
     income,
     formResponse,
     plausibleOfferAmount,
     rcpWindow,
     monthlyExpenses: calculateTotalExpenses(),
     offerPaymentPlans: {
      shortTerm: {
       plausibleOfferAmount: (plausibleOfferAmount * 0.8) / 24,
       term: 24,
      },
      lumpSum: {
       plausibleOfferAmount: (plausibleOfferAmount * 0.4) / 5,
       term: 5,
      },
      deferred: {
       plausibleOfferAmount: plausibleOfferAmount / rcpWindow,
       term: rcpWindow,
      },
     },
     savings: federalLiability - plausibleOfferAmount,
    };
   }
  } else if (
   plausibleOfferAmount <= 1.2 * federalLiability &&
   stateLiability > 0
  ) {
   let statePayment = stateLiability / rcpWindow || 0;
   let monthlyExpenses = calculateTotalExpenses().totalExpenses + statePayment;
   let updatedPlausibleOfferAmount =
    calculatePlausibleOfferAmount() - monthlyExpenses;
   const totalIncome = calculateTotalIncome().totalIncome;
   let maxStatePayment = 0.2 * totalIncome;
   const maxStateCollectionWindow = stateLiability / maxStatePayment;

   if (statePayment * maxStateCollectionWindow > maxStatePayment) {
    statePayment = maxStatePayment;
   }

   while (
    (updatedPlausibleOfferAmount < 0.5 * federalLiability ||
     updatedPlausibleOfferAmount > 0.8 * federalLiability) &&
    statePayment < maxStatePayment &&
    statePayment > 0
   ) {
    if (updatedPlausibleOfferAmount < 0.5 * federalLiability) {
     statePayment *= 0.75;
    } else {
     statePayment *= 1.25;
    }

    monthlyExpenses = calculateTotalExpenses().totalExpenses + statePayment;
    updatedPlausibleOfferAmount =
     calculatePlausibleOfferAmount() - monthlyExpenses;
   }

   if (updatedPlausibleOfferAmount < 0.8 * federalLiability) {
    return {
     offerStatus: statePayment > 0 ? "OIC WITH STATE PAYMENT" : "POSSIBLE OIC",
     plausibleOfferAmount:
      updatedPlausibleOfferAmount > 0
       ? updatedPlausibleOfferAmount
       : plausibleOfferAmount,
     statePayment,

     income,
     stateLiability,
     adjustedStateLiability,
     federalLiability,
     adjustedFederalLiability,
     formResponse,
     rcpWindow,
     monthlyExpensesTotal: monthlyExpenses,
     monthlyExpenses: calculateTotalExpenses(),

     offerPaymentPlans: {
      shortTerm: {
       plausibleOfferAmount: (plausibleOfferAmount * 0.8) / 24,
       term: 24,
      },
      lumpSum: {
       plausibleOfferAmount: (plausibleOfferAmount * 0.4) / 5,
       term: 5,
      },
      deferred: {
       plausibleOfferAmount: plausibleOfferAmount / rcpWindow,
       term: rcpWindow,
      },
     },
     savings: federalLiability - plausibleOfferAmount,
    };
   } else {
    const monthlyPaymentPlan = adjustedFederalLiability / 72;

    return {
     offerStatus: "DDIA",
     stateLiability,
     expirations: calculateCollectionWindow().expirations,
     adjustedStateLiability,
     federalLiability,
     rcpWindow,
     adjustedFederalLiability,
     monthlyPaymentPlan,
     statePayment: Math.min(
      statePayment,
      calculateMonthlyCollectionAmount() - monthlyPaymentPlan
     ),
     formResponse,
     income,
     monthlyExpenses: calculateTotalExpenses(),
     ddiaSavings: federalLiability - adjustedFederalLiability,
     disposableIncome: calculateMonthlyCollectionAmount(),
     maxOfferDisposableIncome: (federalLiability * 0.79) / rcpWindow,
    };
   }
  } else if (
   plausibleOfferAmount >= 0.81 * federalLiability &&
   calculateMonthlyCollectionAmount() * 6 * 12 < federalLiability
  ) {
   const monthlyPaymentPlan = adjustedFederalLiability / 72;

   return {
    offerStatus: "DDIA",
    expirations: calculateCollectionWindow().expirations,
    monthlyPaymentPlan,
    stateLiability,
    adjustedStateLiability,
    federalLiability,
    adjustedFederalLiability,
    formResponse,
    rcpWindow,
    income,
    monthlyExpenses: calculateTotalExpenses(),
    ddiaSavings: federalLiability - adjustedFederalLiability,
    disposableIncome: calculateMonthlyCollectionAmount(),
    maxOfferDisposableIncome: (federalLiability * 0.79) / rcpWindow,
   };
  } else if (calculateMonthlyCollectionAmount() * 6 * 12 > federalLiability) {
   const monthlyPaymentPlan = adjustedFederalLiability / 72;

   return {
    offerStatus: "Six Year Payment Plan",
    expirations: calculateCollectionWindow().expirations,
    monthlyPaymentPlan,
    stateLiability,
    adjustedStateLiability,
    federalLiability,
    adjustedFederalLiability,
    formResponse,
    rcpWindow,
    income,
    monthlyExpenses: calculateTotalExpenses(),
    ddiaSavings: federalLiability - adjustedFederalLiability,
    disposableIncome: calculateMonthlyCollectionAmount(),
    maxOfferDisposableIncome: (federalLiability * 0.79) / rcpWindow,
   };
  }

  return {
   offerStatus:
    "Please resubmit we were unable to make a proper determination, please review your information",
   federalLiability,
   income: calculateTotalIncome(),
   formResponse,
   plausibleOfferAmount,
   rcpWindow,
   monthlyExpenses: calculateTotalExpenses(),
  };
 }

 const handleSubmit = (e) => {
  e.preventDefault();

  const settlementCalculation = determineSettlementCalculation();
  setSettlementCalculation(settlementCalculation);

  console.log(settlementCalculation);
  // Animate form transition
  setFormVisible(false);
  setTimeout(() => {
   // Clear form and reset visibility after animation
   setFormVisible(true);
   // Additional code to clear form fields...
  }, 500);
 };

 const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormResponse((prevFormResponse) => ({
   ...prevFormResponse,
   [name]: value,
  }));
 };

 const handleTaxLiabilitiesInputChange = (e, index) => {
  const { name, value } = e.target;
  if (name === "year") {
   // Convert the selected options to an array of values
   const selectedYears = Array.from(
    e.target.selectedOptions,
    (option) => option.value
   );

   setFormResponse((prevState) => ({
    ...prevState,
    taxLiabilities: prevState.taxLiabilities.map((debt, idx) =>
     idx === index ? { ...debt, year: selectedYears } : debt
    ),
   }));
  } else {
   const { name, value } = e.target;
   setFormResponse((prevFormResponse) => {
    const updatedTaxLiabilities = [...prevFormResponse.taxLiabilities];
    updatedTaxLiabilities[index][name] = value;
    return {
     ...prevFormResponse,
     taxLiabilities: updatedTaxLiabilities,
    };
   });
  }
 };

 const handleAddIncome = () => {
  setFormResponse((prevFormResponse) => ({
   ...prevFormResponse,
   incomes: [...prevFormResponse.incomes, { type: "", amount: 0 }],
  }));
 };

 const handleIncomeInputChange = (e, index) => {
  const { name, value } = e.target;
  setFormResponse((prevFormResponse) => {
   const updatedIncomes = [...prevFormResponse.incomes];
   updatedIncomes[index][name] = value;
   return {
    ...prevFormResponse,
    incomes: updatedIncomes,
   };
  });
 };

 const handleDeleteIncome = (index) => {
  const updatedIncomeList = [...formResponse.incomes];
  updatedIncomeList.splice(index, 1);
  setFormResponse({ ...formResponse, incomes: updatedIncomeList });
 };

 const handleUnfiledYearsChange = (year) => {
  setFormResponse((prevResponse) => {
   const updatedTaxLiabilities = prevResponse.taxLiabilities.map((debt) => {
    if (debt.unfiledYears.includes(year)) {
     const updatedUnfiledYears = debt.unfiledYears.filter(
      (unfiledYear) => unfiledYear !== year
     );
     return {
      ...debt,
      unfiledYears: updatedUnfiledYears,
      years: [...debt.years, year],
     };
    } else if (debt.years.includes(year)) {
     const updatedYears = debt.years.filter((filedYear) => filedYear !== year);
     return {
      ...debt,
      unfiledYears: [...debt.unfiledYears, year],
      years: updatedYears,
     };
    }
    return debt;
   });

   return {
    ...prevResponse,
    taxLiabilities: updatedTaxLiabilities,
   };
  });
 };
 const currentYear = new Date().getFullYear();
 const startYear = 2010;
 const years = Array.from(
  { length: currentYear - startYear + 1 },
  (_, index) => startYear + index
 );

 return (
  <SettlementFormContainer formVisible={formVisible}>
   <form onSubmit={handleSubmit}>
    <SettlementFormSectionContainer>
     <SettlementFormSectionTitle variant='h5'>
      Settlement Estimate Calculator
     </SettlementFormSectionTitle>
    </SettlementFormSectionContainer>{" "}
    <SettlementFormSectionContainer>
     <SettlementFormSectionTitle shrink>Tax Debt</SettlementFormSectionTitle>

     {formResponse.taxLiabilities.map((debt, index) => (
      <Box key={index} marginBottom={2}>
       <Grid spacing={2} container>
        <Grid item xs={5.65}>
         <SettlementFormControlFullWidth>
          <SettlementFormInputLabel shrink>Plaintiff</SettlementFormInputLabel>
          <SettlementFormSelect
           disabled
           name='plaintiff'
           value={debt.plaintiff}
           onChange={(e) => handleTaxLiabilitiesInputChange(e, index)}
           displayEmpty>
           <MenuItem value='irs'>IRS</MenuItem>
           <MenuItem value='state'>State</MenuItem>
          </SettlementFormSelect>
         </SettlementFormControlFullWidth>
        </Grid>
        <Grid item xs={5.65}>
         <SettlementFormControlFullWidth>
          <SettlementFormTextField
           name='amount'
           required
           label='Amount'
           value={debt.amount.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
           })}
           onChange={(e) => handleTaxLiabilitiesInputChange(e, index)}
          />
         </SettlementFormControlFullWidth>
        </Grid>
       </Grid>
       <Box marginTop={2}>
        <Grid container>
         <Grid item xs={11.25}>
          {" "}
          <SettlementFormControlFullWidth>
           <SettlementFormInputLabel shrink>
            Years With Debt
           </SettlementFormInputLabel>
           <SettlementFormSelect
            name='years'
            displayEmpty
            multiple
            required
            value={
             Array.from(new Set([...debt.years, ...debt.unfiledYears])).sort(
              (a, b) => a - b
             ) || []
            }
            onChange={(e) => handleTaxLiabilitiesInputChange(e, index)}
            renderValue={(selected) => selected.join(", ") || "Select years"}>
            {years.map((year) => (
             <MenuItem
              key={year}
              value={year}
              onClick={() => handleUnfiledYearsChange(year)}
              style={{
               backgroundColor: debt.unfiledYears?.includes(year)
                ? "#FFCDD2" // Unfiled year color (red)
                : debt.years?.includes(year)
                ? "#F5F5F5" // Filed year color (light neutral)
                : "inherit", // Default background color
              }}>
              <ListItemText
               primary={year}
               secondary={
                debt.years?.includes(year) && !debt.unfiledYears?.includes(year)
                 ? "Filed"
                 : debt.unfiledYears?.includes(year)
                 ? "Unfiled"
                 : ""
               }
              />
             </MenuItem>
            ))}
           </SettlementFormSelect>
          </SettlementFormControlFullWidth>
         </Grid>
        </Grid>
       </Box>
      </Box>
     ))}
    </SettlementFormSectionContainer>
    <SettlementFormSectionContainer>
     <SettlementFormSectionTitle shrink>
      Monthly Income (Pre-tax)
     </SettlementFormSectionTitle>
     {formResponse.incomes.map((income, index) => (
      <Box key={index}>
       <Grid
        container
        alignItems='center'
        spacing={2}
        key={index}
        direction='row'>
        <Grid item xs={5.35}>
         {/* Set xs to 8 to make the inputs take up 8 columns (80% of the width) */}
         <SettlementFormControlFullWidth>
          <SettlementFormInputLabel shrink>Type</SettlementFormInputLabel>
          <SettlementFormSelect
           name='type'
           label='Type'
           required
           value={income.type}
           onChange={(e) => handleIncomeInputChange(e, index)}>
           <MenuItem value='salary'>Salary and Wages</MenuItem>
           <MenuItem value='passive'>Passive</MenuItem>
          </SettlementFormSelect>
         </SettlementFormControlFullWidth>
        </Grid>
        <Grid item xs={5.35}>
         {/* Set xs to 4 to make the input take up 4 columns (40% of the width) */}
         <SettlementFormControlFullWidth>
          <SettlementFormTextField
           name='amount'
           label='Amount'
           required
           value={income.amount}
           onChange={(e) => handleIncomeInputChange(e, index)}
          />
         </SettlementFormControlFullWidth>
        </Grid>
        <Grid item xs={1}>
         {/* Set xs to 4 to make the input take up 4 columns (40% of the width) */}
         <Delete
          style={{ fontSize: "1.4rem", float: "right", marginTop: "10px" }}
          onClick={() => handleDeleteIncome(index)}
         />
        </Grid>
       </Grid>
      </Box>
     ))}

     <SettlementFormButton variant='outlined' onClick={handleAddIncome}>
      Add Income
     </SettlementFormButton>
    </SettlementFormSectionContainer>
    <SettlementFormSectionContainer>
     <Box>
      <SettlementFormSectionTitle shrink>Expenses</SettlementFormSectionTitle>
     </Box>
     <Grid container spacing={1} alignItems='center'>
      <Grid item xs={11.25}>
       {" "}
       {/* This Grid item will take up the full width */}
       <SettlementFormControlFullWidth>
        <SettlementFormInputLabel shrink>State</SettlementFormInputLabel>
        <SettlementFormSelect
         value={formResponse.state}
         displayEmpty
         required
         name='state'
         onChange={handleInputChange}
         inputProps={{ "aria-label": "Select State" }}>
         {states.map((state) => (
          <MenuItem key={state.abbreviation} value={state.abbreviation}>
           {state.longName}
          </MenuItem>
         ))}
        </SettlementFormSelect>
       </SettlementFormControlFullWidth>
      </Grid>
      <Grid xs={3.75} marginTop={1} item>
       <SettlementFormControlFullWidth>
        <SettlementFormInputLabel shrink>Cars</SettlementFormInputLabel>
        <SettlementFormSelect
         labelId='cars-owned-label'
         id='cars-owned-select'
         name='carsOwned'
         required
         value={formResponse.carsOwned}
         onChange={handleInputChange}>
         <MenuItem value={1}>1</MenuItem>
         <MenuItem value={2}>2+</MenuItem>
        </SettlementFormSelect>
       </SettlementFormControlFullWidth>
      </Grid>

      <Grid xs={3.75} marginTop={1} item>
       <SettlementFormControlFullWidth>
        <SettlementFormInputLabel shrink>Residents</SettlementFormInputLabel>
        <SettlementFormSelect
         name='residents'
         value={formResponse.residents}
         required
         onChange={handleInputChange}>
         <MenuItem value='1'>1</MenuItem>
         <MenuItem value='2'>2</MenuItem>
         <MenuItem value='3'>3</MenuItem>
         <MenuItem value='4'>4</MenuItem>
         <MenuItem value='5'>5</MenuItem>
        </SettlementFormSelect>
       </SettlementFormControlFullWidth>
      </Grid>

      <Grid xs={3.75} marginTop={1} item>
       <SettlementFormControlFullWidth>
        <SettlementFormInputLabel shrink>65+</SettlementFormInputLabel>
        <SettlementFormSelect
         name='residents65'
         labelId='residents65-label'
         required
         id='residents65-select'
         value={formResponse.residents65}
         onChange={handleInputChange}>
         <MenuItem value='1'>1</MenuItem>
         <MenuItem value='2'>2</MenuItem>
         <MenuItem value='3'>3</MenuItem>
         <MenuItem value='4'>4</MenuItem>
         <MenuItem value='5'>5</MenuItem>
        </SettlementFormSelect>
       </SettlementFormControlFullWidth>
      </Grid>
     </Grid>
    </SettlementFormSectionContainer>
    <SettlementFormSectionContainer>
     <SettlementFormButton type='submit' variant='contained' color='primary'>
      Calculate Settlement
     </SettlementFormButton>
    </SettlementFormSectionContainer>
   </form>
  </SettlementFormContainer>
 );
};

export default SettlementForm;
