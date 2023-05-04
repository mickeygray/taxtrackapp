const express = require("express");
const router = express.Router();
var fs = require("fs");
const Profile = require("../models/Profile");
const Zip = require("../models/Zip");
const Rule = require("../models/Rule");
const config = require("config");
const db = config.get("mongoURI");
const multer = require("multer");
const crypto = require("crypto");
var path = require("path");
const fetch = require("node-fetch");
const { GridFsStorage } = require("multer-gridfs-storage");
const speakeasy = require("speakeasy");
const storage = new GridFsStorage({
 url: db,
 options: { useUnifiedTopology: true },
 file: (req, file) => {
  return new Promise((resolve, reject) => {
   crypto.randomBytes(16, (err, buf) => {
    if (err) {
     return reject(err);
    }
    const filename = req.body.name;
    const fileInfo = {
     filename: filename,
     bucketName: "fs",
    };
    resolve(fileInfo);
   });
  });
 },
});
const upload2 = multer({ storage });
const upload = require("multer")({
 dest: path.join(__dirname, "tmp"),
});

router.put("/:id/docs", upload2.single("file"), async (req, res) => {
 const profile = await Profile.findOneAndUpdate(
  { "_id": req.params.id },
  {
   "$push": {
    "docs.docid": req.file.id,
   },
   new: true,
  },
  (err) => {
   if (err) res.status(400).json(err);
  }
 );
 console.log(profile);
 res.status(200).json(prospect);
});

//delete a message from the text thread
router.delete("/:id/messages/:id", async (req, res) => {
 await Profile.findOneAndUpdate(
  { "messages._id": req.params.id },
  { $pull: { messages: { _id: req.params.id } } },
  { safe: true, multi: false }
 );
 return res.status(200).json({ message: "Message Deleted Successfully" });
});

router.delete("/:id/tasks/:id", async (req, res) => {
 await Profile.findOneAndUpdate(
  { "tasks._id": req.params.id },
  { $pull: { tasks: { _id: req.params.id } } },
  { safe: true, multi: false }
 );
 return res.status(200).json({ message: "Task Deleted Successfully" });
});

//update a message in the text thread
router.put("/:id/messages/:id", async (req, res) => {
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

router.put("/:id/status", async (req, res) => {
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
//get all tasks associated with a profile
router.get("/:id/tasks", async (req, res) => {
 const profile = await Profile.findById(req.params.id);

 const { tasks } = profile;
 res.json(tasks);
});

//get all messages associated with a profile
router.get("/:id/messages", async (req, res) => {
 const profile = await Profile.findById(req.params.id);

 const { messages } = profile;

 res.json(messages);
});

//Add a new task
router.post("/:id/tasks", async (req, res) => {
 const task = { ...req.body, date: new Date() };

 const profile = await Profile.findByIdAndUpdate(req.params.id, {
  "$push": {
   "tasks": task,
  },
 });

 res.json(profile);
});

//Add a new Message
router.post("/:id/messages", async (req, res) => {
 const message = { ...req.body, date: new Date() };
 const profile = await Profile.findByIdAndUpdate(req.params.id, {
  "$push": {
   "messages": message,
  },
 });

 res.json(profile);
});

//Get all profiles (needs search function)
router.get("/", async (req, res) => {
 const regex = new RegExp(`${req.query.q}`, "gi");
 const profiles = await Profile.find({ fullName: regex });

 res.json(profiles);
});

//Create profile with THS and Logics

router.get("/zips", async (req, res) => {
 console.log(req.query.q);
 const zipcode = await Zip.find({ "zipcode": req.query.q });
 console.log(zipcode);
 res.json(zipcode);
});

router.get("/rules", async (req, res) => {
 const rules = await Rule.find();

 res.json(rules);
});
//Calculator

router.post("/", async (req, res) => {
 console.log(req.body);
 const rawResponse = await fetch(
  `https://andersontax.irslogics.com/publicapi/2020-02-22/cases/casefile?CaseID=${req.body.caseID}`,
  {
   method: "GET",
   headers: {
    Authorization: "b720275ca1664ad2bff4ac891a022703",
    "Content-Type": "application/json",
   },
  }
 );

 const content = await rawResponse.json();

 console.log(content.data);

 const logicsData = content.data ? JSON.parse(content.data) : null;

 const newProfile = new Profile({
  fullName:
   logicsData != null
    ? logicsData.FirstName + " " + logicsData.LastName
    : `Logics Error: Case Id ${req.body.caseID}`,
  email: logicsData != null ? logicsData.Email : `jeffklinger85@gmail.com`,
  phone:
   logicsData != null
    ? logicsData.CellPhone
    : `Logics Error: Case Id ${req.body.caseID} - Cell`,
  firstName:
   logicsData != null
    ? logicsData.FirstName
    : `Logics Error: Case Id ${req.body.caseID}`,
  lastName:
   logicsData != null
    ? logicsData.LastName
    : `Logics Error: Case Id ${req.body.caseID}`,
  ssn: logicsData != null ? logicsData.SSN : `1234`,
  city:
   logicsData != null
    ? logicsData.City
    : `Logics Error: Case Id ${req.body.caseID}`,
  state:
   logicsData != null
    ? logicsData.State
    : `Logics Error: Case Id ${req.body.caseID}`,
  zip:
   logicsData != null
    ? logicsData.Zip
    : `Logics Error: Case Id ${req.body.caseID}`,
  address:
   logicsData != null
    ? logicsData.Address
    : `Logics Error: Case Id ${req.body.caseID}`,
  aptNo:
   logicsData != null
    ? logicsData.AptNo
    : `Logics Error: Case Id ${req.body.caseID}`,
  caseID: req.body.caseID,
  addDate: Intl.DateTimeFormat("fr-ca").format(new Date()),
  temp_secret: speakeasy.generateSecret(),
  accountTransactions: req.body.data,
  startingBalance: req.body.data.map((b) => b.amount).reduce((a, b) => a + b),
 });

 const profile = await newProfile.save();
 res.json(profile);
});

router.put("/:id", upload.any(), async (req, res) => {
 const transactions = req.body.data;

 const balance = transactions.map((t) => t.amount).reduce((a, b) => a + b);

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

router.post("/calc", async (req, res) => {
 const zipcode = await Zip.find({ "zip": req.body.zip });

 const minPop = 50;
 const maxPer = 26.4;
 let housing = 2064;
 let income = 69420;
 let utility = 750;

 if (zipcode[0].zip.length > 0) {
  if (parseInt(zipcode[0].percentHighIncome) > maxPer) {
   housing = 2564;
   utility = 1000;
  } else if (parseInt(zipcode[0].percentHighIncome) < 1) {
   housing = 1064;
   utility = 400;
  } else {
   housing = 2064;
   utiility = 750;
  }

  if (parseInt(req.body.actualIncome) > 0) {
   income = parseInt(req.body.actualIncome);
  } else if (
   parseInt(zipcode[0].population) >= minPop &&
   parseFloat(zipcode[0].percentHighIncome) < maxPer
  ) {
   if (typeof parseInt(zipcode[0].medianIncome) === "number") {
    income = parseInt(zipcode[0].medianIncome);
   }
  } else if (
   parseInt(zipcode[0].population) <= minPop ||
   parseInt(zipcode[0].percentHighIncome) >= maxPer
  ) {
   if (typeof parseInt(zipcode[0].meanIncome) === "number") {
    income = parseInt(zipcode[0].meanIncome);
   }
  }

  let taxrate = 0.15;

  if (req.body.residents === 1) {
   if (income <= 9950) {
    taxrate = 0.1;
   } else if (income > 9950 && income <= 40526) {
    taxrate = 0.12;
   } else if (income > 40526 && income <= 86375) {
    taxrate = 0.22;
   } else if (income > 86375 && income <= 164925) {
    taxrate = 0.24;
   } else if (income > 164925 && income <= 209429) {
    taxrate = 0.32;
   } else if (income > 209425 && income <= 523600) {
    taxrate = 0.35;
   } else if (income >= 523600) {
    taxrate = 0.37;
   }
  } else if (req.body.residents > 1) {
   if (income <= 14200) {
    taxrate = 0.1;
   } else if (income > 14200 && income <= 54200) {
    taxrate = 0.12;
   } else if (income > 54200 && income <= 86350) {
    taxrate = 0.22;
   } else if (income > 86350 && income <= 164925) {
    taxrate = 0.24;
   } else if (income > 164925 && income <= 209429) {
    taxrate = 0.32;
   } else if (income > 209425 && income <= 523600) {
    taxrate = 0.35;
   } else if (income >= 523600) {
    taxrate = 0.37;
   }
  }

  const postTax = income - income * taxrate - income * 0.06;

  const totalDebt = req.body.debt
   .map((d) => parseFloat(d.amount))
   .reduce((a, b) => a + b, 0);

  const totalFiledFederalPersonalDebt = req.body.debt
   .filter((f) => f.taxType === "wage" || f.taxType === "investment")
   .filter((f) => f.plaintiff === "irs")
   .filter((f) => f.filed === "filed")
   .map((d) => parseFloat(d.amount))
   .reduce((a, b) => a + b, 0);

  const totalFiledHomeStatePersonalDebt = req.body.debt
   .filter((f) => f.taxType === "wage" || f.taxType === "investment")
   .filter((f) => f.plaintiff === "state")
   .filter((f) => f.filed === "filed")
   .map((d) => parseFloat(d.amount))
   .reduce((a, b) => a + b, 0);

  const totalFiledOtherStatePersonalDebt = req.body.debt
   .filter((f) => f.taxType === "wage" || f.taxType === "investment")
   .filter((f) => f.plaintiff === "other")
   .map((d) => parseFloat(d.amount))
   .reduce((a, b) => a + b, 0);

  const totalFiledFederalBusinessDebt = req.body.debt
   .filter((f) => f.taxType === "business")
   .filter((f) => f.plaintiff === "irs")
   .filter((f) => f.filed === "filed")
   .map((d) => parseFloat(d.amount))
   .reduce((a, b) => a + b, 0);

  const totalFiledHomeStateBusinessDebt = req.body.debt
   .filter((f) => f.taxType === "business" || f.taxType === "sales")
   .filter((f) => f.plaintiff === "state")
   .filter((f) => f.filed === "filed")
   .map((d) => parseFloat(d.amount))
   .reduce((a, b) => a + b, 0);

  const totalFiledOtherStateBusinessDebt = req.body.debt
   .filter((f) => f.taxType === "business" || f.taxType === "sales")
   .filter((f) => f.plaintiff === "other")
   .filter((f) => f.filed === "filed")
   .map((d) => parseFloat(d.amount))
   .reduce((a, b) => a + b, 0);

  const totalUnfiledFederalPersonalDebt = req.body.debt
   .filter((f) => f.taxType === "wage" || f.taxType === "investment")
   .filter((f) => f.plaintiff === "irs")
   .filter((f) => f.filed === "unfiled")
   .map((d) => parseFloat(d.amount))
   .reduce((a, b) => a + b, 0);

  const totalUnfiledHomeStatePersonalDebt = req.body.debt
   .filter((f) => f.taxType === "wage" || f.taxType === "investment")
   .filter((f) => f.plaintiff === "state")
   .filter((f) => f.filed === "unfiled")
   .map((d) => parseFloat(d.amount))
   .reduce((a, b) => a + b, 0);

  const totalUnfiledOtherStatePersonalDebt = req.body.debt
   .filter((f) => f.taxType === "wage" || f.taxType === "investment")
   .filter((f) => f.plaintiff === "other")
   .filter((f) => f.filed === "unfiled")
   .map((d) => parseFloat(d.amount))
   .reduce((a, b) => a + b, 0);

  const totalUnfiledFederalBusinessDebt = req.body.debt
   .filter((f) => f.taxType === "business")
   .filter((f) => f.plaintiff === "irs")
   .filter((f) => f.filed === "unfiled")
   .map((d) => parseFloat(d.amount))
   .reduce((a, b) => a + b, 0);

  const totalUnfiledHomeStateBusinessDebt = req.body.debt
   .filter((f) => f.taxType === "business" || f.taxType === "sales")
   .filter((f) => f.plaintiff === "state")
   .filter((f) => f.filed === "unfiled")
   .map((d) => parseFloat(d.amount))
   .reduce((a, b) => a + b, 0);

  const totalUnfiledOtherStateBusinessDebt = req.body.debt
   .filter((f) => f.taxType === "business" || f.taxType === "sales")
   .filter((f) => f.plaintiff === "other")
   .filter((f) => f.filed === "unfiled")
   .map((d) => parseFloat(d.amount))
   .reduce((a, b) => a + b, 0);

  const federalYearsUnfiled = req.body.debt
   .filter((f) => f.plaintiff === "IRS")
   .filter((f) => f.filed === "unfiled").length;
  const stateYearsUnfiled = req.body.debt
   .filter((f) => f.plaintiff === "state")
   .filter((f) => f.filed === "unfiled").length;
  const otherYearsUnfiled = req.body.debt
   .filter((f) => f.plaintiff === "other")
   .filter((f) => f.filed === "unfiled").length;

  const filedStateLiability =
   totalFiledHomeStateBusinessDebt +
   totalFiledHomeStatePersonalDebt +
   totalUnfiledHomeStateBusinessDebt * 0.95 +
   totalUnfiledHomeStatePersonalDebt * 0.9;

  const totalFederalLiability =
   totalFiledFederalBusinessDebt +
   totalFiledFederalPersonalDebt +
   totalUnfiledFederalBusinessDebt +
   totalUnfiledFederalPersonalDebt;

  const filedOtherLiabilty =
   totalFiledOtherStateBusinessDebt +
   totalFiledOtherStatePersonalDebt +
   totalUnfiledOtherStateBusinessDebt * 0.95 +
   totalUnfiledOtherStatePersonalDebt * 0.9;

  let statePayment =
   filedStateLiability / 24 > 500 ? 500 : filedStateLiability / 24;

  let otherPayment =
   filedOtherLiabilty / 24 > 500 ? 500 : filedOtherLiabilty / 24;

  let monthlyIncome = parseFloat(postTax / 12);

  const expenses =
   parseFloat(req.body.deduction) + parseFloat(housing) + parseFloat(utility);

  let availableIncome = parseFloat(monthlyIncome - expenses);

  if (!isNaN(statePayment)) {
   availableIncome = availableIncome - statePayment;
  }

  if (!isNaN(otherPayment)) {
   availableIncome = availableIncome - otherPayment;
  }

  let offerableAmount = parseFloat(availableIncome * 36);

  let savings = parseFloat(totalDebt - offerableAmount);

  const reduceablePersonalDebt = parseFloat(
   totalFiledFederalPersonalDebt + totalUnfiledFederalPersonalDebt * 0.9
  );

  const reduceableBusinessDebt = parseFloat(
   totalFiledFederalBusinessDebt + totalUnfiledFederalBusinessDebt * 0.9
  );

  const reduceableDebt = parseFloat(
   reduceableBusinessDebt + reduceablePersonalDebt
  );

  if (parseInt(reduceableDebt) > 0) {
   savings = parseFloat(reduceableDebt - offerableAmount);
  }
  let adjustedStatePayment = 0;
  let adjustedOtherPayment = 0;
  let adjustedSavings = 0;
  let paymentPlan = 0;
  let abatedDebt = 0;
  let adjustedAvailableIncome = 0;
  let adjustedOfferableAmount = 0;
  if (savings < 0) {
   adjustedStatePayment =
    filedStateLiability / 12 > 750 ? 750 : filedStateLiability / 12;

   adjustedOtherPayment =
    filedOtherLiabilty / 12 > 750 ? 750 : filedOtherLiabilty / 12;

   adjustedAvailableIncome = parseFloat(monthlyIncome - expenses);

   if (!isNaN(statePayment)) {
    adjustedAvailableIncome = adjustedAvailableIncome - adjustedStatePayment;
   }

   if (!isNaN(otherPayment)) {
    adjustedAvailableIncome = adjustedAvailableIncome - adjustedOtherPayment;
   }
   adjustedOfferableAmount = parseFloat(adjustedAvailableIncome * 24);

   if (parseInt(reduceableDebt) > 0) {
    adjustedSavings = parseFloat(reduceableDebt - adjustedOfferableAmount);
    abatedDebt = reduceableDebt * 0.95;
   } else {
    adjustedSavings = parseFloat(totalDebt - adjustedOfferableAmount);
    abatedDebt = totalDebt * 0.95;
   }

   if (abatedDebt > 0) {
    paymentPlan = abatedDebt / 72;
   }
  }

  if (savings < 0) {
  }
  const taxConsult = {
   paymentPlan: parseFloat(paymentPlan).toFixed(2),
   abatedDebt: parseFloat(abatedDebt).toFixed(2),

   reduceableDebt: parseFloat(reduceableDebt).toFixed(2),
   reduceableBusinessDebt: parseFloat(reduceableBusinessDebt).toFixed(2),
   reduceablePersonalDebt: parseFloat(reduceablePersonalDebt).toFixed(2),
   offerableAmount: parseFloat(offerableAmount).toFixed(2),

   availableIncome: parseFloat(availableIncome).toFixed(2),
   income: parseFloat(income).toFixed(2),
   postTax: parseFloat(postTax).toFixed(2),
   monthlyIncome: parseFloat(monthlyIncome).toFixed(2),
   deduction: parseFloat(req.body.deduction),
   housing: parseFloat(housing).toFixed(2),
   utility: parseFloat(utility).toFixed(2),
   expenses: parseFloat(expenses).toFixed(2),
   savings: parseFloat(savings).toFixed(2),
   offerableAmount:
    offerableAmount < 200
     ? parseFloat("200.00")
     : parseFloat(offerableAmount).toFixed(2),
   availableIncome:
    availableIncome < 0
     ? parseFloat(availableIncome + 900).toFixed(2)
     : parseFloat(availableIncome).toFixed(2),
   statePayment:
    availableIncome < 0 && statePayment > 0
     ? parseFloat("50.00")
     : parseFloat(statePayment).toFixed(2),
   otherPayment:
    availableIncome < 0 && otherPayment > 0
     ? parseFloat(otherPayment).toFixed(2)
     : parseFloat(otherPayment).toFixed(2),
   adjustedSavings:
    adjustedSavings > reduceableDebt
     ? reduceableDebt
     : parseFloat(adjustedSavings).toFixed(2),
   adjustedOfferableAmount: parseFloat(adjustedOfferableAmount).toFixed(2),
   adjustedAvailableIncome: parseFloat(adjustedAvailableIncome).toFixed(2),
   adjustedStatePayment: parseFloat(adjustedStatePayment).toFixed(2),
   adjustedOtherPayment: parseFloat(adjustedOtherPayment).toFixed(2),
   filedStateLiability: parseFloat(filedStateLiability).toFixed(2),
   filedOtherLiabilty: parseFloat(filedOtherLiabilty).toFixed(2),
   totalFederalLiability: parseFloat(totalFederalLiability).toFixed(2),
   stateYearsUnfiled: stateYearsUnfiled,
   otherYearsUnfiled: otherYearsUnfiled,
   federalYearsUnfiled: federalYearsUnfiled,
   totalDebt: parseFloat(totalDebt).toFixed(2),
   name: req.body.name,
   email: req.body.email,
   phone: req.body.phone,
   residents: req.body.residents,
   zip: req.body.zip,
   problem: req.body.problem,
   deduction: req.body.deduction,
   authorized: req.body.authorized,
  };

  var pdfoptions = {
   format: "A3",
   orientation: "portrait",
   border: "10mm",
  };

  var html = fs.readFileSync("./template.html", "utf8");
  var document = {
   html: html,
   data: {
    paymentPlan: parseFloat(paymentPlan).toFixed(2),
    abatedDebt: parseFloat(abatedDebt).toFixed(2),

    reduceableDebt: parseFloat(reduceableDebt).toFixed(2),
    reduceableBusinessDebt: parseFloat(reduceableBusinessDebt).toFixed(2),
    reduceablePersonalDebt: parseFloat(reduceablePersonalDebt).toFixed(2),
    offerableAmount: parseFloat(offerableAmount).toFixed(2),

    availableIncome: parseFloat(availableIncome).toFixed(2),
    income: parseFloat(income).toFixed(2),
    postTax: parseFloat(postTax).toFixed(2),
    monthlyIncome: parseFloat(monthlyIncome).toFixed(2),
    deduction: parseFloat(req.body.deduction),
    housing: parseFloat(housing).toFixed(2),
    utility: parseFloat(utility).toFixed(2),
    expenses: parseFloat(expenses).toFixed(2),
    savings: parseFloat(savings).toFixed(2),
    offerableAmount:
     offerableAmount < 200
      ? parseFloat("200.00")
      : parseFloat(offerableAmount).toFixed(2),
    availableIncome:
     availableIncome < 0
      ? parseFloat(availableIncome + 900).toFixed(2)
      : parseFloat(availableIncome).toFixed(2),
    statePayment:
     availableIncome < 0 && statePayment > 0
      ? parseFloat("50.00").toFixed(2)
      : parseFloat(statePayment).toFixed(2),
    otherPayment:
     availableIncome < 0 && otherPayment > 0
      ? parseFloat("50.00").toFixed(2)
      : parseFloat(otherPayment).toFixed(2),
    adjustedSavings:
     adjustedSavings > reduceableDebt
      ? reduceableDebt
      : parseFloat(adjustedSavings).toFixed(2),
    adjustedOfferableAmount: parseFloat(adjustedOfferableAmount).toFixed(2),
    adjustedAvailableIncome: parseFloat(adjustedAvailableIncome).toFixed(2),
    adjustedStatePayment: parseFloat(adjustedStatePayment).toFixed(2),
    adjustedOtherPayment: parseFloat(adjustedOtherPayment).toFixed(2),
    filedStateLiability: parseFloat(filedStateLiability).toFixed(2),
    filedOtherLiabilty: parseFloat(filedOtherLiabilty).toFixed(2),
    totalFederalLiability: parseFloat(totalFederalLiability).toFixed(2),
    stateYearsUnfiled: stateYearsUnfiled,
    otherYearsUnfiled: otherYearsUnfiled,
    federalYearsUnfiled: federalYearsUnfiled,
    totalDebt: parseFloat(totalDebt).toFixed(2),
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    residents: req.body.residents,
    zip: req.body.zip,
    problem: req.body.problem,
    deduction: req.body.deduction,
    authorized: req.body.authorized,
   },
   path: `./${req.body.name} Custom Settlement Calculation.pdf`,
   type: "",
  };

  const welcome = await Email.find({ name: "welcome.html" });

  pdf
   .create(document, pdfoptions)
   .then((res) => {
    if (fs.existsSync(res.filename) && welcome[1].html) {
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

     fs.writeFile("./views/template.hbs", welcome[1].html, (err) => {
      if (err) throw err;
     });
     var buffer = fs.readFileSync(res.filename);
     transporter.use("compile", hbs(options));

     const mailer = {
      title: `Custom Settlement Calculation for ${taxConsult.name}`,
      from: `settlements@andersonbradshawtax.com`,
      to: req.body.email,
      subject: `Custom Settlement Calculation for ${taxConsult.name}`,
      attachments: [
       {
        filename: `${req.body.name} Custom Settlement Offer.pdf`,
        content: Buffer.from(buffer, "application/pdf"),
       },
      ],
      template: "template",
      context: { name: taxConsult.name },
     };

     transporter.sendMail(mailer);

     fs.unlinkSync(res.filename);
    }
   })
   .catch((error) => {
    console.log(error);
   });
 }
 if (req.body.authorized === true) {
  const { name, phone, email, problem } = req.body;
  const newLead = new Lead({
   name,
   phone,
   email,
   problem,
  });
  const form = await Email.find();

  const formResponse = form[0];

  const lead = await newLead.save(async function (err) {
   if (!err) {
    const rawResponse = await fetch(
     "https://andersontax.irslogics.com/publicapi/2020-02-22/cases/casefile",
     {
      method: "POST",
      headers: {
       Authorization: process.env.LOGICSAPIKEY,
       "Content-Type": "application/json",
      },
      body: JSON.stringify({
       FirstName: name.substring(0, name.indexOf(" ")),
       LastName: name.substring(name.indexOf(" ") + 1, name.length),
       CellPhone: phone,
       Email: email,
       OpenerName: "Mickey Gray",
       SETOfficerName: "Jeff Klinger",
       SourceName: "FACEBOOK",
       Notes: `Problem:${problem}. They have filled out the offer calculator.`,
      }),
     }
    );
    const content = await rawResponse.json();

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

    fs.writeFile("./views/template.hbs", formResponse.html, (err) => {
     if (err) throw err;
    });

    transporter.use("compile", hbs(options));

    const mailer = {
     title: `New Incoming Form Lead`,
     from: `leads@andersonbradshawtax.com`,
     to: ["mickey@andersonbradshawtax.com", "Jeff@andersonbradshawtax.com"],
     subject: `New Incoming Form Lead`,
     template: "template",
     context: {
      timeStamp: Intl.DateTimeFormat("en-US", {
       timeZone: "America/Los_Angeles",
      }).format(new Date()),
      campaignName: "ABTaxConsulting Pixel Mascot",
      url: "ABTaxConsulting.com",
      case: content.data.replace(/[^\d.-]/g, ""),
      name: name,
      phone: phone,
      email: email,
      problem: problem,
     },
    };

    transporter.sendMail(mailer);
   }
  });

  res.json(lead);
 }
});

module.exports = router;
