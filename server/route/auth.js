const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const {
  login,
  adminLogin,
  register,
  logout,
} = require("../controller/authController");

const route = require("express").Router();

// routes
route.post("/login/", login);
route.post("/admin/", adminLogin);
route.post("/register/", register);
route.get("/logout/", authMiddleware, logout);

module.exports = route;
