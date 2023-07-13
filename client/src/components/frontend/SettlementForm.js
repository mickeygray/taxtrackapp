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

const TaxLiabilitiesItem = ({
 debt,
 index,
 formResponse,
 setFormResponse,
 handleTaxLiabilitiesInputChange,
 handleDeleteTaxLiabilities,
}) => {
 const [expanded, setExpanded] = useState(false);
 const [unfiledYearsSelected, setUnfiledYearsSelected] = useState(false);

 const handleToggle = () => {
  setExpanded((prevState) => !prevState);
 };

 const currentYear = new Date().getFullYear();
 const startYear = 2010;
 const years = Array.from(
  { length: currentYear - startYear + 1 },
  (_, index) => startYear + index
 );

 const handleUnfiledYearsChange = (index, year) => {
  setFormResponse((prevState) => {
   const updatedTaxLiabilities = [...prevState.taxLiabilities];
   const selectedDebt = updatedTaxLiabilities[index];
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
    taxLiabilities: updatedTaxLiabilities,
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
           onChange={(e) => handleTaxLiabilitiesInputChange(e, index)}
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
           onChange={(e) => handleTaxLiabilitiesInputChange(e, index)}
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
                   formResponse.taxLiabilities[index]?.unfiledYears.includes(
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
        <div className='grid-2'>
         <TextField
          name='amount'
          label='Amount'
          value={debt.amount.toLocaleString("en-US", {
           style: "currency",
           currency: "USD",
          })}
          onChange={(e) => handleTaxLiabilitiesInputChange(e, index)}
         />
         <TextField
          name='payment'
          label='Monthly Payment'
          value={debt.payment.toLocaleString("en-US", {
           style: "currency",
           currency: "USD",
          })}
          onChange={(e) => handleTaxLiabilitiesInputChange(e, index)}
         />
        </div>
       </Box>

       <Box marginLeft={2}>
        <IconButton onClick={() => handleDeleteTaxLiabilities(index)}>
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
          onClick={() => handleDeleteTaxLiabilities(index)}>
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

 const housing = [
  {
   state: "AL",
   familyOf1: 1310.02,
   familyOf2: 1542.86,
   familyOf3: 1624.76,
   familyOf4: 1811.91,
   familyOf5: 1842.52,
  },
  {
   state: "AK",
   familyOf1: 1702,
   familyOf2: 1998,
   familyOf3: 2103,
   familyOf4: 2344,
   familyOf5: 2380,
  },
  {
   state: "AZ",
   familyOf1: 1460,
   familyOf2: 1716,
   familyOf3: 1805,
   familyOf4: 2010,
   familyOf5: 2040,
  },
  {
   state: "AR",
   familyOf1: 1288.83,
   familyOf2: 1512.49,
   familyOf3: 1592.59,
   familyOf4: 1779.67,
   familyOf5: 1807.98,
  },
  {
   state: "CA",
   familyOf1: 2384.78,
   familyOf2: 2802.58,
   familyOf3: 2954.31,
   familyOf4: 3291.41,
   familyOf5: 3343.86,
  },
  {
   state: "CO",
   familyOf1: 1737.23,
   familyOf2: 2039.08,
   familyOf3: 2149.24,
   familyOf4: 2395.79,
   familyOf5: 2437.58,
  },
  {
   state: "CT",
   familyOf1: 2384.17,
   familyOf2: 2802.75,
   familyOf3: 2952.33,
   familyOf4: 3284.17,
   familyOf5: 3332.33,
  },
  {
   state: "DE",
   familyOf1: 1758.33,
   familyOf2: 2067.33,
   familyOf3: 2176.33,
   familyOf4: 2425.67,
   familyOf5: 2464,
  },
  {
   state: "DC",
   familyOf1: 3336.8,
   familyOf2: 3919.2,
   familyOf3: 4123.2,
   familyOf4: 4596.8,
   familyOf5: 4666.4,
  },
  {
   state: "HI",
   familyOf1: 2204,
   familyOf2: 2599,
   familyOf3: 2738,
   familyOf4: 3049,
   familyOf5: 3093,
  },
  {
   state: "FL",
   familyOf1: 1531.81,
   familyOf2: 1800.72,
   familyOf3: 1895.17,
   familyOf4: 2111.56,
   familyOf5: 2145.67,
  },
  {
   state: "GA",
   familyOf1: 1473,
   familyOf2: 1732,
   familyOf3: 1825,
   familyOf4: 2032,
   familyOf5: 2067,
  },
  {
   state: "ID",
   familyOf1: 1530,
   familyOf2: 1795,
   familyOf3: 1898,
   familyOf4: 2101,
   familyOf5: 2144,
  },
  {
   state: "HI",
   familyOf1: 2531.4,
   familyOf2: 3523.4,
   familyOf3: 3132,
   familyOf4: 3124.2,
   familyOf5: 3396.4,
  },
  {
   state: "IL",
   familyOf1: 1700.6,
   familyOf2: 1556.6,
   familyOf3: 1798.8,
   familyOf4: 2060.2,
   familyOf5: 1505.4,
  },
  {
   state: "IN",
   familyOf1: 1390,
   familyOf2: 1634,
   familyOf3: 1722,
   familyOf4: 1920,
   familyOf5: 1952,
  },
  {
   state: "IA",
   familyOf1: 1366,
   familyOf2: 1604,
   familyOf3: 1690,
   familyOf4: 1883,
   familyOf5: 1914,
  },
  {
   state: "KS",
   familyOf1: 1375,
   familyOf2: 1614,
   familyOf3: 1701,
   familyOf4: 1898,
   familyOf5: 1930,
  },
  {
   state: "KY",
   familyOf1: 1315,
   familyOf2: 1544,
   familyOf3: 1626,
   familyOf4: 1810,
   familyOf5: 1839,
  },
  {
   state: "LA",
   familyOf1: 1469,
   familyOf2: 1725,
   familyOf3: 1818,
   familyOf4: 2027,
   familyOf5: 2060,
  },
  {
   state: "ME",
   familyOf1: 1546,
   familyOf2: 1813,
   familyOf3: 1911,
   familyOf4: 2132,
   familyOf5: 2167,
  },
  {
   state: "MD",
   familyOf1: 2101,
   familyOf2: 2467,
   familyOf3: 2597,
   familyOf4: 2893,
   familyOf5: 2937,
  },
  {
   state: "MA",
   familyOf1: 2445,
   familyOf2: 2870,
   familyOf3: 3023,
   familyOf4: 3374,
   familyOf5: 3428,
  },
  {
   state: "MI",
   familyOf1: 1505,
   familyOf2: 1767,
   familyOf3: 1860,
   familyOf4: 2072,
   familyOf5: 2106,
  },
  {
   state: "MN",
   familyOf1: 1535,
   familyOf2: 1805,
   familyOf3: 1900,
   familyOf4: 2117,
   familyOf5: 2151,
  },
  {
   state: "MS",
   familyOf1: 1278,
   familyOf2: 1501,
   familyOf3: 1580,
   familyOf4: 1763,
   familyOf5: 1793,
  },
  {
   state: "MO",
   familyOf1: 1361,
   familyOf2: 1597,
   familyOf3: 1681,
   familyOf4: 1876,
   familyOf5: 1905,
  },
  {
   state: "NE",
   familyOf1: 1468,
   familyOf2: 1725,
   familyOf3: 1816,
   familyOf4: 2024,
   familyOf5: 2057,
  },
  {
   state: "NV",
   familyOf1: 1601,
   familyOf2: 1881,
   familyOf3: 1977,
   familyOf4: 2203,
   familyOf5: 2241,
  },
  {
   state: "NH",
   familyOf1: 1976,
   familyOf2: 2320,
   familyOf3: 2446,
   familyOf4: 2722,
   familyOf5: 2767,
  },
  {
   state: "NJ",
   familyOf1: 2623,
   familyOf2: 3078,
   familyOf3: 3244,
   familyOf4: 3622,
   familyOf5: 3677,
  },
  {
   state: "NM",
   familyOf1: 1466,
   familyOf2: 1723,
   familyOf3: 1818,
   familyOf4: 2024,
   familyOf5: 2056,
  },
  {
   state: "NY",
   familyOf1: 1836,
   familyOf2: 2156,
   familyOf3: 2272,
   familyOf4: 2534,
   familyOf5: 2574,
  },
  {
   state: "NC",
   familyOf1: 1414,
   familyOf2: 1660,
   familyOf3: 1748,
   familyOf4: 1947,
   familyOf5: 1978,
  },
  {
   state: "ND",
   familyOf1: 1437,
   familyOf2: 1688,
   familyOf3: 1780,
   familyOf4: 1984,
   familyOf5: 2016,
  },
  {
   state: "OH",
   familyOf1: 1432,
   familyOf2: 1683,
   familyOf3: 1771,
   familyOf4: 1972,
   familyOf5: 2004,
  },
  {
   state: "OK",
   familyOf1: 1329,
   familyOf2: 1561,
   familyOf3: 1643,
   familyOf4: 1830,
   familyOf5: 1859,
  },
  {
   state: "OR",
   familyOf1: 1739.9,
   familyOf2: 2046.7,
   familyOf3: 2156.7,
   familyOf4: 2403.2,
   familyOf5: 2443.8,
  },
  {
   state: "PA",
   familyOf1: 1481.5,
   familyOf2: 1740.5,
   familyOf3: 1833.2,
   familyOf4: 2043.9,
   familyOf5: 2077.4,
  },
  {
   state: "RI",
   familyOf1: 2073.4,
   familyOf2: 2430.4,
   familyOf3: 2550.6,
   familyOf4: 2841.8,
   familyOf5: 2887.8,
  },
  {
   state: "SC",
   familyOf1: 1452.1,
   familyOf2: 1708.9,
   familyOf3: 1799.3,
   familyOf4: 2006.9,
   familyOf5: 2038.3,
  },
  {
   state: "SD",
   familyOf1: 1396.3,
   familyOf2: 1640.4,
   familyOf3: 1728.7,
   familyOf4: 1923.2,
   familyOf5: 1955.9,
  },
  {
   state: "TN",
   familyOf1: 1391.1,
   familyOf2: 1632.4,
   familyOf3: 1718.4,
   familyOf4: 1911.4,
   familyOf5: 1944.2,
  },
  {
   state: "TX",
   familyOf1: 2800,
   familyOf2: 4100,
   familyOf3: 5200,
   familyOf4: 6200,
   familyOf5: 7200,
  },
  {
   state: "UT",
   familyOf1: 1589.5,
   familyOf2: 1865.5,
   familyOf3: 1964.5,
   familyOf4: 2185.5,
   familyOf5: 2220.5,
  },
  {
   state: "VT",
   familyOf1: 1753.5,
   familyOf2: 2057.5,
   familyOf3: 2165.5,
   familyOf4: 2415.5,
   familyOf5: 2454.5,
  },
  {
   state: "VA",
   familyOf1: 1623.5,
   familyOf2: 1905.5,
   familyOf3: 2005.5,
   familyOf4: 2234.5,
   familyOf5: 2270.5,
  },
  {
   state: "WA",
   familyOf1: 1944.61,
   familyOf2: 2282.25,
   familyOf3: 2401.13,
   familyOf4: 2676.02,
   familyOf5: 2722.7,
  },
  {
   state: "WV",
   familyOf1: 1276.97,
   familyOf2: 1499.24,
   familyOf3: 1578.21,
   familyOf4: 1760.02,
   familyOf5: 1788.34,
  },
  {
   state: "WI",
   familyOf1: 1533.22,
   familyOf2: 1800.95,
   familyOf3: 1896.18,
   familyOf4: 2116.62,
   familyOf5: 2152.86,
  },
  {
   state: "WY",
   familyOf1: 1610.36,
   familyOf2: 1890.18,
   familyOf3: 1992.89,
   familyOf4: 2223.73,
   familyOf5: 2259.54,
  },
  {
   state: "PR",
   familyOf1: 1085.72,
   familyOf2: 1275.46,
   familyOf3: 1344.74,
   familyOf4: 1497.04,
   familyOf5: 1521.96,
  },
 ];

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
 const healthCareExpenses = {
  under65: 79,
  over65: 154,
 };

 const livingExpenses = {
  familyOf1: {
   food: 466,
   housekeepingSupplies: 47,
   apparelAndServices: 96,
   personalCare: 43,
   miscellaneous: 189,
   total: 841,
  },
  familyOf2: {
   food: 777,
   housekeepingSupplies: 80,
   apparelAndServices: 145,
   personalCare: 78,
   miscellaneous: 309,
   total: 1389,
  },
  familyOf3: {
   food: 936,
   housekeepingSupplies: 85,
   apparelAndServices: 207,
   personalCare: 91,
   miscellaneous: 381,
   total: 1700,
  },
  familyOf4: {
   food: 1123,
   housekeepingSupplies: 90,
   apparelAndServices: 252,
   personalCare: 97,
   miscellaneous: 431,
   total: 1993,
  },
  familyOf5: {
   food: 1213,
   housekeepingSupplies: 97,
   apparelAndServices: 272,
   personalCare: 105,
   miscellaneous: 465,
   total: 2349,
  },
 };

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

  console.log(residentsUnder65);
  const healthCareExpense =
   healthCareExpenses.under65 * parseInt(residentsUnder65) +
   healthCareExpenses.over65 * parseInt(residents65);

  const livingExpensesData = livingExpenses[familySize];

  const totalExpenses =
   autoCost + housingExpense + healthCareExpense + livingExpensesData.total;

  console.log(
   autoCost,
   housingExpense,
   healthCareExpense,
   livingExpensesData.total
  );
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
  const { incomes, equity } = formResponse;

  console.log(incomes, "incomes");

  const totalWages =
   incomes
    .filter((income) => income.type === "salary")
    .reduce((sum, income) => sum + parseFloat(income.amount), 0) * 0.8;

  const totalPassiveIncome =
   incomes
    .filter((income) => income.type === "passive")
    .reduce((sum, income) => sum + parseFloat(income.amount), 0) * 0.8;

  const totalIncome = totalWages + totalPassiveIncome;

  console.log(totalIncome, "tot in income");
  console.log(totalWages, "wage in income");
  console.log(totalPassiveIncome, "passive in income");

  return { totalIncome, totalWages, totalPassiveIncome };
 }

 function calculateMonthlyCollectionAmount() {
  const totalExpenses = calculateTotalExpenses().totalExpenses;
  const { totalIncome } = calculateTotalIncome();

  console.log(totalExpenses, "expenses in collection amount");
  console.log(totalIncome, "income in collection amount");

  const monthlyCollectionAmount = totalIncome - totalExpenses;

  return monthlyCollectionAmount;
 }

 function calculatePlausibleOfferAmount() {
  const monthlyCollectionAmount = calculateMonthlyCollectionAmount();
  const collectionWindow = calculateCollectionWindow().collectionWindow;
  const plausibleOfferAmount = monthlyCollectionAmount * collectionWindow;

  console.log(monthlyCollectionAmount, "collection amount in offer amount");

  return plausibleOfferAmount;
 }

 function determineSettlementCalculation() {
  const plausibleOfferAmount = calculatePlausibleOfferAmount();
  const rcpWindow = calculateCollectionWindow().collectionWindow;
  const federalLiability = formResponse.taxLiabilities
   .filter((liability) => liability.plaintiff === "irs")
   .map((liability) => parseFloat(liability.amount.replace("$", "")))[0];

  console.log(plausibleOfferAmount / federalLiability, "poffer");

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
   const maxLiabilityReduction = federalLiability - plausibleOfferAmount;
   const equityReduction = Math.min(equity * 0.8, highEquityThreshold);
   liabilityReduction = Math.min(equityReduction, maxLiabilityReduction);

   liabilityLessEquity -= liabilityReduction;
   offerLumpSumLessEquity -= liabilityReduction;
  }

  if (calculateMonthlyCollectionAmount() < 50) {
   return {
    offerStatus: "CNC",
    federalLiability,
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
    const stateLiability = formResponse.taxLiabilities
     .filter((liability) => liability.plaintiff === "state")
     .map((liability) => parseFloat(liability.amount.replace("$", "")))[0];

    console.log(stateLiability);

    const debtPayment = formResponse.privateDebt > 50000 ? 150 : 0;
    let statePayment = stateLiability / rcpWindow;
    let monthlyExpenses =
     calculateTotalExpenses().totalExpenses + statePayment + debtPayment;
    let updatedPlausibleOfferAmount = calculatePlausibleOfferAmount();

    while (updatedPlausibleOfferAmount < 0.3 * federalLiability) {
     statePayment *= 0.25;
     monthlyExpenses =
      calculateTotalExpenses().totalExpenses + statePayment + debtPayment;
     updatedPlausibleOfferAmount = calculatePlausibleOfferAmount();
    }

    return {
     offerStatus: "OIC",
     statePayment,
     federalLiability,
     rcpWindow,
     plausibleOfferAmount:
      updatedPlausibleOfferAmount > 0
       ? updatedPlausibleOfferAmount
       : plausibleOfferAmount,
     monthlyExpenses,
     offerLumpSum: plausibleOfferAmount * 0.8,
     offerPaymentPlans: [
      plausibleOfferAmount / 12,
      plausibleOfferAmount / 24,
      plausibleOfferAmount / 36,
     ],
    };
   } else {
    return {
     offerStatus: "OIC",
     federalLiability,
     plausibleOfferAmount,
     rcpWindow,
     liquidation: liabilityReduction
      ? { liabilityLessEquity, offerLumpSumLessEquity, liabilityReduction }
      : null,
     monthlyExpenses: calculateTotalExpenses(),
     offerLumpSum: plausibleOfferAmount * 0.8,
     offerPaymentPlans: [
      plausibleOfferAmount / 12,
      plausibleOfferAmount / 24,
      plausibleOfferAmount / 36,
     ],
    };
   }
  } else if (
   plausibleOfferAmount >= 0.8 * federalLiability &&
   plausibleOfferAmount <= 1.2 * federalLiability
  ) {
   const stateLiability =
    formResponse.taxLiabilities
     .filter((liability) => liability.plaintiff === "state")
     .map((liability) => liability.amount)[0] || 0;

   const rcpWindow = calculateCollectionWindow().collectionWindow;
   const statePayment = stateLiability / rcpWindow;
   const debtPayment = formResponse.privateDebt > 50000 ? 150 : 0;
   let monthlyExpenses =
    calculateTotalExpenses().totalExpenses + statePayment + debtPayment;
   let updatedPlausibleOfferAmount =
    calculatePlausibleOfferAmount() - debtPayment;

   while (updatedPlausibleOfferAmount < 0.5 * federalLiability) {
    statePayment *= 0.75;
    monthlyExpenses =
     calculateTotalExpenses().totalExpenses + statePayment + debtPayment;
    updatedPlausibleOfferAmount = calculatePlausibleOfferAmount();
   }

   const monthlyPaymentPlan =
    (0.75 * federalLiability) / calculateCollectionWindow().collectionWindow;
   const savings = 0.75 * federalLiability;

   return {
    offerStatus:
     updatedPlausibleOfferAmount < 0.79 * federalLiability ? "OIC" : "DDIA",
    plausibleOfferAmount:
     updatedPlausibleOfferAmount > 0
      ? updatedPlausibleOfferAmount
      : plausibleOfferAmount,
    statePayment,
    federalLiability,
    rcpWindow,
    monthlyExpenses,
    liquidation: liabilityReduction
     ? { liabilityLessEquity, offerLumpSumLessEquity, liabilityReduction }
     : null,
    monthlyPaymentPlan: updatedPlausibleOfferAmount > 0.8 && monthlyPaymentPlan,
    savings: updatedPlausibleOfferAmount > 0.8 && savings,
    offerLumpSum: plausibleOfferAmount * 0.8,
    offerPaymentPlans: [
     plausibleOfferAmount / 12,
     plausibleOfferAmount / 24,
     plausibleOfferAmount / 36,
    ],
   };
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
   const monthlyPaymentPlan = liabilityToBeDivided / ddiaDuration;
   const savings = federalLiability - reducedLiability;

   return {
    offerStatus: "DDIA",
    federalLiability,
    monthlyPaymentPlan,

    liquidation: liabilityReduction
     ? { liabilityLessEquity, offerLumpSumLessEquity, liabilityReduction }
     : null,
    savings,
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
    liquidation: liabilityReduction
     ? { liabilityLessEquity, offerLumpSumLessEquity, liabilityReduction }
     : null,
    monthlyPaymentPlan,
   };
  }

  return {
   offerStatus:
    "Please resubmit we were unable to make a proper determination, please review your information",
   federalLiability,
   plausibleOfferAmount,
   rcpWindow,
   monthlyExpenses: calculateTotalExpenses(),
  };

  // Return null if no settlement calculation is determined
 }
 /*
 function generateFinancialSummaries() {
  const { federalLiability, stateLiability, monthlyPaymentPlan } =
   determineSettlementCalculation();
  const {
   monthlyExpenses,
   housingExpense,
   healthcareExpenses,
   livingExpenses,
   autoCost,
  } = calculateTotalExpenses();
  const { totalIncome, totalWages, totalPassiveIncome, totalEquity } =
   calculateTotalIncome();
  const settlementCalculation = determineSettlementCalculation();

  const financialSummaries = {
   liabilitySummary: {
    federalLiability,
    stateLiability,
    ddiaLiability:
     monthlyPaymentPlan * calculateCollectionWindow().collectionWindow,
    sixYearPlanLiability: federalLiability * 0.9,
    plausibleOfferAmount: settlementCalculation.plausibleOfferAmount,
    monthlyPaymentPlan,
   },
   context: {
    monthlyExpenses,
    housingExpenses: housingExpense,
    healthcareExpenses,
    livingExpenses,
    auto: autoCost,
   },
   incomeSummary: {
    totalIncome,
    wageIncomePercentage: (totalWages / totalIncome) * 100,
    passiveIncomePercentage: (totalPassiveIncome / totalIncome) * 100,
    equityIncomePercentage: (totalEquity / totalIncome) * 100,
   },
   formResponse,
   settlementCalculation,
   errors: [], // Add any errors encountered during processing to this array
  };

  return financialSummaries;
 }
*/
 const handleSubmit = (e) => {
  e.preventDefault();
  const totalExpenses = calculateTotalExpenses();
  const collectionWindow = calculateCollectionWindow().collectionWindow;
  const monthlyCollectionAmount = calculateMonthlyCollectionAmount();
  const plausibleOfferAmount = calculatePlausibleOfferAmount();
  const settlementCalculation = determineSettlementCalculation();
  const totalIncome = calculateTotalIncome();

  // Generate the financial summaries object
  /*
  const financialSummaries = {
   liabilitySummary: {
    federalLiability: settlementCalculation.federalLiability,
    stateLiability: settlementCalculation.stateLiability,
    ddiaLiability: settlementCalculation.monthlyPaymentPlan * collectionWindow,
    sixYearPlanLiability: settlementCalculation.federalLiability * 0.9,
    plausibleOfferAmount: settlementCalculation.plausibleOfferAmount,
    monthlyPaymentPlan: settlementCalculation.monthlyPaymentPlan,
   },
   context: {
    monthlyExpenses: totalExpenses.totalExpenses,
    housingExpenses: totalExpenses.housingExpense,
    healthcareExpenses: totalExpenses.healthcareExpenses,
    livingExpenses: totalExpenses.livingExpenses,
    auto: totalExpenses.autoCost,
   },
   incomeSummary: {
    totalIncome: totalIncome.totalIncome,
    wageIncomePercentage:
     (totalIncome.totalWages / totalIncome.totalIncome) * 100,
    passiveIncomePercentage:
     (totalIncome.totalPassiveIncome / totalIncome.totalIncome) * 100,
    equityIncomePercentage:
     (totalIncome.totalEquity / totalIncome.totalIncome) * 100,
   },
   formResponse,
   settlementCalculation,
   errors: [], // Add any errors encountered during processing to this array
  };
*/
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
// Calculate the Reasonable Collection Potential (RCP)
