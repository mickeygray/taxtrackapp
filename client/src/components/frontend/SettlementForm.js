import React, { useContext, useState, useCallback } from "react";
import {
 TextField,
 Button,
 Checkbox,
 Box,
 IconButton,
 FormControl,
 InputLabel,
 Grid,
 Select,
 ListItemText,
 Typography,
 MenuItem,
 FormControlLabel,
 Collapse,
 makeStyles,
} from "@material-ui/core";
import {
 ExpandMore,
 ExpandLess,
 Delete,
 Edit,
 VisibilityOff,
} from "@material-ui/icons";
import useExpenseData from "../../utils/useExpenseData";
import TaxLiabilitiesItem from "./TaxLiabilitiesItem";
import ProfileContext from "../../context/profile/profileContext";

const useStyles = makeStyles((theme) => ({
 formContainer: {
  backgroundColor: "#f9f9f9",
  maxHeight: "85vh",
  height: "100%",
  width: "23vw",
  borderRadius: theme.spacing(2),
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  transition: "box-shadow 0.3s ease",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: theme.spacing(2),
  padding: theme.spacing(1),
  overflow: "auto", // Enable scrolling if the content exceeds the container height
  transformStyle: "preserve-3d",
  backfaceVisibility: "hidden",
  transform: "rotateY(0)",
  transformOrigin: "center",
  transition: "transform 0.5s ease",
 },
 flippedFormContainer: {
  // Styles for flipped form (hidden state)
  transform: "rotateY(180deg)",
 },
 formContent: {
  transform: "rotateY(0deg)", // Reset rotation on form content
 },
 flippedFormContent: {
  transform: "rotateY(180deg)", // Apply rotation to flipped form content
 },
 sectionContainer: {
  marginBottom: theme.spacing(1),
  height: "auto",
  maxHeight: "calc(80vh - 7rem)",
 },
 sectionTitle: {
  marginBottom: theme.spacing(1),
  fontSize: "0.95rem",
 },
 card: {
  marginBottom: theme.spacing(1),
  backgroundColor: "#fff",
  padding: theme.spacing(1),
  borderRadius: theme.spacing(1),
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  transition: "box-shadow 0.3s ease",
  "&:hover": {
   boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
 },
 cardContent: {
  display: "grid",
  gap: theme.spacing(1),
  fontSize: "0.875rem",
 },
 addButton: {
  marginTop: theme.spacing(1),
  fontSize: "0.875rem",
 },
}));

const SettlementForm = () => {
 const profileContext = useContext(ProfileContext);
 const { setSettlementCalculation } = profileContext;
 const { housing, auto, healthCareExpenses, livingExpenses, states } =
  useExpenseData();
 const classes = useStyles();
 const [formVisible, setFormVisible] = useState(true);
 const [formResponse, setFormResponse] = useState({
  taxLiabilities: [],
  privateDebt: 0,
  incomes: [],
  equity: 0,
  state: "",
  carsOwned: 0,
  currentAge: 0,
  residents: 0,
  residents65: 0,
  extenuatingCircumstances: {},
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

  const extendedTaxYears = taxLiabilities.map((liability) => ({
   ...liability,
   years: liability.years.map(
    (year) => year + Math.min(5, extenuatingCircumstances.additionalYears || 0)
   ),
  }));

  const averageYears =
   (newestTaxYear + oldestTaxYear) / 2 +
   10 +
   Math.min(5, extenuatingCircumstances.additionalYears || 0);

  const collectionWindow =
   (parseInt(averageYears) - parseInt(new Date().getFullYear())) * 12;

  return { expirations: extendedTaxYears, collectionWindow };
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
   return parseFloat(amount.replace("$", ""));
  };
  const plausibleOfferAmount = calculatePlausibleOfferAmount();

  const rcpWindow = calculateCollectionWindow().collectionWindow;
  const federalLiability = formResponse.taxLiabilities
   .filter((liability) => liability.plaintiff === "irs")
   .map((liability) => {
    const portion = parseAmountValue(liability.amount) / liability.years.length;
    const unfiledPortion = portion * 0.95;
    const filedPortions = liability.years.map((year) =>
     liability.unfiledYears.includes(year) ? unfiledPortion : portion
    );
    return filedPortions.reduce((total, portion) => total + portion, 0);
   })[0];

  const stateLiability =
   formResponse.taxLiabilities
    .filter((liability) => liability.plaintiff === "state")
    .map((liability) => {
     const portion =
      parseAmountValue(liability.amount) / liability.years.length;
     const unfiledPortion = portion * 0.95;
     const filedPortions = liability.years.map((year) =>
      liability.unfiledYears.includes(year) ? unfiledPortion : portion
     );
     return filedPortions.reduce((total, portion) => total + portion, 0);
    })[0] || 0;

  const unfiledFederalLiability = formResponse.taxLiabilities
   .filter((liability) => liability.plaintiff === "irs")
   .map((liability) => parseAmountValue(liability.amount))[0];

  const unfiledStateLiability = formResponse.taxLiabilities
   .filter((liability) => liability.plaintiff === "state")
   .map((liability) => parseAmountValue(liability.amount))[0];
  const debtPayment = formResponse.privateDebt > 50000 ? 150 : 0;

  const unfiledLiabilities = { unfiledFederalLiability, unfiledStateLiability };

  const income = calculateTotalIncome();
  function calculateReducedLiability() {
   const liabilityToBeDivided =
    federalLiability / calculateCollectionWindow().expirations.length;
   const csedYearsGreaterThan6 = calculateCollectionWindow().expirations.filter(
    (expiration) => expiration.years.length > 6
   );
   const reducedLiability = csedYearsGreaterThan6.reduce((sum, expiration) => {
    const numYearsGreaterThan6 = expiration.years.length - 6;
    return sum + liabilityToBeDivided * numYearsGreaterThan6 * 0.15;
   }, 0);
   return reducedLiability;
  }
  const equity = formResponse.equity;
  const highEquityThreshold = 10000;
  const highLiabilityThreshold = 50000;
  let liabilityLessEquity = federalLiability;
  let offerLumpSumLessEquity = plausibleOfferAmount;
  let liabilityReduction;
  if (
   equity >= highEquityThreshold &&
   federalLiability >= highLiabilityThreshold
  ) {
   const maxLiabilityReduction = 0.75 * federalLiability;
   liabilityReduction = Math.min(equity * 0.8, maxLiabilityReduction);
   liabilityLessEquity -= liabilityReduction;
   offerLumpSumLessEquity -= liabilityReduction;
  }

  if (calculateMonthlyCollectionAmount() < 50) {
   return {
    offerStatus: "CNC",
    federalLiability,
    formResponse,
    income,
    unfiledLiabilities,
    savings: liabilityLessEquity ? liabilityLessEquity : federalLiability,
    liquidation: liabilityReduction
     ? { liabilityLessEquity, offerLumpSumLessEquity, liabilityReduction }
     : null,
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
      calculateTotalExpenses().totalExpenses + statePayment + debtPayment;
     let updatedPlausibleOfferAmount = calculatePlausibleOfferAmount();

     while (
      updatedPlausibleOfferAmount < 0.3 * federalLiability &&
      statePayment > 0
     ) {
      statePayment *= 0.75;
      monthlyExpenses =
       calculateTotalExpenses().totalExpenses + statePayment + debtPayment;
      updatedPlausibleOfferAmount = calculatePlausibleOfferAmount();
     }
     return {
      offerStatus: "OIC WITH STATE PAYMENT",
      statePayment,
      unfiledLiabilities,
      formResponse,
      income,
      federalLiability,
      rcpWindow,
      liquidation: liabilityReduction
       ? { liabilityLessEquity, offerLumpSumLessEquity, liabilityReduction }
       : null,
      plausibleOfferAmount:
       updatedPlausibleOfferAmount > 0
        ? updatedPlausibleOfferAmount
        : plausibleOfferAmount,
      monthlyExpenses,
      savings: unfiledFederalLiability
       ? unfiledFederalLiability - plausibleOfferAmount
       : federalLiability - plausibleOfferAmount,
      offerPaymentPlans: {
       shortTerm: plausibleOfferAmount / 24,
       offerLumpSumHigh: (plausibleOfferAmount * 0.8) / 5,
       offerLumpSumLow: (plausibleOfferAmount * 0.2) / 5,
       deferred: plausibleOfferAmount / rcpWindow,
      },
     };
    } else {
     const monthlyPaymentPlan = (0.75 * federalLiability) / rcpWindow;

     return {
      offerStatus: "OIC or DDIA",
      statePayment,
      federalLiability,
      income,
      unfiledLiabilities,
      formResponse,
      monthlyPaymentPlan: plausibleOfferAmount > 0.66 && monthlyPaymentPlan,
      rcpWindow,
      liquidation: liabilityReduction
       ? { liabilityLessEquity, offerLumpSumLessEquity, liabilityReduction }
       : null,
      plausibleOfferAmount,
      monthlyExpenses: calculateTotalExpenses(),
      offerPaymentPlans: {
       shortTerm: plausibleOfferAmount / 24,
       offerLumpSumHigh: (plausibleOfferAmount * 0.8) / 5,
       offerLumpSumLow: (plausibleOfferAmount * 0.2) / 5,
       deferred: plausibleOfferAmount / rcpWindow,
      },
      savings: {
       ddiaSavings: unfiledFederalLiability
        ? unfiledFederalLiability - monthlyPaymentPlan * rcpWindow
        : federalLiability - monthlyPaymentPlan * rcpWindow,
       offerSavings: unfiledFederalLiability
        ? unfiledFederalLiability - plausibleOfferAmount
        : federalLiability - plausibleOfferAmount,
      },
     };
    }
   } else {
    return {
     offerStatus: "OIC",
     federalLiability,
     unfiledLiabilities,
     income,
     formResponse,
     plausibleOfferAmount,
     rcpWindow,
     liquidation: liabilityReduction
      ? { liabilityLessEquity, offerLumpSumLessEquity, liabilityReduction }
      : null,
     monthlyExpenses: calculateTotalExpenses(),
     offerPaymentPlans: {
      shortTerm: plausibleOfferAmount / 24,
      offerLumpSumHigh: (plausibleOfferAmount * 0.8) / 5,
      offerLumpSumLow: (plausibleOfferAmount * 0.2) / 5,
      deferred: plausibleOfferAmount / rcpWindow,
     },
     savings: unfiledFederalLiability
      ? unfiledFederalLiability - plausibleOfferAmount
      : federalLiability - plausibleOfferAmount,
    };
   }
  } else if (plausibleOfferAmount <= 1.2 * federalLiability) {
   let statePayment = stateLiability / rcpWindow || 0;
   let monthlyExpenses =
    calculateTotalExpenses().totalExpenses + statePayment + debtPayment;
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
    statePayment < maxStatePayment
   ) {
    if (updatedPlausibleOfferAmount < 0.5 * federalLiability) {
     statePayment *= 0.75;
    } else {
     statePayment *= 1.25;
    }

    monthlyExpenses =
     calculateTotalExpenses().totalExpenses + statePayment + debtPayment;
    updatedPlausibleOfferAmount =
     calculatePlausibleOfferAmount() - monthlyExpenses;
   }

   const monthlyPaymentPlan = (0.75 * federalLiability) / rcpWindow;

   if (updatedPlausibleOfferAmount < 0.8 * federalLiability) {
    return {
     offerStatus: statePayment > 0 ? "OIC WITH STATE PAYMENT" : "POSSIBLE OIC",
     plausibleOfferAmount:
      updatedPlausibleOfferAmount > 0
       ? updatedPlausibleOfferAmount
       : plausibleOfferAmount,
     statePayment,
     unfiledLiabilities,
     income,
     federalLiability,
     formResponse,
     rcpWindow,
     monthlyExpensesTotal: monthlyExpenses,
     monthlyExpenses: calculateTotalExpenses(),
     liquidation: liabilityReduction
      ? { liabilityLessEquity, offerLumpSumLessEquity, liabilityReduction }
      : null,

     offerPaymentPlans: {
      shortTerm: plausibleOfferAmount / 24,
      offerLumpSumHigh: (plausibleOfferAmount * 0.8) / 5,
      offerLumpSumLow: (plausibleOfferAmount * 0.2) / 5,
      deferred: plausibleOfferAmount / rcpWindow,
     },
     savings: unfiledFederalLiability
      ? unfiledFederalLiability - plausibleOfferAmount
      : federalLiability - plausibleOfferAmount,
    };
   } else {
    return {
     offerStatus: "DDIA",
     statePayment,
     reducedLiability: calculateReducedLiability(),
     federalLiability,
     unfiledLiabilities,
     income,
     formResponse,
     rcpWindow,
     monthlyExpensesTotal: monthlyExpenses,
     monthlyExpenses: calculateTotalExpenses(),
     liquidation: liabilityReduction
      ? { liabilityLessEquity, offerLumpSumLessEquity, liabilityReduction }
      : null,
     monthlyPaymentPlan:
      updatedPlausibleOfferAmount > 0.8 && monthlyPaymentPlan,
     savings: unfiledFederalLiability
      ? unfiledFederalLiability - monthlyPaymentPlan * rcpWindow
      : federalLiability - monthlyPaymentPlan * rcpWindow,
    };
   }
  } else if (
   plausibleOfferAmount >= 1.3 * federalLiability &&
   calculateMonthlyCollectionAmount() * 6 * 12 < federalLiability
  ) {
   const nextYearAfter6 = Math.min(
    ...calculateCollectionWindow().expirations.filter(
     (expiration) => expiration > 6
    )
   );
   const ddiaDuration = (nextYearAfter6 - 1) * 12;
   const liabilityToBeDivided =
    federalLiability / calculateCollectionWindow().expirations.length;
   const csedYearsGreaterThan6 = calculateCollectionWindow().expirations.filter(
    (expiration) => expiration.years.length > 6
   );
   const reducedLiability = csedYearsGreaterThan6.reduce((sum, expiration) => {
    const numYearsGreaterThan6 = expiration.years.length - 6;
    return sum + liabilityToBeDivided * numYearsGreaterThan6 * 0.15;
   }, 0);
   const monthlyPaymentPlan = reducedLiability / ddiaDuration;

   return {
    offerStatus: "DDIA",
    federalLiability,
    reducedLiability: calculateReducedLiability(),
    monthlyPaymentPlan,
    formResponse,
    income,
    monthlyExpenses: calculateTotalExpenses(),
    liquidation: liabilityReduction
     ? { liabilityLessEquity, offerLumpSumLessEquity, liabilityReduction }
     : null,
    savings: unfiledFederalLiability
     ? unfiledFederalLiability - monthlyPaymentPlan * rcpWindow
     : federalLiability - monthlyPaymentPlan * rcpWindow,
   };
  } else if (calculateMonthlyCollectionAmount() * 6 * 12 > federalLiability) {
   const csedYearsGreaterThan6 = calculateCollectionWindow().expirations.filter(
    (expiration) => expiration.years.length > 6
   );
   const totalDebtReduction =
    csedYearsGreaterThan6.length *
    (federalLiability / calculateCollectionWindow().expirations.length) *
    0.9;
   const monthlyPaymentPlan = (federalLiability - totalDebtReduction) / 72;

   return {
    offerStatus: "6-Year Payment Plan",
    federalLiability,
    income,
    formResponse,
    liquidation: liabilityReduction
     ? { liabilityLessEquity, offerLumpSumLessEquity, liabilityReduction }
     : null,
    monthlyPaymentPlan,
    monthlyExpenses: calculateTotalExpenses(),
    estimatedCollectionAmount: calculateMonthlyCollectionAmount(),
    savings:
     totalDebtReduction === 0 ? 0.03 * federalLiability : totalDebtReduction,
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

 const handleAddTaxLiabilities = () => {
  setFormResponse((prevFormResponse) => ({
   ...prevFormResponse,
   taxLiabilities: [
    ...prevFormResponse.taxLiabilities,
    { plaintiff: "", amount: 0, payment: 0, years: [], unfiledYears: [] },
   ],
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

 const handleExtenuatingCircumstancesChange = (event) => {
  const { name, checked } = event.target;
  let additionalYears = formResponse.extenuatingCircumstances.additionalYears;

  // Calculate additional years based on the selected checkbox
  if (name === "hadChapter7" && checked) {
   additionalYears += 1;
  } else if (name === "hadChapter13" && checked) {
   additionalYears += 2;
  } else if (
   (name === "filedOIC" || name === "startedPaymentPlan") &&
   checked
  ) {
   additionalYears += 2;
  }

  setFormResponse((prevResponse) => ({
   ...prevResponse,
   extenuatingCircumstances: {
    ...prevResponse.extenuatingCircumstances,
    additionalYears,
    [name]: checked,
   },
  }));
 };

 const handleDeleteTaxLiabilities = (index) => {
  const updatedDebtList = [...formResponse.taxLiabilities];
  updatedDebtList.splice(index, 1);
  setFormResponse({ ...formResponse, taxLiabilities: updatedDebtList });
 };

 const handleDeleteIncome = (index) => {
  const updatedIncomeList = [...formResponse.incomes];
  updatedIncomeList.splice(index, 1);
  setFormResponse({ ...formResponse, incomes: updatedIncomeList });
 };

 const hasUnfiledYears = formResponse.taxLiabilities.some(
  (debt) => debt.unfiledYears.length > 0
 );

 const [showCheckboxes, setShowCheckboxes] = useState(false);

 const toggleCheckboxes = () => {
  setShowCheckboxes((prevShowCheckboxes) => !prevShowCheckboxes);
 };

 return (
  <div>
   <form
    onSubmit={handleSubmit}
    className={`${classes.formContainer} ${
     !formVisible ? classes.flippedFormContainer : ""
    }`}>
    <div
     className={`${classes.formContent} ${
      !formVisible ? classes.flippedFormContent : ""
     }`}>
     <div className='p-1'>
      <Typography variant='h5'>Settlment Estimate Calculator</Typography>
     </div>
     <div className={classes.sectionContainer}>
      <InputLabel shrink style={{ color: "#3f51b5", fontSize: "20px" }}>
       Current Tax Liabilities
      </InputLabel>
      <div
       style={{
        maxHeight: "300px",
        width: "100%",
        overflowY: "auto",
        overflowX: "hidden",
       }}>
       {formResponse.taxLiabilities.map((debt, index) => (
        <TaxLiabilitiesItem
         key={index}
         debt={debt}
         formResponse={formResponse}
         setFormResponse={setFormResponse}
         index={index}
         handleTaxLiabilitiesInputChange={handleTaxLiabilitiesInputChange}
         handleDeleteTaxLiabilities={handleDeleteTaxLiabilities}
        />
       ))}
       {hasUnfiledYears && (
        <Box marginLeft={2} marginBottom={2}>
         <Typography variant='subtitle2' color='textSecondary'>
          <span style={{ color: "red" }}>*</span> (Unfiled)
         </Typography>
        </Box>
       )}
      </div>
      <Button variant='outlined' onClick={handleAddTaxLiabilities}>
       Add Tax Liability
      </Button>
     </div>

     <div className={classes.sectionContainer}>
      <InputLabel shrink style={{ color: "#3f51b5", fontSize: "20px" }}>
       Income
      </InputLabel>
      <div>
       {formResponse.incomes.map((income, index) => (
        <Grid container spacing={2} alignItems='center' key={index}>
         <Grid item xs={4}>
          <FormControl style={{ width: "80px" }}>
           <InputLabel>Type</InputLabel>
           <Select
            name='type'
            value={income.type}
            onChange={(e) => handleIncomeInputChange(e, index)}
            displayEmpty>
            <MenuItem value='salary'>Salary and Wages</MenuItem>
            <MenuItem value='passive'>Passive</MenuItem>
           </Select>
          </FormControl>
         </Grid>
         <Grid item xs={4}>
          <FormControl fullWidth>
           <TextField
            name='amount'
            label='Amount'
            value={income.amount}
            onChange={(e) => handleIncomeInputChange(e, index)}
           />
          </FormControl>
         </Grid>
         <Grid item xs={4}>
          <IconButton
           style={{ fontSize: "1rem" }}
           onClick={() => handleDeleteIncome(index)}>
           <Delete />
          </IconButton>
         </Grid>
        </Grid>
       ))}
      </div>
      <Button variant='outlined' onClick={handleAddIncome}>
       Add Income
      </Button>
     </div>

     <div style={{ display: "flex" }}>
      <div className={classes.sectionContainer} style={{ marginRight: "16px" }}>
       <InputLabel shrink style={{ color: "#3f51b5", fontSize: "20px" }}>
        Private Debts and Mortgage Balance
       </InputLabel>
       <TextField
        name='privateDebt'
        value={formResponse.privateDebt}
        onChange={handleInputChange}
       />
      </div>
      <div className={classes.sectionContainer}>
       <InputLabel shrink style={{ color: "#3f51b5", fontSize: "20px" }}>
        Non-Essential Property and Asset Equity
       </InputLabel>
       <TextField
        name='equity'
        value={formResponse.equity}
        onChange={handleInputChange}
       />
      </div>
     </div>
     <div style={{ marginBottom: "20px" }}>
      <FormControl fullWidth>
       <InputLabel shrink style={{ color: "#3f51b5", fontSize: "20px" }}>
        State
       </InputLabel>
       <Select
        value={formResponse.state}
        displayEmpty
        name='state'
        onChange={handleInputChange}
        inputProps={{ "aria-label": "Select State" }}>
        {states.map((state) => (
         <MenuItem key={state.abbreviation} value={state.abbreviation}>
          {state.longName}
         </MenuItem>
        ))}
       </Select>
      </FormControl>
     </div>

     <div style={{ display: "flex", alignItems: "center" }}>
      <div style={{ marginRight: "16px" }}>
       <FormControl style={{ width: "80px" }}>
        <InputLabel shrink style={{ color: "#3f51b5", fontSize: "20px" }}>
         Cars
        </InputLabel>
        <Select
         labelId='cars-owned-label'
         id='cars-owned-select'
         name='carsOwned'
         value={formResponse.carsOwned}
         onChange={handleInputChange}>
         <MenuItem value={1}>1</MenuItem>
         <MenuItem value={2}>2+</MenuItem>
        </Select>
       </FormControl>
      </div>
      <div style={{ marginRight: "16px" }}>
       <FormControl style={{ width: "80px" }}>
        <InputLabel style={{ color: "#3f51b5", fontSize: "20px" }} shrink>
         Residents
        </InputLabel>
        <Select
         name='residents'
         value={formResponse.residents}
         onChange={handleInputChange}>
         <MenuItem value='1'>1</MenuItem>
         <MenuItem value='2'>2</MenuItem>
         <MenuItem value='3'>3</MenuItem>
         <MenuItem value='4'>4</MenuItem>
         <MenuItem value='5'>5</MenuItem>
        </Select>
       </FormControl>
      </div>
      <div style={{ marginRight: "16px" }}>
       <FormControl style={{ width: "80px" }}>
        <InputLabel style={{ color: "#3f51b5", fontSize: "20px" }} shrink>
         65+
        </InputLabel>
        <Select
         name='residents65'
         labelId='residents65-label'
         id='residents65-select'
         value={formResponse.residents65}
         onChange={handleInputChange}>
         <MenuItem value='1'>1</MenuItem>
         <MenuItem value='2'>2</MenuItem>
         <MenuItem value='3'>3</MenuItem>
         <MenuItem value='4'>4</MenuItem>
         <MenuItem value='5'>5</MenuItem>
        </Select>
       </FormControl>
      </div>
     </div>
     <div className={classes.sectionContainer}>
      <div style={{ display: "flex", alignItems: "center" }}>
       <IconButton onClick={toggleCheckboxes}>
        {showCheckboxes ? <ExpandMore /> : <ExpandLess />}
       </IconButton>
       <Typography style={{ color: "#3f51b5" }} variant='subtitle1'>
        Extenuating Circumstances
       </Typography>
      </div>

      <div style={{ display: showCheckboxes ? "block" : "none" }}>
       {showCheckboxes && (
        <>
         <FormControlLabel
          control={
           <Checkbox
            name='filedOIC'
            checked={formResponse.extenuatingCircumstances.filedOIC}
            onChange={handleExtenuatingCircumstancesChange}
           />
          }
          label='Filed OIC'
         />
         <FormControlLabel
          control={
           <Checkbox
            name='startedPaymentPlan'
            checked={formResponse.extenuatingCircumstances.startedPaymentPlan}
            onChange={handleExtenuatingCircumstancesChange}
           />
          }
          label='IRS Payment Plan'
         />
         <FormControlLabel
          control={
           <Checkbox
            name='hadChapter7'
            checked={formResponse.extenuatingCircumstances.hadChapter7}
            onChange={handleExtenuatingCircumstancesChange}
           />
          }
          label='Chapter 7'
         />
         <FormControlLabel
          control={
           <Checkbox
            name='hadChapter11'
            checked={formResponse.extenuatingCircumstances.hadChapter11}
            onChange={handleExtenuatingCircumstancesChange}
           />
          }
          label='Chapter 11'
         />
         <FormControlLabel
          control={
           <Checkbox
            name='hadChapter13'
            checked={formResponse.extenuatingCircumstances.hadChapter13}
            onChange={handleExtenuatingCircumstancesChange}
           />
          }
          label='Chapter 13'
         />
        </>
       )}
      </div>
     </div>
    </div>

    <Button type='submit' variant='contained' color='primary'>
     Calculate Settlement
    </Button>
   </form>
  </div>
 );
};

export default SettlementForm;
