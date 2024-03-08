import React, { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import Button from "@mui/material/Button";
import { IconButton, Tooltip, Typography } from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LoginIcon from "@mui/icons-material/Login";

const Navbar = () => {
 const navigate = useNavigate();
 const location = useLocation();
 const {
  profile,
  profileAuthenticated,
  userAuthenticated,
  logout,
  toggleIsAdmin,
  toggleNotAdmin,
 } = useContext(AuthContext);

 const handleLogin = () => {
  toggleNotAdmin();
  navigate("/login");
 };

 const handleAdminAccess = () => {
  toggleIsAdmin();
  navigate("/admin/login");
 };

 const navBarStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1rem",
  backgroundColor: !userAuthenticated ? "#77d215" : "#b0c4de", // Specific color for admin
  color: "white",
 };

 return (
  <div style={navBarStyle}>
   <Link to='/' style={{ textDecoration: "none", color: "white" }}>
    <h1>Tax Hub</h1>
   </Link>
   <div>
    {profileAuthenticated || userAuthenticated ? (
     <div>
      <Typography variant='body1' color='inherit' sx={{ mr: 2 }}>
       Welcome, {userAuthenticated && "Admin"}{" "}
       {profileAuthenticated && profile && profile.fullName}
      </Typography>
      <IconButton color='inherit' onClick={logout}>
       <LoginIcon /> Logout
      </IconButton>
     </div>
    ) : (
     <>
      <Button
       variant='contained'
       color='inherit'
       onClick={handleLogin}
       sx={{
        mr: 2,
        py: 1,
        px: 3,
        color: "primary.contrastText", // Ensure text color contrasts with the button
        backgroundColor: "primary.main", // Set a specific background color if needed
        "&:hover": {
         backgroundColor: "primary.dark", // Darken button on hover
         color: "secondary.contrastText", // Change text color on hover for visibility
        },
       }}>
       <LoginIcon sx={{ mr: 1 }} /> Login
      </Button>
      {/* Hide admin access button if on admin login page or if any authentication is true */}
      {location.pathname !== "/admin/login" &&
       !profileAuthenticated &&
       !userAuthenticated && (
        <Tooltip title='Admin Access'>
         <IconButton color='inherit' onClick={handleAdminAccess} size='large'>
          <AdminPanelSettingsIcon />
         </IconButton>
        </Tooltip>
       )}
     </>
    )}
   </div>
  </div>
 );
};

export default Navbar;
