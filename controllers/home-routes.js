const router = require("express").Router();
const sequelize = require("../config/connection");
const { User, Pets } = require("../models");
const isAuth = require("../utils/auth");

router.get("/dashboard", isAuth, (req, res) => {
  Pets.findAll({
    attributes: ["id", "dog_name", "gender", "bio"],
    include: {
      model: User,
      attributes: ["username"],
    },
  })
    .then((dbPetsData) => {
      const user = dbPetsData.map((user) => user.get({ plain: true }));
      res.render("dashboard", {
        user,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/", (req, res) => {
  res.render("homepage");
});

// Render the login page
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/dashboard");
    return;
  }
  res.render("login");
});

// Render the sign up page
router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("dashboard");
  }
  res.render("signup");
});

router.get("/dashboard", (req, res) => {
  res.render("dashboard");
});
module.exports = router;
