const db = require("../config/db");

exports.addRoom = (room) => {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO room (room_type, room_number) VALUES (?, ?)";
    db.query(sql, [room.room_type, room.room_number], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};
