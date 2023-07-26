import React from "react";
import { useTheme } from "@mui/material/styles";
import {
 Typography,
 Button,
 Grid,
 Paper,
 Box,
 useMediaQuery,
} from "@mui/material";
import styled from "styled-components";
import useMixins from "../../utils/useMixins";

export default function Hero() {
 const mixins = useMixins();

 const HeroContainer = styled(Box)`
  ${mixins.heroMixin}
 `;

 const HeroImageBox = styled(Paper)`
  ${mixins.heroImageMixin}
 `;

 const HeroContentBox = styled(Box)`
  ${mixins.heroContentMixin}
 `;

 const HeroTitle = styled(Typography)`
  ${mixins.heroTitleMixin}
 `;

 const HeroSubtitle = styled(Typography)`
  ${mixins.heroSubtitleMixin}
 `;

 const HeroButton = styled(Button)`
  ${mixins.heroButtonMixin}
 `;
 const theme = useTheme();
 const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

 return (
  <Grid
   container
   sx={isMobile ? { height: "60vh" } : {}}
   component={HeroContainer}>
   <HeroImageBox elevation={0}>
    {/* HeroImage will go here */}
    <img
     src={process.env.PUBLIC_URL + "/images/Hero.jpg"}
     alt='Hero'
     style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
      opacity: 0.5,
      zIndex: -1,
     }}
    />
   </HeroImageBox>

   <Grid item xs={12}>
    <HeroContentBox>
     <HeroTitle variant={isMobile ? "h5" : "h3"}>
      Tax Track Makes IRS Interactions Easy
     </HeroTitle>
     <HeroSubtitle variant={isMobile ? "body2" : "body1"}>
      Keep up with the latest on your tax account at the click of a button
     </HeroSubtitle>
     <HeroButton
      variant='contained'
      color='primary'
      sx={{
       backgroundColor: "var(--color-primary-green)",
       borderRadius: "20px",
       color: "white",
      }}>
      Get Started
     </HeroButton>
    </HeroContentBox>
   </Grid>
  </Grid>
 );
}
