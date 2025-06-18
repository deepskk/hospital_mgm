const express = require("express");
const router = express.Router();

const roomController = require("../controllers/receptionistController/roomController");
const nurseController = require("../controllers/receptionistController/nurseController");

router.get("/add-room", roomController.getAddRoomPage);
router.post("/add-room", roomController.postAddRoom);
router.get("/view-rooms", roomController.viewRooms);

// Nurse Routes
router.get("/add-nurse", nurseController.getAddNursePage);
router.post("/add-nurse", nurseController.addNurse);
router.get("/view-nurses", nurseController.viewNurses);
router.get("/edit-nurse/:id", nurseController.getEditNursePage);
router.post("/update-nurse", nurseController.updateNurse);
router.get("/delete-nurse/:id", nurseController.deleteNurse);

module.exports = router;
