const User = require("./User");
const Pets = require("./Pets");
const Booking = require("./Booking");

// reverse user association to pets model
User.hasMany(Pets, {
  foreignKey: "owner_id",
  onDelete: "cascade",
  hooks: true,
});
// pets association to user model
Pets.belongsTo(User, {
  foreignKey: "owner_id",
});

// pets to appt association(pet has many appts but appt belongs to one pet)

Pets.hasMany(Booking, {
  foreignKey: "pets_id",
  onDelete: "SET NULL",
  hooks: true,
});

Booking.belongsTo(Pets, {
  foreignKey: "pets_id",
  onDelete: "SET NULL",
  hooks: true,
});

// user to appt association(user has many appts but appt belongs to one user)
User.hasMany(Booking, {
  foreignKey: "owner_id",
  onDelete: "SET NULL",
  hooks: true,
});

Booking.belongsTo(User, {
  foreignKey: "owner_id",
  onDelete: "SET NULL",
  hooks: true,
});

module.exports = { User, Pets, Booking };
