import React, { useState, useEffect } from "react";
import { Modal, Button, TextField } from "@mui/material";
import axios from "axios";

const UpdateMedicalRecordModal = ({ open, handleClose, record }) => {
  const [diagnosis, setDiagnosis] = useState("");
  const [vitalSigns, setVitalSigns] = useState("");
  const [treatmentPlans, setTreatmentPlans] = useState("");
  const [medicine, setMedicine] = useState("");

  useEffect(() => {
    if (record) {
      setDiagnosis(record.diagnosis);
      setVitalSigns(record.vitalSigns);
      setTreatmentPlans(record.treatmentPlans);
      setMedicine(record.medicine);
    }
  }, [record]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(
        `http://localhost:8050/api/medical-records/${record._id}`,
        {
          diagnosis,
          vitalSigns,
          treatmentPlans,
          medicine,
        }
      );
      handleClose(); // Close modal after successful update
    } catch (error) {
      console.error("Failed to update medical record", error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div
        style={{
          padding: "20px",
          maxWidth: "400px",
          margin: "auto",
          marginTop: "100px",
          backgroundColor: "white",
          borderRadius: "8px",
        }}
      >
        <h2>Update Medical Record</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Diagnosis"
            variant="outlined"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            required
            style={{ marginBottom: "10px" }}
          />
          <TextField
            fullWidth
            label="Vital Signs"
            variant="outlined"
            value={vitalSigns}
            onChange={(e) => setVitalSigns(e.target.value)}
            required
            style={{ marginBottom: "10px" }}
          />
          <TextField
            fullWidth
            label="Treatment Plans"
            variant="outlined"
            value={treatmentPlans}
            onChange={(e) => setTreatmentPlans(e.target.value)}
            required
            style={{ marginBottom: "10px" }}
          />
          <TextField
            fullWidth
            label="Medicine"
            variant="outlined"
            value={medicine}
            onChange={(e) => setMedicine(e.target.value)}
            required
            style={{ marginBottom: "10px" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="contained" color="primary" type="submit">
              Update
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default UpdateMedicalRecordModal;
