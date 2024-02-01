import React from "react";
import { Box, Typography, Link } from "@mui/material";
import styled from "@emotion/styled";

const Footer = () => {
 return (
  <FooterWrapper>
   <FooterLogo
    src={process.env.PUBLIC_URL + "/images/logo.png"}
    alt='Tax Track Logo'
   />

   <FooterSocialIcons>
    <a href='#'>
     <img
      src='https://sqy7rm.media.zestyio.com/Instagram.png'
      alt='Instagram'
     />
    </a>
    <a href='#'>
     <img src='https://sqy7rm.media.zestyio.com/Twitter.png' alt='Twitter' />
    </a>
    <a href='#'>
     <img src='https://sqy7rm.media.zestyio.com/Facebook.png' alt='Facebook' />
    </a>
   </FooterSocialIcons>
   <FooterDisclaimer>
    <Typography variant='body2' style={{ color: "light-grey", fontSize: 12 }}>
     Tax Track's platform and tools are intended for informational purposes only
     and do not constitute financial, tax, or legal advice. While we strive to
     provide accurate and up-to-date information, the tax laws and regulations
     are subject to change, and individual circumstances can vary. Users should
     consult with qualified professionals, such as tax advisors or financial
     experts, to address specific financial situations or tax concerns. Tax
     Track does not guarantee the accuracy, completeness, or reliability of any
     information presented on the platform. Users are responsible for their
     financial decisions and should conduct their due diligence before making
     any financial or tax-related choices.Tax Track is an online financial
     platform offering general informational and educational content about taxes
     and IRS debt. While we strive for accuracy, the information provided should
     not be considered professional advice. Tax laws are subject to frequent
     changes, and individual circumstances vary, so it is essential to consult
     qualified tax professionals or financial advisors for personalized
     guidance.
    </Typography>
   </FooterDisclaimer>
  </FooterWrapper>
 );
};

const FooterWrapper = styled(Box)`
 padding: 40px;
 background-color: #f5f5f5;
 display: flex;
 flex-direction: column;
 align-items: center;
`;

const FooterLinks = styled(Box)`
 display: flex;
 justify-content: center;
 gap: 20px;
 margin-top: 20px;
`;

const FooterSocialIcons = styled(Box)`
 display: flex;
 gap: 10px;
 margin-top: 20px;
`;

const FooterDisclaimer = styled(Typography)`
 font-size: 12px;
 color: #888;
 margin-top: 20px;
 margin-bottom: 20px; // Add bottom margin
 text-align: justify; // Justify the text, or keep 'center' if you want it centered
 margin-left: 600px; // Add left padding if you want
 margin-right: 600px; // Add right padding if you want
`;

const FooterLogo = styled("img")`
 width: 50px;
 height: 50px;
 border-radius: 10px;
`;

export default Footer;
