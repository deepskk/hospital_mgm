const db = require("../config/db");

// Render the form
// exports.renderAddDoctor = (req, res) => {
//     res.render("addDoctor");
// };
// const DoctorService = require('../services/doctorService');

// exports.getDoctors = (req, res) => {
//   DoctorService.listDoctors((err, doctors) => {
//     if (err) {
//       return res.status(500).send('Error fetching doctor data');
//     }
//     res.render('viewDoctor', { doctors }); // pass doctors to EJS
//   });
// };



// Handle doctor insertion
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

    // Step 1: Insert into users table
    const insertUser = `INSERT INTO users (user_name, password, role) VALUES (?, ?, 'doctor')`;

    db.query(insertUser, [UserName, Password], (err, userResult) => {
        if (err) {
            console.error("Error inserting into users table:", err);
            return res.status(500).send("Error saving user.");
        }

        const userId = userResult.insertId;

        // Step 2: Insert into doctor table
        const insertDoctor = `
            INSERT INTO doctor (doctor_name, doctor_specialization, doctor_contact, doctor_experience, status, user_id)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        // You can replace `1` with actual logged-in admin_id if needed
        db.query(insertDoctor, [
            doctor_name,
            doctor_specialization,
            doctor_contact,
            doctor_experience,
            status,
            userId,
            // static admin_id for now
        ], (err, docResult) => {
            if (err) {
                console.error("Error inserting into doctor table:", err);
                return res.status(500).send("Error saving doctor.");
            }

            res.send("✅ Doctor added successfully!");
            // Optionally: res.redirect("/admin/dashboard")
        });
    });
};
