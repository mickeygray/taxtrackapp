const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
 //Get Token from heaver
 const token = req.header("x-auth-token");
 //console.log(req);
 //check if not token

 if (!token) {
  return res.status(401).json({ msg: "no token auth denied" });
 }

 try {
  const decoded = jwt.verify(token, config.get("jwtSecret"));

  req.profile = decoded.profile;

  req.user = decoded.user;

  next();
 } catch (err) {
  res.status(401).json({ msg: "Token is not valid " });
 }
};
