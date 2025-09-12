const db = require("../config/db");

const doctorService = require("../services/doctorService");

// Render Doctor Dashboard
exports.dashboard = (req, res) => {
  if (!req.session.doctor_id) return res.redirect("/login");

  res.render("Doctor/doctorDashboard", {
    username: req.session.username
  });
};

// Handle Doctor Registration
exports.addDoctor = (req, res) => {
  const {
    doctor_name,
    doctor_specialization,
    doctor_contact,
    doctor_experience,
    status,
    UserName,
    Password
  } = req.body;

  // 1. Insert into users table
  const insertUser = `INSERT INTO users (user_name, password, role) VALUES (?, ?, 'doctor')`;

  db.query(insertUser, [UserName, Password], (err, userResult) => {
    if (err) {
      console.error("Error inserting into users table:", err);
      return res.status(500).send("Error saving user.");
    }

    const userId = userResult.insertId;

    // 2. Insert into doctor table
    const insertDoctor = `
      INSERT INTO doctor 
      (doctor_name, doctor_specialization, doctor_contact, doctor_experience, status, user_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(insertDoctor, [
      doctor_name,
      doctor_specialization,
      doctor_contact,
      doctor_experience,
      status,
      userId
    ], (err, docResult) => {
      if (err) {
        console.error("Error inserting into doctor table:", err);
        return res.status(500).send("Error saving doctor.");
      }

      res.send("✅ Doctor added successfully!");
      // You can also: res.redirect("/admin/view-doctor");
    });
  });
};
exports.renderAddDoctorForm = (req, res) => {
  res.render("addDoctor");
};

// View Patients Assigned to Logged-in Doctor
exports.viewMyPatients = async (req, res) => {
  const doctorId = req.session.doctor_id;

  if (!doctorId) {
    return res.redirect("/login");
  }

  try {
    const patients = await doctorService.getPatientsByDoctorId(doctorId);

    res.render("Doctor/viewPatients", {
      patients,
      username: req.session.username
    });
  } catch (err) {
    console.error("Error in doctorController viewMyPatients:", err);
    res.status(500).send("Internal Server Error");
  }
};
