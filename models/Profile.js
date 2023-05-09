const mongoose = require("mongoose");
const { Schema } = mongoose;

const profileSchema = new Schema({
 fullName: {
  type: String,
  required: true,
 },
 firstName: {
  type: String,
  required: true,
 },
 lastName: {
  type: String,
  required: true,
 },
 email: {
  type: String,
  required: true,
  unique: true,
 },
 phone: {
  type: String,
  required: true,
  unique: true,
 },
 status: { type: String },
 dob: { type: String },
 ssn: { type: String },
 address: { type: String },
 accountTransactions: [
  {
   code: { type: String },
   description: { type: String },
   amount: { type: Number },
   date: { type: String },
   period: { type: String },
  },
 ],
 messages: [
  {
   name: { type: String },
   content: { type: String },
   date: { type: String },
  },
 ],
 tasks: [
  {
   type: { type: String },
   priority: { type: String },
   description: { type: String },
   date: { type: String },
  },
 ],
 milestones: [
  {
   action: { type: String },
   party: { type: String },
   date: { type: String },
   amount: { type: String },
  },
 ],
 city: { type: String },
 state: { type: String },
 zip: { type: String },
 status: { type: String },
 addDate: { type: String },
 startingBalance: { type: Number },
 currentBalance: { type: Number },
 pin: { type: String },
 caseID: {
  type: String,
  required: true,
 },
 temp_secret: { type: Object },
});

module.exports = mongoose.model("profile", profileSchema);
