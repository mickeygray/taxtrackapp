import React, { useContext, useState, useCallback } from "react";
import ProfileContext from "../../context/profile/profileContext";
import CSVReader from "react-csv-reader";
import {
 Card,
 TextField,
 Button,
 Typography,
 Box,
 IconButton,
 Tooltip,
} from "@mui/material";
import styled from "styled-components";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import CreateClientForm from "./CreateClientForm";
const StyledCard = styled(Card)`
 && {
  margin: 20px;
  padding: 20px;
  // Light grey background
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); // Adds depth
  transition: 0.3s;
  &:hover {
   box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2); // Enhances depth on hover
  }
 }
`;

const CustomTextField = styled(TextField)`
 && {
  margin-bottom: 20px;
 }
`;

const Upload = ({ putState }) => {
 const profileContext = useContext(ProfileContext);
 const { uploadFile, putCanopy, profile } = profileContext;
 const [caseID, setCaseID] = useState("");
 const [file, setFile] = useState("");
 const [useLogics, setUseLogics] = useState(true);
 const [formData, setFormData] = useState({
  firstName: "",
  lastName: "",
  address: "",
  email: "",
  phone: "",
  SSN: "",
  city: "",
  state: "",
  zip: "",
  addDate: new Date().toISOString().slice(0, 10),
  logicsCaseId: "",
 });

 const handleChangeFormData = (e) => {
  const { name, value } = e.target;
  setFormData((prevFormData) => ({
   ...prevFormData,
   [name]: value,
  }));
 };
 const toggleForm = () => setUseLogics(!useLogics);
 const papaparseOptions = {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
  beforeFirstChunk: function (chunk) {
   var index = chunk.match(/\r\n|\r|\n/).index;
   var headings = chunk.substr(0, index).split(",");
   return headings.join() + chunk.substr(index);
  },
  transformHeader: (header) => toCamelCaseString(header),
  transform: (data) => data.toProperCase(),
 };

 String.prototype.toProperCase = function () {
  return this.replace(/\w\S*/g, function (txt) {
   return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
 };
 function convertToString(input) {
  if (input) {
   if (typeof input === "string") {
    return input;
   }

   return String(input);
  }
  return "";
 }

 // convert string to words
 function toWords(input) {
  input = convertToString(input);

  var regex =
   /[A-Z\xC0-\xD6\xD8-\xDE]?[a-z\xDF-\xF6\xF8-\xFF]+|[A-Z\xC0-\xD6\xD8-\xDE]+(?![a-z\xDF-\xF6\xF8-\xFF])|\d+/g;

  return input.match(regex);
 }

 // convert the input array to camel case
 function toCamelCase(inputArray) {
  let result = "";

  for (let i = 0, len = inputArray.length; i < len; i++) {
   let currentStr = inputArray[i];

   let tempStr = currentStr.toLowerCase();

   if (i != 0) {
    // convert first letter to upper case (the word is in lowercase)
    tempStr = tempStr.substr(0, 1).toUpperCase() + tempStr.substr(1);
   }

   result += tempStr;
  }

  return result;
 }

 // this function call all other functions

 function toCamelCaseString(header) {
  let words = toWords(header);

  return toCamelCase(words);
 }

 const onSubmit = (e) => {
  e.preventDefault();

  // If using Logics API, only upload the caseID and file
  if (useLogics) {
   const dataToUpload = {
    caseID,
    file,
   };
   console.log("Uploading with Logics Case ID:", dataToUpload);
   uploadFile(dataToUpload, file);
   setFormData({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    phone: "",
    SSN: "",
    city: "",
    state: "",
    zip: "",
    addDate: new Date().toISOString().slice(0, 10),
    logicsCaseId: "",
   });
  } else {
   // If not using Logics API, include all formData along with the file
   const dataToUpload = {
    ...formData,
    file,
   };
   console.log("Uploading full client data:", dataToUpload);
   // Assume uploadFile can handle formData as well, adjust accordingly
   uploadFile(dataToUpload, file);
  }
 };

 return (
  <StyledCard>
   {putState ? (
    <Box
     sx={{
      maxWidth: 800,
      mx: "auto",
      p: 2,
      backgroundColor: "#e3f2fd",
      boxShadow: 3,
     }}>
     <Typography variant='h5' gutterBottom>
      Upload Account Transcripts
     </Typography>
     <CSVReader
      cssClass='csv-input'
      label=''
      onFileLoaded={(data, fileInfo) => putCanopy(data, profile)}
      parserOptions={papaparseOptions}
      inputId='profiles'
     />
    </Box>
   ) : (
    <Box>
     <Typography variant='h5' gutterBottom>
      Create A New Client
     </Typography>
     <Tooltip
      title={useLogics ? "Manual Client Entry" : "Automate Client With Logics"}>
      <IconButton onClick={toggleForm} sx={{ mb: 2 }}>
       <SwapHorizIcon />
      </IconButton>
     </Tooltip>
     <Typography variant='subtitle1'>
      Please Attach The Account Transcripts CSV and include a Logics Case ID
     </Typography>
     <form onSubmit={onSubmit}>
      {useLogics ? (
       <>
        {/* Optionally include a TextField for Logics Case ID here */}
        <CustomTextField
         fullWidth
         label='Logics Case ID'
         variant='outlined'
         name='caseID'
         value={caseID}
         onChange={(e) => setCaseID(e.target.value)}
        />{" "}
       </>
      ) : (
       <CreateClientForm
        formData={formData}
        handleChangeFormData={handleChangeFormData}
       /> // Render the form for manual client creation
      )}
      <CSVReader
       label='Upload Account Transcripts'
       parserOptions={papaparseOptions}
       onFileLoaded={(data, fileInfo) => setFile(data)}
       inpuId='profiles'
       inputStyle={{ color: "red" }}
      />
      <Button type='submit' variant='contained' color='primary'>
       Create Profile
      </Button>
     </form>
    </Box>
   )}
  </StyledCard>
 );
};

export default Upload;
