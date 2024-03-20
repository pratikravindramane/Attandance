const {
  getAUser,
  getAllDoctors,
  feedback,
  report,
} = require("../controller/UserController");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");

const route = require("express").Router();

route.get("/:id/", authMiddleware, getAUser);
route.get("/doctors", authMiddleware, getAllDoctors);
route.post("/report/:id", authMiddleware, report);
route.post("/feedback/:id", authMiddleware, feedback);

module.exports = route;
