import React, { useContext } from "react";
import {
 Card,
 CardContent,
 Typography,
 Button,
 CardActions,
 Box,
} from "@mui/material";
import ProfileContext from "../../context/profile/profileContext";
import styled from "styled-components";

const StatusIndicator = styled(Box)`
 width: 12px;
 height: 12px;
 border-radius: 50%;
 background-color: ${(props) => props.color};
 margin-right: 8px;
`;

const ProfileItem = ({ profile }) => {
 const { setProfile, clearProfiles } = useContext(ProfileContext);

 const handleOpenProfile = () => {
  setProfile(profile);
  clearProfiles();
 };

 const getBackgroundColor = (status) => {
  switch (status) {
   case "Active":
   case "Current":
    return "green";
   case "LateOne":
   case "LateTwo":
    return "yellow";
   case "InactiveClient":
   case "InactivePayment":
   case "InactiveCancel":
    return "red";
   default:
    return "grey";
  }
 };

 return (
  <Card variant='outlined' sx={{ mb: 2, backgroundColor: "#B0C4DE" }}>
   <CardContent>
    <Typography variant='h6' component='div' gutterBottom>
     <StatusIndicator color={getBackgroundColor(profile.status)} />
     {profile.fullName}
    </Typography>
    <Typography color='textSecondary'>
     Subscription Start: {profile.addDate}
    </Typography>
    <Typography color='textSecondary'>Status: {profile.status}</Typography>
   </CardContent>
   <CardActions>
    <Button size='small' onClick={handleOpenProfile}>
     View Profile
    </Button>
   </CardActions>
  </Card>
 );
};

export default ProfileItem;
