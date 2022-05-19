const seedUsers = require("./user-seed");
const seedPets = require("./dog-seed");
const seedBooking = require("./booking-seed");

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("==========");
  await seedUsers();
  console.log("==========");
  await seedPets();
  console.log("==========");
  await seedBooking();

  process.exit(0);
};

seedAll();
