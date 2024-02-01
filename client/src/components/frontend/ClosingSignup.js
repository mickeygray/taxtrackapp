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
import { Link } from "react-router-dom";
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
     <Link to='/login'>
      <StyledButton>Sign up today</StyledButton>
     </Link>
    </Box>
   </Wrapper>
  </Container>
 );
};

const Wrapper = styled(Box)`
 position: relative;
 margin: auto;
 background: #f4f4f4;
 width: 100%;
 max-width: 1320px;
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

const StyledButton = styled(Button)`
 color: var(--color-ivory);
 border-radius: 20px;
 display: block;
 margin: auto;
 padding-top: 10px;
 width: 200px;
 height: 50px;
 background-color: var(--color-primary-green);

 &:hover {
  transform: scale(1.5); // Slightly enlarges the button on hover
  background-color: var(
   --success-color
  ); // Optional: change the background color on hover
 }
`;
export default ClosingSignUp;
