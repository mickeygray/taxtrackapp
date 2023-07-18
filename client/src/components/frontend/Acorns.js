import React, { useState } from "react";
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
const scrollLeftAnimation = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(-100% + 100vw)); }
`;

const scrollRightAnimation = keyframes`
  0% { transform: translateX(calc(-100% + 100vw)); }
  100% { transform: translateX(0); }
`;

const HorizontalScrollContainer = styled.div`
 position: fixed;
 bottom: 20px;
 left: 50%;
 transform: translateX(-50%);
 background-color: #333;
 color: #fff;
 padding: 10px 20px;
 white-space: nowrap;
 z-index: 999;
 animation: ${({ scrollingLeft }) =>
   scrollingLeft ? scrollLeftAnimation : scrollRightAnimation}
  5s linear infinite;
`;

const ScrollText = styled.span`
 display: inline-block;
 padding: 0 20px;
`;

const Acorns = () => {
 const [scrollingLeft, setScrollingLeft] = useState(false);

 const handleScroll = () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY > 0) {
   setScrollingLeft(true);
  } else {
   setScrollingLeft(false);
  }
 };

 React.useEffect(() => {
  window.addEventListener("scroll", handleScroll);

  return () => {
   window.removeEventListener("scroll", handleScroll);
  };
 }, []);
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
   <HorizontalScrollContainer scrollingLeft={scrollingLeft}>
    <ScrollText>WHY ACORNS</ScrollText>
   </HorizontalScrollContainer>
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
