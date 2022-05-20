const router = require("express").Router();
const sequelize = require("../config/connection");
const { User, Pets } = require("../models");
const isAuth = require("../utils/auth");

// render dashboard for logged in user
router.get("/dashboard", isAuth, (req, res) => {
  console.log("DASHBOARD ROUTES");
  Pets.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: ["id", "dog_name", "gender", "bio"],
    include: {
      model: User,
      attributes: ["username"],
    },
  })
    .then((dbPetsData) => {
      const user = dbPetsData.map((user) => user.get({ plain: true }));
      res.render("dashboard", { user, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
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
