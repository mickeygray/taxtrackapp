import React, { useState, useRef, startTransition } from "react";
import Slider, { slickNext, slickPrev } from "infinite-react-carousel";
import styled, { css } from "styled-components";
import { Box, Typography, Fade } from "@mui/material";

const blogs = [
 {
  thumbnailSrc: "/images/blog1-thumbnail.jpg",
  title: "Blog 1",
  author: "John Doe",
  date: "July 19, 2023",
  content: [
   "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
   "Pellentesque euismod libero vitae odio lobortis, in euismod magna cursus.",
   "Nulla facilisi. Mauris id dolor at odio volutpat eleifend.",
  ],
  contentImages: [
   "/images/blog1-image1.jpg",
   "/images/blog1-image2.jpg",
   "/images/blog1-image3.jpg",
  ],
 },
 {
  thumbnailSrc: "/images/blog1-thumbnail.jpg",
  title: "Blog 2",
  author: "Jane Doe",
  date: "July 20, 2023",
  content: [
   "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
   "Pellentesque euismod libero vitae odio lobortis, in euismod magna cursus.",
   "Nulla facilisi. Mauris id dolor at odio volutpat eleifend.",
  ],
  contentImages: [
   "/images/blog1-image1.jpg",
   "/images/blog1-image2.jpg",
   "/images/blog1-image3.jpg",
  ],
 },
 {
  thumbnailSrc: "/images/blog1-thumbnail.jpg",
  title: "Blog 3",
  author: "John Smith",
  date: "July 21, 2023",
  content: [
   "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
   "Pellentesque euismod libero vitae odio lobortis, in euismod magna cursus.",
   "Nulla facilisi. Mauris id dolor at odio volutpat eleifend.",
  ],
  contentImages: [
   "/images/blog1-image1.jpg",
   "/images/blog1-image2.jpg",
   "/images/blog1-image3.jpg",
  ],
 },
 {
  thumbnailSrc: "/images/blog1-thumbnail.jpg",
  title: "Blog 4",
  author: "Emily Johnson",
  date: "July 21, 2023",
  content: [
   "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
   "Pellentesque euismod libero vitae odio lobortis, in euismod magna cursus.",
   "Nulla facilisi. Mauris id dolor at odio volutpat eleifend.",
  ],
  contentImages: [
   "/images/blog1-image1.jpg",
   "/images/blog1-image2.jpg",
   "/images/blog1-image3.jpg",
  ],
 },
 {
  thumbnailSrc: "/images/blog1-thumbnail.jpg",
  title: "Blog 5",
  author: "Robert Williams",
  date: "July 21, 2023",
  content: [
   "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
   "Pellentesque euismod libero vitae odio lobortis, in euismod magna cursus.",
   "Nulla facilisi. Mauris id dolor at odio volutpat eleifend.",
  ],
  contentImages: [
   "/images/blog1-image1.jpg",
   "/images/blog1-image2.jpg",
   "/images/blog1-image3.jpg",
  ],
 },
 {
  thumbnailSrc: "/images/blog1-thumbnail.jpg",
  title: "Blog 6",
  author: "Sophia Brown",
  date: "July 21, 2023",
  content: [
   "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
   "Pellentesque euismod libero vitae odio lobortis, in euismod magna cursus.",
   "Nulla facilisi. Mauris id dolor at odio volutpat eleifend.",
  ],
  contentImages: [
   "/images/blog1-image1.jpg",
   "/images/blog1-image2.jpg",
   "/images/blog1-image3.jpg",
  ],
 },
 {
  thumbnailSrc: "/images/blog1-thumbnail.jpg",
  title: "Blog 7",
  author: "John7 Smith",
  date: "July 21, 2023",
  content: [
   "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
   "Pellentesque euismod libero vitae odio lobortis, in euismod magna cursus.",
   "Nulla facilisi. Mauris id dolor at odio volutpat eleifend.",
  ],
  contentImages: [
   "/images/blog1-image1.jpg",
   "/images/blog1-image2.jpg",
   "/images/blog1-image3.jpg",
  ],
 },
 {
  thumbnailSrc: "/images/blog1-thumbnail.jpg",
  title: "Blog 8",
  author: "John8 Smith",
  date: "July 21, 2023",
  content: [
   "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
   "Pellentesque euismod libero vitae odio lobortis, in euismod magna cursus.",
   "Nulla facilisi. Mauris id dolor at odio volutpat eleifend.",
  ],
  contentImages: [
   "/images/blog1-image1.jpg",
   "/images/blog1-image2.jpg",
   "/images/blog1-image3.jpg",
  ],
 },
 {
  thumbnailSrc: "/images/blog1-thumbnail.jpg",
  title: "Blog 9",
  author: "John9 Smith",
  date: "July 21, 2023",
  content: [
   "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
   "Pellentesque euismod libero vitae odio lobortis, in euismod magna cursus.",
   "Nulla facilisi. Mauris id dolor at odio volutpat eleifend.",
  ],
  contentImages: [
   "/images/blog1-image1.jpg",
   "/images/blog1-image2.jpg",
   "/images/blog1-image3.jpg",
  ],
 },
 {
  thumbnailSrc: "/images/blog1-thumbnail.jpg",
  title: "Blog 10",
  author: "John 10 Smith",
  date: "July 21, 2023",
  content: [
   "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
   "Pellentesque euismod libero vitae odio lobortis, in euismod magna cursus.",
   "Nulla facilisi. Mauris id dolor at odio volutpat eleifend.",
  ],
  contentImages: [
   "/images/blog1-image1.jpg",
   "/images/blog1-image2.jpg",
   "/images/blog1-image3.jpg",
  ],
 },
 {
  thumbnailSrc: "/images/blog1-thumbnail.jpg",
  title: "Blog 11",
  author: "John 11 Smith",
  date: "July 21, 2023",
  content: [
   "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
   "Pellentesque euismod libero vitae odio lobortis, in euismod magna cursus.",
   "Nulla facilisi. Mauris id dolor at odio volutpat eleifend.",
  ],
  contentImages: [
   "/images/blog1-image1.jpg",
   "/images/blog1-image2.jpg",
   "/images/blog1-image3.jpg",
  ],
 },
 {
  thumbnailSrc: "/images/blog1-thumbnail.jpg",
  title: "Blog 12",
  author: "John 12 Smith",
  date: "July 21, 2023",
  content: [
   "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
   "Pellentesque euismod libero vitae odio lobortis, in euismod magna cursus.",
   "Nulla facilisi. Mauris id dolor at odio volutpat eleifend.",
  ],
  contentImages: [
   "/images/blog1-image1.jpg",
   "/images/blog1-image2.jpg",
   "/images/blog1-image3.jpg",
  ],
 },
 {
  thumbnailSrc: "/images/blog1-thumbnail.jpg",
  title: "Blog 13",
  author: "John 13 Smith",
  date: "July 21, 2023",
  content: [
   "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
   "Pellentesque euismod libero vitae odio lobortis, in euismod magna cursus.",
   "Nulla facilisi. Mauris id dolor at odio volutpat eleifend.",
  ],
  contentImages: [
   "/images/blog1-image1.jpg",
   "/images/blog1-image2.jpg",
   "/images/blog1-image3.jpg",
  ],
 },
 {
  thumbnailSrc: "/images/blog1-thumbnail.jpg",
  title: "Blog 14",
  author: "John 14 Smith",
  date: "July 21, 2023",
  content: [
   "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
   "Pellentesque euismod libero vitae odio lobortis, in euismod magna cursus.",
   "Nulla facilisi. Mauris id dolor at odio volutpat eleifend.",
  ],
  contentImages: [
   "/images/blog1-image1.jpg",
   "/images/blog1-image2.jpg",
   "/images/blog1-image3.jpg",
  ],
 },
 {
  thumbnailSrc: "/images/blog1-thumbnail.jpg",
  title: "Blog 15",
  author: "John 15 Smith",
  date: "July 21, 2023",
  content: [
   "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
   "Pellentesque euismod libero vitae odio lobortis, in euismod magna cursus.",
   "Nulla facilisi. Mauris id dolor at odio volutpat eleifend.",
  ],
  contentImages: [
   "/images/blog1-image1.jpg",
   "/images/blog1-image2.jpg",
   "/images/blog1-image3.jpg",
  ],
 },
];
const BlogLibrary = () => {
 const visibleBlogs = 7; // Number of visible blogs
 const initialSlide = Math.floor(blogs.length / 2); // Index of the middle blog
 const [focusedIndex, setFocusedIndex] = useState(initialSlide);
 const [showContent, setShowContent] = useState(false); // State to control content visibility
 const [startTransition, setStartTransition] = useState(false);
 const [currentBlog, setCurrentBlog] = useState(null);
 const [mappedBlogs, setBlogs] = useState(blogs);

 const handleLearnMore = (blog) => {
  setStartTransition(true);
  setCurrentBlog(blog);
  // Add a setTimeout to trigger loading the new content after 2 seconds
  setTimeout(() => {
   setShowContent(true);
   setStartTransition(false); // Reset startTransition
  }, 1000); // 2-second delay before showing the content
 };
 const sliderRef = useRef(null);

 // Function to move to the previous slide using slickPrev
 const previousSlide = () => {
  sliderRef.current.slickPrev();
  setFocusedIndex((prevIndex) => {
   const newIndex = prevIndex === 0 ? blogs.length - 1 : prevIndex - 1;
   return newIndex;
  });
 };

 // Function to move to the next slide using slickNext
 const nextSlide = () => {
  sliderRef.current.slickNext();
  setFocusedIndex((prevIndex) => {
   const newIndex = prevIndex === blogs.length - 1 ? 0 : prevIndex + 1;
   return newIndex;
  });
 };
 const carouselSettings = {
  centerMode: true,
  arrows: false,
  slidesToShow: visibleBlogs,
  centerPadding: 0,
  initialSlide: initialSlide,
  dots: false,
  autoplay: false,
  afterChange: (currentSlide) => setFocusedIndex(currentSlide),
 };

 return (
  <CarouselContainer>
   {/* Conditional rendering based on showContent state */}
   {showContent ? (
    <ContentDiv>
     <ContentTitle>{currentBlog.title}</ContentTitle>
     <ContentAuthor>by {currentBlog.author}</ContentAuthor>
     <ContentDate>{currentBlog.date}</ContentDate>
     <ContentSection>
      {currentBlog.content.map((paragraph, index) => (
       <ContentText key={index}>{paragraph}</ContentText>
      ))}
     </ContentSection>
     <ContentSection>
      {currentBlog.contentImages.map((image, index) => (
       <ContentImage
        style={{ width: "100px", height: "100px" }}
        key={index}
        src={image}
        alt={`Image ${index + 1}`}
       />
      ))}
     </ContentSection>
    </ContentDiv>
   ) : (
    <SliderContainer startTransition={startTransition}>
     {/* Slider */}
     <SliderWrapper>
      {/* Slider */}
      <Slider ref={sliderRef} {...carouselSettings}>
       {mappedBlogs.map((blog, index) => (
        <BlogCard
         key={index}
         focused={index === focusedIndex}
         index={index}
         thumbnailSrc={blog.thumbnailSrc}
         focusedIndex={focusedIndex}>
         <BlogTitle>{blog.title}</BlogTitle>
         <BlogAuthor>by {blog.author}</BlogAuthor>
         {index === focusedIndex && (
          <LearnMoreButton onClick={() => handleLearnMore(blog)}>
           Learn More
          </LearnMoreButton>
         )}
        </BlogCard>
       ))}
      </Slider>
     </SliderWrapper>
     <PrevArrow onClick={previousSlide}>&#10094;</PrevArrow>
     <NextArrow onClick={nextSlide}>&#10095;</NextArrow>
    </SliderContainer>
   )}
  </CarouselContainer>
 );
};
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
const ContentTitle = styled.h1`
 font-size: 24px;
 margin-bottom: 16px;
`;

const ContentAuthor = styled.p`
 font-size: 16px;
 color: #777;
 margin-bottom: 8px;
`;

const ContentDate = styled.p`
 font-size: 14px;
 color: #777;
 margin-bottom: 8px;
`;

const ContentText = styled.p`
 margin-bottom: 12px;
`;

const ContentImage = styled.img`
 max-width: 100%;
 margin-bottom: 12px;
`;

const ContentSection = styled.div`
 margin-bottom: 20px;
 display: flex;
 flex-wrap: wrap;
 gap: 20px;
`;
const PrevArrow = styled.div`
 position: absolute;
 top: 50%;
 left: 100px;
 transform: translateY(-50%);
 cursor: pointer;
 font-size: 24px;
 z-index: 1;
 color: var(--color-primary-purple); /* Blue color */
 background-color: var(--color-ivory); /* White background */
 border: 1px solid var(--color-primary-purple); /* Blue border */
 border-radius: 50%; /* Circle shape */
 padding: 10px; /* Padding around the icon */
 transition: background-color 0.3s ease; /* Add a smooth transition on hover */

 &:hover {
  background-color: #007bff; /* Change background color on hover */
  color: #fff; /* Change icon color on hover */
 }
`;

const NextArrow = styled.div`
 position: absolute;
 top: 50%;
 right: 100px;
 transform: translateY(-50%);
 cursor: pointer;
 font-size: 24px;
 z-index: 1;
 color: var(--color-primary-purple); /* Blue color */
 background-color: var(--color-ivory); /* White background */
 border: 1px solid var(--color-primary-purple); /* Blue bo */
 border-radius: 50%; /* Circle shape */
 padding: 10px; /* Padding around the icon */
 transition: background-color 0.3s ease; /* Add a smooth transition on hover */

 &:hover {
  background-color: #007bff; /* Change background color on hover */
  color: #fff; /* Change icon color on hover */
 }
`;
const CarouselContainer = styled.div`
 height: 600px;
 ${colors}
`;

const SliderContainer = styled.div`
 /* Style for the slider container */
 background-color: var(--color-black);
 height: 100%;
 transition: transform 2s ease-in-out;
 display: flex;
 align-items: center; /* Vertically center the Slider */
 justify-content: center; /* Horizontally center the Slider */

 ${(props) => props.startTransition && "transform: translateX(-100%);"};
`;

const BlogCard = styled.div`
 min-height: 400px;
 width: ${(props) => (props.focused ? "3000px" : "300px")};
 /* Adjust the width to fit 7 cards in the visible area */
 height: ${(props) =>
  props.focused ? "400px" : "200px"}; /* Adjust the height to fit the cards */
 margin: 0 10px; /* Adjust the margin to add spacing between cards */
 border: 1px solid #ccc;
 padding: 16px;
 background-image: ${(props) => `url(${props.thumbnailSrc})`};
 background-color: ${(props) => (props.focused ? "#f2f2f2" : "#fff")};
 transform: ${(props) =>
  props.index !== props.focusedIndex
   ? `skewY(${props.index < props.focusedIndex ? "-" : ""}${30}deg)`
   : ""};
  background-size: 100% ${(props) => (props.focused ? "400px" : "200px")};
  background-repeat: no-repeat; /* Prevent the background image from repeating */
  background-position: center; /* Center
`;

const BlogTitle = styled.h3`
 font-size: 18px;
 margin-bottom: 8px;
`;

const BlogAuthor = styled.p`
 font-size: 14px;
 color: #777;
`;

const LearnMoreButton = styled.button`
 /* Style for the "Learn More" button */
 background-color: #007bff;
 color: #fff;
 border: none;
 padding: 8px 16px;
 cursor: pointer;
 margin-top: 16px;
 font-size: 14px;
 border-radius: 4px;
`;

const ContentDiv = styled.div`
 /* Style for the content div */
 padding: 16px;
 background-color: #f2f2f2;
 font-size: 14px;
 height: 100%;
 animation: slideFromRight 2s ease-in-out; /* Add slide-from-right animation */

 @keyframes slideFromRight {
  from {
   transform: translateX(100%); /* Start from the right */
  }
  to {
   transform: translateX(0); /* End at the original position */
  }
 }
`;

const SliderWrapper = styled.div`
 /* Style for the Slider wrapper */
 width: 100vw; /* Set the width of the wrapper to 100% */
`;

export default BlogLibrary;
