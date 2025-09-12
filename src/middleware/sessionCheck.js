// sessionCheck.js

exports.ensureLoggedIn = (role) => {
  return (req, res, next) => {
    if (req.session.username && req.session.role === role) {
      next();
    } else {
      res.redirect("/login");
    }
  };
};

