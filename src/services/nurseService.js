const db = require("../config/db");

exports.insertNurse = (nurseData, callback) => {
  const { nurse_name, nurse_contact, nurse_shift, user_id } = nurseData;

  const sql = `
    INSERT INTO nurse (nurse_name, nurse_contact, nurse_shift, user_id)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [nurse_name, nurse_contact, nurse_shift, user_id], callback);
};

exports.getAllNurses = (callback) => {
  db.query("SELECT * FROM nurse", callback);
};
// Update Nurse
exports.updateNurse = (nurseData, callback) => {
  const { nurse_id, nurse_name, nurse_contact, nurse_shift } = nurseData;
  const sql = `UPDATE nurse SET nurse_name = ?, nurse_contact = ?, nurse_shift = ? WHERE nurse_id = ?`;
  db.query(sql, [nurse_name, nurse_contact, nurse_shift, nurse_id], callback);
};
exports.getNurseById = (id, callback) => {
  db.query("SELECT * FROM nurse WHERE nurse_id = ?", [id], callback);
};

// Delete Nurse
exports.deleteNurse = (id, callback) => {
  db.query("DELETE FROM nurse WHERE nurse_id = ?", [id], callback);
};