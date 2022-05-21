const router = require("express").Router();
const passport = require("../../config/passport");
const querystring = require("querystring");
const { User, Pets, Booking } = require("../../models");
const dayjs = require("dayjs");

// GET ALL bookings
router.get("/", (req, res) => {
  Booking.findAll({
    include: [
      {
        model: Pets,
        attributes: ["id", "dog_name"],
      },
    ],
  })
    .then((bookingData) => res.json(bookingData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get dog by id
router.get("/:id", (req, res) => {
  Booking.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((bookingData) => {
      if (!bookingData) {
        res.status(404).json({ message: "No Booking was found with that ID!" });
        return;
      }
      res.json(bookingData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Create a new booking
router.post("/", (req, res) => {
  // create a new PET
  console.log(req.body);
  Booking.create({
    owner_id: req.session.user_id,
    pets_id: Number(req.body.pets_id),
    startDate: dayjs(req.body.startDate).format("MM-DD-YYYY"),
    endDate: dayjs(req.body.endDate).format("MM-DD-YYYY"),
  })
    .then(() => {
      // instead of sending back pet data might want to try res.redirect(/dashboard)
      res.redirect("/dashboard");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Update a booking
router.put("/:id", (req, res, next) => {
  Booking.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
    Booking.findOne({ _id: req.params.id }).then((booking) => {
      res.send(booking);
    });
  });
});

// Delete a booking
// router.delete("/:id", (req, res, next) => {
//   Booking.findByIdAndRemove({ _id: req.params.id }).then((booking) => {
//     res.send(booking);
//   });
// });

router.delete("/:id", async (req, res) => {
  // delete a user by its `id` value
  try {
    const deleteBooking = await Booking.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(201).json({
      message: "Booking has been deleted!",
      data: deleteBooking,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
