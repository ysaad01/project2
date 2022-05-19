const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const connection = require("./connection");

const { User } = require("../models");
const { genPassword } = require("../lib/passwordUtils");
const validPassword = require("../lib/passwordUtils").validPassword;
const customFields = {
  usernameField: "email",
  passwordField: "password",
};
const verifyCallback = (username, password, done) => {
  console.log("verifyCallback", username, password, done);
  User.findOne({ where: { email: username } })
    .then((user) => {
      if (!user) {
        return done(null, false);
      }
      console.log("verifyCallback", user);
      const salt = genPassword(password).salt;
      const isValid = validPassword(
        password,
        user.dataValues.password,
        user.dataValues.salt
      );
      if (isValid) {
        console.log("IS VALID");
        return done(null, user);
      } else {
        console.log("INVALID");
        return done(null, false);
      }
    })
    .catch((err) => {
      return done(err);
    });
};
const strategy = new LocalStrategy(customFields, verifyCallback);
passport.use(strategy);
passport.serializeUser((user, done) => {
  console.log("in serializer");
  return done(null, user.id);
});
passport.deserializeUser((userId, done) => {
  console.log("in DEserializer");
  User.findOne({ where: { id: userId } })
    .then((user) => {
      return done(null, user);
    })
    .catch((err) => done(err));
});

module.exports = passport;

// // Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
// passport.use(new LocalStrategy(
//   // Our user will sign in using an email, rather than a "username"
//   {
//     usernameField: "email"
//   },
//   function (email, password, done) {
//     // When a user tries to sign in this code runs
//     db.User.findOne({
//       where: {
//         email: email
//       }
//     }).then(function (dbUser) {
//       // If there's no user with the given email
//       if (!dbUser) {
//         return done(null, false, {
//           message: "Incorrect email."
//         });
//       }
//       // If there is a user with the given email, but the password the user gives us is incorrect
//       else if (!dbUser.validPassword(password)) {
//         return done(null, false, {
//           message: "Incorrect password."
//         });
//       }
//       // If none of the above, return the user
//       return done(null, dbUser);
//     });
//   }
// ));

// // In order to help keep authentication state across HTTP requests,
// // Sequelize needs to serialize and deserialize the user
// // Just consider this part boilerplate needed to make it all work
// passport.serializeUser(function(user, cb) {
//   cb(null, user);
// });

// passport.deserializeUser(function(obj, cb) {
//   cb(null, obj);
// });

// // Exporting our configured passport
// module.exports = passport;
