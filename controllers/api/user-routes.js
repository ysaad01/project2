const router = require("express").Router();
const { User, Pets } = require("../../models");
const session = require("express-session");
const passport = require("../../config/passport");
const genPassword = require("../../lib/passwordUtils").genPassword;
const isAuth = require("../../utils/auth");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// GET ALL users
router.get("/", (req, res) => {
  User.findAll({
    include: {
      model: Pets,
      attributes: ["id", "dog_name"],
    },
  })
    .then((userData) => {
      res.status(200).json(userData);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// router.post(
//   "/login",
//   passport.authenticate("local", {
//     failureRedirect: "/login",
//     successRedirect: "/dashboard",
//   })
// );
router.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/");
});

// GET user by ID
router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  try {
    const userData = await User.findByPk(req.params.id, {
      include: {
        model: Pets,
        attributes: ["id", "dog_name"],
      },
    });
    if (!userData) {
      throw {
        status: 404,
        message: "No User found with that ID",
      };
    }
    res.status(200).json(userData);
  } catch (err) {
    if (err.status === 404) {
      res.status(404).json(err);
    } else {
      res.status(500).json(err);
    }
  }
});

// CREATE new user
router.post("/", (req, res) => {
  const hashPass = genPassword(req.body.password);
  console.log("SIGNUP", hashPass);
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: hashPass.hash,
    salt: hashPass.salt,
  })
    .then((dbUserData) => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;

        res.json(dbUserData);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Update user
router.put("/:id", async (req, res) => {
  // update a user by its `id` value
  try {
    const updateUserData = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (updateUserData[0] === 0) {
      throw {
        status: 404,
        message: "No User was found with that ID",
      };
    }
    console.log("Updated User", updateUserData);
    res.status(201).json({
      message: "User has been updated!",
      data: updateUserData,
    });
  } catch (err) {
    if (err.status === 404) {
      res.status(404).json(err);
    } else {
      res.status(500).json(err);
    }
  }
});

// Delete a user by ID
router.delete("/:id", async (req, res) => {
  // delete a user by its `id` value
  try {
    const deleteUser = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(201).json({
      message: "User has been deleted!",
      data: deleteUser,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// User login route
router.post("/login", (req, res) => {
  console.log("LOGIN", req.body);
  // passport.authenticate("local", (err, user, info) => {
  //   console.log("LOGGING IN");
  // });
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((dbUserData) => {
    if (!dbUserData) {
      res
        .status(400)
        .json({ message: "No user was found with that email address!" });
      return;
    }
    // const validPassword = dbUserData.checkPassword(req.body.password);
    // if (!validPassword) {
    //   res.status(400).json({ message: "Invalid Password. Please try again!" });
    //   return;
    // }
    req.session.save(() => {
      // declare session variables
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      res.json({ user: dbUserData, message: "You are now logged in!" });
    });
  });
});
// Logout
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
