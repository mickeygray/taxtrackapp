import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

const scrollingAnimation = keyframes`
  0% {
    transform: translateX(40%); /* Start halfway across the screen */
  }
  100% {
    transform: translateX(-100%);
  }
`;

const RotatingHeadline = styled.h2`
 font-family: "Avenir Next", Helvetica, Arial, sans-serif;
 font-size: 24px; /* Smaller font size */
 line-height: 32px;
 font-weight: 400;
 color: #333333; /* Darker color */
 white-space: nowrap;
`;

const ScrollingDiv = styled.div`
 display: block; /* Ensures the div behaves like a block element */
 overflow: hidden;
 white-space: nowrap;
 margin-top: 100px;

 height: 100px; /* Fixed height to prevent overlap, adjust as needed */
 line-height: 50px; /* Aligns text vertically, adjust to match height or as needed */
`;

const ScrollingText = styled.span`
 display: inline-block;
 padding-left: 20px;

 padding-right: 20px;
 animation: ${scrollingAnimation} 120s linear infinite; /* Slower animation */
`;
const ArticleContainer = styled.div`
 margin-top: 30px;
 margin-bottom: 30px;
 display: inline-block; // Ensures articles are in a line
 margin-right: 20px; // Space between articles, adjust as needed
`;

const ArticleTitle = styled.span`
 font-weight: bold;
 margin-right: 5px;
`;

const ArticleDate = styled.span`
 font-size: 16px;
 color: #666;
 margin: 0 10px;
`;

const ArticleBody = styled.span``;

const ScrollingHeadline = () => {
 const [newsArticles, setNewsArticles] = useState([
  {
   title: "IRS launches Simple Notice Initiative redesign effort IR-2024-19",
   date: "Jan. 23, 2024",
   body:
    "The Internal Revenue Service today announced work is underway on the Simple Notice Initiative, a sweeping effort to simplify and clarify about 170 million letters sent annually to taxpayers.",
  },
  {
   title:
    "Taxpayers should continue to report all cryptocurrency, digital asset income IR-2024-18",
   date: "Jan. 22, 2024",
   body:
    "The Internal Revenue Service today reminded taxpayers that they must again answer a digital asset question and report all digital asset related income when they file their 2023 federal income tax return, as they did for their 2022 federal tax returns.",
  },
 ]);

 return (
  <ScrollingDiv>
   <ScrollingText>
    {newsArticles.map((article, index) => (
     <ArticleContainer key={index}>
      <ArticleTitle>{article.title}</ArticleTitle>
      <ArticleDate>{article.date}</ArticleDate>
      <ArticleBody>{article.body}</ArticleBody>
     </ArticleContainer>
    ))}
   </ScrollingText>
  </ScrollingDiv>
 );
};

export default ScrollingHeadline;
