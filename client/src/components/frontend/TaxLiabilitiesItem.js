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
import styled, { css } from "styled-components";

const formControlMixin = css`
 width: 100%;
 height: 40px;
 padding: 8px;
 font-size: 0.875rem;
 border-radius: 8px;
 box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
 background-color: #fff;
 transition: box-shadow 0.3s ease;
 &:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
 }
`;

const SettlementFormSelect = styled(Select)`
 ${formControlMixin}
`;

const SettlementFormTextField = styled(TextField)`
 ${formControlMixin}
`;

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
  // ... (unchanged)
 };
 const currentYear = new Date().getFullYear();
 const startYear = 2010;
 const years = Array.from(
  { length: currentYear - startYear + 1 },
  (_, index) => startYear + index
 );

 return (
  <Box key={index}>
   <Grid container spacing={2}>
    <Grid item xs={6}>
     <FormControl fullWidth>
      <InputLabel>Plaintiff</InputLabel>
      <SettlementFormSelect
       disabled
       name='plaintiff'
       value={debt.plaintiff}
       onChange={(e) => handleTaxLiabilitiesInputChange(e, index)}
       displayEmpty>
       <MenuItem value='irs'>IRS</MenuItem>
       <MenuItem value='state'>State</MenuItem>
      </SettlementFormSelect>
     </FormControl>
    </Grid>
    <Grid item xs={6}>
     <FormControl fullWidth style={{ width: "200px" }}>
      <InputLabel>Year</InputLabel>
      <SettlementFormSelect
       name='years'
       multiple
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
     </FormControl>
    </Grid>
   </Grid>
   <Grid container spacing={2}>
    <Grid item xs={6}>
     <SettlementFormTextField
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
     <SettlementFormTextField
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
  </Box>
 );
};

export default TaxLiabilitiesItem;
