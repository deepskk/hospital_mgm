


// const express = require('express');
// const router = express.Router();
// const patientController = require('../controllers/patientController');
// const billController = require('../controllers/billController'); // ✅ Make sure this exists!


// // ✅ Load Add Patient Page (with doctors, rooms, nurses)
// router.get('/receptionist/add-patient', patientController.getAddPatientPage);

// // ✅ Handle Add Patient form submission
// router.post('/receptionist/add-patient', patientController.postAddPatient);

// // ✅ View Patients
// router.get('/receptionist/view-patients', patientController.viewPatients);


// // update DElete 
// // Add these to your receptionist routes file
// router.get('/edit-patient/:id', patientController.getEditPatient);
// router.post('/edit-patient/:id', patientController.postEditPatient);
// router.post('/delete-patient/:id', patientController.deletePatient);


// // Bill 
// router.get('/generate-bill/:patientId', billController.generateBill);

// module.exports = router;

// ******************************************************///////////////////

// ROUTER FILE: receptionRoutes.js


// const express = require("express");
// const router = express.Router();

// const billController = require("../controllers/billController");
// const patientController = require("../controllers/patientController"); // ✅ Make sure this is correct

// // Generate Bill (POST)
// router.post("/bill/:patient_id", billController.generateBill);

// // View Bill (GET)
// router.get("/bill/:patient_id", billController.getBillByPatientId);

// // ✅ Add this to handle /receptionist/view-patients
// router.get("/view-patients", patientController.viewPatients);

// router.post("/bill/:patient_id", billController.generateBill);         // Store bill
// router.get("/generate-bill/:patient_id", billController.renderBillPage); // View bill


// module.exports = router;

const express = require("express");
const router = express.Router();

const billController = require("../controllers/billController");
const patientController = require("../controllers/patientController");

// 👉 View all patients
router.get("/view-patients", patientController.viewPatients);

// 👉 Add patient
router.get("/add-patient", patientController.getAddPatientPage);
router.post("/add-patient", patientController.postAddPatient);

// 👉 Edit patient
router.get('/edit-patient/:id', patientController.getEditPatient);
router.post('/edit-patient/:id', patientController.postEditPatient);

// 👉 Delete patient ✅ (Add this line)
router.post("/delete-patient/:id", patientController.deletePatient);

// 👉 Bill routes
router.get("/generate-bill/:patient_id", billController.renderBillPage);
router.post("/bill/:patient_id", billController.generateBill);
router.get("/bill/:patient_id", billController.getBillByPatientId);
router.get("/print-bill/:bill_id", billController.printBill);

// for bill Button become view_BILL
router.get("/print-bill/:patient_id", billController.getBillByPatientId);

router.get("/view-bill/:patient_id", billController.getBillByPatientId);

router.get("/view-bill/:patient_id", billController.viewBillPage);

router.get("/view-bill/:patient_id", billController.viewBillByPatientId);







module.exports = router;
