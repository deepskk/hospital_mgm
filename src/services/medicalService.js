const db = require("../config/db");

exports.insertMedicine = async (patientId, name, price) => {
  const sql = `INSERT INTO medical (patient_id, medicine_name, price_medicine) VALUES (?, ?, ?)`;
  await db.promise().query(sql, [patientId, name, price]);
};

exports.getMedicinesByPatientId = async (patientId) => {
  const sql = `SELECT * FROM medical WHERE patient_id = ?`;
  const [rows] = await db.promise().query(sql, [patientId]);
  return rows;
};

exports.updateMedicineById = async (medicalId, name, price) => {
  const sql = `UPDATE medical SET medicine_name = ?, price_medicine = ? WHERE medical_id = ?`;
  await db.promise().query(sql, [name, price, medicalId]);
};

exports.deleteMedicineById = async (medicalId) => {
  const sql = `DELETE FROM medical WHERE medical_id = ?`;
  await db.promise().query(sql, [medicalId]);
};
