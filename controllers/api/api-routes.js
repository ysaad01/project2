// const db = require("../models");

// // Login api routes
// app.post("/api/login", passport.authenticate("local"), function (req, res) {
//     res.json("/user/profile");
// });

// // Route for signing up user
// app.post("/api/signup", (req, res) => {
//     db.User.create({
//         first_name: req.body.first_name,
//         last_name: req.body.last_name,
//         email: req.body.email,
//         password: req.body.password
//     })
//         .then(() => {
//             res.redirect(307, "/api/login");
//         })
//         .catch(err => {
//             res.status(401).json(err);
//         });
// });

// // Route for logging user out
// app.get("/logout", (req, res) => {
//     req.logout();
//     res.redirect("/");
// });
