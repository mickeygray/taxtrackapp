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

//Create and Send Token
router.get("/verify", async (req, res) => {
 var bytes = base64.decode(req.query.q.split().reverse().toString());
 const profile = await Profile.findOne({ ssn: bytes });

 if (profile !== null) {
  const email = profile._doc.email;

  const verifyEmail = await Email.find({ name: "verify.html" });

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

  fs.writeFile("./views/template.hbs", verifyEmail[0].html, (err) => {
   if (err) throw err;
  });

  transporter.use("compile", hbs(options));

  const mailer = {
   title: `One time passcode for ${profile.fullName}`,
   from: `verify@andersonbradshawtax.com`,
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
 const profile = await Profile.findOne({ ssn: bytes });

 console.log(profile);

 res.json(profile);
});
module.exports = router;
