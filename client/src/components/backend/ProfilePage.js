import React, { useContext, useState, useEffect } from "react";
import ProfileContext from "../../context/profile/profileContext";
import AuthContext from "../../context/auth/authContext";

import MessageFilter from "./MessageFilter";
import MilestoneGenerator from "./MilestoneGenerator";
import Upload from "./Upload";
import {
 Card,
 CardContent,
 Typography,
 TextField,
 Button,
 Grid,
 Box,
 IconButton,
 Select,
 MenuItem,
 FormControl,
 InputLabel,
 TextareaAutosize,
 Dialog,
 DialogTitle,
 DialogContent,
 DialogActions,
 DialogContentText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
const ProfilePage = () => {
 const profileContext = useContext(ProfileContext);
 const authContext = useContext(AuthContext);
 const { user } = authContext;
 const {
  putCanopy,
  updateProfile,
  sendMessage,
  setProfile,
  updateStatus,
  getMessages,
  profile,
  deleteProfile,
 } = profileContext;

 const [putState, setPutState] = useState(true);
 const [status, setStatus] = useState("");
 const [update, setUpdate] = useState({});
 const [messageBody, setMessageBody] = useState({});
 const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
 useEffect(() => {
  const interval = setInterval(() => {}, 5000);

  return () => clearInterval(interval);
 }, []);

 useEffect(() => {
  if (user && messageBody.name !== user.name) {
   setMessageBody({ ...messageBody, name: user.name });
  }
 }, [user, messageBody]);

 useEffect(() => {
  setProfile(profile);
 }, [profile]);

 const handleInputChange = (e) => {
  setUpdate((prevUpdate) => ({
   ...prevUpdate,
   [e.target.name]: e.target.value,
  }));
 };

 const handleSubmit = (e) => {
  e.preventDefault();
  updateProfile(update, profile);
  setUpdate({});
 };

 const handleSendMessage = () => {
  sendMessage(profile, messageBody);
  setMessageBody({});
 };

 const handleDelete = async () => {
  await deleteProfile(profile);
  setProfile(null); // Clear the current profile from state, adjust as necessary
  // Redirect or update the profile list here
 };

 const handleOpenDeleteDialog = () => {
  setOpenDeleteDialog(true);
 };

 const handleCloseDeleteDialog = () => {
  setOpenDeleteDialog(false);
 };

 return (
  <Box
   sx={{
    maxWidth: 800,
    mx: "auto",
    p: 2,
    position: "relative",
    boxShadow: 3,
   }}>
   {" "}
   <Card
    variant='outlined'
    sx={{
     backgroundColor: "#ABCDEF",
     boxShadow: 3,
    }}>
    <CardContent>
     <Box
      sx={{
       maxWidth: 800,
       mx: "auto",
       p: 2,
       boxShadow: 3,
      }}
      display='flex'
      justifyContent='space-between'
      alignItems='center'>
      <Typography variant='h5' component='h2'>
       Profile Details
      </Typography>
      <IconButton onClick={() => setProfile(null)} color='error'>
       <CloseIcon />
      </IconButton>
      <IconButton
       onClick={handleOpenDeleteDialog}
       color='error'
       sx={{ position: "absolute", right: 8, top: 8 }}>
       <DeleteIcon />
      </IconButton>
      <Dialog
       open={openDeleteDialog}
       onClose={handleCloseDeleteDialog}
       aria-labelledby='alert-dialog-title'
       aria-describedby='alert-dialog-description'>
       <DialogTitle id='alert-dialog-title'>{"Confirm Delete"}</DialogTitle>
       <DialogContent>
        <DialogContentText id='alert-dialog-description'>
         Are you sure you want to delete this profile? This action cannot be
         undone.
        </DialogContentText>
       </DialogContent>
       <DialogActions>
        <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
        <Button onClick={handleDelete} autoFocus color='error'>
         Delete
        </Button>
       </DialogActions>
      </Dialog>
     </Box>
     <Upload putState={true} />
     {/* Profile details form and update status section */}
     <Box mt={2}>
      <Grid container spacing={2}>
       <Grid item xs={12} sm={6}>
        <TextField
         fullWidth
         label='Name'
         sx={{
          backgroundColor: "#f5f5dc",
          boxShadow: 3,
         }}
         variant='outlined'
         name='fullName'
         value={update.fullName || profile.fullName || ""}
         onChange={handleInputChange}
        />
       </Grid>
       <Grid item xs={12} sm={6}>
        <TextField
         fullWidth
         sx={{
          backgroundColor: "#f5f5dc",
          boxShadow: 3,
         }}
         label='Email'
         variant='outlined'
         name='email'
         value={update.email || profile.email || ""}
         onChange={handleInputChange}
        />
       </Grid>
       {/* Additional fields as needed */}
      </Grid>
     </Box>
     <Box mt={2}>
      <FormControl fullWidth>
       <InputLabel>Status</InputLabel>
       <Select
        sx={{
         backgroundColor: "#f5f5dc",
         boxShadow: 3,
        }}
        value={status || profile.status}
        onChange={(e) => setStatus(e.target.value)}
        label='Status'>
        {/* Status options */}
        <MenuItem value='Active'>Active - First 3 Months</MenuItem>
        {/* More options */}
       </Select>
      </FormControl>
      <Button
       variant='contained'
       color='primary'
       onClick={() => updateStatus(status, profile)}
       sx={{ mt: 2 }}>
       Update Subscription Status
      </Button>
     </Box>
     {/* Message sending section */}
     <Box mt={2}>
      <Typography variant='h6'>Send A Message Or Assign A Task</Typography>
      <TextField
       sx={{
        backgroundColor: "#f5f5dc",
        boxShadow: 3,
        mt: 1,
        my: 1,
        width: "300px",
       }}
       fullWidth
       label='Your Name'
       variant='outlined'
       name='name'
       value={user?.name || ""}
       onChange={handleInputChange}
      />
      <TextareaAutosize
       minRows={3}
       placeholder='Message content'
       style={{ width: "100%" }}
       name='content'
       value={messageBody.content || ""}
       onChange={(e) =>
        setMessageBody({ ...messageBody, content: e.target.value })
       }
       sx={{ mt: 1 }}
      />
      <Button
       variant='contained'
       color='primary'
       onClick={handleSendMessage}
       sx={{ mt: 2 }}>
       Send Message
      </Button>
     </Box>
     {/* Additional sections */}
     <MessageFilter profile={profile} />
     <MilestoneGenerator />
    </CardContent>
   </Card>
  </Box>
 );
};

export default ProfilePage;
