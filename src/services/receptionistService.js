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
  }
  
};





module.exports = receptionistService;
