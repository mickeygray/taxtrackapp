import React, { useState, useContext } from "react";
import AuthContext from "../../context/auth/authContext";
import {
 Checkbox,
 FormControl,
 FormControlLabel,
 FormGroup,
 FormLabel,
 Button,
 Typography,
 Grid,
 Paper,
} from "@mui/material";
import styled from "styled-components";
const FormContainer = styled.div`
 display: flex;
 flex-direction: column;

 align-items: center;
 // Take at least the full height of the viewport
 padding: 20px;
`;

const GridContainer = styled(Grid)`
 max-width: 1200px; // Set a max width for the container
 width: 100%; // Ensure it takes the full width of its parent
 margin-bottom: 20px; // Add some space before the submit button
`;

// ... other styled components remain the same

const Header = styled(Typography)`
 text-align: center;
 margin-bottom: 20px;
`;

const YearSelectionGrid = styled(Grid)`
 border-right: 2px solid #ccc; // Border between the year selection and the details
 padding: 20px;
`;

const YearDetailGrid = styled(Grid)`
 padding: 20px;
 max-height: 600px;
 overflow-y: scroll;
`;

const DetailPaper = styled(Paper)`
 margin-bottom: 20px;
 padding: 20px;
`;

const SubmitButton = styled(Button)`
 display: block; // Make the button a block-level element
 margin: 20px auto; // Center the button with auto margins
 width: fit-content; // Make the button width fit its content
`;
const ReturnOrganizer = () => {
 const { profile } = useContext(AuthContext);
 const [selectedYears, setSelectedYears] = useState({});
 const handleYearSelection = (event) => {
  const year = event.target.value;
  setSelectedYears((prevYears) => {
   if (prevYears[year]) {
    // If the year is already selected, remove it
    const newYears = { ...prevYears };
    delete newYears[year];
    return newYears;
   } else {
    // If the year is not selected, add it
    return {
     ...prevYears,
     [year]: prevYears[year] || { forms: [], incomeTypes: [] },
    };
   }
  });
 };
 const handleCheckboxChange = (year, type, value) => {
  setSelectedYears((prevYears) => ({
   ...prevYears,
   [year]: {
    ...prevYears[year],
    [type]: prevYears[year][type].includes(value)
     ? prevYears[year][type].filter((item) => item !== value)
     : [...prevYears[year][type], value],
   },
  }));
 };

 const [formValues, setFormValues] = useState({
  forms: [],
  years: [],
  incomeTypes: [],
 });

 const handleSubmit = () => {
  // Send formValues to backend
  console.log(formValues); // Replace with actual backend call
  alert("We’ll be in touch soon with your tax organizers!");
 };

 const taxYears = [
  "2016 or earlier",
  "2017",
  "2018",
  "2019",
  "2020",
  "2021",
  "2022",
  "2023",
 ];

 return (
  <FormContainer>
   <Header variant='h5'>Order Tax Organizers</Header>
   <GridContainer container spacing={2}>
    <YearSelectionGrid item xs={12} md={6}>
     <FormControl component='fieldset'>
      <FormLabel component='legend'>
       Select the tax years you need to file:
      </FormLabel>
      <FormGroup>
       {taxYears.map((year) => (
        <FormControlLabel
         key={year}
         control={
          <Checkbox
           checked={Object.keys(selectedYears).includes(year)}
           onChange={handleYearSelection}
           value={year}
          />
         }
         label={year}
        />
       ))}
      </FormGroup>
     </FormControl>
    </YearSelectionGrid>

    <YearDetailGrid item xs={12} md={6}>
     {Object.entries(selectedYears).map(([year, data]) => (
      <DetailPaper key={year} elevation={3}>
       <Typography variant='h6'>{`Details for ${year}`}</Typography>

       <Grid container spacing={2}>
        <Grid item xs={12}>
         <FormControl component='fieldset'>
          <FormLabel component='legend'>
           What kind of forms do you need to file?
          </FormLabel>
          <FormGroup row>
           {" "}
           {/* Add 'row' prop to display checkboxes inline */}
           {["1040", "1120S", "1120", "1065"].map((form) => (
            <FormControlLabel
             key={form}
             control={
              <Checkbox
               checked={data.forms.includes(form)}
               onChange={(e) => handleCheckboxChange(year, "forms", form)}
               value={form}
              />
             }
             label={form + (form === "1040" ? " - Personal Income Taxes" : "")}
            />
           ))}
          </FormGroup>
         </FormControl>
        </Grid>

        <Grid item xs={12}>
         <FormControl component='fieldset'>
          <FormLabel component='legend'>
           What kind of income did you receive during those years?
          </FormLabel>
          <FormGroup row>
           {" "}
           {/* Add 'row' prop to display checkboxes inline */}
           {[
            "W-2",
            "1099-NEC/1099-MISC",
            "Social Security/Retirement Income",
            "Other",
           ].map((income) => (
            <FormControlLabel
             key={income}
             control={
              <Checkbox
               checked={data.incomeTypes.includes(income)}
               onChange={(e) =>
                handleCheckboxChange(year, "incomeTypes", income)
               }
               value={income}
              />
             }
             label={income}
            />
           ))}
          </FormGroup>
         </FormControl>
        </Grid>
       </Grid>
      </DetailPaper>
     ))}
    </YearDetailGrid>
   </GridContainer>

   <SubmitButton
    variant='contained'
    color='primary'
    onClick={() => console.log(selectedYears)}>
    Submit
   </SubmitButton>
  </FormContainer>
 );
};

export default ReturnOrganizer;
