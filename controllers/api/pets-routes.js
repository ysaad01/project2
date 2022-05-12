const router = require("express").Router();
const { User, Pets } = require("../../models");

// get all dogs
router.get("/", async (req, res) => {
  try {
    const petsData = await Pets.findAll({
      include: [
        {
          model: Pets,
          attributes: ["id", "dog_name", "gender", "bio", "owner_id"],
        },
        {
          model: User,
          attributes: ["id"],
        },
      ],
    });
    res.status(200).json(petsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get dog by id
router.get("/:id", async (req, res) => {
  try {
    const petsData = await Pets.findByPk(req.params.id, {
      include: {
        model: Pets,
        attributes: ["id", "dog_name", "gender", "bio", "owner_id"],
      },
    });
    if (!petsData) {
      throw {
        status: 404,
        message: "No Dog was found with that ID",
      };
    }
    res.status(200).json(tagData);
  } catch (err) {
    if (err.status === 404) {
      res.status(404).json(err);
    } else {
      res.status(500).json(err);
    }
  }
});

// add another dog
router.post("/", async (req, res) => {
  // create a new tag
  try {
    const newPet = await Pets.create(req.body);
    res.status(201).json(newPet);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
