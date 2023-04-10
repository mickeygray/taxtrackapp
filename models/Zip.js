const mongoose = require("mongoose");
const { Schema } = mongoose;

const zipSchema = new Schema({
 zipcode: String,
 population: String,
 medianincome: String,
 meanincome: String,
 percenthighearners: String,
});

module.exports = mongoose.model("zips", zipSchema);
