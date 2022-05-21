const router = require("express").Router();
const sequelize = require("../config/connection");
const { User, Pets, Booking } = require("../models");
const isAuth = require("../utils/auth");

// shows pets on dashboard
router.get("/dashboard", isAuth, (req, res) => {
  Pets.findAll({
    attributes: ["id", "dog_name", "gender", "bio"],
    include: {
      model: User,
      attributes: ["username"],
    },
    where: {
      owner_id: req.session.user_id,
    },
  })
    .then((dbPetsData) => {
      const pets = dbPetsData.map((pet) => pet.get({ plain: true }));
      Booking.findAll({
        where: {
          owner_id: req.session.user_id,
        },
        include: {
          model: Pets,
          attributes: ["id", "dog_name"],
        },
      }).then((bookings) => {
        res.render("dashboard", {
          pets,
          bookings,
          loggedIn: req.session.loggedIn,
        });
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

// Render the dashboard

router.get("/booking", isAuth, (req, res) => {
  Pets.findAll({
    where: {
      owner_id: req.session.user_id,
    },
  }).then((pets) => {
    console.log("BOOKING", req.session.user_id, pets);
    res.render("booking", {
      loggedIn: req.session.loggedIn,
      pets,
    });
  });
});

// edit logged in user
router.get("/edituser", isAuth, (req, res) => {
  User.findOne({
    attributes: { exclude: ["password"] },
    where: {
      id: req.session.user_id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      const user = dbUserData.get({ plain: true });
      res.render("edit-user", { user, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
