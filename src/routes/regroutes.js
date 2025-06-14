const express = require("express");
const regCtrl = require("../controllers/regCtrl");
const doctorController = require("../controllers/doctorController");

const  router = express.Router();

router.get("/", regCtrl.regHomePage); // Home page
router.get("/login", regCtrl.regCtrlLogin); // Login page
router.post("/login", regCtrl.SignIn);
router.get("/admin/add-doctor",(req,res)=>{
    res.render('addDoctor');
})
router.get("/add-doctor",regCtrl.addDoctor);
router.post("/admin/add-doctor", doctorController.addDoctor);
// router.get("/admin/view-doctor",doctorController.viewDoctor);



module.exports = router;
