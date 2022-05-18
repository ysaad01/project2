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

// pets to appt association(pet has many appts but appt belongs to one pet)

// user to appt association(user has many appts but appt belongs to one user)

module.exports = { User, Pets };
