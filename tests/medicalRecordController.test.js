const medicalRecordController = require("../controllers/Geshika/MedicalRecordController");
const medicalRecordService = require("../Services/Geshika/medicalRecordService");

jest.mock("../Services/Geshika/medicalRecordService");

describe("MedicalRecordController", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {},
      params: {},
      file: null,
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe("addMedicalRecord", () => {
    it("should add a new medical record successfully", async () => {
      req.body = {
        userId: "123",
        diagnosis: "Flu",
        vitalSigns: "Normal",
        treatmentPlans: "Rest and hydration",
        medicine: "Paracetamol",
      };
      medicalRecordService.addMedicalRecord.mockResolvedValue({
        message: "Medical record added successfully",
        data: req.body,
      });

      await medicalRecordController.addMedicalRecord(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "Medical record added successfully",
        data: req.body,
      });
    });

    it("should handle errors when adding a medical record", async () => {
      const errorMessage = "Failed to save record";
      medicalRecordService.addMedicalRecord.mockRejectedValue(new Error(errorMessage));

      await medicalRecordController.addMedicalRecord(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Failed to save record",
      });
    });
  });

  describe("getMedicalRecordsByUserId", () => {
    it("should fetch medical records for a given user ID", async () => {
      req.params.userId = "123";
      const mockResponse = { records: ["record1", "record2"] };
      medicalRecordService.getMedicalRecordsByUserId.mockResolvedValue(mockResponse);

      await medicalRecordController.getMedicalRecordsByUserId(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockResponse);
    });

    it("should handle no medical records found", async () => {
      req.params.userId = "123";
      medicalRecordService.getMedicalRecordsByUserId.mockResolvedValue({
        message: "No medical records found for this user",
      });

      await medicalRecordController.getMedicalRecordsByUserId(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "No medical records found for this user",
      });
    });

    it("should handle errors when fetching medical records", async () => {
      const errorMessage = "Failed to fetch records";
      medicalRecordService.getMedicalRecordsByUserId.mockRejectedValue(new Error(errorMessage));

      await medicalRecordController.getMedicalRecordsByUserId(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Failed to fetch records",
      });
    });
  });

  describe("updateMedicalRecord", () => {
    it("should update a medical record successfully", async () => {
      req.params.id = "123";
      req.body = { diagnosis: "Cold" };
      medicalRecordService.updateMedicalRecord.mockResolvedValue({
        message: "Medical record updated successfully",
      });

      await medicalRecordController.updateMedicalRecord(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Medical record updated successfully",
      });
    });

    it("should handle medical record not found during update", async () => {
      req.params.id = "123";
      medicalRecordService.updateMedicalRecord.mockResolvedValue({
        message: "Medical record not found",
      });

      await medicalRecordController.updateMedicalRecord(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Medical record not found",
      });
    });

    it("should handle errors when updating a medical record", async () => {
      const errorMessage = "Failed to update record";
      medicalRecordService.updateMedicalRecord.mockRejectedValue(new Error(errorMessage));

      await medicalRecordController.updateMedicalRecord(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Failed to update record",
      });
    });
  });

  describe("deleteMedicalRecord", () => {
    it("should delete a medical record successfully", async () => {
      req.params.id = "123";
      medicalRecordService.deleteMedicalRecord.mockResolvedValue({
        message: "Medical record deleted successfully",
      });

      await medicalRecordController.deleteMedicalRecord(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Medical record deleted successfully",
      });
    });

    it("should handle medical record not found during delete", async () => {
      req.params.id = "123";
      medicalRecordService.deleteMedicalRecord.mockResolvedValue({
        message: "Medical record not found",
      });

      await medicalRecordController.deleteMedicalRecord(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Medical record not found",
      });
    });

    it("should handle errors when deleting a medical record", async () => {
      const errorMessage = "Failed to delete record";
      medicalRecordService.deleteMedicalRecord.mockRejectedValue(new Error(errorMessage));

      await medicalRecordController.deleteMedicalRecord(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Failed to delete record",
      });
    });
  });
});
