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
import IncludedToggle from "./IncludedToggle";
import ClosingSignUp from "./ClosingSignup";
import Footer from "./Footer";

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

const Landing = () => {
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
   <IncludedToggle />
   <ClosingSignUp />
   <Footer />
  </LandingParent>
 );
};

export default Landing;
