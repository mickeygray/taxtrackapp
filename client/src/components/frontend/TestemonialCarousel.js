import React, { useState } from "react";
import { Grid, Typography, Box, useMediaQuery } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import styled from "styled-components";
import { useTheme } from "@mui/material/styles";
const Testimonials = [
 {
  id: 1,

  name: "Emily Parker",
  image: process.env.PUBLIC_URL + "/images/person1.jpg",
  text:
   "As a small business owner, Tax Track has been a game-changer for me. It simplifies tax management and makes it easy for me to keep track of my business expenses and deductions. The expert guidance provided by Tax Track has saved me time and money. I highly recommend Tax Track to all small business owners.",
 },
 {
  id: 2,
  name: "Michael Anderson",
  image: process.env.PUBLIC_URL + "/images/person2.jpg",
  text:
   "Tax Track has made tax filing hassle-free for me, even in my retirement years. Its user-friendly platform and personalized support have been invaluable. With Tax Track, I can confidently navigate tax challenges and maximize my retirement savings. It's a reliable partner in my financial journey.",
 },
 {
  id: 3,
  name: "Jonathan Sanchez",
  image: process.env.PUBLIC_URL + "/images/person3.jpg",
  text:
   "Being a sole proprietor, I used to dread tax season. But Tax Track changed everything. It streamlines my return preparation and keeps me updated on the latest tax laws. With Tax Track, I can focus on growing my business, knowing that my tax obligations are well taken care of.",
 },
 {
  id: 4,

  name: "Elizabeth Roberts",
  image: process.env.PUBLIC_URL + "/images/person4.jpg",
  text:
   "After retiring, I was unsure how to manage my finances efficiently. Tax Track came to the rescue! It provides me with comprehensive financial insights, helping me make informed decisions about my retirement funds. Thanks to Tax Track, I feel confident about my financial future.",
 },
];

const CircleContainer = styled.div`
 width: 100px;
 height: 100px;
 border: 1px solid var(--color-ivory);
 border-radius: 50%;
 position: relative;
`;

const TestimonialCarousel = () => {
 const [activeSlide, setActiveSlide] = useState(0);
 const totalSlides = Testimonials.length;

 const handleNextSlide = () => {
  setActiveSlide((prevIndex) => (prevIndex + 1) % totalSlides);
 };

 const handlePrevSlide = () => {
  setActiveSlide((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
 };

 const currentTestimonial = Testimonials[activeSlide];

 // Define the breakpoint for small screens (sm)
 const theme = useTheme();
 const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

 return (
  <Box
   sx={{
    width: "100vw",
    height: "700px",
    backgroundColor: "var(--color-primary-purple)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
   }}>
   <Box
    mt={isMobile ? 5 : 0}
    width={isMobile ? "100%" : "50%"}
    display='flex'
    flexDirection='column'
    alignItems={"center"}
    textAlign={isMobile ? "center" : "left"}
    px={isMobile ? 2 : 0}>
    <Box
     display='flex'
     justifyContent={isMobile ? "center" : "flex-end"}
     alignItems='center'>
     <Typography
      variant={isMobile ? "body1" : "h6"}
      gutterBottom
      width={isMobile ? "100%" : "500px"}
      color='var(--color-ivory)'>
      {currentTestimonial.text}
     </Typography>{" "}
     <Box justifyContent={isMobile ? "center" : "flex-end"} alignItems='center'>
      <img
       src={currentTestimonial.image}
       alt={currentTestimonial.name}
       style={{
        width: "200px",
        height: "200px",
        borderRadius: "40%",
        margin: "10px",
        maxWidth: isMobile ? "300px" : "600px",
       }}
      />
      <Typography
       variant={isMobile ? "body2" : "h5"}
       gutterBottom
       color='var(--color-ivory)'>
       {currentTestimonial.name}
      </Typography>{" "}
     </Box>
    </Box>

    <CircleContainer>
     <Box
      sx={{
       position: "absolute",
       top: "50%",
       left: "50%",
       transform: "translate(-50%, -50%)",
       display: "flex",
       gap: "18px",
      }}>
      <ArrowBackIcon
       sx={{
        color: "var(--color-ivory)",
        cursor: "pointer",
       }}
       onClick={handlePrevSlide}
      />
      <ArrowForwardIcon
       sx={{
        color: "var(--color-ivory)",
        cursor: "pointer",
       }}
       onClick={handleNextSlide}
      />
     </Box>
    </CircleContainer>
   </Box>
  </Box>
 );
};

export default TestimonialCarousel;
