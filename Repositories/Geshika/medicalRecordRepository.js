// repositories/medicalRecordRepository.js
const MedicalRecord = require("../../models/Geshika/MedicalRecord");

class MedicalRecordRepository {
  async createMedicalRecord(recordData) {
    const newRecord = new MedicalRecord(recordData);
    return await newRecord.save();
  }

  async findMedicalRecordsByUserId(userId) {
    return await MedicalRecord.find({ userId });
  }

  async findMedicalRecordByIdAndUpdate(id, updateData) {
    return await MedicalRecord.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
  }

  async findMedicalRecordByIdAndDelete(id) {
    return await MedicalRecord.findByIdAndDelete(id);
  }
}

module.exports = new MedicalRecordRepository();
