const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
 email: {
  type: String,
  required: true,
 },
 isAdmin: {
  type: Boolean,
  default: false,
 },
 isVerified: {
  type: Boolean,
  default: false,
 },
 temp_secret: {
  type: String,
 },
 pin: { type: String },
});

module.exports = mongoose.model("user", UserSchema);
