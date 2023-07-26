import React from "react";
import {
 Typography,
 Container,
 Button,
 Box,
 useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import styled from "@emotion/styled";

const ClosingSignUp = () => {
 const theme = useTheme();
 const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

 return (
  <Container>
   <Wrapper isMobile={isMobile}>
    <Box
     sx={{
      zIndex: "999",
      textAlign: "center",
      p: isMobile ? "0px" : "40px",
     }}>
     <Typography variant='h4' color='var(--color-ivory)'>
      A Modern Solution For Tax Resolution
     </Typography>
     <Typography variant='h6' color='var(--color-ivory)'>
      Tax Track changing the way Americans communicate with the IRS
     </Typography>
     <Button
      href='#'
      sx={{
       backgroundColor: "var(--color-ivory)",
       borderRadius: "20px",
       display: "block",
       margin: "auto",
       width: "200px",
       height: "50px",
       mt: "20px",
       color: "var(--color-primary-green)",
      }}>
      Sign up today
     </Button>
    </Box>
    <TreeImage
     src={process.env.PUBLIC_URL + "/images/logo.png"}
     alt='Tree stump image'
    />

    <PhoneImage
     src={process.env.PUBLIC_URL + "/images/Chart1.png"}
     alt='Phone image'
    />
   </Wrapper>
  </Container>
 );
};

const Wrapper = styled(Box)`
 position: relative;
 margin: auto;
 background: #77d215;
 width: 100%;
 max-width: 1320px;
 height: ${(props) =>
  props.isMobile ? "500px" : "calc((100vw - 120px) * 0.7)"};
 max-height: ${(props) => (props.isMobile ? "500px" : "900px")};
 border-radius: 30px;
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
 overflow: hidden;
 padding-bottom: ${(props) => (props.isMobile ? "40px" : "0")};
`;

const TreeImage = styled.img`
 position: absolute;
 z-index: 2;
 bottom: 0;
 width: ${(props) => (props.isMobile ? "100%" : "66%")};
 max-width: ${(props) => (props.isMobile ? "none" : "860px")};
 opacity: 0.2;
`;

const PhoneImage = styled.img`
 position: absolute;
 z-index: 1;
 width: ${(props) => (props.isMobile ? "100%" : "700px")};
 opacity: 0.5;
 top: 0;
 bottom: 0;
 right: 0;
 left: 0;
 margin: auto;
`;

export default ClosingSignUp;
