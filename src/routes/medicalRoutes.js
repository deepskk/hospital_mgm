const express = require("express");
const router = express.Router();
const medicalController = require("../controllers/medicalController");

router.post("/add", medicalController.addMedicine);
router.get("/patient/:patientId", medicalController.getMedicinesByPatient);
router.put("/update/:id", medicalController.updateMedicine);
router.delete("/delete/:id", medicalController.deleteMedicine);

module.exports = router;
