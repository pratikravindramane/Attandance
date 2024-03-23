const jwt = require("jsonwebtoken");
const genrateToken = (id, isAdmin) => {
  return jwt.sign({ id, isAdmin }, process.env.JWT, { expiresIn: "1d" });
};
module.exports = genrateToken;
