const db = require("../config/db");

exports.getAllDoctors = () => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT 
        d.doctor_id, d.doctor_name, d.doctor_specialization, 
        d.doctor_contact, d.doctor_experience, d.status,
        d.user_id,
        u.user_name AS doctor_username,
        a.admin_contact AS added_by
      FROM doctor d
      LEFT JOIN users u ON d.user_id = u.user_id
      LEFT JOIN admin a ON d.admin_id = a.admin_id
    `;
    db.query(sql, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

exports.getDoctorById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM doctor WHERE doctor_id = ?";
    db.query(sql, [id], (err, result) => {
      if (err) reject(err);
      else resolve(result[0]);
    });
  });
};

exports.updateDoctor = (id, data) => {
  return new Promise((resolve, reject) => {
    const sql = `
      UPDATE doctor SET 
        doctor_name = ?, 
        doctor_specialization = ?, 
        doctor_contact = ?, 
        doctor_experience = ?, 
        status = ?
      WHERE doctor_id = ?`;
    const values = [
      data.doctor_name,
      data.doctor_specialization,
      data.doctor_contact,
      data.doctor_experience,
      data.status,
      id,
    ];
    db.query(sql, values, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

exports.deleteDoctorById = async (id) => {
  console.log(id);
  const sql = 'DELETE FROM users WHERE user_id = ?';
  return new Promise((resolve, reject) => {
    db.query(sql, [id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });

};

