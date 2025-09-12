const express = require("express");
const router = express.Router();
const receptionistController = require("../controllers/receptionistController");
const { ensureLoggedIn } = require("../middleware/sessionCheck");

// ✅ must match req.session.role === "receptionist"
router.get("/dashboard", ensureLoggedIn("receptionist"), receptionistController.dashboard);

module.exports = router;
