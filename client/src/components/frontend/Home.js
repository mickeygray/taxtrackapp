import React, { useState } from "react";
import styled, { css, keyframes } from "styled-components";
import AuthContext from "../../context/auth/authContext";
import HomeHeroTree from "../../images/HomeHeroTree.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import BalanceTransactions from "./BalanceTransactions";
// SVG for Tree Illustration

const suckedInAnimation = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.8);
    opacity: 0;
  }
`;

const riseInAnimation = keyframes`
  0% {
    transform: translateY(50px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;
const Container = styled.div`
 margin: 0 auto;
 padding: 0 20px;
 max-width: 1200px; /* Adjust as needed */
 display: flex;
 flex-wrap: wrap;
 justify-content: space-between;

 @media (max-width: 768px) {
  flex-direction: column;
  align-items: center;
 }

 @media (max-width: 768px) {
  padding: 0 10px;
 }

 @media (max-width: 576px) {
  padding: 0 5px;
 }
`;
const HomeHeroWrapper = styled.div`
 display: flex;
 background-color: #77d215;
 justify-content: space-between;
 align-items: center;
 padding: 20px;
 width: 1200px;
 height: 400px;
 ${({ animateOut }) =>
  animateOut &&
  css`
   animation: ${suckedInAnimation} 0.3s ease-out forwards;
  `}
 position: relative; /* Add position relative to the wrapper */
 border-radius: 10px; /* Add some border-radius for softer edges */

 ::before {
  /* Create a pseudo-element */
  content: "";
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-image: url(${HomeHeroTree});
  background-position: center bottom; /* Start the image from the bottom */
  background-size: 100% calc(100% + 120px); /* Crop the image once it reaches the bounds of the container */
  opacity: 0.04; /* Adjust the opacity of the background image */
  border-radius: 10px; /* Add the same border-radius as the wrapper for consistency */
 }
`;

const ToggleComponentContainer = styled.div`
 padding: 20px;
 width: 1200px;
 height: 600px;

 ${({ animateIn }) =>
  animateIn &&
  css`
   animation: ${riseInAnimation} 0.5s ease-out forwards;
  `}
`;
const SavingsInfo = styled.div`
 width: 55%;
 margin: 20px;
 padding: 5px;
`;

const H3 = styled.h3`
 font-size: 24px;
 margin-bottom: 10px;
`;

const Button = styled.button`
 background-color: #007bff;
 color: white;
 border: none;
 padding: 10px 20px;
 font-size: 16px;
 border-radius: 5px;
 cursor: pointer;
 display: flex;
 align-items: center;
`;

const HomeHero = ({ savings, animateOut }) => {
 const formattedSavings = `${savings.toLocaleString("en-US", {
  style: "currency",
  currency: "USD",
 })}`;

 return (
  <HomeHeroWrapper id='home-hero-wrapper' animateOut={animateOut}>
   <SavingsInfo>
    <H3>
     {savings > 0
      ? `You've saved ${formattedSavings} with ABC Tax Track`
      : "View your latest IRS Transactions"}
    </H3>
    <Button>
     Track Your Progress
     <FontAwesomeIcon
      icon={faChartLine}
      style={{ color: "white", marginLeft: "5px" }}
     />
    </Button>
   </SavingsInfo>
  </HomeHeroWrapper>
 );
};

const AccountSummaryWrapper = styled.div`
 font-family: "Avenir Next Web", "Helvetica Neue Light", "Helvetica Neue",
  Helvetica, Arial, "Lucida Grande", sans-serif;
 box-sizing: border-box;
 -webkit-font-smoothing: antialiased;
 -webkit-tap-highlight-color: transparent;
 width: 600px;
 background: rgb(255, 255, 255);
 border: 1.5px solid rgb(245, 245, 245);
 border-radius: 10px;
 padding: 30px;
`;

const AccountTypesList = styled.ul`
 list-style: none;
 padding: 0;
 margin: 0;
`;

const AccountTypeItem = styled.div`
 display: flex;
 align-items: center;
 border-bottom: 1px solid #ccc;
 padding: 10px 0;
`;

const AccountIcon = styled.i`
 margin-right: 10px;
`;

const AccountTitle = styled.div`
 font-weight: bold;
 margin-right: auto;
`;

const AccountButton = styled.button`
 background-color: #007bff;
 color: white;
 border: none;
 padding: 5px 10px;
 font-size: 14px;
 border-radius: 5px;
 cursor: pointer;
`;

const AccountHeading = styled.h3`
 font-size: 24px;
 margin-bottom: 10px;
`;
const ToggledReturnComponent = () => <div>Toggled Return Component</div>;
const ToggledProComponent = () => <div>Toggled Pro Component</div>;
const ToggledBlogComponent = () => <div>Toggled Blog Component</div>;
const AccountSummary = ({ handleButtonClick }) => {
 return (
  <AccountSummaryWrapper>
   <AccountHeading>Your Track</AccountHeading>
   <AccountTypesList>
    <AccountTypeItem>
     <AccountIcon className='fas fa-chart-line' />
     <AccountTitle>Balance And Transactions</AccountTitle>
     <AccountButton onClick={() => handleButtonClick(<BalanceTransactions />)}>
      Track Case
     </AccountButton>
    </AccountTypeItem>
    <AccountTypeItem>
     <AccountIcon className='fas fa-clock' />
     <AccountTitle>Return Organizer</AccountTitle>
     <AccountButton onClick={() => handleButtonClick(ToggledReturnComponent)}>
      Set up
     </AccountButton>
    </AccountTypeItem>
    <AccountTypeItem>
     <AccountIcon className='fas fa-credit-card' />
     <AccountTitle>Tax Track Pro</AccountTitle>
     <AccountButton onClick={() => handleButtonClick(ToggledProComponent)}>
      Set up
     </AccountButton>
    </AccountTypeItem>
    <AccountTypeItem>
     <AccountIcon className='fa-solid fa-book-open-reader' />
     <AccountTitle>Tax Education</AccountTitle>
     <AccountButton onClick={() => handleButtonClick(ToggledBlogComponent)}>
      Explore
     </AccountButton>
    </AccountTypeItem>
   </AccountTypesList>
  </AccountSummaryWrapper>
 );
};

const MilestonesContainer = styled.div`
 line-height: 1.15;
 text-size-adjust: 100%;
 font-family: "Avenir Next Web", "Helvetica Neue Light", "Helvetica Neue",
  Helvetica, Arial, "Lucida Grande", sans-serif;
 box-sizing: border-box;
 -webkit-font-smoothing: antialiased;
 -webkit-tap-highlight-color: transparent;
 background: rgb(255, 255, 255);
 width: 600px;
 border: 1.5px solid rgb(245, 245, 245);
 border-radius: 10px;
 flex: 1;
 font-family: "Avenir Next Web", "Helvetica Neue Light", "Helvetica Neue",
  Helvetica, Arial, "Lucida Grande", sans-serif;
 box-sizing: border-box;
 -webkit-font-smoothing: antialiased;
 -webkit-tap-highlight-color: transparent;
 width: 600px;
 background: rgb(255, 255, 255);
 border: 1.5px solid rgb(245, 245, 245);
 border-radius: 10px;
 padding: 30px;
 max-width: 600px;

 @media (max-width: 768px) {
  width: 100%;
 }
 margin-bottom: 20px;
`;

const AccountSummaryContainer = styled.div`
 flex: 1;
 max-width: 600px;
 margin-right: 20px;

 @media (max-width: 768px) {
  margin-right: 0;
  margin-bottom: 20px;
 }
`;

const MilestoneContainer = styled.div`
 display: flex;
 align-items: center;
 padding: 10px;
 border-bottom: 1px solid #ccc;
`;

const MilestoneIcon = styled.img`
 width: 50px;
 height: 50px;
`;

const MilestoneTitle = styled.strong`
 margin-left: 10px;
 font-size: 16px;
`;

const ProgressBarContainer = styled.div`
 flex: 1;
 margin-left: 20px;
`;

const ProgressBar = styled.div`
 height: 10px;
 background-color: #f0f0f0;
 border-radius: 5px;
 overflow: hidden;
`;

const Progress = styled.div`
 height: 100%;
 background-color: ${(props) => props.progressColor};
 width: ${(props) => props.percent}%;
`;

const milestonesData = [
 {
  iconSrc: "https://4p4d3b.media.zestyio.com/invest_balance_reached_v1.png",
  title: "Tax Year 2020",
  progressPercent: 100,
  progressColor: "#bb86fc",
 },
 {
  iconSrc: "https://4p4d3b.media.zestyio.com/invest_balance_reached_v1.png",
  title: "Tax Year 2019",
  progressPercent: 50,
  progressColor: "#bb86fc",
 },
 {
  iconSrc: "https://4p4d3b.media.zestyio.com/invest_balance_reached_v1.png",
  title: "Tax Year 2018",
  progressPercent: 25,
  progressColor: "#bb86fc",
 },
];
const MilestoneItem = ({ iconSrc, title, progressPercent, progressColor }) => {
 return (
  <MilestoneContainer>
   <MilestoneIcon src={iconSrc} alt='category' />
   <MilestoneTitle>{title}</MilestoneTitle>
   <ProgressBarContainer>
    <ProgressBar>
     <Progress percent={progressPercent} progressColor={progressColor} />
    </ProgressBar>
   </ProgressBarContainer>
  </MilestoneContainer>
 );
};

const Milestones = () => {
 return (
  <MilestonesContainer>
   <AccountHeading>Milestones</AccountHeading>
   {milestonesData.map((milestone, index) => (
    <MilestoneItem key={index} {...milestone} />
   ))}
  </MilestonesContainer>
 );
};
const Home = () => {
 //const { profile } = useContext(AuthContext);

 const profile = { startingBalance: 50000, currentBalance: 32000 };

 const savings = profile.startingBalance - profile.currentBalance;
 const [animateOut, setAnimateOut] = useState(false);
 const [animateIn, setAnimateIn] = useState(false);
 const [selectedComponent, setSelectedComponent] = useState(null);

 const handleButtonClick = (component) => {
  setAnimateOut(true);
  setTimeout(() => {
   setSelectedComponent(component);
   setAnimateIn(true);
  }, 300); // Set a delay that matches the duration of the sucked-in animation
 };
 return (
  <Container>
   {selectedComponent !== null ? (
    <ToggleComponentContainer animateIn={animateIn}>
     {selectedComponent}
    </ToggleComponentContainer>
   ) : (
    <HomeHero savings={savings} animateOut={animateOut} />
   )}
   <AccountSummaryContainer>
    <AccountSummary handleButtonClick={handleButtonClick} />
   </AccountSummaryContainer>
   <Milestones />
  </Container>
 );
};

export default Home;
