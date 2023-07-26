import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

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

const ScrollingHeadline = () => {
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
 return (
  <ScrollingDiv>
   <h5 style={{ textAlign: "center" }}>
    An Easier Way To Communicate With The IRS
   </h5>
   <ScrollingText scrollingUp={scrollingUp}>
    <RotatingHeadline>
     WHY TAX TRACK - WHY TAX TRACK - WHY TAX TRACK - WHY TAX TRACK - WHY TAX
     TRACK WHY TAX TRACK - WHY TAX TRACK - WHY TAX TRACK - WHY TAX TRACK - WHY
     TAX TRACK WHY TAX TRACK - WHY TAX TRACK - WHY TAX TRACK - WHY TAX TRACK -
     WHY TAX TRACK
    </RotatingHeadline>
   </ScrollingText>
  </ScrollingDiv>
 );
};

export default ScrollingHeadline;
