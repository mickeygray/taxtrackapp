import React, { useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
 faBook,
 faUser,
 faGlobe,
 faCog,
} from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "@mui/material/styles";
import {
 Typography,
 Button,
 Container,
 Grid,
 Paper,
 Box,
 useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";

import {
 AnimatedImage,
 CarouselImage,
 SectionButton,
 InfoContent,
 CarouselButton,
 OuterWrapper,
 TextWrapper,
 CircleButton,
 LearnMoreButton,
 CircleWrapper,
} from "../../utils/useMixins";

// Define keyframes animations here

// Styled components and animations go here

const AnimatedCarousel = () => {
 const [activeSlide, setActiveSlide] = useState(null);
 const [animateButtons, setAnimateButtons] = useState(false);

 const handleButtonClick = (index) => {
  setAnimateButtons(true);
  if (activeSlide === null) {
   setTimeout(() => setActiveSlide(index), 2500);
  } else {
   setActiveSlide(index);
  }
 };

 const sections = [
  {
   title: "Balance And Transactions",
   description:
    "Get insights into your IRS debt with a clear and organized line chart. Easily track changes in your balance directly from the IRS, providing a clear roadmap to financial freedom.",
   buttonText: "Learn More",
   imageSrc: process.env.PUBLIC_URL + "/images/Chart1.png",
  },
  {
   title: "Wholistic Status Reports",
   description:
    "Navigate the twists and turns of your tax situation effortlessly. Our comprehensive tools and expert guidance help you achieve your financial milestones with ease and confidence.",
   buttonText: "Learn More",
   imageSrc: process.env.PUBLIC_URL + "/images/statusimage.png",
  },
  {
   title: "Returns Made Easy",
   description:
    "Prepare tax returns hassle-free with our user-friendly tax forms and comprehensive guides. Streamline tax documentation management and experience a stress-free filing experience.",
   buttonText: "Learn More",
   imageSrc: process.env.PUBLIC_URL + "/images/returnsimage.png",
  },
  {
   title: "Plan For The Future",
   description:
    "Access an extensive library of articles and videos outlining an ever-growing and changing tax code. Stay informed about changing tax laws and regulations to plan and optimize your financial future.",
   buttonText: "Learn More",
   imageSrc: process.env.PUBLIC_URL + "/images/planning.png",
  },
 ];
 const filteredSections = sections.filter(
  (section, index) => index === activeSlide
 );
 const theme = useTheme();
 const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

 return (
  <Container
   sx={{
    "@media (max-width: 768px)": {
     marginLeft: "0",
     marginBottom: "200px",
    },
   }}>
   <Typography textAlign={"center"} variant={isMobile ? "h7" : "h5"}>
    How Does Tax Track Work?
   </Typography>
   <Typography textAlign={"center"} variant={isMobile ? "h6" : "h4"}>
    Everything You Need For Your Tax Settlement In One Place
   </Typography>

   {activeSlide === null ? (
    <CircleWrapper
     sx={{
      marginLeft: "200px",
      "@media (max-width: 768px)": {
       height: "300px",
       width: "300px",
       marginLeft: "0",
      },
     }}
     animate={animateButtons}>
     <CircleButton
      onClick={() => handleButtonClick(0)}
      angle={225}
      animate={animateButtons}>
      <FontAwesomeIcon icon={faCog} />
      Balance
     </CircleButton>
     <CircleButton
      onClick={() => handleButtonClick(1)}
      angle={315}
      animate={animateButtons}>
      <FontAwesomeIcon icon={faGlobe} />
      Status
     </CircleButton>
     <CircleButton
      onClick={() => handleButtonClick(2)}
      angle={45}
      animate={animateButtons}>
      <FontAwesomeIcon icon={faUser} />
      Returns
     </CircleButton>
     <CircleButton
      onClick={() => handleButtonClick(3)}
      angle={135}
      animate={animateButtons}>
      <FontAwesomeIcon icon={faBook} />
      Planning
     </CircleButton>
     <LearnMoreButton
      animate={animateButtons}
      onClick={() => handleButtonClick(0)}
      sx={{
       width: "500px",
       height: "500px",
       zIndex: "0",
       backgroundColor: "tan",
       "@media (max-width: 768px)": {
        width: "300px",
        height: "300px",
        marginLeft: "0",
       },
      }}>
      <AnimatedImage
       src={process.env.PUBLIC_URL + "/images/logo.png"}
       alt='Image 2'
      />
     </LearnMoreButton>
    </CircleWrapper>
   ) : (
    <OuterWrapper>
     <Grid container>
      <Grid item md={3} sm={1} marginLeft={isMobile ? 5 : 0}>
       <Box sx={{ width: isMobile ? "80px" : "120px" }}>
        <CarouselButton
         active={activeSlide === 0}
         onClick={() => handleButtonClick(0)}
         sx={{
          backgroundColor: "blue",
          zIndex: "1",
         }}>
         {" "}
         <FontAwesomeIcon icon={faCog} />
         Balance
        </CarouselButton>
        <CarouselButton
         active={activeSlide === 1}
         onClick={() => handleButtonClick(1)}
         sx={{
          backgroundColor: "green",
          zIndex: "1",
         }}>
         {" "}
         <FontAwesomeIcon icon={faCog} />
         Status
        </CarouselButton>
        <CarouselButton
         active={activeSlide === 2}
         onClick={() => handleButtonClick(2)}
         sx={{
          backgroundColor: "orange",
          zIndex: "1",
         }}>
         {" "}
         <FontAwesomeIcon icon={faCog} />
         Returns
        </CarouselButton>
        <CarouselButton
         active={activeSlide === 3}
         onClick={() => handleButtonClick(3)}
         sx={{
          backgroundColor: "purple",
          zIndex: "1",
         }}>
         {" "}
         <FontAwesomeIcon icon={faCog} />
         Planning
        </CarouselButton>
       </Box>
      </Grid>
      <Grid
       item
       md={9}
       sm={9}
       paddingTop={15}
       marginTop={isMobile ? -42 : 0}
       marginLeft={isMobile ? 10 : 0}>
       <Box activeSlide={activeSlide}>
        {filteredSections.map((section, index) => (
         <InfoContent marginTop={isMobile ? -14 : 0}>
          <Grid container>
           <Grid item md={4} sm={12}>
            <CarouselImage
             style={{ marginLeft: isMobile ? "60px" : "0" }}
             src={section.imageSrc}
             alt='Info Image'
            />
           </Grid>
           <Grid item md={8} sm={12} marginTop={isMobile ? 4 : 0}>
            <TextWrapper
             marginLeft={isMobile ? -13.5 : 0}
             marginTop={isMobile ? 0 : 15}
             sx={{
              width: isMobile ? "100vw" : "auto",
              textAlign: isMobile ? "center" : "left", // Set width to 100vw on mobile
             }}>
             <Typography variant='h5'>{section.title}</Typography>
             <Typography>{section.description}</Typography>
             <Link to='/login'>
              {" "}
              <SectionButton
               sx={{
                backgroundColor: "var(--color-primary-green)",
                borderRadius: "20px",
               }}>
               {section.buttonText}
              </SectionButton>
             </Link>
            </TextWrapper>
           </Grid>
          </Grid>
         </InfoContent>
        ))}
       </Box>
      </Grid>
     </Grid>
    </OuterWrapper>
   )}
  </Container>
 );
};

export default AnimatedCarousel;
