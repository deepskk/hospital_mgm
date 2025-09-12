exports.dashboard = (req, res) => {
  res.render("Receptionist/dashboard", { username: req.session.username });
};
