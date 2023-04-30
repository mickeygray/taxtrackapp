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

//Create and Send Token

router.get("/device", async (req, res) => {
 try {
  let profile = await User.findOne({ pinString: req.query.q });

  if (!user) {
   return res.status(400).json({ msg: "Invalid Credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
   return res.status(400).json({ msg: "Invalid Credentials" });
  }

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

router.put("/device", async (req, res) => {
 const { encryptedString, encryptedPin, pinString } = req.body;
 var bytes = base64.decode(encryptedString.split().reverse().toString());
 var bytes2 = base64.decode(encryptedPin.split().reverse().toString());

 console.log(req.body);

 try {
  let profile = await Profile.findOne({ ssn: bytes });

  console.log(profile);

  if (profile.ttuid) {
   return res.status(400).json({ msg: "Device Already Assigned" });
  }

  const salt = await bcrypt.genSalt(10);

  const pin = await bcrypt.hash(bytes2, salt);

  profile = await Profile.findOneAndUpdate(
   { ssn: bytes },
   {
    "$set": {
     "pin": pin,
     "ttuid": pinString,
    },
   }
  );

  res.json(profile);
 } catch (err) {
  console.error(err.message);
  res.status(500).send("Server Error");
 }
});

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
    pass:
     "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",
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

 res.json(profile);
});

router.post("/pin", async (req, res) => {
 console.log(req.body);
 var bytes = base64.decode(req.body.encryptedPin.split().reverse().toString());
 const profile = await Profile.findOne({ ttuid: req.body.ttuid });

 const isMatch = await bcrypt.compare(bytes, profile.pin);

 if (!isMatch) {
  return res.status(400).json({ msg: "Invalid Credentials" });
 }

 res.json(profile);
});

router.delete("/forget", async (req, res) => {
 try {
  await Profile.findOneAndUpdate({ "ttuid": req.body.ttuid }, { "ttuid": "" });

  res.json({ msg: "Campaign removed" });
 } catch (err) {
  console.error(err.message);
  res.status(500).send("Server Error");
 }
});

module.exports = router;
