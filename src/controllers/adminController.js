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
  const doctorId = req.params.id;
  try {
    await doctorService.deleteDoctorById(doctorId);
    res.redirect('/admin/view-doctors');
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
