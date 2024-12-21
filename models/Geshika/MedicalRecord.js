// models/MedicalRecord.js
const mongoose = require("mongoose");

const medicalRecordSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users", // Assuming there is a Patient model
  },
  diagnosis: {
    type: String,
    required: true,
  },
  vitalSigns: {
    type: String,
    required: true,
  },
  treatmentPlans: {
    type: String,
    required: true,
  },
  medicine: {
    type: String,
    required: true,
  },
  attachments: {
    type: String, // URL or path to file storage
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const MedicalRecord = mongoose.model("MedicalRecord", medicalRecordSchema);

module.exports = MedicalRecord;
