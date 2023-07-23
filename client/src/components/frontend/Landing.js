import React, { useState, useEffect, useContext } from "react";
import styled, { keyframes, css } from "styled-components";
import logo from "../../images/logo.png";
import SettlementForm from "./SettlementForm";
import pathtozero from "../../images/pathto0.png";
import taxreturnmachine from "../../images/tax-deduction-machine.jpg";
import prodash from "../../images/prodash.jpg";
import blog from "../../images/blog.jpg";
//import chartone from "../../images/Chart1.png";
import person1 from "../../images/person1.jpg";
import person2 from "../../images/person2.jpg";
import person3 from "../../images/person3.jpg";
import person4 from "../../images/person4.jpg";
import heroimg from "../../images/Hero.jpg";
import oichero from "../../images/Offer-in-compromise.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
 faChartLine,
 faFileAlt,
 faChartBar,
 faGraduationCap,
 faBook,
 faUser,
 faGlobe,
 faCog,
} from "@fortawesome/free-solid-svg-icons";
import SettlementChart from "./SettlementChart";
import ProfileContext from "../../context/profile/profileContext";

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
 margin-top: -20px;
`;

const HeroImage = styled.img`
 position: absolute;
 top: -100;
 left: 0;
 width: 100vw;
 height: 100vh;
 opacity: 0.5;
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
 max-width: 1200px;
 height: 400px;
 margin: 50px auto;
`;

const LeftDiv = styled.div`
 flex: 1;

 padding: 20px;
 border-radius: 4px;
`;

const RightDiv = styled.div`
 flex: 1;
 padding: 20px;
 border-radius: 4px;
`;

const Text = styled.p`
 font-size: 16px;
 color: #555;
 margin-bottom: 20px;
 width: 400px;
`;

const Image = styled.img`
 max-width: 600px;
 height: 400px;
 border-radius: 10px;
`;

const Paragraph = styled.p`
 font-size: 16px;
 color: #555;
 line-height: 1.5;
 margin-bottom: 5px;
 text-indent: 10px;
 padding: 2px;
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
const BackgroundDiv = styled.div`
 text-align: center;
 padding: 20px;
 background-color: #f5f5f5;
`;

const ContentContainer = styled.div`
 text-align: center;
 padding: 20px;
 background-color: #f5f5f5;
 max-width: 1200px;
 margin: auto;
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
 margin-left: 220px;
 ${({ animate }) => css`
  animation: ${animate
   ? css`
      ${fadeOutAnimation} 1.5s linear 1s
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
      ${scaleUpAnimation} 1.5s linear 1s
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
 width: 400px;
 height: 600px;
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
 margin-top: -200px;
 /* Adjust the spacing between text and disclosure */
`;

const DisclosureCopy = styled.div`
 color: light-grey;
 font-size: 12px;
`;

const FirstImage = styled.img`
 position: absolute;
 width: 307px;
 border-radius: 30px;
 height: 458px;
 right: 400px;
 top: -107px;
`;

const SecondImage = styled.img`
 position: absolute;
 width: 392px;
 border-radius: 30px;
 height: 436px;
 top: 140px;
 left: 400px;
`;

const ThirdImage = styled.img`
 width: 392px;
 height: 436px;
 border-radius: 30px;
 position: absolute;
 right: 400px;
 bottom: -80px;
`;

const FourthImage = styled.img`
 position: absolute;
 bottom: 62px;
 left: 400px;
 border-radius: 30px;
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
 height: ${(props) => (props.showHiddenInfo ? "125vh" : "800px")};
 justify-content: center;
 margin: auto;

 gap: 20px;
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
 text-indent: 10px;
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
const features = [
 {
  title: "Balance and Transactions",
  icon: faChartLine,
  items: [
   "Real-time insights into your IRS debt.",
   "Track changes in your balance for confident planning.",
   "Visualize your path to zero IRS debt.",
   "Transform complex financial data into a user-friendly format.",
   "Take control with Tax Track's 'Balance and Transactions'.",
  ],
 },
 {
  title: "Simple Return Filing",
  icon: faFileAlt,
  items: [
   "Prepare tax returns hassle-free with comprehensive guides.",
   "Simplify tax documentation management with an upload process.",
   "Experience a stress-free filing with streamlined returns.",
   "Access a wealth of tax resources for smooth filing.",
   "Stay updated with the latest tax laws for accurate filing.",
  ],
 },
 {
  title: "Tax Track Pro",
  icon: faChartBar,
  items: [
   "Get pro-level analysis for identifying deductions.",
   "Manage professional entities and filings with support.",
   "Receive tailored deduction recommendations to optimize.",
   "Stay ahead with streamlined entity filings and eliminate stress.",
   "Empower your tax journey with Tax Track's 'Pro Dashboard'.",
  ],
 },
 {
  title: "Comprehensive Tax Code Resources",
  icon: faGraduationCap,
  items: [
   "Explore extensive articles and videos on tax aspects.",
   "Gain an in-depth understanding of tax laws and deductions.",
   "Stay informed about changing tax laws and regulations.",
   "Discover expert tax tips to maximize savings.",
   "Empower yourself with a vast tax knowledge base using Tax Track.",
  ],
 },
];

const HiddenInfoWrapper = styled.div`
 background-color: #6944ff;
 width: 300px;
 height: auto;
 margin-left: -20px;
 border-radius: 4px;
 padding: 20px;
`;

const HiddenInfoHeader = styled.h2`
 display: flex;
 align-items: center;

 font-weight: bold;
 color: #555;
 margin-bottom: 10px;
`;

const HiddenInfoTitle = styled.span`
 margin-left: 10px;
`;

const HiddenInfoList = styled.ul`
 list-style: none;
 padding: 0;
`;

const HiddenInfoItem = styled.li`
 margin-bottom: 5px;
 font-size: 10px;
`;

const FeatureSection = styled.div`
 margin-bottom: 20px;
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
 background: #77d215;
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
 z-index: 2;
 bottom: 0;
 width: 66%;
 max-width: 860px;
 opacity: 0.2;
`;

const PhoneImage = styled.img`
 position: absolute;
 z-index: 1;
 width: 700px;
 opacity: 0.5;
 top: -15px;
 right: 250px;
`;

const FooterWrapper = styled.div`
 padding: 40px;
 background-color: #f5f5f5;
 display: flex;
 flex-direction: column;
 align-items: center;
`;

const FooterLinks = styled.div`
 display: flex;
 justify-content: center;
 gap: 20px;
 margin-top: 20px;
`;

const FooterSocialIcons = styled.div`
 display: flex;
 gap: 10px;
 margin-top: 20px;
`;

const FooterDisclaimer = styled.p`
 font-size: 12px;
 color: #888;
 margin-top: 20px;
 text-align: center;
`;

const FooterLogoWrapper = styled.div`
 display: flex;
 align-items: center;
 justify-content: center;
 margin-bottom: 20px;
`;

const FooterLogo = styled.img`
 max-width: 100%;
 height: 50px;
 border-radius: 10px;
`;

const Footer = () => {
 return (
  <FooterWrapper>
   <FooterLogoWrapper>
    <FooterLogo src={logo} alt='Tax Track Logo' />
   </FooterLogoWrapper>
   <FooterLinks>
    <a href='#'>Home</a>
    <a href='#'>About</a>
    <a href='#'>Services</a>
    <a href='#'>Contact</a>
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
const Landing = () => {
 const profileContext = useContext(ProfileContext);
 const { settlementCalculation } = profileContext;
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
    "Get real-time insights into your IRS debt with a clear and organized line chart. Easily track changes in your balance directly from the IRS, providing a clear roadmap to financial freedom.",
   buttonText: "Learn More",
   imageSrc: process.env.PUBLIC_URL + "/Chart1.png",
  },
  {
   title: "Growth and Milestones",
   description:
    "Navigate the twists and turns of your tax situation effortlessly. Our comprehensive tools and expert guidance help you achieve your financial milestones with ease and confidence.",
   buttonText: "Learn More",
   imageSrc: logo,
  },
  {
   title: "Returns Made Easy",
   description:
    "Prepare tax returns hassle-free with our user-friendly tax forms and comprehensive guides. Streamline tax documentation management and experience a stress-free filing experience.",
   buttonText: "Learn More",
   imageSrc: logo,
  },
  {
   title: "Plan For The Future",
   description:
    "Access an extensive library of articles and videos outlining an ever-growing and changing tax code. Stay informed about changing tax laws and regulations to plan and optimize your financial future.",
   buttonText: "Learn More",
   imageSrc: logo,
  },
 ];
 const filteredSections = sections.filter(
  (section, index) => index === activeSlide
 );
 return (
  <>
   <Hero>
    <HeroImage src={heroimg} alt='Hero' />
    <HeroContent>
     <HeroTitle> Tax Track Makes IRS Interactions Easy</HeroTitle>
     <HeroSubtitle>
      Keep up with the latest on your tax account at the click of a button
     </HeroSubtitle>
     <HeroButton>Get Started</HeroButton>
    </HeroContent>
   </Hero>
   <BackgroundDiv>
    <ContentContainer>
     <Subtitle>Calculate Your Settlement</Subtitle>
     <ContentTitle>Your Potential Offer In Compromise</ContentTitle>
     <CenteredParagraph>
      The Tax Track Settlement Calculator is a powerful tool that helps
      individuals assess their eligibility for a potential settlement with the
      IRS. By entering financial information, taxpayers can determine if they
      qualify to settle their tax debt for less than the full amount owed.
      Simplifying the process, it empowers users to explore debt relief options
      confidently.
     </CenteredParagraph>
    </ContentContainer>
   </BackgroundDiv>
   <MainContainer>
    <FormContainer>
     <SettlementForm />
    </FormContainer>

    <ChartContainer>
     <ImageContainer>
      {settlementCalculation === null ? (
       <StillImage src={oichero} style={{ width: "100%" }} alt='Still Image' />
      ) : (
       <SettlementChart />
      )}
     </ImageContainer>
    </ChartContainer>
   </MainContainer>
   <BackgroundDiv>
    <ContentContainer>
     <Subtitle>How Does Tax Track Work?</Subtitle>
     <ContentTitle>
      Everything You Need For Your Tax Settlement In One Place
     </ContentTitle>

     {activeSlide === null ? (
      <CircleWrapper animate={animateButtons}>
       <CircleButton
        onClick={() => handleButtonClick(0)}
        angle={225}
        animate={animateButtons}
        style={{
         backgroundColor: "blue",
         width: "100px",
         zIndex: "1",
         height: "110px",
         borderRadius: "10px",
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
         width: "130px",
         height: "120px",
         zIndex: "1",
         borderRadius: "10px",
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
         width: "125px",
         height: "115px",
         borderRadius: "10px",
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
         width: "125px",
         height: "90px",
         borderRadius: "10px",
         zIndex: "1",
        }}>
        <FontAwesomeIcon icon={faBook} />
        Planning
       </CircleButton>
       <LearnMoreButton
        animate={animateButtons}
        onClick={() => handleButtonClick(0)}
        style={{
         width: "500px",
         height: "500px",
         zIndex: "0",
         backgroundColor: "tan",
        }}>
        <Image
         src={logo}
         alt='Image 2'
         style={{
          width: "200px",
          height: "400px",
          zIndex: "0",
          backgroundColor: "tan",
         }}
        />
       </LearnMoreButton>
      </CircleWrapper>
     ) : (
      <OuterWrapper>
       <ButtonWrapper>
        <ButtonContainer>
         <Button
          active={activeSlide === 0}
          onClick={() => handleButtonClick(0)}
          style={{
           backgroundColor: "blue",
           zIndex: "1",
          }}>
          {" "}
          <FontAwesomeIcon icon={faCog} />
          Balance
         </Button>
         <Button
          active={activeSlide === 1}
          onClick={() => handleButtonClick(1)}
          style={{
           backgroundColor: "green",
           zIndex: "1",
          }}>
          {" "}
          <FontAwesomeIcon icon={faCog} />
          Milestones
         </Button>
         <Button
          active={activeSlide === 2}
          onClick={() => handleButtonClick(2)}
          style={{
           backgroundColor: "orange",

           zIndex: "1",
          }}>
          {" "}
          <FontAwesomeIcon icon={faCog} />
          Returns
         </Button>
         <Button
          active={activeSlide === 3}
          onClick={() => handleButtonClick(3)}
          style={{
           backgroundColor: "purple",

           zIndex: "1",
          }}>
          {" "}
          <FontAwesomeIcon icon={faCog} />
          Planning
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
    </ContentContainer>
   </BackgroundDiv>
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
     <Headline>Unlock the Path to Zero with Balance and Transactions</Headline>
     <Text>
      <Paragraph>
       {" "}
       Discover the power of understanding your IRS account transcripts like
       never before. Tax Track's "Balance and Transactions" feature transforms
       your complex financial data into a clear and organized line chart,
       providing you with real-time insights into your IRS debt. Easily track
       every change in your balance directly from the IRS, allowing you to plan
       your financial journey with confidence.
      </Paragraph>
      <Paragraph>
       {" "}
       Navigate the twists and turns of your tax situation effortlessly. With
       Balance and Transactions you gain control over your financial future,
       visualizing your path to zero IRS debt. Tax Track ensures you stay
       informed about your progress, empowering you to make informed decisions
       and create a solid financial foundation.
      </Paragraph>
     </Text>
    </LeftDiv>
    <RightDiv>
     <Image src={pathtozero} alt='Image 1' />
    </RightDiv>
   </SectionContainer>
   <SectionContainer>
    <LeftDiv>
     <Image src={taxreturnmachine} alt='Image 2' />
    </LeftDiv>
    <RightDiv>
     <Headline>Simplify Tax Return Preparation with Expert Guides</Headline>
     <Text>
      <Paragraph>
       {" "}
       Tax Track offers an unparalleled advantage with its Tax Return
       Preparation and Guides. Our platform provides you with forms, uploads,
       and step-by-step guides that streamline the process of preparing tax
       returns. As a Tax Track subscriber, you enjoy the added benefit of
       preparing your yearly returns for free while your subscription is active.
      </Paragraph>
      <Paragraph>
       {" "}
       No more tedious guesswork or stress during tax season. Access
       comprehensive resources and stay up-to-date with the ever-changing tax
       code. Our user-friendly interface ensures that you accurately file your
       returns and maximize deductions. Feel confident that your taxes are
       prepared efficiently, leaving you with peace of mind.
      </Paragraph>
     </Text>
    </RightDiv>
   </SectionContainer>
   <SectionContainer>
    {/* First pair: Text then Image */}
    <LeftDiv>
     <Headline>
      Optimize Your Finances with Pro Dashboard and Deduction Analysis
     </Headline>
     <Text>
      <Paragraph>
       {" "}
       Tax Track's Pro Dashboard is your financial partner, offering expert
       analysis and insights into your books. Our advanced algorithms scrutinize
       your financial data, searching for potential deductions and opportunities
       to optimize your tax liabilities. Keep your professional filings and
       entities organized effortlessly.
      </Paragraph>
      <Paragraph>
       {" "}
       With Pro Dashboard, managing your financials becomes seamless. Stay ahead
       of the game with real-time data, ensuring you never miss crucial
       deductions or compliance deadlines. Empower yourself with a high-tech
       solution tailored to your financial success.
      </Paragraph>
     </Text>
    </LeftDiv>
    <RightDiv>
     <Image src={prodash} alt='Image 1' />
    </RightDiv>
   </SectionContainer>
   <SectionContainer>
    <LeftDiv>
     <Image src={blog} alt='Image 2' />
    </LeftDiv>
    <RightDiv>
     <Headline>
      {" "}
      Navigate the Tax Code Confidently with Comprehensive Resources
     </Headline>
     <Text>
      <Paragraph>
       {" "}
       Tax Track boasts an extensive collection of articles and videos,
       meticulously outlining the ever-growing and changing tax code. Our
       platform ensures you stay informed on the latest tax regulations,
       credits, and deductions. Empower yourself with the knowledge to make
       informed financial decisions.
      </Paragraph>
      <Paragraph>
       {" "}
       By providing comprehensive and up-to-date resources, Tax Track serves as
       your reliable tax guide. Our content covers a wide range of topics,
       simplifying complex tax concepts and shedding light on frequently asked
       questions. Prepare for the future and unlock the potential for financial
       growth with our extensive tax code library.
      </Paragraph>
     </Text>
    </RightDiv>
   </SectionContainer>
   <Container style={{ marginTop: "20px" }}>
    <Headline style={{ marginBottom: "20px" }}>
     Change The Way You Do Your Taxes Forever
    </Headline>

    <ImageSection>
     <ImageWrapper>
      <ImageAsset
       src={process.env.PUBLIC_URL + "/Chart1.png"}
       alt='Harness the power of compounding'
      />
     </ImageWrapper>
     <TextSection>
      <HeadlineSecondSection>
       Harness the power of information
      </HeadlineSecondSection>
      <Body>
       Tax Track revolutionizes tax management, offering a modernized approach
       to taxes and simplifying dealings with the IRS. With cutting-edge
       technology, it transforms complex IRS data into user-friendly visuals,
       enabling easy tracking of financial progress. Say goodbye to tax
       headaches as Tax Track provides expert guidance, streamlines return
       preparation, and empowers you to confidently navigate IRS challenges with
       ease.
      </Body>
     </TextSection>
    </ImageSection>
    <DisclosureSection>
     <DisclosureCopy>
      Tax Track's platform and tools are intended for informational purposes
      only and do not constitute financial, tax, or legal advice. While we
      strive to provide accurate and up-to-date information, the tax laws and
      regulations are subject to change, and individual circumstances can vary.
      Users should consult with qualified professionals, such as tax advisors or
      financial experts, to address specific financial situations or tax
      concerns. Tax Track does not guarantee the accuracy, completeness, or
      reliability of any information presented on the platform. Users are
      responsible for their financial decisions and should conduct their due
      diligence before making any financial or tax-related choices.
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
     <FirstImage src={person1} />
     <SecondImage src={person2} />
     <ThirdImage src={person3} />
     <FourthImage src={person4} />
    </ImageWrapper>
   </HighlightedTextContainer>
   <TestimonialCarousel />
   <EnvoyPricingModule showHiddenInfo={showHiddenInfo}>
    <LeftContent>
     <Headline>Streamlines Your Taxes</Headline>
     <br />
     <BodyCopy>
      Tax Track provides intuitive features like "Balance and Transactions" to
      visualize your path to financial freedom in real-time. The "Returns Made
      Easy" feature streamlines tax return preparation, while the "Pro
      Dashboard" offers pro-level deductions analysis for maximizing savings.
      Stay informed with the "Tax Education" feature, providing expert tips and
      resources on changing tax laws.
     </BodyCopy>
     <Disclosures>
      Tax Track is an online financial platform offering general informational
      and educational content about taxes and IRS debt. While we strive for
      accuracy, the information provided should not be considered professional
      advice. Tax laws are subject to frequent changes, and individual
      circumstances vary, so it is essential to consult qualified tax
      professionals or financial advisors for personalized guidance.
     </Disclosures>
    </LeftContent>

    <RightContent>
     <TierCardWrapper>
      <TierName>Three Months Free</TierName>
      <TierBodyCopy>
       Join over 10 million all-time customers who have signed up for TaxTrack.
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
        {features.map((feature, index) => (
         <FeatureSection key={index}>
          <h5>
           {" "}
           <FontAwesomeIcon
            icon={feature.icon}
            style={{ color: "white", marginLeft: "5px" }}
           />
           {feature.title}
          </h5>
          <HiddenInfoList>
           {feature.items.map((item, idx) => (
            <HiddenInfoItem key={idx}>{item}</HiddenInfoItem>
           ))}
          </HiddenInfoList>
         </FeatureSection>
        ))}
       </HiddenInfoWrapper>
      )}
     </TierCardWrapper>
     {/* Other tiers and content go here */}
    </RightContent>
   </EnvoyPricingModule>
   <EnvoyClosingSignUpWrapper>
    <CopyWrapper>
     <ClosingTagline>A Modern Solution For Tax Resolution</ClosingTagline>
     <ClosingHeadline>
      Tax Track changing the way Americans communicate with the IRS
     </ClosingHeadline>
     <CTAButton href='https://app.adjust.com/lu9nsui_ww57nnm?fallback=https://www.acorns.com/tier-signup?key=GOLD'>
      Sign up today
     </CTAButton>
    </CopyWrapper>
    <TreeImage src={logo} alt='Tree stump image' />
    <picture>
     <source
      media='(max-width: 767px)'
      srcset='https://sqy7rm.media.zestyio.com/Closing-Signup-Updt-Mob-202210-2.png'
     />
     <PhoneImage
      src={process.env.PUBLIC_URL + "/Chart1.png"}
      alt='Phone image'
     />
    </picture>
   </EnvoyClosingSignUpWrapper>
   <Footer />
  </>
 );
};

export default Landing;
