const db = require('../config/db');

const receptionistService = {
  // Add receptionist logic
  async addReceptionist(data) {
    const { reception_name, reception_contact, status, UserName, Password } = data;

    // Insert into `users`
    const [userResult] = await db.promise().query(
      `INSERT INTO users (user_name, password, role) VALUES (?, ?, ?)`,
      [UserName, Password, 'reception']
    );

    const userId = userResult.insertId;
    const adminId = 1; // Set this dynamically later if needed

    // Insert into `reception`
    await db.promise().query(
      `INSERT INTO reception (reception_name, reception_contact, status, user_id, admin_id)
       VALUES (?, ?, ?, ?, null)`,
      [reception_name, reception_contact, status, userId, adminId]
    );
  },
  async getAllReceptionists() {
    const [rows] = await db.promise().query(
      `SELECT * FROM reception`
    );
    return rows;
  },
  // Delete receptionist
  async deleteReceptionist(receptionistId) {
    await db.promise().query(
      `DELETE FROM users WHERE user_id = ?`,
      [receptionistId]
    );
  },
  async getReceptionistById(id) {
    const [rows] = await db.promise().query(
      `SELECT * FROM reception WHERE reception_id = ?`,
      [id]
    );
    return rows[0]; // returns a single receptionist object
  },
    async updateReceptionist(id, data) {
    const { reception_name, reception_contact, status } = data;
    await db.promise().query(
      `UPDATE reception
       SET reception_name = ?, reception_contact = ?, status = ?
       WHERE reception_id = ?`,
      [reception_name, reception_contact, status, id]
    );
  },

};




module.exports = receptionistService;
