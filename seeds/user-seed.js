const { User } = require("../models");

const userData = [
  {
    username: "Test1",
    email: "test1@email.com",
    password: "password1",
  },
  {
    username: "Test2",
    email: "test2@email.com",
    password: "password2",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
