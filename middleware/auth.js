const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
 // Get token from header
 const token = req.header("x-auth-token");

 // Check if not token
 if (!token) {
  return res.status(401).json({ msg: "No token, authorization denied" });
 }

 try {
  const decoded = jwt.verify(token, config.get("jwtSecret"));

  // Check for profile or user in the decoded token and set accordingly
  if (decoded.profile) {
   req.profile = decoded.profile;
  } else if (decoded.user) {
   req.user = decoded.user;
  } else {
   // If neither profile nor user are present, throw an error or handle it as needed
   return res.status(401).json({ msg: "Token is not valid" });
  }

  next();
 } catch (err) {
  console.error(err.message);
  res.status(401).json({ msg: "Token is not valid" });
 }
};
