// controllers/medicalRecordController.js
const medicalRecordService = require("../../Services/Geshika/medicalRecordService");

const addMedicalRecord = async (req, res) => {
  try {
    const { userId, diagnosis, vitalSigns, treatmentPlans, medicine } = req.body;
    const attachments = req.file ? req.file.path : null;

    const recordData = { userId, diagnosis, vitalSigns, treatmentPlans, medicine, attachments };
    const response = await medicalRecordService.addMedicalRecord(recordData);

    res.status(201).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const getMedicalRecordsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const response = await medicalRecordService.getMedicalRecordsByUserId(userId);

    if (response.message === "No medical records found for this user") {
      return res.status(404).json(response);
    }

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const updateMedicalRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const response = await medicalRecordService.updateMedicalRecord(id, updateData);

    if (response.message === "Medical record not found") {
      return res.status(404).json(response);
    }

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const deleteMedicalRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await medicalRecordService.deleteMedicalRecord(id);

    if (response.message === "Medical record not found") {
      return res.status(404).json(response);
    }

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addMedicalRecord,
  getMedicalRecordsByUserId,
  updateMedicalRecord,
  deleteMedicalRecord,
};
