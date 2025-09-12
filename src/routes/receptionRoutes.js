// const express = require("express");
// const router = express.Router();

// const roomController = require("../controllers/receptionistController/roomController");
// const nurseController = require("../controllers/receptionistController/nurseController");

// router.get("/add-room", roomController.getAddRoomPage);
// router.post("/add-room", roomController.postAddRoom);
// router.get("/view-rooms", roomController.viewRooms);

// // Nurse Routes
// router.get("/add-nurse", nurseController.getAddNursePage);
// router.post("/add-nurse", nurseController.addNurse);
// router.get("/view-nurses", nurseController.viewNurses);
// router.get("/edit-nurse/:id", nurseController.getEditNursePage);
// router.post("/update-nurse", nurseController.updateNurse);
// router.get("/delete-nurse/:id", nurseController.deleteNurse);

// module.exports = router;

const express = require("express");
const router = express.Router();
const { ensureLoggedIn } = require("../middleware/sessionCheck");

const roomController = require("../controllers/receptionistController/roomController");
const nurseController = require("../controllers/receptionistController/nurseController");

// Room Routes (Protected)
router.get("/add-room", ensureLoggedIn("receptionist"), roomController.getAddRoomPage);
router.post("/add-room", ensureLoggedIn("receptionist"), roomController.postAddRoom);
router.get("/view-rooms", ensureLoggedIn("receptionist"), roomController.viewRooms);

// Nurse Routes (Protected)
router.get("/add-nurse", ensureLoggedIn("receptionist"), nurseController.getAddNursePage);
router.post("/add-nurse", ensureLoggedIn("receptionist"), nurseController.addNurse);
router.get("/view-nurses", ensureLoggedIn("receptionist"), nurseController.viewNurses);
router.get("/edit-nurse/:id", ensureLoggedIn("receptionist"), nurseController.getEditNursePage);
router.post("/update-nurse", ensureLoggedIn("receptionist"), nurseController.updateNurse);
router.get("/delete-nurse/:id", ensureLoggedIn("receptionist"), nurseController.deleteNurse);

module.exports = router;

