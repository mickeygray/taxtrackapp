const nodemailer = require("nodemailer");
const speakeasy = require("speakeasy");
const fs = require("fs");
const path = require("path");
const hbs = require("nodemailer-express-handlebars");
require("dotenv").config();

async function sendWelcomeEmail(fullName, email) {
 try {
  // Generate a 2FA token
  console.log(typeof process.env.SENDGRID_API_KEY);
  // Create a transporter for nodemailer
  const transporter = nodemailer.createTransport({
   host: "smtp.sendgrid.net",
   port: 465,
   secure: true,
   auth: {
    user: "apikey",
    pass: process.env.SENDGRID_API_KEY,
   },
  });

  // Configure handlebars options for the email template
  const options = {
   viewEngine: {
    extName: ".hbs",
    partialsDir: path.join(__dirname, "../templates"),
    layoutsDir: path.join(__dirname, "../templates"),
    defaultLayout: false,
   },
   viewPath: path.join(__dirname, "../templates"),
   extName: ".hbs",
  };

  // Load the HTML for the email from a database or file system
  // Assume `Email` model or similar mechanism to fetch HTML content
  //const verifyEmail = await Email.findOne({ name: "verifyEmail" });

  // Write the HTML content to a temporary file (if needed)

  // Apply the template engine to the transporter
  transporter.use("compile", hbs(options));

  // Define the email options
  const mailOptions = {
   from: "welcome@andersonbradshawtax.com",
   to: email, // Replace with recipient's email
   subject: "Welcome To Tax Hub!",
   template: "welcome", // Name of the template file without extension
   context: {
    fullName: fullName, // Replace with recipient's full name
   },
  };

  // Send the email
  await transporter.sendMail(mailOptions);
  console.log("Welcome email sent successfully.");

  // Return the token for reference if needed
  return token;
 } catch (error) {
  console.error("Error sending welcome email:", error);
  throw error; // Rethrow or handle as needed
 }
}

module.exports = sendWelcomeEmail;
