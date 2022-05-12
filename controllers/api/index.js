const router = require("express").Router();

const userRoutes = require("./user-routes");
const petsRoutes = require("./pets-routes");

router.use("/users", userRoutes);
router.use("/pets", petsRoutes);

module.exports = router;
