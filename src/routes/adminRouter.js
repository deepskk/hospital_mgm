const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");
// const isAdminAuthenticated = require("../middlewares/adminAuth");

// All routes here
router.get("/view-doctors", adminController.viewDoctorsPage);
router.get("/update-doctor/:id", adminController.showUpdateDoctorForm);
router.post("/update-doctor/:id", adminController.updateDoctor);
router.get('/delete-doctor/:id', adminController.deleteDoctor);

// Add Receptionist
router.get('/add-receptionist', adminController.renderAddReceptionistForm);
router.post('/add-receptionist', adminController.addReceptionist);
// View Receptionist
router.get('/view-receptionists', adminController.viewReceptionists);



// Export the router
module.exports = router;
