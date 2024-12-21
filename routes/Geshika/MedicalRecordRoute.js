// routes/medicalRecordRoutes.js
const express = require("express");
const router = express.Router();
const {
  addMedicalRecord,
  getMedicalRecordsByUserId,
  updateMedicalRecord,
  deleteMedicalRecord,
} = require("../../controllers/Geshika/MedicalRecordController");

router.post("/add", addMedicalRecord);
router.get("/:userId", getMedicalRecordsByUserId);

router.put("/:id", updateMedicalRecord); // Route for updating a medical record
router.delete("/:id", deleteMedicalRecord); // Route for deleting a medical record

router.get("/test", (req, res) => {
  res.send("Medical records API is working");
});

module.exports = router;
