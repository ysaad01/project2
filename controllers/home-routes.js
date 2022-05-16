const router = require("express").Router();
const sequelize = require("../config/connection");
const { User, Pets } = require("../models");

// Render the login page
router.get("/login", (req, res) => {
  res.render("login");
});

module.exports = router;
