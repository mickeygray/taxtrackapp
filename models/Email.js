const mongoose = require("mongoose");
const { Schema } = mongoose;

const emailSchema = new Schema({
 reactstring: String,
 title: String,
 html: String,
 text: String,
 subject: String,
 status: String,
 emailNumber: Number,
 from: String,

 trackingNumber: String,
 key: String,
});

module.exports = mongoose.model("email", emailSchema);
