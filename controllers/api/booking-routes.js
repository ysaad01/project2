const router = require("express").Router();
const passport = require("passport");
const querystring = require("querystring");

const Booking = require("../models/Booking");


// Create a new booking
router.post('/booking', (req, res, next) => {
    Booking.create(req.body)
    .then( booking => {
        res.send(booking);
    }).catch(next);
});

// Update a booking
router.put('/booking/:id', (req, res, next) => {
    Booking.findByIdAndUpdate({_id: req.params.id}, req.body)
    .then(() => {
        Booking.findOne({_id: req.params.id})
        .then( booking => {
            res.send(booking);
        });
    });
});

// Delete a booking
router.delete('/booking/:id', (req, res, next) => {
    Booking.findByIdAndRemove({_id: req.params.id})
    .then( booking => {
        res.send(booking);
    });
});


module.exports = router;