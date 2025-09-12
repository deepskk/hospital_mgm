const medicalService = require("../services/medicalService");

exports.addMedicine = async (req, res) => {
  const { patient_id, medicine_name, price_medicine } = req.body;
  try {
    await medicalService.insertMedicine(patient_id, medicine_name, price_medicine);
    res.status(200).send("Medicine added");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding medicine");
  }
};

exports.getMedicinesByPatient = async (req, res) => {
  const patientId = req.params.patientId;
  try {
    const data = await medicalService.getMedicinesByPatientId(patientId);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching medicines");
  }
};

exports.updateMedicine = async (req, res) => {
  const id = req.params.id;
  const { medicine_name, price_medicine } = req.body;

  try {
    await medicalService.updateMedicineById(id, medicine_name, price_medicine);
    res.status(200).send("Medicine updated");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating medicine");
  }
};

exports.deleteMedicine = async (req, res) => {
  const id = req.params.id;
  try {
    await medicalService.deleteMedicineById(id);
    res.status(200).send("Medicine deleted");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting medicine");
  }
};
