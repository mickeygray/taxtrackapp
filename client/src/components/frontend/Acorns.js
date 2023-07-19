import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import logo from "../../images/logo.png";
import SettlementForm from "./SettlementForm";
const Container = styled.div`
 max-width: 1200px;
 margin: 0 auto;
 padding: 20px;
`;

const Header = styled.header`
 position: sticky;
 top: 0;
 left: 0;
 width: 100%;
 height: 64px;
 background-color: #333;
 color: #fff;
 display: flex;
 justify-content: space-between;
 align-items: center;
 padding: 0 20px;
 z-index: 1000;
`;

const Logo = styled.img`
 height: 64px;
 width: 64px;
`;

const Nav = styled.nav`
 ul {
  display: flex;
  list-style: none;
  gap: 20px;
  margin: 0;
  padding: 0;
 }

 li {
  height: 100%;
  display: flex;
  align-items: center;
 }

 a {
  text-decoration: none;
  color: #fff;
  font-weight: bold;
  padding: 10px;
 }
`;

const Hero = styled.div`
 position: relative;
 height: calc(100vh - 100px); /* Subtracting the navbar height */
 overflow: hidden;
`;

const HeroImage = styled.img`
 position: absolute;
 top: 0;
 left: 0;
 width: 100%;
 height: 100%;
 object-fit: cover;
 z-index: -1;
`;

const HeroContent = styled.div`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translate(-50%, -50%);
 text-align: center;
`;

const HeroTitle = styled.h1`
 font-size: 36px;
 margin-bottom: 20px;
`;

const HeroSubtitle = styled.p`
 font-size: 18px;
 margin-bottom: 30px;
`;

const HeroButton = styled.button`
 padding: 10px 20px;
 background-color: #333;
 color: #fff;
 border: none;
 border-radius: 4px;
 font-size: 16px;
 cursor: pointer;
`;

const Features = styled.section`
 display: flex;
 gap: 20px;
 margin-bottom: 40px;

 @media (max-width: 768px) {
  flex-direction: column;
 }
`;

const FeatureCard = styled.div`
 flex: 1;
 background-color: #f5f5f5;
 padding: 20px;
 border-radius: 4px;
`;

const FeatureTitle = styled.h2`
 font-size: 24px;
 margin-bottom: 10px;
`;

const FeatureText = styled.p`
 font-size: 16px;
 color: #555;
 margin-bottom: 20px;
`;

const Testimonials = styled.section`
 margin-bottom: 40px;
`;

const TestimonialCard = styled.div`
 background-color: #f5f5f5;
 padding: 20px;
 border-radius: 4px;
 margin-bottom: 20px;
`;

const TestimonialText = styled.p`
 font-size: 16px;
 color: #555;
`;

const Footer = styled.footer`
 padding: 20px 0;
 background-color: #333;
 color: #fff;
 text-align: center;
`;

const StackedGridContainer = styled.div`
 display: grid;
 grid-template-columns: repeat(4, 1fr);
 gap: 20px;

 @media (max-width: 768px) {
  grid-template-columns: repeat(2, 1fr);
 }
`;

const GridItem = styled.div`
 display: flex;
 align-items: center;
 gap: 20px;
 background-color: #f5f5f5;
 padding: 20px;
 border-radius: 4px;

 img {
  max-width: 100%;
  height: auto;
 }
`;

const TextContainer = styled.div`
 flex: 1;
`;

const Title = styled.h3`
 font-size: 20px;
 margin-bottom: 10px;
`;

const Description = styled.p`
 font-size: 16px;
 color: #555;
`;

const SectionContainer = styled.div`
 display: flex;
 flex-wrap: wrap;
 gap: 20px;
`;

const LeftDiv = styled.div`
 flex: 1;
 background-color: #f5f5f5;
 padding: 20px;
 border-radius: 4px;
`;

const RightDiv = styled.div`
 flex: 1;
 background-color: #f5f5f5;
 padding: 20px;
 border-radius: 4px;
`;

const Text = styled.p`
 font-size: 16px;
 color: #555;
`;

const Image = styled.img`
 max-width: 100%;
 height: auto;
`;
const MainContainer = styled.div`
 display: flex;
 height: 100vh;
`;

const FormContainer = styled.div`
 flex: 1;
 background-color: #f5f5f5;
 padding: 20px;
`;

const Form = styled.form`
 display: flex;
 flex-direction: column;
`;

const FormInput = styled.input`
 padding: 10px;
 margin-bottom: 10px;
`;

const ChartContainer = styled.div`
 flex: 4;
 display: flex;
`;

const ImageContainer = styled.div`
 flex: 1;
 position: relative;
 overflow: hidden;
`;

const StillImage = styled.img`
 width: 100%;
 height: 100%;
 object-fit: cover;
`;

const ContentContainer = styled.div`
 text-align: center;
 padding: 20px;
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

const CenteredParagraph = styled.p`
 font-size: 16px;
 color: #555;
`;
const rotatingAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-100% + 100vw));
  }
`;

const movingUpAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const movingDownAnimation = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
`;
const RotatingHeadline = styled.h2`
 /* Add the rotating headline styles here */
 --sa-uid: "0-4c9de005-8753-5a91-4dd0-a68a2e0e3d93";
 -webkit-font-smoothing: antialiased;
 box-sizing: border-box;
 -webkit-text-size-adjust: none;
 font: inherit;
 vertical-align: baseline;
 margin: 0;
 padding: 0;
 border: 0;
 font-family: "Avenir Next", Helvetica, Arial, sans-serif;
 font-size: 140px;
 line-height: 191px;
 letter-spacing: 0;
 font-weight: 400;
 color: #dadada;
 white-space: nowrap;
`;

const ScrollingDiv = styled.div`
 overflow: hidden;
 white-space: nowrap;
 animation: ${rotatingAnimation} 40s linear infinite;
`;

const ScrollingText = styled.span`
 display: inline-block;
 padding-left: 20px;
 padding-right: 20px;
 animation: ${({ scrollingUp }) =>
   scrollingUp ? movingUpAnimation : movingDownAnimation}
  40s linear infinite;
`;

const OuterWrapper = styled.div`
 --sa-uid: "0-4c9de005-8753-5a91-4dd0-a68a2e0e3d93";
 -webkit-font-smoothing: antialiased;
 box-sizing: border-box;
 -webkit-text-size-adjust: none;
 font: inherit;
 vertical-align: baseline;
 border: 0;
 height: 100%;
 max-width: 1440px;
 padding: 0 60px;
 margin: 0 auto;
 display: flex;
 align-items: center;
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

const Button = styled.div`
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
 transform: ${({ active }) => (active ? "translateX(0)" : "translateX(-100%)")};

 margin-bottom: 36px;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const InfoContainer = styled.div`
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
 width: 50%;
 flex-grow: 1;
`;

const InfoContent = styled.div`
 display: flex;
 align-items: center;
 justify-content: center;
 height: 300px;
 transition: opacity 300ms ease-in-out; /* Opacity transition */
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

const InfoContentSection = ({ imageSrc, title, description, buttonText }) => {
 return (
  <InfoContent>
   <div>
    <Image src={imageSrc} alt='Info Image' />
   </div>
   <TextWrapper>
    <SectionTitle>{title}</SectionTitle>
    <SectionDescription>{description}</SectionDescription>
    <SectionButton>{buttonText}</SectionButton>
   </TextWrapper>
  </InfoContent>
 );
};
const Acorns = () => {
 const [scrollingUp, setScrollingUp] = useState(false);

 const handleScroll = () => {
  let prevScrollY = window.scrollY;
  setScrollingUp(window.scrollY < prevScrollY);
  prevScrollY = window.scrollY;
 };

 useEffect(() => {
  window.addEventListener("scroll", handleScroll);

  return () => {
   window.removeEventListener("scroll", handleScroll);
  };
 }, []);
 const [activeSlide, setActiveSlide] = useState(0);

 const handleButtonClick = (index) => {
  setActiveSlide(index);
 };

 const sections = [
  {
   title: "Section 1 Title",
   description: "Section 1 Description",
   buttonText: "Button 1",
   imageSrc: logo,
  },
  {
   title: "Section 2 Title",
   description: "Section 2 Description",
   buttonText: "Button 2",
   imageSrc: logo,
  },
  {
   title: "Section 3 Title",
   description: "Section 3 Description",
   buttonText: "Button 3",
   imageSrc: logo,
  },
  {
   title: "Section 4 Title",
   description: "Section 4 Description",
   buttonText: "Button 4",
   imageSrc: logo,
  },
 ];
 const filteredSections = sections.filter(
  (section, index) => index === activeSlide
 );
 return (
  <>
   <Header>
    <Logo src={logo} alt='Acorns' />
    <Nav>
     <ul>
      <li>
       <a href='/'>Home</a>
      </li>
      <li>
       <a href='/about'>About</a>
      </li>
      <li>
       <a href='/services'>Services</a>
      </li>
      <li>
       <a href='/contact'>Contact</a>
      </li>
     </ul>
    </Nav>
   </Header>

   <Hero>
    <HeroImage src={logo} alt='Hero' />
    <HeroContent>
     <HeroTitle>Investing made easy</HeroTitle>
     <HeroSubtitle>Start growing your wealth with Acorns today.</HeroSubtitle>
     <HeroButton>Get Started</HeroButton>
    </HeroContent>
   </Hero>
   <ContentContainer>
    <Subtitle>Calculate Your Settlement</Subtitle>
    <ContentTitle>See Your Potential</ContentTitle>
    <CenteredParagraph>
     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et nisl sit
     amet ex rutrum tincidunt.
    </CenteredParagraph>
   </ContentContainer>
   <MainContainer>
    <FormContainer>
     <SettlementForm />
    </FormContainer>

    <ChartContainer>
     <ImageContainer>
      <StillImage src={logo} alt='Still Image' />
     </ImageContainer>
    </ChartContainer>
   </MainContainer>

   <Features>
    <FeatureCard>
     <img src={logo} alt='Feature 1' />
     <FeatureTitle>Automated Investing</FeatureTitle>
     <FeatureText>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
     </FeatureText>
    </FeatureCard>
    <FeatureCard>
     <img src={logo} alt='Feature 2' />
     <FeatureTitle>Round-Ups</FeatureTitle>
     <FeatureText>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
     </FeatureText>
    </FeatureCard>
    <FeatureCard>
     <img src={logo} alt='Feature 3' />
     <FeatureTitle>Portfolio Management</FeatureTitle>
     <FeatureText>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
     </FeatureText>
    </FeatureCard>
   </Features>
   <OuterWrapper>
    <ButtonWrapper>
     <ButtonContainer>
      <Button active={activeSlide === 0} onClick={() => handleButtonClick(0)}>
       BALANCE
      </Button>
      <Button active={activeSlide === 1} onClick={() => handleButtonClick(1)}>
       MILESTONES
      </Button>
      <Button active={activeSlide === 2} onClick={() => handleButtonClick(2)}>
       RETURNS
      </Button>
      <Button active={activeSlide === 3} onClick={() => handleButtonClick(3)}>
       PLANNING
      </Button>
     </ButtonContainer>
    </ButtonWrapper>

    <InfoContainer activeSlide={activeSlide}>
     {filteredSections.map((section, index) => (
      <InfoContentSection
       key={index}
       imageSrc={section.imageSrc}
       title={section.title}
       description={section.description}
       buttonText={section.buttonText}
      />
     ))}
    </InfoContainer>
   </OuterWrapper>
   <ScrollingDiv>
    <ScrollingText scrollingUp={scrollingUp}>
     <RotatingHeadline>
      WHY TAX TRACK - WHY TAX TRACK - WHY TAX TRACK - WHY TAX TRACK - WHY TAX
      TRACK WHY TAX TRACK - WHY TAX TRACK - WHY TAX TRACK - WHY TAX TRACK - WHY
      TAX TRACK WHY TAX TRACK - WHY TAX TRACK - WHY TAX TRACK - WHY TAX TRACK -
      WHY TAX TRACK
     </RotatingHeadline>
    </ScrollingText>
   </ScrollingDiv>
   <SectionContainer>
    {/* First pair: Text then Image */}
    <LeftDiv>
     <Text>This is some text content.</Text>
    </LeftDiv>
    <RightDiv>
     <Image src={logo} alt='Image 1' />
    </RightDiv>
   </SectionContainer>
   <SectionContainer>
    <LeftDiv>
     <Image src={logo} alt='Image 2' />
    </LeftDiv>
    <RightDiv>
     <Text>This is some more text content.</Text>
    </RightDiv>
   </SectionContainer>
   <SectionContainer>
    {/* First pair: Text then Image */}
    <LeftDiv>
     <Text>This is some text content.</Text>
    </LeftDiv>
    <RightDiv>
     <Image src={logo} alt='Image 1' />
    </RightDiv>
   </SectionContainer>
   <SectionContainer>
    <LeftDiv>
     <Image src={logo} alt='Image 2' />
    </LeftDiv>
    <RightDiv>
     <Text>This is some more text content.</Text>
    </RightDiv>
   </SectionContainer>
   <Testimonials>
    <TestimonialCard>
     <TestimonialText>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
     </TestimonialText>
    </TestimonialCard>
    <TestimonialCard>
     <TestimonialText>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
     </TestimonialText>
    </TestimonialCard>
    <TestimonialCard>
     <TestimonialText>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
     </TestimonialText>
    </TestimonialCard>
   </Testimonials>

   <Footer>
    &copy; {new Date().getFullYear()} Acorns. All rights reserved.
   </Footer>
  </>
 );
};

export default Acorns;
