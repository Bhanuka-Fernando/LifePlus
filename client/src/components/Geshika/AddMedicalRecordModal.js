import React, { useState } from "react";
import { Modal, Box, Button, TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { addMedicalRecord } from "../../redux/features/medicalRecordSlice";

// Styles for the modal box
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const AddMedicalRecordModal = ({ open, handleClose, userId }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    diagnosis: "",
    vitalSigns: "",
    treatmentPlans: "",
    medicine: "",
    attachments: null,
    userId: userId,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      attachments: e.target.files[0],
    }));
  };

  const handleSubmit = () => {
    console.log(formData);
    dispatch(addMedicalRecord(formData));
    handleClose(); // Close the modal after submission
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2" gutterBottom>
          Add New Medical Record
        </Typography>
        <TextField
          fullWidth
          label="Diagnosis"
          name="diagnosis"
          value={formData.diagnosis}
          onChange={handleChange}
          margin="normal"
          autoComplete="off"
        />
        <TextField
          fullWidth
          label="Vital Signs"
          name="vitalSigns"
          value={formData.vitalSigns}
          onChange={handleChange}
          margin="normal"
          autoComplete="off"
        />
        <TextField
          fullWidth
          label="Treatment Plans"
          name="treatmentPlans"
          value={formData.treatmentPlans}
          onChange={handleChange}
          margin="normal"
          autoComplete="off"
        />
        <TextField
          fullWidth
          label="Medicine"
          name="medicine"
          value={formData.medicine}
          onChange={handleChange}
          margin="normal"
          autoComplete="off"
        />
        <Button
          variant="contained"
          component="label"
          style={{ marginTop: "15px", marginBottom: "15px" }}
        >
          Upload Attachment
          <input type="file" hidden onChange={handleFileChange} />
        </Button>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            onClick={handleClose}
            color="secondary"
            sx={{ marginRight: 2 }}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Add Record
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddMedicalRecordModal;
