const express = require("express");
const router = express.Router();
const doctorController = require("../controllers/doctorController");
const { ensureLoggedIn } = require("../middleware/sessionCheck");

router.get("/dashboard", ensureLoggedIn("doctor"), doctorController.dashboard);
router.get("/view-patients", ensureLoggedIn("doctor"), doctorController.viewMyPatients);

module.exports = router;
