const User = require("./User");
const Pets = require("./Pets");

// reverse user association to pets model
User.hasMany(Pets, {
  foreignKey: "owner_id",
});
// pets association to user model
Pets.belongsTo(User, {
  foreignKey: "owner_id",
});

module.exports = { User, Pets };
