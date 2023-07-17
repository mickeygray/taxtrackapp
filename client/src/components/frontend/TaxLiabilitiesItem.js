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
import { VisibilityOff, Edit, Delete } from "@material-ui/icons";

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
  <div key={index} className='m-1'>
   <Box display='flex' alignItems='center' marginBottom={2}>
    <Box flex={1}>
     {expanded ? (
      <Box key={index} display='flex' alignItems='center' marginBottom={2}>
       <Box marginLeft={2}>
        <IconButton onClick={handleToggle}>
         <VisibilityOff />
        </IconButton>
        <IconButton onClick={() => handleDeleteTaxLiabilities(index)}>
         <Delete />
        </IconButton>
       </Box>

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

export default TaxLiabilitiesItem;
