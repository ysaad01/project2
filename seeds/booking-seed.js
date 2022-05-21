const { Booking } = require("../models");

const bookingData = [
  {
    owner_id: 1,
    pets_id: 1,
    startDate: "05-18-2022",
    endDate: "05-20-2022",
  },
  {
    owner_id: 2,
    pets_id: 2,
    startDate: "05-22-2022",
    endDate: "05-25-2022",
  },
];

const seedBooking = () => Booking.bulkCreate(bookingData);

module.exports = seedBooking;
