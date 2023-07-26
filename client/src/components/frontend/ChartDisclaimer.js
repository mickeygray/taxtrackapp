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
      <Box style={{ width: "100%" }}>
       <Typography
        variant='body2'
        style={{ color: "light-grey", fontSize: 12 }}>
        Tax Track's platform and tools are intended for informational purposes
        only and do not constitute financial, tax, or legal advice. While we
        strive to provide accurate and up-to-date information, the tax laws and
        regulations are subject to change, and individual circumstances can
        vary. Users should consult with qualified professionals, such as tax
        advisors or financial experts, to address specific financial situations
        or tax concerns. Tax Track does not guarantee the accuracy,
        completeness, or reliability of any information presented on the
        platform. Users are responsible for their financial decisions and should
        conduct their due diligence before making any financial or tax-related
        choices.
       </Typography>
      </Box>
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
        <Typography
         variant='body2'
         style={{ color: "light-grey", fontSize: 8 }}>
         Tax Track's platform and tools are intended for informational purposes
         only and do not constitute financial, tax, or legal advice. While we
         strive to provide accurate and up-to-date information, the tax laws and
         regulations are subject to change, and individual circumstances can
         vary. Users should consult with qualified professionals, such as tax
         advisors or financial experts, to address specific financial situations
         or tax concerns. Tax Track does not guarantee the accuracy,
         completeness, or reliability of any information presented on the
         platform. Users are responsible for their financial decisions and
         should conduct their due diligence before making any financial or
         tax-related choices.
        </Typography>
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
