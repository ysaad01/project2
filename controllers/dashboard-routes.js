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

module.exports = router;
