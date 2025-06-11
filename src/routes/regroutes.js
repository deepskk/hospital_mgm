const express = require("express");
const regCtrl = require("../controllers/regCtrl");

const router = express.Router();

router.get("/", regCtrl.regCtrlLogin);

module.exports = router;