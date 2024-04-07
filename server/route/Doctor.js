const { login, allReports, changePassword } = require("../controller/DoctorController");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");

const route = require("express").Router();

// routes
route.post("/login/", login);
route.get("/reports/",authMiddleware ,allReports);
route.put("/change-password", changePassword);
module.exports = route;
