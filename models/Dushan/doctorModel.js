const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  doctorId: { type: String, required: true, unique: true }, // Unique doctor ID
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  //email: { type: String, required: true, unique: true }, // Email field added
  address: { type: String, required: true },
  specialization: { type: String, required: true },
  associatedHospitals: { type: [String], required: true }, // List of associated hospitals' names
  hospitalId: { type: String, required: true }, // ID of the hospital
  degree: { type: String, required: true },
  university: { type: String, required: true },
  doctorImage: { type: String, required: true }, // URL of the uploaded image
  medicalLicense: { type: String, required: true }, // URL of the uploaded PDF
  wardNo: { type: String, required: true }, // Ward number
  maxCount: { type: Number, required: true }, // Maximum patient count
  docPayment: { type: Number, required: true }, // Payment required for the doctor (if any)
  doctorAvailableTime: { type: String, required: true }, // Available time
  availableDays: { type: [String], required: true } // List of available days
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
