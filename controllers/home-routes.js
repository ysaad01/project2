const router = require("express").Router();
const sequelize = require("../config/connection");
const { User, Pets } = require("../models");

// router.get("/", (req, res) => {
//   Pets.findAll({
//     attributes: ["dog_name", "owner_id"],
//     include: [
//       {
//         model: User,
//         attributes: ["username"],
//       },
//     ],
//   })
//     .then((dbPetData) => {
//       const pets = dbPetData.map((post) => post.get({ plain: true }));
//       res.render("homepage", { pets });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

router.get("/", (req, res) => {
  res.render("homepage");
});

// Render the login page
router.get("/login", (req, res) => {
  res.render("login");
});

// Render the signup page
router.get("/signup", (req, res) => {
  res.render("signup");
});

module.exports = router;
