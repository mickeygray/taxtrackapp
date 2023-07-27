import React, { useState, useEffect, useContext } from "react";
import styled, { keyframes, css } from "styled-components";

import Hero from "./Hero";

import SettlementCalculator from "./SettlementCalculator";

import AnimatedCarousel from "./AnimatedCarousel";
import ScrollingHeadline from "./ScrollingHeadline";
import ComponentGrid from "./ComponentGrid";

import ChartDisclaimer from "./ChartDisclaimer";
import CountingUp from "./CountingUp";
import TestimonialCarousel from "./TestemonialCarousel";
import IncludedToggle from "./IncludedToggle";
import ClosingSignUp from "./ClosingSignup";
import Footer from "./Footer";

const Landing = () => {
 return (
  <>
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
  </>
 );
};

export default Landing;
