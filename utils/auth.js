const isAuth = (req, res, next) => {
  console.log("IS AUTH", req.session);
  if (!req.session.user_id) {
    res.redirect("/login");
  } else {
    next();
  }
};

module.exports = isAuth;
