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
import useMixins from "../../utils/useMixins";

// Define keyframes animations here

const scaleUpAnimation = keyframes`
  0% {
    transform: scale(1) 
    border-radius: 50%;
  }
  100% {
    transform: scaleY(1.5) scaleX(1)
    border-radius: 0;
  }
`;

const moveDownAnimation = keyframes`
  0% {
    transform: translateY(0) translateX(0);
  }
  15% {
    transform: translateY(150px) translateX(0);
  }
  100% {
    transform: translateY(100px) translateX(-1100px);
  }
`;

const moveUpAnimation = keyframes`
  0% {
    transform: translateY(0) translateX(0);
  }
  15% {
    transform: translateY(-150px) translateX(0);
  }
  100% {
    transform: translateY(-100px) translateX(-1100px);
  }
`;

const moveLeftAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-730px);
  }
`;

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
 const CircleWrapper = styled(Box)`

  position: relative;
  height: 600px;
  width: 600px;
  ${({ animate }) => css`
   animation: ${animate
    ? css`
       ${fadeOutAnimation} 1.5s linear 1s
      `
    : ""};
   animation-play-state: ${animate ? "running" : "paused"};
  `}
* Adjust the number of columns as needed */
  }
 `;
 const LearnMoreButton = styled(Box)`
  width: 104px;
  height: 104px;
  border-radius: 50%;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 10px;
  position: absolute;
  top: 56%;
  left: 57%;
  transform: translate(-50%, -50%);
  ${({ animate }) => css`
   animation: ${animate
    ? css`
       ${scaleUpAnimation} 1.5s linear 1s
      `
    : ""};
   animation-play-state: ${animate ? "running" : "paused"};
  `}
 `;

 const getCircleButtonProperties = (angle) => {
  switch (angle) {
   case 225:
    return {
     backgroundColor: "blue",
     width: "100px",
     height: "110px",
     borderRadius: "10px",
     "@media (max-width: 768px)": {
      width: "85px",
      height: "55px",
     },
    };
   case 315:
    return {
     backgroundColor: "green",
     width: "130px",
     height: "120px",
     borderRadius: "10px",
     "@media (max-width: 768px)": {
      width: "100px",
      height: "65px",
     },
    };
   case 45:
    return {
     backgroundColor: "orange",
     width: "125px",
     height: "115px",
     borderRadius: "10px",
     "@media (max-width: 768px)": {
      width: "85px",
      height: "60px",
     },
    };
   case 135:
    return {
     backgroundColor: "purple",
     width: "125px",
     height: "90px",
     borderRadius: "10px",
     "@media (max-width: 768px)": {
      width: "85px",
      height: "40px",
     },
    };
   default:
    return {};
  }
 };

 const CircleButton = styled(Box)`
  width: 104px;
  height: 104px;
  border-radius: 50%;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 10px;
  position: absolute;

  ${({ angle }) => css`
   top: ${50 - 50 * Math.sin((angle * Math.PI) / 180)}%;
   left: ${50 + 50 * Math.cos((angle * Math.PI) / 180)}%;
   @media (max-width: 768px) {
    left: ${40 + 50 * Math.cos((angle * Math.PI) / 180)}%;
   }
   animation: ${angle === 315
    ? css`
       ${moveUpAnimation} 4s linear
      `
    : angle === 45
    ? css`
       ${moveDownAnimation} 4s linear
      `
    : css`
       ${moveLeftAnimation} 2.5s linear 1.5s
      `};
   animation-play-state: ${({ animate }) => (animate ? "running" : "paused")};
   ${getCircleButtonProperties(angle)}
  `}
 `;
 const fadeInAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

 const OuterWrapper = styled(Box)`
  animation: ${fadeInAnimation} 2s ease-in;
 `;

 const ButtonWrapper = styled.div`
  --sa-uid: "0-4c9de005-8753-5a91-4dd0-a68a2e0e3d93";
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  -webkit-text-size-adjust: none;
  font: inherit;
  vertical-align: baseline;
  margin: 0;
  padding: 0;
  border: 0;
  width: 120px;
  margin-right: 40px;
  display: flex;
  align-items: center;
 `;

 const ButtonContainer = styled.div`
  --sa-uid: "0-4c9de005-8753-5a91-4dd0-a68a2e0e3d93";
  -webkit-font-smoothing: antialiased;
  -webkit-text-size-adjust: none;
  font: inherit;
  vertical-align: baseline;
  margin: 0;
  padding: 0;
  border: 0;
  position: relative;
  display: block;
  box-sizing: border-box;
  user-select: none;
  touch-action: pan-y;
  -webkit-tap-highlight-color: transparent;
 `;

 const CarouselButton = styled.div`
  --sa-uid: "0-4c9de005-8753-5a91-4dd0-a68a2e0e3d93";
  -webkit-font-smoothing: antialiased;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  box-sizing: border-box;
  -webkit-text-size-adjust: none;
  font: inherit;
  vertical-align: baseline;
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  float: left;
  min-height: 1px;
  background: rgba(25, 25, 25, 0.15);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 112px;
  height: 112px;
  transition: transform 150ms cubic-bezier(0.32, 0, 0.67, 0),
   background 300ms ease-in-out;
  &:hover {
   background: rgba(25, 25, 25, 0.25);
  }
  transform: ${({ active }) =>
   active ? "translateX(0)" : "translateX(-100%)"};

  margin-bottom: 36px;
 `;

 const InfoContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
  transition: opacity 300ms ease-in-out; /* Opacity transition */
 `;

 const fadeOutAnimation = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

 const Subtitle = styled.h5`
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
 `;

 const ContentTitle = styled.h1`
  font-size: 36px;
  margin-bottom: 20px;
 `;

 const TextWrapper = styled.div`
  width: 50%;
  padding-left: 40px;
  padding-right: 40px;
 `;
 const SectionTitle = styled.h2`
  font-size: 28px;
  font-weight: 500;
  margin-bottom: 16px;
 `;

 const SectionDescription = styled.p`
  font-size: 18px;
  line-height: 1.6;
  color: #666;
  margin-bottom: 24px;
 `;

 const SectionButton = styled.button`
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
   background-color: #0056b3;
  }
 `;

 const Image = styled.img`
  max-width: 300px;
  height: 400px;
  border-radius: 10px;

  @media (max-width: 768px) {
   max-width: 100px;
   height: 200px;
  }
 `;
 const sections = [
  {
   title: "Balance And Transactions",
   description:
    "Get real-time insights into your IRS debt with a clear and organized line chart. Easily track changes in your balance directly from the IRS, providing a clear roadmap to financial freedom.",
   buttonText: "Learn More",
   imageSrc: process.env.PUBLIC_URL + "/images/Chart1.png",
  },
  {
   title: "Growth and Milestones",
   description:
    "Navigate the twists and turns of your tax situation effortlessly. Our comprehensive tools and expert guidance help you achieve your financial milestones with ease and confidence.",
   buttonText: "Learn More",
   imageSrc: process.env.PUBLIC_URL + "/images/Chart1.png",
  },
  {
   title: "Returns Made Easy",
   description:
    "Prepare tax returns hassle-free with our user-friendly tax forms and comprehensive guides. Streamline tax documentation management and experience a stress-free filing experience.",
   buttonText: "Learn More",
   imageSrc: process.env.PUBLIC_URL + "/images/Chart1.png",
  },
  {
   title: "Plan For The Future",
   description:
    "Access an extensive library of articles and videos outlining an ever-growing and changing tax code. Stay informed about changing tax laws and regulations to plan and optimize your financial future.",
   buttonText: "Learn More",
   imageSrc: process.env.PUBLIC_URL + "/images/Chart1.png",
  },
 ];
 const filteredSections = sections.filter(
  (section, index) => index === activeSlide
 );

 return (
  <Container
   sx={{
    "@media (max-width: 768px)": {
     display: "flex",
     flexDirection: "column",
     alignItems: "center",
     gap: "20px",
    },
   }}>
   <Subtitle>How Does Tax Track Work?</Subtitle>
   <ContentTitle>
    Everything You Need For Your Tax Settlement In One Place
   </ContentTitle>

   {activeSlide === null ? (
    <CircleWrapper
     sx={{
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
      animate={animateButtons}
      style={{
       backgroundColor: "blue",
       zIndex: "1",
      }}>
      <FontAwesomeIcon icon={faCog} />
      Balance
     </CircleButton>
     <CircleButton
      onClick={() => handleButtonClick(1)}
      angle={315}
      animate={animateButtons}
      style={{
       backgroundColor: "green",
       zIndex: "1",
      }}>
      <FontAwesomeIcon icon={faGlobe} />
      Milestones
     </CircleButton>
     <CircleButton
      onClick={() => handleButtonClick(2)}
      angle={45}
      animate={animateButtons}
      style={{
       backgroundColor: "orange",
       zIndex: "1",
      }}>
      <FontAwesomeIcon icon={faUser} />
      Returns
     </CircleButton>
     <CircleButton
      onClick={() => handleButtonClick(3)}
      angle={135}
      animate={animateButtons}
      style={{
       backgroundColor: "purple",
       zIndex: "1",
      }}>
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
      <Image src={process.env.PUBLIC_URL + "/images/logo.png"} alt='Image 2' />
     </LearnMoreButton>
    </CircleWrapper>
   ) : (
    <OuterWrapper>
     <Grid container>
      <Grid item md={3}>
       <ButtonWrapper>
        <ButtonContainer>
         <CarouselButton
          active={activeSlide === 0}
          onClick={() => handleButtonClick(0)}
          style={{
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
          style={{
           backgroundColor: "green",
           zIndex: "1",
          }}>
          {" "}
          <FontAwesomeIcon icon={faCog} />
          Milestones
         </CarouselButton>
         <CarouselButton
          active={activeSlide === 2}
          onClick={() => handleButtonClick(2)}
          style={{
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
          style={{
           backgroundColor: "purple",

           zIndex: "1",
          }}>
          {" "}
          <FontAwesomeIcon icon={faCog} />
          Planning
         </CarouselButton>
        </ButtonContainer>
       </ButtonWrapper>
      </Grid>
      <Grid item md={9} paddingTop={15}>
       <Box activeSlide={activeSlide}>
        {filteredSections.map((section, index) => (
         <InfoContent>
          <div>
           <Image src={section.imageSrc} alt='Info Image' />
          </div>
          <TextWrapper>
           <SectionTitle>{section.title}</SectionTitle>
           <SectionDescription>{section.description}</SectionDescription>
           <SectionButton>{section.buttonText}</SectionButton>
          </TextWrapper>
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
