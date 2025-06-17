const doctorService = require("../services/doctorService");
const receptionistService = require("../services/receptionistService");
exports.viewDoctorsPage = async (req, res) => {
  try {
    const doctors = await doctorService.getAllDoctors();
    res.render("Admin/viewDoctor", { doctors });

  } catch (err) {
    console.error("Error fetching doctors:", err);
    res.status(500).send("Internal Server Error");
  }
};

exports.showUpdateDoctorForm = async (req, res) => {
  try {
    const doctor = await doctorService.getDoctorById(req.params.id);
    res.render("Admin/updateDoctor", { doctor });
  } catch (err) {
    res.status(500).send("Error loading doctor data");
  }
};

exports.updateDoctor = async (req, res) => {
  try {
    await doctorService.updateDoctor(req.params.id, req.body);
    res.redirect("/admin/view-doctors");
  } catch (err) {
    res.status(500).send("Error updating doctor");
  }
};

exports.deleteDoctor = async (req, res) => {
  const user_id = req.params.id;
  try {
    await doctorService.deleteDoctorById(user_id);
    res.redirect("/admin/view-doctors");
  } catch (error) {
    console.error('Error deleting doctor:', error);
    res.status(500).send('Server Error');
  }
};

// receptionist
exports.renderAddReceptionistForm = (req, res) => {
  res.render("Admin/addReceptionist");
};

exports.addReceptionist = async (req, res) => {
  try {
    await receptionistService.addReceptionist(req.body);
    res.redirect('/admin/view-receptionist'); // This can be implemented next
  } catch (err) {
    console.error("Error in controller:", err);
    res.status(500).send("Something went wrong while adding receptionist");
  }
};
exports.viewReceptionists = async (req, res) => {
  try {
    const receptionists = await receptionistService.getAllReceptionists();
    res.render("Admin/viewReceptionist", { receptionists });
  } catch (err) {
    console.error("Error loading receptionists:", err);
    res.status(500).send("Failed to load receptionist data");
  }
};

exports.showUpdateReceptionistForm = async (req, res) => {
  try {
    const receptionist = await receptionistService.getReceptionistById(req.params.id);
    res.render("Admin/updateReceptionist", { receptionist });
  } catch (err) {
    console.error("Error loading receptionist data:", err);
    res.status(500).send("Error loading receptionist data");
  }
};
exports.updateReceptionist = async (req, res) => {
  try {
    await receptionistService.updateReceptionist(req.params.id, req.body);
    res.redirect('/admin/view-receptionist');  // ✅ After update, go back to list
  } catch (err) {
    console.error("Error updating receptionist:", err);
    res.status(500).send("Error updating receptionist");
  }
};
exports.deleteReceptionist = async (req, res) => {
  try {
    const receptionistId = req.params.id;
    await receptionistService.deleteReceptionist(receptionistId);
    res.redirect('/admin/view-receptionist');
  } catch (err) {
    console.error('Error deleting receptionist:', err);
    res.status(500).send('Internal Server Error');
  }
};

