import React, { useState } from "react";
import {
 Box,
 Grid,
 IconButton,
 Typography,
 FormControl,
 InputLabel,
 Select,
 MenuItem,
 ListItemText,
 FormControlLabel,
 Checkbox,
 TextField,
} from "@material-ui/core";
import { VisibilityOff, Edit, ExpandMore, Delete } from "@material-ui/icons";

const TaxLiabilitiesItem = ({
 debt,
 index,
 formResponse,
 setFormResponse,
 handleTaxLiabilitiesInputChange,
 handleDeleteTaxLiabilities,
}) => {
 const [expanded, setExpanded] = useState(true);
 const [unfiledYearsSelected, setUnfiledYearsSelected] = useState(false);

 const handleToggle = () => {
  setExpanded((prevState) => !prevState);
 };
 const handleUnfiledYearsChange = (year) => {
  setFormResponse((prevState) => {
   const updatedTaxLiabilities = [...prevState.taxLiabilities];
   const selectedDebt = updatedTaxLiabilities[index];

   // Initialize years and unfiledYears as empty arrays if they're not already present
   if (!selectedDebt.hasOwnProperty("years")) {
    selectedDebt.years = [];
   }

   if (!selectedDebt.hasOwnProperty("unfiledYears")) {
    selectedDebt.unfiledYears = [];
   }

   const yearIndex = selectedDebt.years.indexOf(year);
   const unfiledYearIndex = selectedDebt.unfiledYears.indexOf(year);

   if (yearIndex === -1) {
    // Year is not in years, so we add it to years
    selectedDebt.years.push(year);
   } else {
    // Year is already in years, so we remove it from years and add it to unfiledYears
    selectedDebt.years.splice(yearIndex, 1);
    selectedDebt.unfiledYears.push(year);
   }

   // If the year is already in unfiledYears, we remove it (toggle back to "filed")
   if (unfiledYearIndex !== -1) {
    selectedDebt.unfiledYears.splice(unfiledYearIndex, 1);
   }

   return {
    ...prevState,
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
  <div key={index} className='m-1' style={{ width: "300px" }}>
   <Grid container spacing={2}>
    <Grid item xs={6}>
     <FormControl fullWidth>
      <InputLabel>Plaintiff</InputLabel>
      <Select
       disabled
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
     <FormControl style={{ width: "200px" }}>
      <InputLabel>Year</InputLabel>
      <Select
       name='years'
       multiple
       value={
        Array.from(new Set([...debt.years, ...debt.unfiledYears])).sort(
         (a, b) => a - b
        ) || []
       } // Initialize as an empty array if not present
       onChange={(e) => handleTaxLiabilitiesInputChange(e, index)}
       renderValue={(selected) => selected.join(", ") || "Select years"}
       fullWidth>
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
      </Select>
     </FormControl>
    </Grid>
   </Grid>
   <Grid container spacing={2}>
    <Grid item xs={6}>
     <TextField
      name='amount'
      label='Amount'
      value={debt.amount.toLocaleString("en-US", {
       style: "currency",
       currency: "USD",
      })}
      onChange={(e) => handleTaxLiabilitiesInputChange(e, index)}
     />
    </Grid>
    <Grid item xs={6}>
     <TextField
      name='payment'
      label='Monthly Payment'
      value={debt.payment.toLocaleString("en-US", {
       style: "currency",
       currency: "USD",
      })}
      onChange={(e) => handleTaxLiabilitiesInputChange(e, index)}
     />
    </Grid>
   </Grid>
  </div>
 );
};

export default TaxLiabilitiesItem;
