const express = require("express");
const router = express.Router();
const roomController = require("../controllers/roomController");

router.get("/add-room", roomController.getAddRoomPage);
router.post("/add-room", roomController.postAddRoom);

router.get("/view-rooms", roomController.viewRooms);


module.exports = router;
