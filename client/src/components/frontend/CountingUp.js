import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Typography, Box, useMediaQuery } from "@mui/material";
import VisibilitySensor from "react-visibility-sensor";

const HighlightedTextComponent = () => {
 const theme = useTheme();
 const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
 const [currentValue, setCurrentValue] = useState(0);
 const endValue = 15000000;
 const duration = 6000;
 const fps = 200;
 const increment = (endValue / duration) * (1000 / fps);

 const startAnimation = () => {
  let startTimestamp = null;
  const animationFrame = (timestamp) => {
   if (!startTimestamp) startTimestamp = timestamp;
   const progress = timestamp - startTimestamp;
   const newValue = Math.min(currentValue + progress * increment, endValue);
   setCurrentValue(newValue);

   if (newValue < endValue) {
    requestAnimationFrame(animationFrame);
   }
  };

  requestAnimationFrame(animationFrame);
 };

 const handleVisibilityChange = (isVisible) => {
  if (isVisible && currentValue === 0) {
   startAnimation();
  }
 };

 return (
  <Box
   sx={{
    border: 0,
    background: "#191919",
    width: "100vw",
    position: "relative",
    height: isMobile ? "600px" : "900px",
    overflow: "hidden",
    textAlign: "center",
   }}>
   <Box
    sx={{
     position: "absolute",
     width: isMobile ? "90%" : "900px",
     top: "40%",
     zIndex: "99999",
     left: "50%",
     transform: "translate(-50%, -50%)",
    }}>
    <Typography
     variant={isMobile ? "h5" : "h3"}
     sx={{ color: "white", textTransform: "uppercase" }}>
     Thousands Have Saved Millions With ABC Tax Track
    </Typography>
    <Typography variant='h6' sx={{ color: "white" }}>
     We have countless testimonials and have saved clients a total of
    </Typography>
    <Typography variant='h4' sx={{ color: "white" }}>
     <VisibilitySensor onChange={handleVisibilityChange} partialVisibility>
      {({ isVisible }) => (
       <Typography variant='h4' sx={{ color: "white" }}>
        {isVisible
         ? currentValue.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
           })
         : 0}
       </Typography>
      )}
     </VisibilitySensor>
    </Typography>
   </Box>

   {/* Image 1 */}
   <Box
    sx={{
     position: "absolute",
     width: isMobile ? "30%" : "300px",
     height: isMobile ? "150px" : "250px",
     borderRadius: "30px",
     top: isMobile ? "20px" : "30px",
     left: isMobile ? "10%" : "360px",
     my: 2,
    }}>
    <img
     src={process.env.PUBLIC_URL + "/images/person1.jpg"}
     alt='Person 1'
     style={{ width: "100%", height: "100%", borderRadius: "30px" }}
    />
   </Box>

   {/* Image 2 */}
   <Box
    sx={{
     position: "absolute",
     width: isMobile ? "35%" : "350px",
     height: isMobile ? "180px" : "400px",
     bottom: isMobile ? "20px" : "80px",
     left: isMobile ? "5%" : "400px",
     my: 2,
    }}>
    <img
     src={process.env.PUBLIC_URL + "/images/person2.jpg"}
     alt='Person 2'
     style={{ width: "100%", height: "100%", borderRadius: "45%" }}
    />
   </Box>

   {/* Image 3 */}
   <Box
    sx={{
     position: "absolute",
     width: isMobile ? "25%" : "250px",
     height: isMobile ? "200px" : "350px",
     borderRadius: "30px",
     bottom: isMobile ? "-10px" : "-40px",
     right: isMobile ? "5%" : "450px",
     my: 2,
    }}>
    <img
     src={process.env.PUBLIC_URL + "/images/person3.jpg"}
     alt='Person 3'
     style={{ width: "100%", height: "100%", borderRadius: "30px" }}
    />
   </Box>

   {/* Image 4 */}
   <Box
    sx={{
     position: "absolute",
     width: isMobile ? "25%" : "250px",
     height: isMobile ? "200px" : "350px",
     borderRadius: "30px",
     top: isMobile ? "-10px" : "-40px",
     right: isMobile ? "5%" : "400px",
     my: 2,
    }}>
    <img
     src={process.env.PUBLIC_URL + "/images/person4.jpg"}
     alt='Person 4'
     style={{ width: "100%", height: "100%", borderRadius: "30px" }}
    />
   </Box>
  </Box>
 );
};

export default HighlightedTextComponent;
