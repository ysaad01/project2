const { Pets } = require("../models");

const petData = [
  {
    dog_name: "Maddie",
    gender: "female",
    bio: "testtesttesttest",
    owner_id: 1,
  },
  {
    dog_name: "Cooper",
    gender: "male",
    bio: "testtesttesttesttest",
    owner_id: 2,
  },
];

const pets = () => Pets.bulkCreate(petData);

module.exports = pets;
