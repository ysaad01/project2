const router = require("express").Router();

// const apiRoutes = require("./api-routes");
const userRoutes = require("./user-routes");
const petsRoutes = require("./pets-routes");
const bookingRoutes = require("./booking-routes");

// router.use("/api", apiRoutes);
router.use("/users", userRoutes);
router.use("/pets", petsRoutes);
router.use("/booking", bookingRoutes);

module.exports = router;
