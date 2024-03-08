const nodemailer = require("nodemailer");
const speakeasy = require("speakeasy");
const fs = require("fs");
const path = require("path");
const hbs = require("nodemailer-express-handlebars");
require("dotenv").config();

async function sendVerificationEmail(email, token) {
 try {
  // Generate a 2FA token

  // Create a transporter for nodemailer
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
   from: "verify@andersonbradshawtax.com",
   to: email, // Replace with recipient's email
   subject: "Verify Your Account",
   template: "verify", // Name of the template file without extension
   context: {
    // Replace with recipient's full name
    token: token, // The verification token
   },
  };

  // Send the email
  await transporter.sendMail(mailOptions);
  console.log("Verification email sent successfully.");

  // Return the token for reference if needed
  return token;
 } catch (error) {
  console.error("Error sending verification email:", error);
  throw error; // Rethrow or handle as needed
 }
}

module.exports = sendVerificationEmail;
