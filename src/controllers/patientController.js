

const db = require('../config/db');

// ✅ Final version - only keep this one
exports.getAddPatientPage = (req, res) => {
  const doctorQuery = "SELECT doctor_id, doctor_name FROM doctor";
  const roomQuery = "SELECT room_no FROM room";
  const nurseQuery = "SELECT nurse_id, nurse_name FROM nurse";

  db.query(doctorQuery, (err, doctors) => {
    if (err) {
      console.error("Error fetching doctors:", err);
      return res.status(500).send("Server error");
    }

    db.query(roomQuery, (err, rooms) => {
      if (err) {
        console.error("Error fetching rooms:", err);
        return res.status(500).send("Server error");
      }

      db.query(nurseQuery, (err, nurses) => {
        if (err) {
          console.error("Error fetching nurses:", err);
          return res.status(500).send("Server error");
        }

        // ✅ This will now work properly in EJS
        res.render("Receptionist/addPatient", {
          doctors: doctors,
          rooms: rooms,
          nurses: nurses
        });
      });
    });
  });
};


// Other functions can remain unchanged
exports.postAddPatient = (req, res) => {
  const {
    id,
    name,
    patient_age,
    patient_gender,
    problem,
    admitDate,
    dischargeDate,
    room,
    nurse,
    doctor,
    status
  } = req.body;

  const sql = `
    INSERT INTO patient (
      patient_id,
      patient_name,
      patient_age,
      patient_gender,
      patient_issue,
      admitted_date,
      discharge_date,
      room_no,
      nurse_id,
      doctor_id,
      status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    id,
    name,
    patient_age,
    patient_gender,
    problem,
    admitDate,
    dischargeDate,
    room,
    nurse,
    doctor,
    status
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error saving patient:", err);
      res.status(500).send("Database error");
    } else {
      res.redirect('/receptionist/view-patients');
    }
  });
};

// CONTROLLER FILE: patientController.js


exports.viewPatients = (req, res) => {
  const sql = `
    SELECT 
      p.*, 
      d.doctor_name,
      b.bill_id IS NOT NULL AS has_bill
    FROM patient p
    JOIN doctor d ON p.doctor_id = d.doctor_id
    LEFT JOIN bill b ON p.patient_id = b.patient_id
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching patients:", err);
      return res.status(500).send("Server Error");
    }

    res.render("Receptionist/viewPatients", { patients: results });
  });
};




exports.getEditPatient = (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM patient WHERE patient_id = ?";
  db.query(sql, [id], (err, results) => {
    if (err || results.length === 0) {
      return res.status(500).send("Error fetching patient");
    }
    res.render("Receptionist/editPatient", { patient: results[0] });
  });
};

exports.postEditPatient = (req, res) => {
  const id = req.params.id;
  const { patient_name, patient_age, patient_issue } = req.body;
  const sql = "UPDATE patient SET patient_name=?, patient_age=?, patient_issue=? WHERE patient_id=?";
  db.query(sql, [patient_name, patient_age, patient_issue, id], (err, result) => {
    if (err) {
      return res.status(500).send("Error updating patient");
    }
    res.redirect("/receptionist/view-patients");
  });
};

exports.deletePatient = (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM patient WHERE patient_id=?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).send("Error deleting patient");
    }
    res.redirect("/receptionist/view-patients");
  });
};
