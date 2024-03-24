const {
  getAll,
  createDoctor,
  createTraining,
  getAllFeedback,
  getAllTraining,
} = require("../controller/AdminController");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");

const route = require("express").Router();

route.post("/create/doctor", authMiddleware, isAdmin, createDoctor);
route.post("/create/training", authMiddleware, isAdmin, createTraining);
route.get("/feedbacks", authMiddleware, isAdmin, getAllFeedback);
route.get("/users/", authMiddleware, isAdmin, getAll);
route.get("/trainings", authMiddleware, isAdmin, getAllTraining);

module.exports = route;
