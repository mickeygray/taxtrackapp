import React, { useState, useEffect, useContext } from "react";
import styled, { keyframes, css } from "styled-components";
import SettlementForm from "./SettlementForm";
import Hero from "./Hero";

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
import SettlementCalculator from "./SettlementCalculator";
import ProfileContext from "../../context/profile/profileContext";
import AnimatedCarousel from "./AnimatedCarousel";
import ScrollingHeadline from "./ScrollingHeadline";
import ComponentGrid from "./ComponentGrid";
import useMixins from "../../utils/useMixins";
import ChartDisclaimer from "./ChartDisclaimer";
import CountingUp from "./CountingUp";
import TestimonialCarousel from "./TestemonialCarousel";

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

// Styled components for the headline
const Headline = styled.h2`
 color: solid-slate;
 font-size: 24px;
`;

// Styled components for the image section

const ImageWrapper = styled.div`
 width: 50%;
 max-width: 560px;
 padding-bottom: min(12vw, 200px);
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
    <FooterLogo
     src={process.env.PUBLIC_URL + "/images/logo.png"}
     alt='Tax Track Logo'
    />
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

const Landing = () => {
 const [showHiddenInfo, setShowHiddenInfo] = useState(false);

 const handleToggle = () => {
  setShowHiddenInfo((prevState) => !prevState);
 };

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

 const mixins = useMixins();
 const LandingParent = styled.div`
  ${mixins.colors}
 `;
 return (
  <LandingParent>
   <Hero />
   <SettlementCalculator />
   <AnimatedCarousel />
   <ScrollingHeadline />
   <ComponentGrid />
   <ChartDisclaimer />
   <CountingUp />
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
    <TreeImage
     src={process.env.PUBLIC_URL + "/images/logo.png"}
     alt='Tree stump image'
    />
    <picture>
     <source
      media='(max-width: 767px)'
      srcset='https://sqy7rm.media.zestyio.com/Closing-Signup-Updt-Mob-202210-2.png'
     />
     <PhoneImage
      src={process.env.PUBLIC_URL + "/images/Chart1.png"}
      alt='Phone image'
     />
    </picture>
   </EnvoyClosingSignUpWrapper>
   <Footer />
  </LandingParent>
 );
};

export default Landing;
