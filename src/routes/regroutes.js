const express = require("express");
const regCtrl = require("../controllers/regCtrl");

const router = express.Router();

router.get("/", regCtrl.regHomePage); // Home page
router.get("/login", regCtrl.regCtrlLogin); // Login page
router.post("/login", regCtrl.verifyLogin);

module.exports = router;
