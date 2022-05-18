const router = require("express").Router();
const { User, Pets } = require("../../models");

// get all pets
router.get("/", (req, res) => {
  Pets.findAll()
    .then((petsData) => res.json(petsData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get dog by id
router.get("/:id", (req, res) => {
  Pets.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((petData) => {
      if (!petData) {
        res.status(404).json({ message: "No Pet was found with this id!" });
        return;
      }
      res.json(petData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Create a new pet
router.post("/", (req, res) => {
  // create a new PET
  Pets.create({
    dog_name: req.body.dog_name,
    gender: req.body.gender,
    bio: req.body.bio,
    owner_id: req.body.owner_id,
  })
    .then((petData) => {
      // instead of sending back pet data might want to try res.redirect(/dashboard)
      res.json(petData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Update pet
router.put("/:id", async (req, res) => {
  // update a pet by its `id` value
  try {
    const updatePetData = await Pets.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (updatePetData[0] === 0) {
      throw {
        status: 404,
        message: "No Pet was found with that ID",
      };
    }
    res.status(201).json({
      message: "Pet has been updated!",
      data: updatePetData,
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
    const deletePet = await Pets.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(201).json({
      message: "Pet has been deleted!",
      data: deletePet,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
