const router = require("express").Router();
const passport = require("../../config/passport");
const querystring = require("querystring");
const { User, Pets, Booking } = require("../../models");

// GET ALL bookings
router.get("/", (req, res) => {
  Booking.findAll()
    .then((bookingData) => res.json(bookingData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Create a new booking
router.post("/", (req, res, next) => {
  Booking.create(req.body)
    .then((booking) => {
      res.send(booking);
    })
    .catch(next);
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
router.delete("/:id", (req, res, next) => {
  Booking.findByIdAndRemove({ _id: req.params.id }).then((booking) => {
    res.send(booking);
  });
});

module.exports = router;
