import React, { useState } from "react";
import { TextField, MenuItem, Typography, Grid, Box } from "@mui/material";

const CreateClientForm = ({ formData, handleChangeFormData }) => {
 const states = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
 ];

 const [expanded, setExpanded] = useState(false);

 const handleSubmit = (e) => {
  e.preventDefault();
  // Submit form data
  console.log(formData);
 };

 const handleToggleChange = (event) => {
  setUseLogicsApi(event.target.checked);
  setExpanded(!expanded);
 };

 return (
  <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
   <Typography variant='h6'>Client Information</Typography>
   <Grid container spacing={2}>
    <Grid item xs={12} sm={6}>
     <TextField
      margin='normal'
      required
      fullWidth
      id='firstName'
      label='First Name'
      name='firstName'
      autoComplete='fname'
      value={formData.firstName}
      onChange={handleChangeFormData}
     />
    </Grid>
    <Grid item xs={12} sm={6}>
     <TextField
      margin='normal'
      required
      fullWidth
      id='lastName'
      label='Last Name'
      name='lastName'
      autoComplete='lname'
      value={formData.lastName}
      onChange={handleChangeFormData}
     />
    </Grid>
    <Grid item xs={12}>
     <TextField
      margin='normal'
      required
      fullWidth
      id='email'
      label='Email'
      name='email'
      autoComplete='email'
      value={formData.email}
      onChange={handleChangeFormData}
     />
    </Grid>
    <Grid item xs={12}>
     <TextField
      margin='normal'
      required
      fullWidth
      id='address'
      label='Address'
      name='address'
      autoComplete='address'
      value={formData.address}
      onChange={handleChangeFormData}
     />
    </Grid>
    <Grid item xs={12} sm={6}>
     <TextField
      margin='normal'
      required
      fullWidth
      id='phone'
      label='Phone'
      name='phone'
      autoComplete='phone'
      value={formData.phone}
      onChange={handleChangeFormData}
     />
    </Grid>
    <Grid item xs={12} sm={6}>
     <TextField
      margin='normal'
      required
      fullWidth
      id='ssn'
      label='SSN'
      name='SSN'
      value={formData.SSN}
      onChange={handleChangeFormData}
     />
    </Grid>
    <Grid item xs={12} sm={4}>
     <TextField
      margin='normal'
      required
      fullWidth
      id='city'
      label='City'
      name='city'
      autoComplete='city'
      value={formData.city}
      onChange={handleChangeFormData}
     />
    </Grid>
    <Grid item xs={12} sm={4}>
     <TextField
      label='State'
      select
      name='state'
      value={formData.state}
      onChange={handleChangeFormData}
      fullWidth
      margin='normal'>
      {states.map((state) => (
       <MenuItem key={state} value={state}>
        {state}
       </MenuItem>
      ))}
     </TextField>
    </Grid>
    <Grid item xs={12} sm={4}>
     <TextField
      margin='normal'
      required
      fullWidth
      id='zip'
      label='Zip'
      name='zip'
      autoComplete='zip'
      value={formData.zip}
      onChange={handleChangeFormData}
     />
    </Grid>
    <Grid item xs={12}>
     <TextField
      margin='normal'
      required
      fullWidth
      id='addDate'
      label='Add Date'
      name='addDate'
      type='date'
      defaultValue={formData.addDate}
      InputLabelProps={{
       shrink: true,
      }}
      onChange={handleChangeFormData}
     />
    </Grid>
    <Grid item xs={12}>
     <TextField
      margin='normal'
      required
      fullWidth
      id='logicsCaseId'
      label='Logics Case ID'
      name='logicsCaseId'
      value={formData.logicsCaseId}
      onChange={handleChangeFormData}
     />
    </Grid>
   </Grid>
  </Box>
 );
};

export default CreateClientForm;
