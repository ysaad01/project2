const router = require("express").Router();
const sequelize = require("../config/connection");
const { User, Pets } = require("../models");

router.get("/", (req, res) => {
  res.render("homepage");
});

// Render the login page
router.get("/login", (req, res) => {
  res.render("login");
});

// Render the sign up page
router.get("/signup", (req, res) => {
  res.render("signup");
});


module.exports = router;
