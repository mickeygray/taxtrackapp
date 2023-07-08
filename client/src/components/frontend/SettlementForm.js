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

const PublicDebtItem = ({
 debt,
 index,
 formResponse,
 setFormResponse,
 handlePublicDebtInputChange,
 handleDeletePublicDebt,
}) => {
 const [expanded, setExpanded] = useState(false);
 const [unfiledYearsSelected, setUnfiledYearsSelected] = useState(false);

 const handleToggle = () => {
  setExpanded((prevState) => !prevState);
 };

 console.log(formResponse.publicDebt[index]);

 const currentYear = new Date().getFullYear();
 const startYear = 2010;
 const years = Array.from(
  { length: currentYear - startYear + 1 },
  (_, index) => startYear + index
 );

 const handleUnfiledYearsChange = (index, year) => {
  setFormResponse((prevState) => {
   const updatedPublicDebt = [...prevState.publicDebt];
   const selectedDebt = updatedPublicDebt[index];
   const isUnfiled = selectedDebt.unfiledYears.includes(year);

   if (isUnfiled) {
    selectedDebt.unfiledYears = selectedDebt.unfiledYears.filter(
     (y) => y !== year
    );
   } else {
    selectedDebt.unfiledYears.push(year);
   }

   return {
    ...prevState,
    publicDebt: updatedPublicDebt,
   };
  });
 };

 return (
  <div key={index}>
   <Box display='flex' alignItems='center' marginBottom={2}>
    <Box flex={1}>
     {expanded ? (
      <Box key={index} display='flex' alignItems='center' marginBottom={2}>
       <IconButton onClick={handleToggle}>
        <VisibilityOff />
       </IconButton>
       <Grid container spacing={2}>
        <Grid item xs={6}>
         <FormControl fullWidth>
          <InputLabel>Plaintiff</InputLabel>
          <Select
           name='plaintiff'
           value={debt.plaintiff}
           onChange={(e) => handlePublicDebtInputChange(e, index)}
           displayEmpty>
           <MenuItem value='irs'>IRS</MenuItem>
           <MenuItem value='state'>State</MenuItem>
          </Select>
         </FormControl>
        </Grid>
        <Grid item xs={6}>
         <FormControl fullWidth>
          <InputLabel>Year</InputLabel>
          <Select
           name='years'
           multiple // Set the 'multiple' prop to allow multiple selections
           value={debt.years}
           onChange={(e) => handlePublicDebtInputChange(e, index)}
           renderValue={(selected) => selected.join(", ")} // Render the selected values as a comma-separated string
           fullWidth>
           {years.map((year) => (
            <MenuItem key={year} value={year}>
             <ListItemText primary={year} />
            </MenuItem>
           ))}
          </Select>

          {!unfiledYearsSelected && (
           <FormControlLabel
            control={
             <Checkbox
              checked={unfiledYearsSelected}
              onChange={(e) => setUnfiledYearsSelected(e.target.checked)}
              name='unfiledYearsSelected'
             />
            }
            label='Are any of these years unfiled?'
           />
          )}

          {unfiledYearsSelected && (
           <div>
            <IconButton
             onClick={() => setUnfiledYearsSelected(!unfiledYearsSelected)}>
             <VisibilityOff />
            </IconButton>

            <div className='grid-4' style={{ marginLeft: "-150px" }}>
             {debt.years.map((year) => (
              <div>
               <FormControlLabel
                key={year}
                control={
                 <Checkbox
                  checked={
                   formResponse.publicDebt[index]?.unfiledYears.includes(
                    year
                   ) || false
                  }
                  onChange={() => handleUnfiledYearsChange(index, year)}
                  name={`unfiledYear_${year}`}
                 />
                }
                label={year}
               />
              </div>
             ))}
            </div>
           </div>
          )}
         </FormControl>
        </Grid>
       </Grid>
       <Box flex={1} marginLeft={2}>
        <TextField
         name='amount'
         label='Amount'
         value={debt.amount.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
         })}
         onChange={(e) => handlePublicDebtInputChange(e, index)}
         fullWidth
        />
       </Box>

       <Box marginLeft={2}>
        <IconButton onClick={() => handleDeletePublicDebt(index)}>
         <Delete />
        </IconButton>
       </Box>
      </Box>
     ) : (
      // Render the summary view
      <div style={{ display: "flex", justifyContent: "center" }}>
       <div>
        <div
         style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
         }}>
         <IconButton style={{ fontSize: "1rem" }} onClick={handleToggle}>
          <Edit />
         </IconButton>
         <IconButton
          style={{ fontSize: "1rem" }}
          onClick={() => handleDeletePublicDebt(index)}>
          <Delete />
         </IconButton>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
         <Typography variant='subtitle1' style={{ marginRight: "0.5rem" }}>
          Plaintiff:{" "}
          {debt.plaintiff === "irs"
           ? "IRS"
           : debt.plaintiff !== ""
           ? "State"
           : ""}
         </Typography>
         <Typography variant='subtitle1' style={{ marginRight: "0.5rem" }}>
          Amount: {debt.amount}
         </Typography>
         <div>
          <Typography variant='subtitle1'>
           Years:
           {debt.years
            .sort((a, b) => parseInt(a) - parseInt(b))
            .map((year, ind) => {
             const isUnfiled = debt.unfiledYears.includes(year);
             return (
              <span key={year}>
               {`'${year.toString().slice(-2)}`}
               {isUnfiled && <span style={{ color: "red" }}>*</span>}
               {ind === debt.years.length - 1 ? "" : ", "}
              </span>
             );
            })}
           <br />
          </Typography>
         </div>
        </div>
       </div>
      </div>
     )}
    </Box>
   </Box>
  </div>
 );
};

const SettlementForm = () => {
 const classes = useStyles();
 const [formVisible, setFormVisible] = useState(true);
 const [formResponse, setFormResponse] = useState({
  publicDebt: [],
  privateDebt: 0,
  incomes: [],
  equity: 0,
  state: "",
  carsOwned: 0,
  currentAge: 0,
  residents: 0,
  extenuatingCircumstances: {},
 });
 const auto = {
  northeastRegion: {
   states: ["CT", "ME", "MA", "NH", "NJ", "NY", "PA", "RI", "VT"],
   oneCar: 298,
   twoCars: 596,
  },
  midwestRegion: {
   states: [
    "IL",
    "IN",
    "IA",
    "KS",
    "MI",
    "MN",
    "MO",
    "NE",
    "ND",
    "OH",
    "SD",
    "WI",
   ],
   oneCar: 225,
   twoCars: 450,
  },
  southRegion: {
   states: [
    "AL",
    "AR",
    "DE",
    "FL",
    "GA",
    "KY",
    "LA",
    "MD",
    "MS",
    "NC",
    "OK",
    "SC",
    "TN",
    "TX",
    "VA",
    "WV",
   ],
   oneCar: 242,
   twoCars: 484,
  },
  westRegion: {
   states: [
    "AK",
    "AZ",
    "CA",
    "CO",
    "HI",
    "ID",
    "MT",
    "NV",
    "NM",
    "OR",
    "UT",
    "WA",
    "WY",
   ],
   oneCar: 264,
   twoCars: 528,
  },
 };

 const { setQualifactionResult } = useContext(ProfileContext);

 const calculateRCP = (discretionaryIncome, debtRange) => {
  const { minCsedYears, maxCsedYears } = debtRange;
  const averageExpiration = (minCsedYears + maxCsedYears) / 2;
  const plausibleOfferAmount = discretionaryIncome * (averageExpiration * 12);
  return plausibleOfferAmount;
 };

 // Calculate the CSED adjustments based on extenuating circumstances
 const calculateCSEDAdjustments = (federalYears, extenuatingCircumstances) => {
  const thisYear = new Date().getFullYear();
  const maxCsedYears = Math.max(...federalYears) + 10 - thisYear;
  const minCsedYears = Math.min(...federalYears) + 10 - thisYear;

  const {
   hadChapter11,
   hadChapter13,
   hadChapter7,
   filedOIC,
   startedPaymentPlan,
  } = extenuatingCircumstances;

  if (hadChapter7) {
   maxCsedYears += 3 / 12;
   minCsedYears += 3 / 12;
  } else if (hadChapter11 || hadChapter13) {
   maxCsedYears += 3;
   minCsedYears += 3;
  }

  if (filedOIC) {
   maxCsedYears += 2;
   minCsedYears += 2;
  }

  if (startedPaymentPlan) {
   maxCsedYears += 1;
   minCsedYears += 1;
  }

  const debtRange = { maxCsedYears, minCsedYears };
  return debtRange;
 };

 // Calculate the weighted sum of incomes
 const calculateWeightedIncomes = (incomes, remainingYears) => {
  const salaryWeight = remainingYears > 2 ? 1 : 0.5;
  const passiveWeight = remainingYears > 2 ? 0.5 : 1;

  const weightedIncomes = incomes.reduce((sum, income) => {
   if (income.type === "salary") {
    const taxBrackets = [
     { minIncome: 0, maxIncome: 9950, rate: 0.1 },
     { minIncome: 9950, maxIncome: 40526, rate: 0.12 },
     { minIncome: 40526, maxIncome: 86375, rate: 0.22 },
     { minIncome: 86375, maxIncome: 164925, rate: 0.24 },
     { minIncome: 164925, maxIncome: 209429, rate: 0.32 },
     { minIncome: 209429, maxIncome: 523600, rate: 0.35 },
     { minIncome: 523600, maxIncome: Infinity, rate: 0.37 },
    ];

    const bracket = taxBrackets.find(
     (f) =>
      parseFloat(income.amount) > f.minIncome &&
      parseFloat(income.amount) < f.maxIncome
    );

    return sum + income.amount * bracket.rate * salaryWeight;
   } else if (income.type === "passive") {
    return sum + income.amount * passiveWeight;
   }
   return sum;
  }, 0);

  return weightedIncomes;
 };

 const calculateDebtProfile = (filedDebt, unfiledDebt, federalYears) => {
  const totalFiledFederalPersonalDebt = filedDebt
   .filter((f) => f.taxType === "wage" || f.taxType === "investment")
   .filter((f) => f.plaintiff === "irs")
   .reduce((total, d) => total + parseFloat(d.amount), 0);

  const totalUnfiledFederalPersonalDebt = unfiledDebt
   .filter((f) => f.taxType === "wage" || f.taxType === "investment")
   .filter((f) => f.plaintiff === "irs")
   .reduce((total, d) => total + parseFloat(d.amount), 0);

  const totalFederalBusinessDebt = federalYears
   .filter((f) => f.taxType === "business")
   .reduce((total, d) => total + parseFloat(d.amount), 0);

  const totalFiledHomeStatePersonalDebt = filedDebt
   .filter((f) => f.taxType === "wage" || f.taxType === "investment")
   .filter((f) => f.plaintiff === "state")
   .reduce((total, d) => total + parseFloat(d.amount), 0);

  const totalFiledOtherPersonalDebt = filedDebt
   .filter((f) => f.taxType === "wage" || f.taxType === "investment")
   .filter((f) => f.plaintiff === "other")
   .reduce((total, d) => total + parseFloat(d.amount), 0);

  const totalUnfiledStatePersonalDebt = unfiledDebt
   .filter((f) => f.taxType === "wage" || f.taxType === "investment")
   .filter((f) => f.plaintiff === "other")
   .reduce((total, d) => total + parseFloat(d.amount), 0);

  const yearsUnfiledFederal = unfiledDebt.filter(
   (f) => f.plaintiff === "irs"
  ).length;

  const yearsUnfiledHomeState = unfiledDebt.filter(
   (f) => f.plaintiff === "state"
  ).length;

  const federalDebt = {
   totalFiledFederalPersonalDebt,
   totalUnfiledFederalPersonalDebt,
   totalFederalBusinessDebt,
   yearsUnfiledFederal,
  };

  const stateDebt = {
   yearsUnfiledHomeState,

   totalFiledOtherPersonalDebt,
   totalFiledHomeStatePersonalDebt,
   totalUnfiledStatePersonalDebt,
  };

  const debtProfile = { federalDebt, stateDebt };

  return debtProfile;
 };

 // Calculate the settlement profile
 const calculateSettlement = (formResponse) => {
  const {
   publicDebt,
   privateDebt,
   incomes,
   equity,
   currentAge,
   residents,
   extenuatingCircumstances,
  } = formResponse;

  // Calculate the remaining time until retirement based on the 10-year time span
  const remainingYears = 65 - currentAge;

  // Calculate the weighted sum of incomes
  const weightedIncomes = calculateWeightedIncomes(incomes, remainingYears);

  // Calculate the allowable expenses based on the number of residents
  const allowables = [
   { people: 1, deduction: 723 + 1062 },
   { people: 2, deduction: 1292 + 1213 },
   { people: 3, deduction: 1473 + 1450 },
   { people: 4, deduction: 1740 + 1628 },
  ];

  const expenses = allowables
   .filter((f) => f.people != residents)
   .map((m) => m.deduction)[0];
  const filedDebt = publicDebt.filter((f) => f.filed === "filed");
  const unfiledDebt = publicDebt.filter((f) => f.filed === "unfiled");
  const federalYears = publicDebt
   .filter((f) => f.plaintiff === "irs")
   .map((m) => m.years);
  const totalFederalDebt = publicDebt
   .filter((f) => f.plaintiff === "irs")
   .reduce((total, d) => total + parseFloat(d.amount), 0);
  const discretionaryIncome =
   weightedIncomes + privateDebt * -0.3 + equity * 0.08 - expenses;

  const debtProfile = calculateDebtProfile(
   filedDebt,
   unfiledDebt,
   federalYears
  );

  const debtRange = calculateCSEDAdjustments(
   federalYears,
   extenuatingCircumstances
  );

  const plausibleOfferAmount = calculateRCP(discretionaryIncome, debtRange);

  const discretionaryIncomeProfile = {
   incomesPct: weightedIncomes / discretionaryIncome,
   privateDebtPct: (privateDebt * -0.3) / discretionaryIncome,
   equityPct: (equity * 0.08) / discretionaryIncome,
   expensesPct: expenses / discretionaryIncome,
   discretionaryIncome,
   privateDebt,
   incomes: incomes.reduce((sum, income) => sum + income.amount, 0),
   equity,
   expenses,
  };

  let qualificationResult = {};

  if (plausibleOfferAmount < totalFederalDebt && plausibleOfferAmount > 0) {
   qualificationResult = {
    qualifies: true,
    discretionaryIncomeProfile,
    offerAmount: plausibleOfferAmount,
    potentialSavings: totalFederalDebt - plausibleOfferAmount,
    debtProfile,
   };
  } else if (plausibleOfferAmount < 0) {
   qualificationResult = {
    qualifies: true,
    cncEligible: true,
    discretionaryIncomeProfile,
    potentialSavings: totalFederalDebt,
    offerAmount: 0,
    debtProfile,
   };
  } else {
   const { minCsedYears, maxCsedYears } = debtRange;

   const averageExpiration = (minCsedYears + maxCsedYears) / 2;

   const paymentAmount = discretionaryIncome * 0.8 * (averageExpiration * 12);
   const potentialSavings = totalFederalDebt - paymentAmount;
   qualificationResult = {
    qualifies: false,
    cncEligible: false,
    discretionaryIncomeProfile,
    potentialSavings,
    paymentAmount,
    debtProfile,
   };
  }

  return qualificationResult;
 };

 const handleSubmit = (e) => {
  e.preventDefault();

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

 const handleAddPublicDebt = () => {
  setFormResponse((prevFormResponse) => ({
   ...prevFormResponse,
   publicDebt: [
    ...prevFormResponse.publicDebt,
    { plaintiff: "", amount: 0, years: [], unfiledYears: [] },
   ],
  }));
 };

 const handlePublicDebtInputChange = (e, index) => {
  const { name, value } = e.target;
  if (name === "year") {
   // Convert the selected options to an array of values
   const selectedYears = Array.from(
    e.target.selectedOptions,
    (option) => option.value
   );

   setFormResponse((prevState) => ({
    ...prevState,
    publicDebt: prevState.publicDebt.map((debt, idx) =>
     idx === index ? { ...debt, year: selectedYears } : debt
    ),
   }));
  } else {
   const { name, value } = e.target;
   setFormResponse((prevFormResponse) => {
    const updatedPublicDebt = [...prevFormResponse.publicDebt];
    updatedPublicDebt[index][name] = value;
    return {
     ...prevFormResponse,
     publicDebt: updatedPublicDebt,
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
  setFormResponse((prevResponse) => ({
   ...prevResponse,
   extenuatingCircumstances: {
    ...prevResponse.extenuatingCircumstances,
    [name]: checked,
   },
  }));
 };

 const handleDeletePublicDebt = (index) => {
  const updatedDebtList = [...formResponse.publicDebt];
  updatedDebtList.splice(index, 1);
  setFormResponse({ ...formResponse, publicDebt: updatedDebtList });
 };

 const handleDeleteIncome = (index) => {
  const updatedIncomeList = [...formResponse.incomes];
  updatedIncomeList.splice(index, 1);
  setFormResponse({ ...formResponse, incomes: updatedIncomeList });
 };

 const hasUnfiledYears = formResponse.publicDebt.some(
  (debt) => debt.unfiledYears.length > 0
 );

 const states = [
  { longName: "Alabama", abbreviation: "AL" },
  { longName: "Alaska", abbreviation: "AK" },
  { longName: "Arizona", abbreviation: "AZ" },
  { longName: "Arkansas", abbreviation: "AR" },
  { longName: "California", abbreviation: "CA" },
  { longName: "Colorado", abbreviation: "CO" },
  { longName: "Connecticut", abbreviation: "CT" },
  { longName: "Delaware", abbreviation: "DE" },
  { longName: "Florida", abbreviation: "FL" },
  { longName: "Georgia", abbreviation: "GA" },
  { longName: "Hawaii", abbreviation: "HI" },
  { longName: "Idaho", abbreviation: "ID" },
  { longName: "Illinois", abbreviation: "IL" },
  { longName: "Indiana", abbreviation: "IN" },
  { longName: "Iowa", abbreviation: "IA" },
  { longName: "Kansas", abbreviation: "KS" },
  { longName: "Kentucky", abbreviation: "KY" },
  { longName: "Louisiana", abbreviation: "LA" },
  { longName: "Maine", abbreviation: "ME" },
  { longName: "Maryland", abbreviation: "MD" },
  { longName: "Massachusetts", abbreviation: "MA" },
  { longName: "Michigan", abbreviation: "MI" },
  { longName: "Minnesota", abbreviation: "MN" },
  { longName: "Mississippi", abbreviation: "MS" },
  { longName: "Missouri", abbreviation: "MO" },
  { longName: "Montana", abbreviation: "MT" },
  { longName: "Nebraska", abbreviation: "NE" },
  { longName: "Nevada", abbreviation: "NV" },
  { longName: "New Hampshire", abbreviation: "NH" },
  { longName: "New Jersey", abbreviation: "NJ" },
  { longName: "New Mexico", abbreviation: "NM" },
  { longName: "New York", abbreviation: "NY" },
  { longName: "North Carolina", abbreviation: "NC" },
  { longName: "North Dakota", abbreviation: "ND" },
  { longName: "Ohio", abbreviation: "OH" },
  { longName: "Oklahoma", abbreviation: "OK" },
  { longName: "Oregon", abbreviation: "OR" },
  { longName: "Pennsylvania", abbreviation: "PA" },
  { longName: "Rhode Island", abbreviation: "RI" },
  { longName: "South Carolina", abbreviation: "SC" },
  { longName: "South Dakota", abbreviation: "SD" },
  { longName: "Tennessee", abbreviation: "TN" },
  { longName: "Texas", abbreviation: "TX" },
  { longName: "Utah", abbreviation: "UT" },
  { longName: "Vermont", abbreviation: "VT" },
  { longName: "Virginia", abbreviation: "VA" },
  { longName: "Washington", abbreviation: "WA" },
  { longName: "West Virginia", abbreviation: "WV" },
  { longName: "Wisconsin", abbreviation: "WI" },
  { longName: "Wyoming", abbreviation: "WY" },
 ];

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
       {formResponse.publicDebt.map((debt, index) => (
        <PublicDebtItem
         key={index}
         debt={debt}
         formResponse={formResponse}
         setFormResponse={setFormResponse}
         index={index}
         handlePublicDebtInputChange={handlePublicDebtInputChange}
         handleDeletePublicDebt={handleDeletePublicDebt}
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
      <Button variant='outlined' onClick={handleAddPublicDebt}>
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
        Private Debts
       </InputLabel>
       <TextField
        name='privateDebt'
        value={formResponse.privateDebt}
        onChange={handleInputChange}
       />
      </div>
      <div className={classes.sectionContainer}>
       <InputLabel shrink style={{ color: "#3f51b5", fontSize: "20px" }}>
        Equity
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
         name='residents65plus'
         labelId='residents65plus-label'
         id='residents65plus-select'
         value={formResponse.residents65plus}
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
// Calculate the Reasonable Collection Potential (RCP)
