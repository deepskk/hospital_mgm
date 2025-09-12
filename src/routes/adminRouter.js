// adminRouter.js
const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const doctorController = require("../controllers/doctorController");
const { ensureLoggedIn } = require("../middleware/sessionCheck");

// ✅ Admin Dashboard
router.get("/dashboard", ensureLoggedIn("admin"), (req, res) => {
  res.render("Admin/adminDashboard", {
    username: req.session.username,
  });
});

// ✅ Doctor Management
router.get("/view-doctors", ensureLoggedIn("admin"), adminController.viewDoctorsPage);
router.get("/update-doctor/:id", ensureLoggedIn("admin"), adminController.showUpdateDoctorForm);
router.post("/update-doctor/:id", ensureLoggedIn("admin"), adminController.updateDoctor);
router.get("/delete-doctor/:id", ensureLoggedIn("admin"), adminController.deleteDoctor);
router.get("/add-doctor", ensureLoggedIn("admin"), doctorController.renderAddDoctorForm);
router.post("/add-doctor", ensureLoggedIn("admin"), doctorController.addDoctor);

// ✅ Receptionist Management
router.get("/add-receptionist", ensureLoggedIn("admin"), adminController.renderAddReceptionistForm);
router.post("/add-receptionist", ensureLoggedIn("admin"), adminController.addReceptionist);
router.get("/view-receptionist", ensureLoggedIn("admin"), adminController.viewReceptionists);
router.get("/delete-receptionist/:id", ensureLoggedIn("admin"), adminController.deleteReceptionist);
router.get("/update-receptionist/:id", ensureLoggedIn("admin"), adminController.showUpdateReceptionistForm);
router.post("/update-receptionist/:id", ensureLoggedIn("admin"), adminController.updateReceptionist);

module.exports = router;
