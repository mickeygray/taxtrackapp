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
 penaltyObj: {
  type: Object,
 },
 taxReturnData: {
  type: Array,
 },
 wageReport: {
  type: Object,
 },
 status: { type: String },
 taxDocuments: { type: Array },
 totalBalance: { type: String },
 profileSummary: { type: Object },
 dob: { type: String },
 ssn: { type: String },
 address: { type: String },
 docs: { type: Array },
 accountTransactions: { type: Array },
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
 interest: { type: String },
 penalties: { type: String },
 startingBalance: { type: String },
 totalBalance: { type: String },
 penalizedYears: { type: String },
 mgi: { type: String },
 rmgi: { type: String },
 totalPaymentSummary: { type: Array },
 formsFiled: { type: Array },
 pin: { type: String },
 ttuid: { type: String },
 caseID: {
  type: String,
  required: true,
 },
});

module.exports = mongoose.model("profile", profileSchema);
