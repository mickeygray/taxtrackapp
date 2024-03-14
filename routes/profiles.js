const express = require("express");
const router = express.Router();
var fs = require("fs");
const Profile = require("../models/Profile");
const Email = require("../models/Email");
const User = require("../models/User");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const bcrypt = require("bcryptjs");
var path = require("path");
const fetch = require("node-fetch");
const speakeasy = require("speakeasy");
const auth = require("../middleware/auth");
const sendWelcomeEmail = require("../utils/sendWelcomeEmail");

router.get("/", auth, async (req, res) => {
 const regex = new RegExp(`${req.query.q}`, "gi");

 // Search for profiles where fullName, email, or phone matches the regex
 const profiles = await Profile.find({
  $or: [{ fullName: regex }, { email: regex }, { phone: regex }],
 });

 res.json(profiles);
});

router.post("/", auth, async (req, res) => {
 let profileData = {};

 // Check if manual entry fields are present
 if (req.body.name || req.body.email) {
  // Manual client creation workflow
  profileData = req.body; // Use the provided data directly
 } else if (req.body.caseID) {
  // Workflow for Logics API with caseID
  const rawResponse = await fetch(
   `https://andersontax.irslogics.com/publicapi/2020-02-22/cases/casefile?CaseID=${req.body.caseID}`,
   {
    method: "GET",
    headers: {
     Authorization: process.env.LOGICSAPIKEY,
     "Content-Type": "application/json",
    },
   }
  );
  const content = await rawResponse.json();
  const logicsData = content.data ? JSON.parse(content.data) : null;
  profileData = { ...logicsData, ...req.body }; // Merge API data with any additional data from request
 } else {
  // Handle cases where neither manual fields nor caseID are adequately provided
  return res
   .status(400)
   .json({ msg: "Insufficient data for profile creation." });
 }

 const transactions = req.body.data;

 const salt = await bcrypt.genSalt(10);

 const ssn = await bcrypt.hash(profileData.SSN, salt);
 if (!profileData.addDate) {
  // If addDate is not provided, use the current date
  profileData.addDate = new Date().toISOString().slice(0, 10); // YYYY-MM-DD format
 }

 const includedStrings = [
  "lien",
  "levy",
  "garnish",
  "collection due process",
  "payment",
 ];
 const zeroDate = new Date("1/1/2000");
 zeroDate.setDate(zeroDate.getDate() - 90);

 const zeroDateBalance = sumAmountBeforeDate(transactions, zeroDate);

 const filteredTransactions = transactions.filter((obj, index, arr) => {
  // Check if the date is after or equal to zeroDate
  const objDate = new Date(obj.date);
  if (objDate < zeroDate) {
   return false;
  }

  if (obj.amount === 0 || obj.amount === "0") {
   return includedStrings.some((keyword) =>
    obj.description.toLowerCase().includes(keyword)
   );
  }

  const firstInstanceIndex = arr.findIndex(
   (item, i) =>
    i >= index && item.amount === obj.amount && new Date(item.date) >= zeroDate
  );
  return index === firstInstanceIndex;
 });

 let transformedData = [];
 let previousAmount = 0;

 filteredTransactions.forEach((obj, index) => {
  const amount = Number(obj.amount);
  const y = amount + previousAmount;
  previousAmount = y;

  transformedData.push({
   x: obj.date,
   tooltip1: capitalizeSentence(obj.description),
   tooltip2: obj.period,
   y: parseFloat(y.toFixed(2)),
  });
 });

 // Sort the transformedData array by date in ascending order
 //

 const accountTransactions = transformedData.sort((a, b) => {
  // Compare by period first
  if (a.tooltip2 < b.tooltip2) {
   return -1;
  } else if (a.tooltip2 > b.tooltip2) {
   return 1;
  }

  // If periods are the same, convert dates to comparable format and compare
  const dateA = new Date(a.date);
  const dateB = new Date(b.date);
  return dateA - dateB; // Subtracting dates returns the difference in milliseconds
 });

 function capitalizeSentence(sentence) {
  return sentence
   .toLowerCase()
   .replace(/(?:^|\s)\S/g, (char) => char.toUpperCase())
   .replace(/([a-z])([0-9])/gi, "$1 $2")
   .replace(/([0-9])([a-z])/gi, "$1 $2");
 }

 function sumAmountBeforeDate(data, targetDate) {
  const targetDateTime =
   typeof targetDate === "string"
    ? new Date(targetDate).getTime()
    : targetDate.getTime();
  let sum = 0;

  for (const obj of data) {
   const objDate = new Date(obj.date).getTime();
   if (objDate <= targetDateTime) {
    sum += Number(obj.amount);
   }
  }

  return sum;
 }

 const newProfile = new Profile({
  fullName: `${profileData.firstName} ${profileData.lastName}`,
  email: profileData.email,
  phone: profileData.phone,
  firstName: profileData.firstName,
  lastName: profileData.lastName,
  ssn: ssn,
  city: profileData.city,
  state: profileData.state,
  zip: profileData.zip,
  address: profileData.address,
  aptNo: profileData.aptNo,
  caseID: profileData.logicsCaseId || profileData.caseID, // Support both manual and Logics API case IDs
  addDate: profileData.addDate,
  accountTransactions: accountTransactions,
  startingBalance: accountTransactions.reduce(
   (total, transaction) => total + transaction.y,
   0
  ),
 });

 const profile = await newProfile.save();

 const { email, fullName } = profile;

 await sendWelcomeEmail(fullName, email);

 res.json(profile);
});

router.post("/:id/organizer", auth, async (req, res) => {
 const profile = await Profile.findById(req.params._id);

 const sourceFilePath = path.join(__dirname, "templates", "organizer.html");
 const destinationFilePath = path.join(__dirname, "views", "template.hbs");

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

 fs.readFile(sourceFilePath, "utf8", (err, htmlContent) => {
  if (err) {
   console.error("Error reading the file:", err);
   return;
  }

  // Write the HTML content to the destination file
  fs.writeFile(destinationFilePath, htmlContent, (err) => {
   if (err) {
    console.error("Error writing to the file:", err);
    return;
   }
   console.log(
    `The content has been successfully written to ${destinationFilePath}`
   );
  });
 });
 transporter.use("compile", hbs(options));

 const mailer = {
  title: `Welcome To Tax Track ${profile.fullName}`,
  from: `transcriptrequests@andersonbradshawtax.com`,
  to: `mickeygray85@hotmail.com`,
  subject: `Tax Organizers For ${profile.fullName}`,
  template: "template",
  context: { token: token, fullName: profile.fullName },
 };

 transporter.sendMail(mailer);
});
//delete a message from the text thread
router.delete("/:id/messages/:id", auth, async (req, res) => {
 await Profile.findOneAndUpdate(
  { "messages._id": req.params.id },
  { $pull: { messages: { _id: req.params.id } } },
  { safe: true, multi: false }
 );
 return res.status(200).json({ message: "Message Deleted Successfully" });
});

router.delete("/:id", auth, async (req, res) => {
 try {
  const deletedProfile = await Profile.findByIdAndDelete(req.params.id);
  if (!deletedProfile) {
   return res.status(404).json({ message: "Profile not found" });
  }
  res.status(200).json({ message: "Profile deleted successfully" });
 } catch (error) {
  console.error(error);
  res.status(500).json({ message: "Server error" });
 }
});

//update a message in the text thread
router.put("/:id/messages/:id", auth, async (req, res) => {
 const profile = await Profile.findOneAndUpdate(
  { "messages._id": req.params.id },

  {
   "$set": {
    "messages.$.subject": req.body.subject,
    "messages.$.message": req.body.message,
   },
  }
 );

 res.status(200).json(profile);
});
//Update payment status
router.put("/:id/status", auth, async (req, res) => {
 const profile = await Profile.findByIdAndUpdate(
  req.params.id,

  {
   "$set": {
    "status": req.body.status,
   },
  }
 );
 res.json(profile);
});
//Update Client Info
router.put("/:id/info", auth, async (req, res) => {
 const { fullName, ssn, phone, email } = req.body;

 const leadFields = {};

 if (fullName) leadFields.fullName = fullName;
 if (fullName)
  leadFields.firstName = fullName.substring(0, fullName.indexOf(" "));
 if (fullName)
  leadFields.lastName = fullName.substring(
   fullName.indexOf(" "),
   fullName.length
  );
 if (ssn) leadFields.ssn = ssn;
 if (phone) leadFields.phone = phone;
 if (email) leadFields.email = email;
 const profile = await Profile.findByIdAndUpdate(
  req.params.id,

  {
   "$set": leadFields,
  }
 );
 res.json(profile);
});

//get all messages associated with a profile
router.get("/:id/messages", auth, async (req, res) => {
 const profile = await Profile.findById(req.params.id);

 const { messages } = profile;

 res.json(messages);
});

//Add a new Message
router.post("/:id/messages", auth, async (req, res) => {
 const message = { ...req.body, date: new Date() };
 const profile = await Profile.findByIdAndUpdate(req.params.id, {
  "$push": {
   "messages": message,
  },
 });

 res.json(profile);
});

//Get all profiles (needs search function)

router.put("/:id", auth, async (req, res) => {
 const transactions = req.body.data;

 const balance = transactions
  .map((t) => parseFloat(t.amount))
  .reduce((a, b) => a + b);

 const profileFields = {
  currentBalance: balance,
  accountTransactions: transactions,
 };

 const profile = await Profile.findByIdAndUpdate(
  req.params.id,
  { $set: profileFields },
  { new: true }
 );

 res.json(profile);
});

module.exports = router;
