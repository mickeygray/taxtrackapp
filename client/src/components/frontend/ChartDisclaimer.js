import React from "react";
import { Container, Typography, Grid, Box, useMediaQuery } from "@mui/material";

const ChartDisclaimer = () => {
 const isMobile = useMediaQuery("(max-width: 768px)");

 return (
  <Container style={{ marginTop: "75px" }}>
   <Typography textAlign='center' variant='h4' style={{ marginBottom: "20px" }}>
    Change The Way You Do Your Taxes Forever
   </Typography>
   <Grid container alignItems={"center"}>
    {!isMobile ? (
     <>
      <Grid item xs={12} md={6}>
       <Box>
        <img
         src={process.env.PUBLIC_URL + "/images/Chart1.png"}
         alt='Harness the power of compounding'
         style={{
          width: "75%",
          height: "75%",
          borderRadius: "10px",
         }}
        />
       </Box>
      </Grid>
      <Grid item xs={12} md={6} style={{ position: "relative", my: "auto" }}>
       <Box
        sx={{
         position: "absolute",
         top: "50%",
         transform: "translateY(-50%)",
        }}>
        <Typography variant='h6' style={{ color: "solid-slate" }}>
         Harness the power of information
        </Typography>
        <Typography style={{ color: "solid-slate" }}>
         Tax Track revolutionizes tax management, offering a modernized approach
         to taxes and simplifying dealings with the IRS. With cutting-edge
         technology, it transforms complex IRS data into user-friendly visuals,
         enabling easy tracking of financial progress. Say goodbye to tax
         headaches as Tax Track provides expert guidance, streamlines return
         preparation, and empowers you to confidently navigate IRS challenges
         with ease.
        </Typography>
       </Box>
      </Grid>
     </>
    ) : (
     <>
      {" "}
      <Grid item xs={12} md={6}>
       <Box sx={{}}>
        <img
         src={process.env.PUBLIC_URL + "/images/Chart1.png"}
         alt='Harness the power of compounding'
         style={{
          width: "75%",
          height: "75%",
          borderRadius: "10px",
          marginLeft: "40px",
         }}
        />
       </Box>
      </Grid>
      <Grid item xs={12} md={6}>
       <Box sx={{ position: "relative", my: "auto" }}>
        <Typography variant='h6' style={{ color: "solid-slate" }}>
         Harness the power of information
        </Typography>
        <Typography style={{ color: "solid-slate" }}>
         Tax Track revolutionizes tax management, offering a modernized approach
         to taxes and simplifying dealings with the IRS. With cutting-edge
         technology, it transforms complex IRS data into user-friendly visuals,
         enabling easy tracking of financial progress. Say goodbye to tax
         headaches as Tax Track provides expert guidance, streamlines return
         preparation, and empowers you to confidently navigate IRS challenges
         with ease.
        </Typography>
       </Box>
      </Grid>
     </>
    )}
   </Grid>
  </Container>
 );
};

export default ChartDisclaimer;
