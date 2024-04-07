const {
  getAUser,
  getAllDoctors,
  feedback,
  report,
  allReports,
} = require("../controller/UserController");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");

const route = require("express").Router();

route.get("/doctors/", authMiddleware, getAllDoctors);
route.get("/:id/", authMiddleware, getAUser);
route.post("/check/:id", authMiddleware, report);
route.get("/report/:id", authMiddleware, allReports);
route.post("/feedback/:id", authMiddleware, feedback);

module.exports = route;
