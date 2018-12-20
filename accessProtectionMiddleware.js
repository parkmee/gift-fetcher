accessProtectionMiddleware = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    // redirect to / to have user login
    res.redirect("/");
  }
};

module.exports = accessProtectionMiddleware;
