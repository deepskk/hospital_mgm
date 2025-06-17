const db = require("../config/db");

exports.getAddRoomPage = (req, res) => {
  res.render("Receptionist/addRoom");
};

exports.postAddRoom = (req, res) => {
  const { room_no, room_type, charges_per_day } = req.body;

  const sql = `INSERT INTO room (room_no, room_type, room_status, charges_per_day) VALUES (?, ?, 'Available', ?)`;

  db.query(sql, [room_no, room_type, charges_per_day], (err, result) => {
    if (err) {
      console.error("Error inserting room:", err);
      return res.send("Error adding room");
    }
    res.redirect("/receptionist/view-rooms"); // make sure this route exists
  });
};
// View Rooms
exports.viewRooms = (req, res) => {
  const sql = "SELECT * FROM room";

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching rooms:", err);
      return res.send("Error fetching rooms");
    }
    res.render("Receptionist/viewRooms", { rooms: result });
  });
};
