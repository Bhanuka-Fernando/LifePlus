// services/medicalRecordService.js
const medicalRecordRepository = require("../../Repositories/Geshika/medicalRecordRepository");

class MedicalRecordService {
  async addMedicalRecord(recordData) {
    try {
      const newRecord = await medicalRecordRepository.createMedicalRecord(recordData);
      return { message: "Medical record added successfully", data: newRecord };
    } catch (error) {
      throw new Error(`Failed to add medical record: ${error.message}`);
    }
  }

  async getMedicalRecordsByUserId(userId) {
    try {
      const records = await medicalRecordRepository.findMedicalRecordsByUserId(userId);
      if (!records || records.length === 0) {
        return { message: "No medical records found for this user" };
      }
      return { message: "Medical records fetched successfully", data: records };
    } catch (error) {
      throw new Error(`Failed to fetch medical records: ${error.message}`);
    }
  }

  async updateMedicalRecord(id, updateData) {
    try {
      const updatedRecord = await medicalRecordRepository.findMedicalRecordByIdAndUpdate(id, updateData);
      if (!updatedRecord) {
        return { message: "Medical record not found" };
      }
      return { message: "Medical record updated successfully", data: updatedRecord };
    } catch (error) {
      throw new Error(`Failed to update medical record: ${error.message}`);
    }
  }

  async deleteMedicalRecord(id) {
    try {
      const deletedRecord = await medicalRecordRepository.findMedicalRecordByIdAndDelete(id);
      if (!deletedRecord) {
        return { message: "Medical record not found" };
      }
      return { message: "Medical record deleted successfully" };
    } catch (error) {
      throw new Error(`Failed to delete medical record: ${error.message}`);
    }
  }
}

module.exports = new MedicalRecordService();
