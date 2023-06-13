const express = require("express");
const speakeasy = require("speakeasy");
const router = express.Router();
const config = require("config");
const Profile = require("../models/Profile");
const Email = require("../models/Email");
const base64 = require("base-64");
const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");
const hbs = require("nodemailer-express-handlebars");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const { AES, enc } = require("crypto-js");
require("dotenv").config();
//Create and Send Token

router.put("/pin", async (req, res) => {
 const { email, pinString } = req.body;

 console.log(req.body);
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

  console.log(profile);
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

router.post("/verify", async (req, res) => {
 const profile = await Profile.findOne({ caseID: req.body.caseID });

 const isMatch = await bcrypt.compare(req.body.ssn, profile.ssn);

 if (!isMatch) {
  return res.status(400).json({ msg: "Invalid Credentials" });
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
router.get("/verified", async (req, res) => {
 var bytes = base64.decode(req.query.q.split().reverse().toString());

 const profile = await Profile.findOne({ email: req.body.email });

 const isMatch = await bcrypt.compare(bytes, profile.ssn);

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

router.get("/", auth, async (req, res) => {
 try {
  const profile = await Profile.findById(req.profile.id).select("-pin");

  console.log(req.profile);
  res.json(profile);
 } catch (err) {
  console.error(err.message);
  res.status(500).send("Server Error");
 }
});

router.post("/login", async (req, res) => {
 console.log(req.body);

 const profile = await Profile.findOne({ email: req.body.email });

 const isMatch = await bcrypt.compare(req.body.pw, profile.pin);

 console.log(isMatch);

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

module.exports = router;
