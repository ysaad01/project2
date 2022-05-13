const seedUsers = require("./user-seed");
const seedPets = require("./dog-seed");

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("==========");
  await seedUsers();
  console.log("==========");
  await seedPets();

  process.exit(0);
};

seedAll();
