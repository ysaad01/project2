const router = require("express").Router();
const { User, Pets } = require("../../models");

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

// CREATE new user
router.post("/", (req, res) => {
  dbUserData = User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then((dbUserData) => {
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  // req.session.save(() => {
  //   req.session.loggedIn = true;

  //   res.status(200).json(dbUserData);
  // });
});

// Login
router.post("/login", async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;

      res
        .status(200)
        .json({ user: dbUserData, message: "You are now logged in!" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
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
