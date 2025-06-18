const nurseService = require("../../services/nurseService");

exports.getAddNursePage = (req, res) => {
  const userId = 2; // Hardcoded (no session)
  res.render("Receptionist/addNurse", { userId });
};

exports.addNurse = (req, res) => {
  const nurseData = req.body;

  nurseService.insertNurse(nurseData, (err, result) => {
    if (err) {
      console.error("Error adding nurse:", err);
      return res.send("Error adding nurse");
    }
    res.redirect("/receptionist/view-nurses");
  });
};

exports.viewNurses = (req, res) => {
  nurseService.getAllNurses((err, nurses) => {
    if (err) {
      console.error("Error fetching nurses:", err);
      return res.send("Error loading nurse data");
    }
    res.render("Receptionist/viewNurse", { nurses });
  });
};
exports.getEditNursePage = (req, res) => {
  const nurseId = req.params.id;
  nurseService.getNurseById(nurseId, (err, results) => {
    if (err || results.length === 0) return res.send("Nurse not found");
    res.render("Receptionist/editNurse", { nurse: results[0] });
  });
};

exports.updateNurse = (req, res) => {
  const nurseData = req.body;
  nurseService.updateNurse(nurseData, (err) => {
    if (err) return res.send("Error updating nurse");
    res.redirect("/receptionist/view-nurses");
  });
};

exports.deleteNurse = (req, res) => {
  const nurseId = req.params.id;
  nurseService.deleteNurse(nurseId, (err) => {
    if (err) return res.send("Error deleting nurse");
    res.redirect("/receptionist/view-nurses");
  });
};