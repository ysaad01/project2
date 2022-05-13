const router = require("express").Router();

const apiRoutes = require("./api-routes");
const userRoutes = require("./user-routes");
const petsRoutes = require("./pets-routes");

router.use("/api", apiRoutes);
router.use("/users", userRoutes);
router.use("/pets", petsRoutes);

module.exports = router;
