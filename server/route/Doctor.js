const {
  login,
  allReports,
  changePassword,
  getADoctor,
  feedback,
} = require("../controller/DoctorController");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");

const route = require("express").Router();

// routes
route.post("/login/", login);
route.get("/reports/", authMiddleware, allReports);
route.get("/:id", authMiddleware, getADoctor);
route.put("/change-password", changePassword);
route.post("/feedback/:id", authMiddleware, feedback);

module.exports = route;
