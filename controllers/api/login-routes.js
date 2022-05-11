// Login api route
app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json("/user/profile");
  });