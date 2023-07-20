import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import logo from "../../images/logo.png";
import SettlementForm from "./SettlementForm";

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
 margin-bottom: 100px;
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

const fadeInAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
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

const scaleUpAnimation = keyframes`
  0% {
    transform: scale(1);
    border-radius: 50%;
  }
  100% {
    transform: scaleY(8) scaleX(4) translateX(-150px);; 
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
const fadeOutAnimation = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const CircleWrapper = styled.div`
 display: flex;
 justify-content: center;
 align-items: center;
 position: relative;
 height: 600px;
 width: 600px;
 margin: auto;
 ${({ animate }) => css`
  animation: ${animate
   ? css`
      ${fadeOutAnimation} 3s linear 2.6s
     `
   : ""};
  animation-play-state: ${animate ? "running" : "paused"};
 `}
`;
const LearnMoreButton = styled.button`
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
      ${scaleUpAnimation} 3s linear 2.6s
     `
   : ""};
  animation-play-state: ${animate ? "running" : "paused"};
 `}
`;

const CircleButton = styled.button`
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
  animation: ${angle === 315
   ? css`
      ${moveUpAnimation} 6s linear
     `
   : angle === 45
   ? css`
      ${moveDownAnimation} 6s linear
     `
   : css`
      ${moveLeftAnimation} 3.5s linear 2.5s
     `};
  animation-play-state: ${({ animate }) => (animate ? "running" : "paused")};
 `}
`;
const Container = styled.div`
 margin: auto;
 width: 100%;
 height: 100%;
 max-width: 950px;
 padding: 0 40px;
 text-align: center;
`;

// Styled components for the headline
const Headline = styled.h2`
 color: solid-slate;
 font-size: 24px;
`;

// Styled components for the image section
const ImageSection = styled.div`
 display: flex;
 align-items: center;
 overflow: hidden;
 margin: auto;
`;

const ImageWrapper = styled.div`
 width: 50%;
 max-width: 560px;
 padding-bottom: min(12vw, 200px);
`;

const ImageAsset = styled.img`
 width: 100%;
`;

// Styled components for the text section
const TextSection = styled.div`
 width: 50%;
 max-width: 333px;
 margin-top: -200px; /* Adjust the spacing between image and text */
`;

const HeadlineSecondSection = styled.h2`
 color: solid-slate;
`;

const Body = styled.div`
 color: solid-slate;
`;

// Styled components for the disclosure section
const DisclosureSection = styled.div`
 width: 100%;

 margin-top: -300px; /* Adjust the spacing between text and disclosure */
`;

const DisclosureCopy = styled.div`
 color: light-grey;
 font-size: 12px;
`;

const FirstImage = styled.img`
 position: absolute;
 width: 307px;
 height: 458px;
 right: 400px;
 top: -107px;
`;

const SecondImage = styled.img`
 position: absolute;
 width: 392px;
 height: 436px;
 top: 140px;
 left: 400px;
`;

const ThirdImage = styled.img`
 width: 392px;
 height: 436px;
 position: absolute;
 right: 400px;
 bottom: -80px;
`;

const FourthImage = styled.img`
 position: absolute;
 bottom: 62px;
 left: 400px;
 width: 407px;
 height: 436px; /* Set height equal to width for a square image */
`;
const HighlightedTextContainer = styled.div`
 font-family: inherit;
 font-size: inherit;
 border: 0;
 background: #191919;
 margin: 200px 0 0;
 position: relative;
 padding: 372px 0 436px;
 overflow: hidden;
 text-align: center;
`;

const Tagline = styled.div`
 font-family: inherit;
 font-size: 32px;
 text-transform: uppercase;
 color: white;
 position: relative;
 z-index: 2;
`;

const Subheadline = styled.div`
 font-family: inherit;
 font-size: 24px;
 color: white;
 position: relative;
 z-index: 2;
`;

const CountUpDollars = styled.div`
 font-family: inherit;
 font-size: 48px;
 color: white;
 position: relative;
 z-index: 2;
`;

const testimonials = [
 {
  id: 1,
  name: "John Doe",
  image: "https://example.com/john-doe.jpg",
  text: "Testimonial content for John Doe",
 },
 {
  id: 2,
  name: "Jane Smith",
  image: "https://example.com/jane-smith.jpg",
  text: "Testimonial content for Jane Smith",
 },
 // Add more testimonials as needed
];

const TestimonialCarouselContainer = styled.div`
 display: flex;
 flex-direction: column; /* Stack elements vertically */
 align-items: center;

 background-color: #6944ff;
 height: 20vw;
 margin: 0 auto;
`;

const TestimonialButtonWrapper = styled.div`
 width: 120px;
 margin-right: 40px;
 display: flex;
 align-items: center;
`;

const TestimonialInfoContainer = styled.div`
 width: 50%;
 flex-grow: 1;
`;

const TestimonialSlide = styled.div`
 display: flex;
 align-items: center;
 justify-content: center;
 height: 300px;
 opacity: ${({ active }) => (active ? 1 : 0)};
 transition: opacity 300ms ease-in-out;
`;

const TestimonialImage = styled.img`
 width: 100px;
 height: 100px;
 border-radius: 50%;
 margin-right: 16px;
`;

const TestimonialContent = styled.div`
 width: 50%;
`;

const TestimonialName = styled.h2`
 font-size: 24px;
 font-weight: 500;
 margin-bottom: 16px;
`;
const TestimonialButtonContainer = styled.div`
 display: flex;
`;
const TestimonialButton = styled.button`
 background: rgba(25, 25, 25, 0.15);
 border: 0;
 outline: 0;
 border-radius: 50% 0 0 50%;
 width: 56px;
 height: 56px;
 display: flex;
 justify-content: center;
 align-items: center;
 cursor: pointer;
 transition: background 0.3s ease-in-out;
 font-size: 18px;
 overflow: hidden;
 position: relative;
 margin-right: -4px; /* Adjust this margin to fit your design */

 &:hover {
  background: rgba(25, 25, 25, 0.25);
 }
`;

const NextButton = styled.button`
 background: rgba(25, 25, 25, 0.15);
 border: 0;
 border-radius: 0 50% 50% 0;
 outline: 0;
 width: 56px;
 height: 56px;
 display: flex;
 justify-content: center;
 align-items: center;
 cursor: pointer;
 transition: background 0.3s ease-in-out;
 font-size: 18px;
 position: relative;

 &:hover {
  background: rgba(25, 25, 25, 0.25);
  font-family: "Font Awesome 6 Free";
 }
`;
const EnvoyPricingModule = styled.div`
 padding: 200px 0;
 display: flex;
 width: 800px;
 justify-content: center;
 margin: auto;
`;

const LeftContent = styled.div`
 width: 50%;
`;

const RightContent = styled.div`
 width: 50%;
 display: flex;
 justify-content: center;
`;

const BodyCopy = styled.div`
 color: #191919;
 font-family: "Avenir Next", Helvetica, Arial, sans-serif;
 font-size: 20px;
 line-height: 32px;
 letter-spacing: 0;
 font-weight: 400;
 max-width: 508px;
 margin-bottom: 40px;
`;

const Disclosures = styled.div`
 color: #767676;
 font-size: 12px;
 line-height: 18px;
 max-width: 512px;
`;
const TierCardWrapper = styled.div`
 background-color: #6944ff;
 color: white;
 padding: 20px;
 height: 250px;
 border-radius: 10px;
 width: 300px;
`;
const TierName = styled.h2`
 font-size: 24px;
 color: white;
 margin-bottom: 10px;
`;

const TierBodyCopy = styled.p`
 font-size: 16px;
 color: white;
 margin-bottom: 20px;
`;

const StyledLink = styled.a`
 background-color: #6944ff;
 color: #fff;
 border: none;
 border-radius: 4px;
 padding: 8px 16px;
 text-decoration: none;
 cursor: pointer;
`;

const HiddenInfoWrapper = styled.div`
 margin-top: 10px;
 margin-left: -20px;
 padding: 20px;
 background-color: #6944ff;
 border-radius: 20px;
 width: 300px;
 border: 1px solid #6944ff;
 color: #fff;
`;

const HiddenInfoHeader = styled.h3`
 font-size: 20px;
`;

const FontAwesomeIcon = styled.i`
 margin-right: 8px;
`;

const HiddenInfoList = styled.ul`
 list-style-type: disc;
 padding-left: 20px;
 margin-top: 10px;
`;

const HiddenInfoItem = styled.li`
 font-size: 16px;
`;

const ToggleButton = styled.button`
 margin-top: 10px;
 background-color: #6944ff;
 color: #fff;
 border: none;
 border-radius: 4px;
 padding: 8px 16px;
 cursor: pointer;
`;

const EnvoyClosingSignUpWrapper = styled.div`
 position: relative;
 margin: auto;
 background: #74c947;
 width: 1320px;
 height: calc((100vw - 120px) * 0.7);
 max-width: 100%;
 max-height: 900px;
 border-radius: 30px;
 display: flex;
 align-items: center;
 justify-content: center;
 overflow: hidden;
`;

const CopyWrapper = styled.div`
 width: 770px;
 padding: 0 40px;
 text-align: center;
 z-index: 4;
`;

const ClosingTagline = styled.div`
 font-size: 24px;
 color: #fff;
 margin-bottom: 10px;
`;

const ClosingHeadline = styled.h5`
 font-size: 20px;
 color: #fff;
 margin-bottom: 20px;
`;

const CTAButton = styled.a`
 cursor: pointer;
 display: inline-block;
 height: 56px;
 line-height: 56px;
 padding: 0 45px;
 font-size: 16px;
 letter-spacing: 0;
 font-weight: 600;
 text-decoration: none;
 border-radius: 50px;
 transition: background 300ms ease-in-out;
 background: #fff;
 color: #191919;
`;

const TreeImage = styled.img`
 position: absolute;
 z-index: 1;
 bottom: 0;
 width: 66%;
 max-width: 860px;
 opacity: 0.2;
`;

const PhoneImage = styled.img`
 position: absolute;
 z-index: 2;
 width: 32%;
 max-width: 420px;
 top: 60px;
 right: 112px;
 filter: brightness(0.9);
`;

const FooterWrapper = styled.div`
 padding: 20px;
 width: 1200px;
 margin: auto;
 border-radius: 10px;
`;

const FooterMainRow = styled.div`
 display: flex;
 justify-content: space-between;
 flex-wrap: wrap;
`;

const FooterHero = styled.div`
 flex: 1;
`;

const FooterCTA = styled.a`
 display: block;
 margin-top: 10px;
 color: #007bff;
`;

const MainRowLinks = styled.div`
 display: flex;
 flex: 3;
 flex-wrap: wrap;
`;

const MainRowLinkColumn = styled.div`
 flex: 1;
 padding: 0 10px;
`;

const FooterLink = styled.a`
 display: block;
 color: #007bff;
 margin-bottom: 5px;
`;

const FooterClosingIconRow = styled.div`
 display: flex;
 justify-content: space-between;
 align-items: center;
 margin-top: 20px;
`;

const LogoWrapper = styled.div`
 flex: 1;
`;

const FooterLogo = styled.img`
 max-width: 150px;
`;

const ClosingRowLinks = styled.div`
 flex: 2;
`;

const ClosingRowSocialIcons = styled.div`
 flex: 1;
 display: flex;
 justify-content: flex-end;
`;

const FooterSocialIcon = styled.img`
 margin-right: 10px;
 max-width: 30px;
`;

const Footer = () => {
 return (
  <FooterWrapper>
   <FooterMainRow>
    <FooterHero>
     <h4>Have any questions?</h4>
     <FooterCTA href='/support' data-track-id='footerContactSupport'>
      Contact support
     </FooterCTA>
    </FooterHero>
    <MainRowLinks>
     <MainRowLinkColumn>
      <h6>Products</h6>
      <FooterLink
       href='https://www.acorns.com/invest/'
       data-track-id='footerInvest'>
       <b>Invest</b> for your future
      </FooterLink>
      <FooterLink
       href='https://www.acorns.com/later/'
       data-track-id='footerLater'>
       <b>Later</b> starts today
      </FooterLink>
      <FooterLink
       href='https://www.acorns.com/earn/'
       data-track-id='footerEarn'>
       <b>Earn</b> extra money
      </FooterLink>
      <FooterLink
       href='https://www.acorns.com/early'
       data-track-id='footerEarly'>
       <b>Early</b> investors
      </FooterLink>
      <FooterLink
       href='https://www.acorns.com/banking/'
       data-track-id='footerSpend'>
       <b>Bank</b> smarter
      </FooterLink>
     </MainRowLinkColumn>
     <MainRowLinkColumn>
      <h6>Who we are</h6>
      <FooterLink
       href='https://www.acorns.com/about/'
       data-track-id='footerAbout'>
       <b></b> About
      </FooterLink>
      <FooterLink
       href='https://www.acorns.com/careers/'
       data-track-id='footerCareers'>
       <b></b> Careers
      </FooterLink>
      <FooterLink
       href='https://www.acorns.com/press/'
       data-track-id='footerPress'>
       <b></b> Press
      </FooterLink>
      <FooterLink
       href='https://www.acorns.com/oak-trees-planted/'
       data-track-id='footerTrees'>
       <b></b> Oak Trees Planted
      </FooterLink>
     </MainRowLinkColumn>
     <MainRowLinkColumn>
      <h6>Why start now</h6>
      <FooterLink href='/learn/' data-track-id='footerLearn'>
       <b></b> Learn
      </FooterLink>
     </MainRowLinkColumn>
    </MainRowLinks>
   </FooterMainRow>
   <FooterClosingIconRow>
    <LogoWrapper>
     <FooterLogo
      src='https://sqy7rm.media.zestyio.com/Acorns-Footer-Logo-2x-2022.png'
      alt='Acorns logo'
     />
    </LogoWrapper>
    <ClosingRowLinks>
     <FooterLink
      href='https://www.acorns.com/pricing/'
      data-track-id='footerPricing'>
      <b>Pricing</b>
     </FooterLink>
     <FooterLink href='https://store.acorns.com/' data-track-id='footerStore'>
      <b>Store</b>
     </FooterLink>
     <FooterLink
      href='https://www.acorns.com/terms/'
      data-track-id='footerLegal'>
      <b>Legal</b>
     </FooterLink>
     <FooterLink
      href='https://www.acorns.com/privacy/'
      data-track-id='footerPrivacyPolicy'>
      <b>Privacy Policy</b>
     </FooterLink>
     <a id='ot-sdk-btn-new-style' className='ot-sdk-show-settings'>
      Your Privacy Choices
     </a>
    </ClosingRowLinks>
    <ClosingRowSocialIcons>
     <FooterLink
      href='https://www.instagram.com/acorns/'
      data-track-id='footerInstagram'>
      <FooterSocialIcon
       src='https://sqy7rm.media.zestyio.com/Instagram.png'
       alt='Instagram'
      />
     </FooterLink>
     <FooterLink
      href='https://twitter.com/acorns'
      data-track-id='footerTwitter'>
      <FooterSocialIcon
       src='https://sqy7rm.media.zestyio.com/Twitter.png'
       alt='Twitter'
      />
     </FooterLink>
     <FooterLink
      href='https://www.facebook.com/AcornsGrow/'
      data-track-id='footerFacebook'>
      <FooterSocialIcon
       src='https://sqy7rm.media.zestyio.com/Facebook.png'
       alt='Facebook'
      />
     </FooterLink>
     <a
      id='equal-web-toggle'
      aria-label='Open Accessibility Menu'
      role='button'
      data-track-id='footerEqualWebToggle'
      data-onclick='window.interdeal.a11y.openMenu()'>
      <FooterSocialIcon
       src='https://sqy7rm.media.zestyio.com/EqualWeb-ADA-icon-green.svg'
       alt='Wheelchair icon'
      />
     </a>
    </ClosingRowSocialIcons>
   </FooterClosingIconRow>
  </FooterWrapper>
 );
};

const TestimonialCarousel = () => {
 const [activeSlide, setActiveSlide] = useState(0);

 const handleNextSlide = () => {
  setActiveSlide((prevIndex) => (prevIndex + 1) % testimonials.length);
 };

 const handlePrevSlide = () => {
  setActiveSlide(
   (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
  );
 };

 const currentTestimonial = testimonials[activeSlide];

 return (
  <TestimonialCarouselContainer>
   <TestimonialInfoContainer>
    <TestimonialSlide active>
     <TestimonialImage
      src={currentTestimonial.image}
      alt={currentTestimonial.name}
     />
     <TestimonialContent>
      <TestimonialName>{currentTestimonial.name}</TestimonialName>
      <TestimonialText>{currentTestimonial.text}</TestimonialText>
     </TestimonialContent>
    </TestimonialSlide>
   </TestimonialInfoContainer>
   <TestimonialButtonWrapper>
    <TestimonialButtonContainer>
     <TestimonialButton
      onClick={handlePrevSlide}
      className='fa-solid fa-chevron-left'
     />
     <NextButton onClick={handleNextSlide} className='fas fa-chevron-right' />
    </TestimonialButtonContainer>
   </TestimonialButtonWrapper>
  </TestimonialCarouselContainer>
 );
};
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
 const [animateButtons, setAnimateButtons] = useState(false);
 const [showHiddenInfo, setShowHiddenInfo] = useState(false);
 const handleScroll = () => {
  let prevScrollY = window.scrollY;
  setScrollingUp(window.scrollY < prevScrollY);
  prevScrollY = window.scrollY;
 };

 const handleToggle = () => {
  setShowHiddenInfo((prevState) => !prevState);
 };
 useEffect(() => {
  window.addEventListener("scroll", handleScroll);

  return () => {
   window.removeEventListener("scroll", handleScroll);
  };
 }, []);
 const [activeSlide, setActiveSlide] = useState(null);

 const handleButtonClick = (index) => {
  setAnimateButtons(true);
  setTimeout(() => setActiveSlide(index), 5000);
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
   <ContentContainer>
    <Subtitle>How Does Tax Track Work?</Subtitle>
    <ContentTitle>
     Everything You Need For Your Tax Settlement In One Place
    </ContentTitle>
   </ContentContainer>
   {activeSlide === null ? (
    <CircleWrapper animate={animateButtons}>
     <CircleButton
      onClick={() => handleButtonClick(0)}
      angle={225}
      animate={animateButtons}>
      BALANCE
     </CircleButton>
     <CircleButton
      onClick={() => handleButtonClick(1)}
      angle={315}
      animate={animateButtons}>
      MILESTONES
     </CircleButton>
     <CircleButton
      onClick={() => handleButtonClick(2)}
      angle={45}
      animate={animateButtons}>
      RETURNS
     </CircleButton>
     <CircleButton
      onClick={() => handleButtonClick(3)}
      angle={135}
      animate={animateButtons}>
      PLANNING
     </CircleButton>
     <LearnMoreButton
      animate={animateButtons}
      onClick={() => handleButtonClick(0)}>
      Learn More
     </LearnMoreButton>
    </CircleWrapper>
   ) : (
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
   )}
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
   <Container>
    <Headline>Give your money the chance to work as hard as you do</Headline>

    <ImageSection>
     <ImageWrapper>
      <ImageAsset
       src='https://sqy7rm.media.zestyio.com/Envoy-Home-Potential.png'
       alt='Harness the power of compounding'
      />
     </ImageWrapper>
     <TextSection>
      <HeadlineSecondSection>
       Harness the power of compounding
      </HeadlineSecondSection>
      <Body>
       Money doesn’t grow on trees. But with compound returns, money can grow on
       itself. It’s a long-term investing principle foundational to how Acorns
       can work for you.
      </Body>
     </TextSection>
    </ImageSection>
    <DisclosureSection>
     <DisclosureCopy>
      Your Potential is a hypothetical tool that illustrates, how factors such
      as Recurring Investments (amount and frequency), Round-Ups® investments,
      Smart Deposit investments, and compound returns may impact the long-term
      value of an Acorns Account. The tool uses a 6% hypothetical rate of return
      and hypothetical age range dependent on age band selected by the user.
      Compounding is the process in which an asset’s earnings are reinvested to
      generate additional earnings over time. Acorns clients may not experience
      compound returns and investment results will vary based on market
      volatility and fluctuating prices.
     </DisclosureCopy>
    </DisclosureSection>
   </Container>
   <HighlightedTextContainer>
    <div className='highlighted-text-component'>
     <Tagline>Thousands Have Saved Millions With ABC Tax Track</Tagline>
     <Subheadline>
      We have countless testemonials and have saved clients a total of
     </Subheadline>
     <CountUpDollars>$15,000,000</CountUpDollars>
    </div>
    <ImageWrapper>
     <FirstImage
      className='highlighted-text-image-1 lazy entered loaded'
      data-src='https://sqy7rm.media.zestyio.com/Env-Home-Highlighted-Text-1-Updt.png'
      alt='Woman holding phone'
      data-ll-status='loaded'
      src='https://sqy7rm.media.zestyio.com/Env-Home-Highlighted-Text-1-Updt.png'
     />
     <SecondImage
      className='highlighted-text-image-2 lazy entered loaded'
      data-src='https://sqy7rm.media.zestyio.com/Envoy-Home-Highlighted-Text-2.png'
      alt='Woman smiling'
      data-ll-status='loaded'
      src='https://sqy7rm.media.zestyio.com/Envoy-Home-Highlighted-Text-2.png'
     />
     <ThirdImage
      className='highlighted-text-image-3 lazy entered loaded'
      data-src='https://sqy7rm.media.zestyio.com/Env-Home-Highlighted-Text-3-Updt.png'
      alt='Older couple embracing'
      data-ll-status='loaded'
      src='https://sqy7rm.media.zestyio.com/Env-Home-Highlighted-Text-3-Updt.png'
     />
     <FourthImage
      className='highlighted-text-image-4 lazy entered loaded'
      data-src='https://sqy7rm.media.zestyio.com/Envoy-Home-Highlighted-Text-4.png'
      alt='Man smiling with his eyes closed'
      data-ll-status='loaded'
      src='https://sqy7rm.media.zestyio.com/Envoy-Home-Highlighted-Text-4.png'
     />
    </ImageWrapper>
   </HighlightedTextContainer>
   <TestimonialCarousel />
   <EnvoyPricingModule>
    <LeftContent>
     <Tagline>A Plan for Everyone</Tagline>
     <BodyCopy>
      Acorns was built to give everyone the tools of wealth-building. Whether
      you’re new to investing or planning ahead for your family’s future, we
      bundle our products, tools, and education into subscription tiers — each
      curated to meet you on whichever stage of life you’re in.
      <br />
      <br />
      That means no hidden costs or transaction fees — just one, transparent
      monthly payment to take advantage of everything our financial wellness
      system has to offer.
     </BodyCopy>
     <Disclosures>
      Not all features are available to all customers at this time. Please
      compare subscription tiers during registration to see what is available to
      you. Acorns is only available to US citizens or other lawful residents who
      are currently located in the United States. You must be 18 or older to
      sign up for an Acorns account.
     </Disclosures>
    </LeftContent>

    <RightContent>
     <TierCardWrapper>
      <TierName>Starts at $3/month</TierName>
      <TierBodyCopy>
       Join over 10 million all-time customers who have signed up for Acorns.
      </TierBodyCopy>
      <StyledLink href='https://app.adjust.com/2frog1d_tjj61hy?fallback=https%3A%2F%2Fwww.acorns.com%2Ftier-signup%3Fkey%3DGOLD'>
       Sign up today
      </StyledLink>
      <br />
      {!showHiddenInfo && (
       <ToggleButton
        onClick={() => setShowHiddenInfo((prevState) => !prevState)}>
        What's Included?
       </ToggleButton>
      )}
      {showHiddenInfo && (
       <HiddenInfoWrapper>
        <HiddenInfoHeader>
         <FontAwesomeIcon className='fa fa-info-circle' /> Hidden Content
         Section
        </HiddenInfoHeader>
        <HiddenInfoList>
         <HiddenInfoItem>Item 1</HiddenInfoItem>
         <HiddenInfoItem>Item 2</HiddenInfoItem>
         <HiddenInfoItem>Item 3</HiddenInfoItem>
        </HiddenInfoList>
       </HiddenInfoWrapper>
      )}
     </TierCardWrapper>
     {/* Other tiers and content go here */}
    </RightContent>
   </EnvoyPricingModule>
   <EnvoyClosingSignUpWrapper>
    <CopyWrapper>
     <ClosingTagline>Join the Movement</ClosingTagline>
     <ClosingHeadline>
      We’re changing the way Americans save & invest every day
     </ClosingHeadline>
     <CTAButton href='https://app.adjust.com/lu9nsui_ww57nnm?fallback=https://www.acorns.com/tier-signup?key=GOLD'>
      Sign up today
     </CTAButton>
    </CopyWrapper>
    <TreeImage
     src='https://sqy7rm.media.zestyio.com/Tree-Asset.png'
     alt='Tree stump image'
    />
    <picture>
     <source
      media='(max-width: 767px)'
      srcset='https://sqy7rm.media.zestyio.com/Closing-Signup-Updt-Mob-202210-2.png'
     />
     <PhoneImage
      src='https://sqy7rm.media.zestyio.com/Closing-Signup-Updt-202210-2.png'
      alt='Phone image'
     />
    </picture>
   </EnvoyClosingSignUpWrapper>
   <Footer />
  </>
 );
};

export default Acorns;
