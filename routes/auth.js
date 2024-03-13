const express = require("express");
const speakeasy = require("speakeasy");
const router = express.Router();
const config = require("config");
const Profile = require("../models/Profile");
const Email = require("../models/Email");
const User = require("../models/User");
const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");
const hbs = require("nodemailer-express-handlebars");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const { OAuth2Client } = require("google-auth-library");
const axios = require("axios");
const sendVerificationEmail = require("../utils/sendVerificationEmail");
require("dotenv").config();
//Create and Send Token

router.put("/pin", async (req, res) => {
 const { email, pinString } = req.body;

 try {
  let profile = await Profile.findOne({ email: email });

  const salt = await bcrypt.genSalt(10);

  const pin = await bcrypt.hash(pinString, salt);

  profile = await Profile.findOneAndUpdate(
   { "email": email },
   {
    "$set": {
     "pin": pin,
    },
   }
  );

  const payload = {
   profile: {
    id: profile.id,
   },
  };

  jwt.sign(
   payload,
   config.get("jwtSecret"),
   {
    expiresIn: 360000,
   },
   (err, token) => {
    if (err) throw err;
    res.json({ token });
   }
  );
 } catch (err) {
  console.error(err.message);
  res.status(500).send("Server Error");
 }
});

router.put("/admin/pin", async (req, res) => {
 const { email, pinString } = req.body;

 try {
  let user = await User.findOne({ email: email });

  const salt = await bcrypt.genSalt(10);

  const pin = await bcrypt.hash(pinString, salt);

  user = await User.findOneAndUpdate(
   { "email": email },
   {
    "$set": {
     "pin": pin,
    },
   }
  );

  const payload = {
   user: {
    id: user.id,
   },
  };

  jwt.sign(
   payload,
   config.get("jwtSecret"),
   {
    expiresIn: 360000,
   },
   (err, token) => {
    if (err) throw err;
    res.json({ token });
   }
  );
 } catch (err) {
  console.error(err.message);
  res.status(500).send("Server Error");
 }
});

router.post("/register", async (req, res) => {
 const { email, password } = req.body;
 const emailToSave = email.toLowerCase();
 const isAdmin = emailToSave.endsWith("@andersonbradshawtax.com");

 try {
  let user = await User.findOne({ email });
  if (user) {
   return res.status(400).json({ msg: "User already exists" });
  }

  // Only proceed if the user is an admin based on email domain
  if (isAdmin) {
   const hashedPassword = await bcrypt.hash(password, 10);
   const temp_secret = speakeasy.generateSecret();
   user = new User({
    email: emailToSave,
    password: hashedPassword,
    isAdmin,
    temp_secret: temp_secret.base32,
   });

   await user.save();

   // Generate a TOTP token
   const token = speakeasy.totp({
    secret: temp_secret.base32,
    encoding: "base32",
   });

   // Send the token via email
   sendVerificationEmail(user); // Implement this function to send email

   res.status(201).json({
    msg: "Admin user registered successfully. Please check your email to verify your account.",
   });
  } else {
   // If not an admin, return an error message
   return res.status(400).json({
    msg: "Please use a valid email to register an administrative account.",
   });
  }
 } catch (err) {
  console.error(err.message);
  res.status(500).send("Server Error");
 }
});

router.post("/authenticate", async (req, res) => {
 const { access_token } = req.body;

 const userInfo = await axios
  .get("https://www.googleapis.com/oauth2/v3/userinfo", {
   headers: { Authorization: `Bearer ${access_token}` },
  })
  .then((res) => res.data);

 const user = User.findOne({ email: userInfo.email });

 if (!user) {
  return res.status(404).json({ msg: "Not Authorized For Tax Track Usage" });
 }

 // Create and sign a JSON Web Token (JWT)
 const payload = {
  userInfo,
 };
 jwt.sign(
  payload,
  config.get("jwtSecret"),
  {
   expiresIn: 360000,
  },
  (err, token) => {
   if (err) throw err;
   res.json({ token });
  }
 );
});

router.post("/send-otp", async (req, res) => {
 const { email } = req.body;
 const emailToLower = email.toLowerCase();
 //const isAdmin = emailToLower.endsWith("@andersonbradshawtax.com"); // Adjust domain as needed

 const temp_secret = speakeasy.generateSecret();
 const token = speakeasy.totp({
  secret: temp_secret.base32,
  encoding: "base32",
 });

 try {
  // Attempt to update the user if they exist, or insert a new user if they don't
  await Profile.findOneAndUpdate(
   { email: emailToLower },
   {
    $setOnInsert: { email: emailToLower },
    $set: { temp_secret: temp_secret.base32 },
   },
   { new: true, upsert: true, rawResult: true } // Return the new document and create a new one if it doesn't exist
  );

  // Assuming `sendVerificationEmail` is an async function
  await sendVerificationEmail(emailToLower, token);

  res.json({ token, msg: "OTP sent successfully." });
 } catch (error) {
  console.error("Error sending OTP:", error);
  res.status(500).json({ msg: "Server error while sending OTP." });
 }
});

router.post("/verify-otp", async (req, res) => {
 const { email, otp } = req.body;
 let profile = await Profile.findOne({ email: email.toLowerCase() });

 if (!profile) {
  return res.status(404).json({ msg: "Profile  not found" });
 }

 // Verify the token
 const tokenValidates = speakeasy.totp.verify({
  secret: profile.temp_secret,
  encoding: "base32",
  token: otp,
  window: 60, // To allow some leeway in timing
 });

 if (tokenValidates) {
  // Update the user's verification status without creating a new document
  await Profile.findOneAndUpdate({ isVerified: true });
  res.json({ msg: "Profile verified successfully." });
 } else {
  res.status(400).json({ msg: "Invalid OTP." });
 }
});

router.post("/update-password", async (req, res) => {
 const { email, password } = req.body;
 let profile = await Profile.findOne({ email: email.toLowerCase() });

 if (!profile) {
  return res.status(404).json({ msg: "User not found" });
 }

 if (!profile.isVerified) {
  return res.status(403).json({ msg: "User not verified." });
 }

 // Hash the new password
 const salt = await bcrypt.genSalt(10);
 const hashedPassword = await bcrypt.hash(password, salt);

 // Update user's password
 profile.password = hashedPassword;
 await profile.save();

 res.json({ msg: "Password updated successfully." });
});

router.post("/admin/send-otp", async (req, res) => {
 const { email } = req.body;
 const emailToLower = email.toLowerCase();
 const isAdmin = emailToLower.endsWith("@andersonbradshawtax.com"); // Adjust domain as needed

 const temp_secret = speakeasy.generateSecret();
 const token = speakeasy.totp({
  secret: temp_secret.base32,
  encoding: "base32",
 });

 try {
  // Attempt to update the user if they exist, or insert a new user if they don't
  await User.findOneAndUpdate(
   { email: emailToLower },
   {
    $setOnInsert: { email: emailToLower, isAdmin },
    $set: { temp_secret: temp_secret.base32 },
   },
   { new: true, upsert: true, rawResult: true } // Return the new document and create a new one if it doesn't exist
  );

  // Assuming `sendVerificationEmail` is an async function
  await sendVerificationEmail(emailToLower, token);

  res.json({ token, msg: "OTP sent successfully." });
 } catch (error) {
  console.error("Error sending OTP:", error);
  res.status(500).json({ msg: "Server error while sending OTP." });
 }
});

router.post("/admin/verify-otp", async (req, res) => {
 const { email, otp } = req.body;
 let user = await User.findOne({ email: email.toLowerCase() });

 if (!user) {
  return res.status(404).json({ msg: "User not found" });
 }

 // Verify the token
 const tokenValidates = speakeasy.totp.verify({
  secret: user.temp_secret,
  encoding: "base32",
  token: otp,
  window: 60, // To allow some leeway in timing
 });

 if (tokenValidates) {
  // Update the user's verification status without creating a new document
  await User.findOneAndUpdate(
   { email: email.toLowerCase() },
   { isVerified: true }
  );
  res.json({ msg: "User verified successfully." });
 } else {
  res.status(400).json({ msg: "Invalid OTP." });
 }
});

router.post("/admin/update-password", async (req, res) => {
 const { email, password } = req.body;
 let user = await User.findOne({ email: email.toLowerCase() });

 if (!user) {
  return res.status(404).json({ msg: "User not found" });
 }

 if (!user.isVerified) {
  return res.status(403).json({ msg: "User not verified." });
 }

 // Hash the new password
 const salt = await bcrypt.genSalt(10);
 const hashedPassword = await bcrypt.hash(password, salt);

 // Update user's password
 user.password = hashedPassword;
 await user.save();

 res.json({ msg: "Password updated successfully." });
});

router.post("/verify", async (req, res) => {
 const profile = await Profile.findOne({ token: req.body.code });

 const isMatch = await bcrypt.compare(req.body.ssn, profile.ssn);

 if (!isMatch) {
  return res.status(400).json({ msg: "Invalid Registration Credentials" });
 }

 res.json(profile.email);
});

router.post("/forget", async (req, res) => {
 const profile = await Profile.findOne({ email: req.body.email });

 if (profile !== null) {
  const email = profile._doc.email;

  const verifyEmail = await Email.findOne({ name: "verify.html" });

  var token = speakeasy.totp({
   secret: profile._doc.temp_secret.base32,
   encoding: "base32",
  });

  const transporter = nodemailer.createTransport({
   host: "smtp.sendgrid.net",
   port: 465,
   secure: true,
   auth: {
    user: "apikey",
    pass: process.env.SENDGRIDAPIKEY,
   },
  });

  const options = {
   viewEngine: {
    extName: ".hbs",
    partialsDir: path.join(__dirname, "views"),
    layoutsDir: path.join(__dirname, "views"),
    defaultLayout: false,
   },
   viewPath: "views",
   extName: ".hbs",
  };

  fs.writeFile("./views/template.hbs", verifyEmail.html, (err) => {
   if (err) throw err;
  });

  transporter.use("compile", hbs(options));

  const mailer = {
   title: `One time passcode for ${profile.fullName}`,
   from: `reset@andersonbradshawtax.com`,
   to: email,
   subject: `One time passcode for ${profile.fullName}`,
   template: "template",
   context: { token: token },
  };

  transporter.sendMail(mailer);
  res.json(token);
 }
});

router.get("/", auth, async (req, res) => {
 try {
  const profile = await Profile.findById(req.profile.id).select("-pin");
  console.log(profile.fullName, "currently loaded profile");
  res.json(profile);
 } catch (err) {
  console.error(err.message);
  res.status(500).json({ msg: "Server Error" });
 }
});

router.get("/env", async (req, res) => {
 try {
  const clientId = process.env.GOOGLE_CLIENT_ID;

  res.json(clientId);
 } catch (err) {
  console.error(err.message);
  res.status(500).json({ msg: "Server Error" });
 }
});

router.post("/login", async (req, res) => {
 const emailRegex = new RegExp(`^${req.body.email}$`, "i");

 const profile = await Profile.findOne({ email: emailRegex });

 const isMatch = await bcrypt.compare(req.body.password, profile.pin);

 if (!isMatch) {
  return res.status(400).json({ msg: "Invalid Credentials" });
 }

 const payload = {
  profile: {
   id: profile.id,
  },
 };

 jwt.sign(
  payload,
  config.get("jwtSecret"),
  {
   expiresIn: 360000,
  },
  (err, token) => {
   if (err) throw err;
   res.json({ token });
  }
 );
});

router.post("/admin/login", async (req, res) => {
 const user = await User.findOne({ email: req.body.email });

 const isMatch = await bcrypt.compare(req.body.password, user.pin);

 if (!isMatch) {
  return res.status(400).json({ msg: "Invalid Credentials" });
 }

 const payload = {
  profile: {
   id: user.id,
  },
 };

 jwt.sign(
  payload,
  config.get("jwtSecret"),
  {
   expiresIn: 360000,
  },
  (err, token) => {
   if (err) throw err;
   res.json({ token });
  }
 );
});
module.exports = router;
