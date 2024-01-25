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
 const profiles = await Profile.find({ email: req.body.email });

 /*const isMatch = await bcrypt.compare(req.body.password, profile.pin);

 if (!isMatch) {
  return res.status(400).json({ msg: "Invalid Credentials" });
 }*/
 const profile = profiles[0];
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

module.exports = router;
