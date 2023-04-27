const mongoose = require("mongoose");
const { Schema } = mongoose;

const ruleSchema = new Schema({
 code: String,
 type: String,
});

module.exports = mongoose.model("rules", ruleSchema);
