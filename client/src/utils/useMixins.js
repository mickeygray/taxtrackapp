import React, { useState } from "react";
import {
 Typography,
 Button,
 Container,
 Grid,
 Paper,
 Box,
 useMediaQuery,
} from "@mui/material";
import styled, { css, keyframes } from "styled-components";

const colors = css`
  --color-black: #121212;
  --color-logo-green: #77d215;
  --color-light: #fff;
  --color-error: #e74c3c;
  --color-warning: #f1c40f;
  --color-info: #3498db;
  --color-success: #07bc0c;
  --color-dark: #004900;
  --color-primary-green: #74c947;
  --color-primary-purple: #6944ff;
  --color-solid-slate: #191919;
  --color-dark-grey: #323436;
  --color-solid-stone: #6f6f6f;
  --color-light-grey: #767676;
  --color-ivory: #f5f5f5;
  --color-ivory-light: #f9f9f9;
  --color-off-white: #fcfcfc;
  --color-stone-light: #cccfcf;
  --color-white: #fff;
  --color-ecru: #f3f0e6;
  --color-ice-blue: #e5ecee;
 --color-light-tan: rgb(244, 231, 212);
};`;
const fadeInAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
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

const formControlMixin = css`
 width: 100%;
 height: 40px;
 padding: 8px;
 font-size: 0.875rem;
 border-radius: 8px;
 box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
 background-color: #fff;
 position: relative;
 transition: box-shadow 0.3s ease;

 & label {
  position: absolute;
  top: -5px;
  left: -5px;
  font-size: 1rem;
 }

 & legend {
  font-size: 0.6rem;
 }

 &:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
 }
`;

const containerMixin = css`
 max-width: 1200px;
 margin: 0 auto;
 padding: 0 16px;
`;

const heroMixin = css`
 position: relative;
 height: calc(100vh - 100px);
 overflow: hidden;
 width: 100vw;
 margin-top: -20px;
`;

const heroImageMixin = css`
 position: absolute;
 top: -100px;
 left: 0;
 width: 100vw;
 height: 100vh;
 opacity: 0.5;
 object-fit: cover;
 z-index: -1;
`;

const heroContentMixin = css`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translate(-50%, -50%);
 text-align: center;
`;

const heroTitleMixin = css`
 font-size: 36px;
 margin-bottom: 20px;
`;

const heroSubtitleMixin = css`
 font-size: 18px;
 margin-bottom: 30px;
`;

const heroButtonMixin = css`
 padding: 10px 20px;
 background-color: #333;
 color: #fff;
 border: none;
 border-radius: 20px;
 font-size: 16px;
 cursor: pointer;
 &.MuiButtonBase-root {
  pointer-events: none;
  color: #fff;

  border-radius: 20px;
  font-size: 16px;
  padding: 10px 20px;
 }
`;

const circleButtonMixin = css`
 width: 104px;
 height: 104px;
 border-radius: 50%;
 background-color: #007bff;
 color: white;
 font-size: 16px;
 z-index: 1;
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
  /* Set button properties based on angle */
  ${angle === 225
   ? css`
      background-color: blue;
      width: 100px;
      height: 110px;
      border-radius: 10px;
      @media (max-width: 768px) {
       width: 85px;
       height: 55px;
      }
     `
   : angle === 315
   ? css`
      background-color: green;
      width: 130px;
      height: 120px;
      border-radius: 10px;
      @media (max-width: 768px) {
       width: 100px;
       height: 65px;
      }
     `
   : angle === 45
   ? css`
      background-color: orange;
      width: 125px;
      height: 115px;
      border-radius: 10px;
      @media (max-width: 768px) {
       width: 85px;
       height: 60px;
      }
     `
   : angle === 135
   ? css`
      background-color: purple;
      width: 125px;
      height: 90px;
      border-radius: 10px;
      @media (max-width: 768px) {
       width: 85px;
       height: 40px;
      }
     `
   : ""}
 `}
`;

const textWrapperMixin = css`
 width: 50%;
 padding-left: 40px;
 padding-right: 40px;
 @media (max-width: 768px) {
  width: 100%;
  /* Adjust the font size for mobile */
 }
`;

const circleWrapperMixin = css`
 position: relative;
 height: 600px;
 width: 600px;

 ${({ animate }) =>
  animate &&
  css`
   animation: ${fadeOutAnimation} 1.5s linear 1s;
   animation-play-state: running;
  `}
`;

const learnMoreButtonMixin = css`
 width: 104px;
 height: 104px;
 border-radius: 50%;
 background-color: #007bff;
 color: white;
 font-size: 16px;
 font-weight: bold;
 cursor: pointer;
 margin: 10px;
 position: absolute;
 top: 56%;
 left: 57%;
 transform: translate(-50%, -50%);

 ${({ animate }) =>
  animate &&
  css`
   animation: ${scaleUpAnimation} 1.5s linear 1s;
   animation-play-state: running;
  `}
`;

const outerWrapperMixin = css`
 animation: ${fadeInAnimation} 2s ease-in;
`;

const carouselButtonMixin = css`
 border-radius: 50%;
 display: flex;
 color: white;
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
 @media (max-width: 768px) {
  height: 77px;
  width: 77px;
  transform: ${({ active }) => (active ? "translateX(0)" : "translateX(-60%)")};
  font-size: 0.8rem;
  margin: 10px; /* Add some margin to separate the buttons */
 }
`;

const infoContentMixin = css`
 height: 300px;
 transition: opacity 300ms ease-in-out; /* Opacity transition */
`;

const sectionButtonMixin = css`
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
 &.MuiButtonBase-root {
  pointer-events: none;
  color: #fff;

  border-radius: 20px;
  font-size: 16px;
  padding: 10px 20px;
 }
`;

const carouselImageMixin = css`
 max-width: 300px;
 height: 400px;
 border-radius: 10px;

 @media (max-width: 768px) {
  max-width: 200px;
  height: 300px;
 }
`;

const animatedImageMixin = css`
 max-width: 300px;
 height: 400px;
 border-radius: 10px;
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translate(-50%, -50%);

 @media (max-width: 768px) {
  max-width: 100px;
  height: 200px;
 }
`;

const CircleWrapper = styled(Box)`
 ${circleWrapperMixin}
`;
const LearnMoreButton = styled(Box)`
 ${learnMoreButtonMixin}
`;
const CircleButton = styled(Box)`
 ${circleButtonMixin}
`;
const TextWrapper = styled(Box)`
 ${textWrapperMixin}
`;

const OuterWrapper = styled(Container)`
 ${outerWrapperMixin}
`;

const CarouselButton = styled(Box)`
 ${carouselButtonMixin}
`;

const InfoContent = styled(Box)`
 ${infoContentMixin}
`;

const SectionButton = styled(Button)`
 ${sectionButtonMixin}
`;

const CarouselImage = styled.img`
 ${carouselImageMixin}
`;

const AnimatedImage = styled.img`
 ${animatedImageMixin}
`;
const HeroContainer = styled(Box)`
 ${heroMixin}
`;

const HeroImageBox = styled(Paper)`
 ${heroImageMixin}
`;

const HeroContentBox = styled(Box)`
 ${heroContentMixin}
`;

const HeroTitle = styled(Typography)`
 ${heroTitleMixin}
`;

const HeroSubtitle = styled(Typography)`
 ${heroSubtitleMixin}
`;

const HeroButton = styled(Button)`
 ${heroButtonMixin}
`;

const ColorWrapper = styled.div`
 ${colors}
`;

export {
 HeroButton,
 HeroSubtitle,
 HeroTitle,
 HeroContentBox,
 HeroImageBox,
 HeroContainer,
 AnimatedImage,
 CarouselImage,
 SectionButton,
 InfoContent,
 CarouselButton,
 OuterWrapper,
 TextWrapper,
 CircleButton,
 LearnMoreButton,
 CircleWrapper,
 ColorWrapper,
};
