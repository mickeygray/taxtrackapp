import React from "react";
import { useTheme } from "@mui/material/styles";
import { Typography, Container, Grid, Box, useMediaQuery } from "@mui/material";

const ComponentGrid = () => {
 const theme = useTheme();
 const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
 const sections = [
  {
   imageSrc: process.env.PUBLIC_URL + "/images/pathto0.png",
   headline: "Unlock the Path to Zero with Balance and Transactions",
   paragraphs: [
    "Discover the power of understanding your IRS account transcripts like never before. Tax Track's 'Balance and Transactions' feature transforms your complex financial data into a clear and organized line chart, providing you with real-time insights into your IRS debt. Easily track every change in your balance directly from the IRS, allowing you to plan your financial journey with confidence.",
    "Navigate the twists and turns of your tax situation effortlessly. With Balance and Transactions you gain control over your financial future, visualizing your path to zero IRS debt. Tax Track ensures you stay informed about your progress, empowering you to make informed decisions and create a solid financial foundation.",
   ],
  },
  {
   imageSrc: process.env.PUBLIC_URL + "/images/tax-deduction-machine.jpg",
   headline: "Simplify Tax Return Preparation with Expert Guides",
   paragraphs: [
    "Tax Track offers an unparalleled advantage with its Tax Return Preparation and Guides. Our platform provides you with forms, uploads, and step-by-step guides that streamline the process of preparing tax returns. As a Tax Track subscriber, you enjoy the added benefit of preparing your yearly returns for free while your subscription is active.",
    "No more tedious guesswork or stress during tax season. Access comprehensive resources and stay up-to-date with the ever-changing tax code. Our user-friendly interface ensures that you accurately file your returns and maximize deductions. Feel confident that your taxes are prepared efficiently, leaving you with peace of mind.",
   ],
  },
  {
   imageSrc: process.env.PUBLIC_URL + "/images/prodash.jpg",
   headline: "Optimize Your Finances with Pro Dashboard and Deduction Analysis",
   paragraphs: [
    "Tax Track's Pro Dashboard is your financial partner, offering expert analysis and insights into your books. Our advanced algorithms scrutinize your financial data, searching for potential deductions and opportunities to optimize your tax liabilities. Keep your professional filings and entities organized effortlessly.",
    "With Pro Dashboard, managing your financials becomes seamless. Stay ahead of the game with real-time data, ensuring you never miss crucial deductions or compliance deadlines. Empower yourself with a high-tech solution tailored to your financial success.",
   ],
  },
  {
   imageSrc: process.env.PUBLIC_URL + "/images/blog.jpg",
   headline: "Navigate the Tax Code Confidently with Comprehensive Resources",
   paragraphs: [
    "Tax Track boasts an extensive collection of articles and videos, meticulously outlining the ever-growing and changing tax code. Our platform ensures you stay informed on the latest tax regulations, credits, and deductions. Empower yourself with the knowledge to make informed financial decisions.",
    "By providing comprehensive and up-to-date resources, Tax Track serves as your reliable tax guide. Our content covers a wide range of topics, simplifying complex tax concepts and shedding light on frequently asked questions. Prepare for the future and unlock the potential for financial growth with our extensive tax code library.",
   ],
  },
 ];

 return (
  <Container>
   {sections.map((section, index) => (
    <Grid
     container
     spacing={2}
     key={index}
     direction={index % 2 === 0 ? "row" : "row-reverse"}>
     <Grid item xs={12} md={6}>
      <Typography
       variant={isMobile ? "h6" : "h4"}
       color='textPrimary'
       gutterBottom>
       {section.headline}
      </Typography>
      <Typography variant={isMobile ? "body2" : "body1"} color='textPrimary'>
       {section.paragraphs.map((paragraph, pIndex) => (
        <Typography
         key={pIndex}
         variant={isMobile ? "body2" : "body1"}
         color='textPrimary'
         gutterBottom>
         {paragraph}
        </Typography>
       ))}
      </Typography>
     </Grid>
     <Grid item xs={12} md={6}>
      <Box
       style={{
        maxWidth: index === 3 ? "100%" : "75%",
        maxHeight: index === 3 ? "100%" : "75%",
        borderRadius: "10px",
        margin: "auto",
       }}>
       <img
        src={section.imageSrc}
        alt={`Image ${index + 1}`}
        style={{
         objectFit: "cover",

         objectPosition: "center",
        }}
       />
      </Box>
     </Grid>
    </Grid>
   ))}
  </Container>
 );
};

export default ComponentGrid;
