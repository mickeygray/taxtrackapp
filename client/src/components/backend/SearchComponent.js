import React, { useState, useContext } from "react";
import {
 TextField,
 Button,
 Box,
 Typography,
 Card,
 CardContent,
 Alert,
} from "@mui/material";
import styled from "styled-components";
import ProfileContext from "../../context/profile/profileContext";

const StyledCard = styled(Card)`
 margin: 20px;
 padding: 20px;
 background-color: #fafafa; // Soft white background
 box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05); // Soft shadow for depth
`;

const SearchComponent = () => {
 const { getProfiles, clearProfiles } = useContext(ProfileContext);
 const [searchQuery, setSearchQuery] = useState("");
 const [error, setError] = useState("");

 const handleSearch = () => {
  if (!searchQuery.trim()) {
   setError("Please enter a name, email address, or phone number to search.");
   return;
  }
  setError("");
  getProfiles(searchQuery.trim());
 };

 return (
  <StyledCard>
   <CardContent>
    <Typography variant='h6'>Search Clients</Typography>
    <Typography variant='body2'>
     You can search by name, email, or phone number.
    </Typography>
    <Box component='div' sx={{ mt: 2 }}>
     <TextField
      fullWidth
      label='Search'
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      error={!!error}
      helperText={error}
     />
     <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
      <Button variant='contained' onClick={handleSearch}>
       Search
      </Button>
      <Button
       variant='outlined'
       onClick={() => {
        clearProfiles();
        setSearchQuery("");
        setError("");
       }}>
       Clear
      </Button>
     </Box>
    </Box>
    {/* Conditionally render error message or results */}
   </CardContent>
  </StyledCard>
 );
};

export default SearchComponent;
