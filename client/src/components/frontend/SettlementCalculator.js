import React, { useContext } from "react";
import { Grid, Box, Typography } from "@mui/material";
import SettlementForm from "./SettlementForm";
import SettlementChart from "./SettlementChart";
import ProfileContext from "../../context/profile/profileContext";

const SettlementCalculator = () => {
 const { settlementCalculation } = useContext(ProfileContext);

 return (
  <Box textAlign='center' padding={3} bgcolor='#eae6de'>
   <Box marginBottom={2}>
    <Typography variant='h6'>Calculate Your Settlement</Typography>
    <Typography variant='h3'>Your Potential Offer In Compromise</Typography>
   </Box>

   <Box
    maxWidth={600}
    margin='auto'
    textAlign='center'
    sx={{
     "@media (max-width: 600px)": {
      textAlign: "left",
     },
    }}>
    <Typography variant='body2'>
     The Tax Track Settlement Calculator is a powerful tool that helps
     individuals assess their eligibility for a potential settlement with the
     IRS. By entering financial information, taxpayers can determine if they
     qualify to settle their tax debt for less than the full amount owed.
     Simplifying the process, it empowers users to explore debt relief options
     confidently.
    </Typography>
   </Box>

   <Grid container>
    <Grid item xs={12} md={3}>
     <Box padding={2}>
      {/* FormContainer */}
      <SettlementForm />
     </Box>
    </Grid>

    <Grid item xs={12} md={9}>
     <Box padding={2}>
      {/* ChartContainer */}
      {settlementCalculation === null ? (
       <img
        src={process.env.PUBLIC_URL + "/images/Offer-in-compromise.png"}
        style={{ width: "100%" }}
        alt='Still Image'
       />
      ) : (
       <SettlementChart />
      )}
     </Box>
    </Grid>
   </Grid>
  </Box>
 );
};

export default SettlementCalculator;
