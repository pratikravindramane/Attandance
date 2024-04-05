const asyncHandler = require("express-async-handler");
const User = require("../model.js/User");
const bcrypt = require("bcrypt");
const genrateToken = require("../utils/genrateToken");

// login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    // verify email and passowrd
    const user = await User.findOne({ email });
    if (!user) throw new Error("No user found with this Email");
    if (user?.isAdmin)
      throw new Error("admin Can't Login thorough this Method");
    const verifyPassword = await bcrypt.compare(password, user.password);
    if (!verifyPassword) throw new Error("Wrong Credentials");

    // save to cookie
    const token = genrateToken(user._id, user.isAdmin);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });

    //update signin
    user.token = token;
    await user.save();
    res.send(user);
  } catch (error) {
    throw new Error(error);
  }
});

// admin login
const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    // verify email and passowrd
    const user = await User.findOne({ email });
    if (!user) throw new Error("No user found with this Email");
    if (!user.isAdmin) throw new Errro("Not Authorized");
    const verifyPassword = bcrypt.compare(user.password, password);
    if (!verifyPassword) throw new Error("Wrong Credentials");

    // save to cookie
    const token = genrateToken(user._id, user.isAdmin);
    res.cookie("token", token, {
      httpOnly: true,
      expiresIn: 72 * 60 * 60 * 1000,
    });
    // give token
    user.token = token;
    user.save();
    res.send(user);
  } catch (error) {
    throw new Error(error);
  }
});

// register
const register = asyncHandler(async (req, res) => {
  const { email, password, phone, name, age, gender, address } = req.body;
  // if user exists
  const user = await User.findOne({ email });
  if (user) throw new Error("user already exist with this email");
  // hash password
  const salt = await bcrypt.genSaltSync(10);
  const hash = await bcrypt.hash(password, salt);
  try {
    // create new User
    const newUser = new User({
      name,
      email,
      phone,
      password: hash,
      age,
      gender,
      address,
    });
    await newUser.save();
    res.send({ msg: "Successfully Registered", newUser });
  } catch (error) {
    throw new Error(error);
  }
});

// logout
const logout = asyncHandler(async (req, res) => {
  try {
    const cookie = req.cookies;
    if (!cookie?.token) throw new Error("No Token in Cookies");
    const token = cookie.token;
    const user = await User.findOne({ token });
    if (!user) {
      res.clearCookie("token", {
        httpOnly: true,
        secure: true,
      });
      return res.sendStatus(204); // forbidden
    }
    await User.findOneAndUpdate(
      { token },
      {
        token: "",
      }
    );
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
    });
    res.sendStatus(204); // forbidden
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
});
module.exports = {
  login,
  adminLogin,
  logout,
  register,
};
