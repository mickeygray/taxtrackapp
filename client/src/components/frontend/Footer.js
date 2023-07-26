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
   <FooterLinks>
    <Link href='#' color='inherit' underline='none'>
     Home
    </Link>
    <Link href='#' color='inherit' underline='none'>
     About
    </Link>
    <Link href='#' color='inherit' underline='none'>
     Services
    </Link>
    <Link href='#' color='inherit' underline='none'>
     Contact
    </Link>
   </FooterLinks>
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
    © 2023 Tax Track. All rights reserved. For Informational Purposes Only.
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
 text-align: center;
`;

const FooterLogo = styled("img")`
 width: 50px;
 height: 50px;
 border-radius: 10px;
`;

export default Footer;
