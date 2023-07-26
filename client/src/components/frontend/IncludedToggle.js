import React, { useState } from "react";
import {
 Box,
 Container,
 Typography,
 Button,
 Grid,
 Paper,
 List,
 ListItem,
 ListItemText,
} from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
 faChartLine,
 faFileAlt,
 faChartBar,
 faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";

const IncludedToggle = () => {
 const [showHiddenInfo, setShowHiddenInfo] = useState(false);
 const features = [
  {
   title: "Balance and Transactions",
   icon: faChartLine,
   items: [
    "Real-time insights into your IRS debt.",
    "Track changes in your balance for confident planning.",
    "Visualize your path to zero IRS debt.",
    "Transform complex financial data into a user-friendly format.",
    "Take control with Tax Track's 'Balance and Transactions'.",
   ],
  },
  {
   title: "Simple Return Filing",
   icon: faFileAlt,
   items: [
    "Prepare tax returns hassle-free with comprehensive guides.",
    "Simplify tax documentation management with an upload process.",
    "Experience a stress-free filing with streamlined returns.",
    "Access a wealth of tax resources for smooth filing.",
    "Stay updated with the latest tax laws for accurate filing.",
   ],
  },
  {
   title: "Tax Track Pro",
   icon: faChartBar,
   items: [
    "Get pro-level analysis for identifying deductions.",
    "Manage professional entities and filings with support.",
    "Receive tailored deduction recommendations to optimize.",
    "Stay ahead with streamlined entity filings and eliminate stress.",
    "Empower your tax journey with Tax Track's 'Pro Dashboard'.",
   ],
  },
  {
   title: "Comprehensive Tax Code Resources",
   icon: faGraduationCap,
   items: [
    "Explore extensive articles and videos on tax aspects.",
    "Gain an in-depth understanding of tax laws and deductions.",
    "Stay informed about changing tax laws and regulations.",
    "Discover expert tax tips to maximize savings.",
    "Empower yourself with a vast tax knowledge base using Tax Track.",
   ],
  },
 ];
 return (
  <Container>
   <Grid container alignItems='center'>
    <Grid item xs={12} sm={6}>
     <Typography variant='h3'>
      Streamlines Your Taxes Saving You Thousands
     </Typography>
     <Typography variant='body1' sx={{ mt: 2 }}>
      Tax Track provides intuitive features like "Balance and Transactions" to
      visualize your path to financial freedom in real-time. The "Returns Made
      Easy" feature streamlines tax return preparation, while the "Pro
      Dashboard" offers pro-level deductions analysis for maximizing savings.
      Stay informed with the "Tax Education" feature, providing expert tips and
      resources on changing tax laws.
     </Typography>
     <Typography variant='body2' sx={{ color: "#767676", mt: 2 }}>
      Tax Track is an online financial platform offering general informational
      and educational content about taxes and IRS debt. While we strive for
      accuracy, the information provided should not be considered professional
      advice. Tax laws are subject to frequent changes, and individual
      circumstances vary, so it is essential to consult qualified tax
      professionals or financial advisors for personalized guidance.
     </Typography>
    </Grid>
    <Grid item xs={12} sm={6}>
     <Paper
      sx={{
       backgroundColor: "#6944ff",
       color: "white",
       p: 2,
       borderRadius: "10px",
      }}>
      <Typography variant='h6'>Three Months Free</Typography>
      <Typography variant='body1' sx={{ mt: 2 }}>
       Join over 10 million all-time customers who have signed up for TaxTrack.
      </Typography>
      <Button
       variant='contained'
       color='primary'
       href='https://app.adjust.com/2frog1d_tjj61hy?fallback=https%3A%2F%2Fwww.acorns.com%2Ftier-signup%3Fkey%3DGOLD'
       target='_blank'
       rel='noopener noreferrer'
       sx={{ mt: 2 }}>
       Sign up today
      </Button>{" "}
      <Button
       variant='contained'
       color='primary'
       onClick={() => setShowHiddenInfo((prevState) => !prevState)}
       sx={{ mt: 2 }}>
       {showHiddenInfo ? "Hide Details" : "What's Included?"}
      </Button>
      {showHiddenInfo && (
       <Box sx={{ mt: 2 }}>
        {features.map((feature, index) => (
         <Box>
          <Typography variant='h6'>
           <FontAwesomeIcon
            icon={feature.icon}
            style={{ color: "white", marginLeft: "5px" }}
           />{" "}
           {feature.title}
          </Typography>
          <List disablePadding={true}>
           {feature.items.map((i, ind) => (
            <ListItem disablePadding={true} key={ind}>
             <ListItemText primary={i} />
            </ListItem>
           ))}
          </List>
         </Box>
        ))}
       </Box>
      )}
     </Paper>
    </Grid>
   </Grid>
  </Container>
 );
};

export default IncludedToggle;
