


// CONTROLLER FILE: billController.js
// ===========================


// chnaged code for bill 19-06
const db = require("../config/db");

exports.generateBill = (req, res) => {
  const patientId = req.params.patient_id;
  const {
    room_charges,
    treatment_charges,
    nurse_charges,
    medicine_charges,
  } = req.body;

  const room = parseFloat(room_charges);
  const treat = parseFloat(treatment_charges);
  const nurse = parseFloat(nurse_charges);
  const med = parseFloat(medicine_charges);

  if (room < 0 || treat < 0 || nurse < 0 || med < 0) {
    return res.status(400).send("Charges must be non-negative numbers");
  }

  const checkPatient = "SELECT * FROM patient WHERE patient_id = ?";
  db.query(checkPatient, [patientId], (err, results) => {
    if (err) return res.status(500).send("Server error");
    if (results.length === 0) return res.status(404).send("Patient not found");

    const checkBill = "SELECT * FROM bill WHERE patient_id = ?";
    db.query(checkBill, [patientId], (err, billResults) => {
      if (err) return res.status(500).send("Server error");

      if (billResults.length > 0) {
        return res.status(400).send("Bill already generated for this patient");
      }

      const total_amount = room + treat + nurse + med;
      const insertSql = `
        INSERT INTO bill 
        (patient_id, room_charges, treatment_charges, nurse_charges, medicine_charges, total_amount, billing_date) 
        VALUES (?, ?, ?, ?, ?, ?, NOW())`;

      db.query(insertSql, [patientId, room, treat, nurse, med, total_amount], (err, result) => {
        if (err) return res.status(500).send("Database error");

        const billId = result.insertId;

        // ✅ Redirect to the print bill page
        
        return res.redirect(`/receptionist/print-bill/${billId}`);

      });
    }); 
  });
};


exports.printBill = (req, res) => {
  const billId = req.params.bill_id;

  const sql = `
    SELECT 
      b.*, 
      p.patient_name, 
      p.room_no, 
      p.admitted_date, 
      p.discharge_date, 
      d.doctor_name 
    FROM bill b
    JOIN patient p ON b.patient_id = p.patient_id
    JOIN doctor d ON p.doctor_id = d.doctor_id
    WHERE b.bill_id = ?
  `;

  db.query(sql, [billId], (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).send("Bill not found");
    }

    res.render("Receptionist/printBill", { bill: results[0] });
  });
};


 exports.renderBillPage = (req, res) => {
   const patientId = req.params.patient_id;
   res.render("Receptionist/createBillForm", { patientId }); // Make sure this EJS exists
 };

 // Add this in billController.js
exports.getBillByPatientId = (req, res) => {
  const patientId = req.params.patient_id;

  const sql = `
    SELECT b.*, p.patient_name, d.doctor_name
    FROM bill b
    JOIN patient p ON b.patient_id = p.patient_id
    JOIN doctor d ON p.doctor_id = d.doctor_id
    WHERE b.patient_id = ?
  `;

  db.query(sql, [patientId], (err, results) => {
    if (err) return res.status(500).send("Server error");

    if (results.length === 0) {
      return res.status(404).send("Bill not found for this patient");
    }
 
     
    res.render("Receptionist/generateBill", { bill: results[0] });
  });
};

// ✔️ Show bill view by patient ID
exports.viewBillPage = (req, res) => {
  const patientId = req.params.patient_id;

  const sql = `
    SELECT b.*, p.patient_name, d.doctor_name
    FROM bill b
    JOIN patient p ON b.patient_id = p.patient_id
    JOIN doctor d ON p.doctor_id = d.doctor_id
    WHERE b.patient_id = ?
  `;

  db.query(sql, [patientId], (err, results) => {
    if (err) {
      console.error("Error fetching bill:", err);
      return res.status(500).send("Server error");
    }

    if (results.length === 0) {
      return res.status(404).send("No bill found for this patient.");
    }

    res.render("Receptionist/viewBill", { bill: results[0] });
  });
};

exports.viewBillByPatientId = (req, res) => {
  const patientId = req.params.patient_id;

  const sql = `
    SELECT b.*, p.patient_name, d.doctor_name
    FROM bill b
    JOIN patient p ON b.patient_id = p.patient_id
    JOIN doctor d ON p.doctor_id = d.doctor_id
    WHERE b.patient_id = ?
  `;

  db.query(sql, [patientId], (err, results) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).send("Server error");
    }

    if (results.length === 0) {
      return res.status(404).send("Bill not found for this patient");
    }

    const bill = results[0];

// Convert string to number
bill.room_charges = parseFloat(bill.room_charges);
bill.treatment_charges = parseFloat(bill.treatment_charges);
bill.nurse_charges = parseFloat(bill.nurse_charges);
bill.medicine_charges = parseFloat(bill.medicine_charges);
bill.total_amount = parseFloat(bill.total_amount);

res.render("Receptionist/generateBill", { bill });

  });
};

// Room selection 
exports.renderBillForm = (req, res) => {
  const patientId = req.params.patient_id;
  const sql = `SELECT room_no FROM room WHERE status = 'available'`;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).send("Database error while fetching rooms");

    res.render("Receptionist/createBillForm", {
      patientId,
      rooms: results
    });
  });
};

