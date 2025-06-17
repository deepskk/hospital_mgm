const roomService = require("../services/receptionistRoomService");

exports.getAddRoomPage = (req, res) => {
  res.render("receptionist/addRoom");
};

exports.postAddRoom = async (req, res) => {
  const { room_type, room_number } = req.body;
  try {
    await roomService.addRoom({ room_type, room_number });
    res.redirect("/receptionist/view-rooms");
  } catch (err) {
    console.error("Error adding room:", err);
    res.status(500).send("Something went wrong.");
  }
};
