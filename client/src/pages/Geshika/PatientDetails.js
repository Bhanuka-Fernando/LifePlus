import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import AddMedicalRecordModal from "../../components/Geshika/AddMedicalRecordModal";
import UpdateMedicalRecordModal from "../../components/Geshika/UpdateMedicalRecordModal"; // You need to create this modal component
import Layout from "../../components/Layout";
import axios from "axios";
import { BASE_URL } from "../../environment/environment";

const PatientDetails = () => {
  const { id } = useParams(); // Get the patient ID from the URL
  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null); // For storing the record to be updated
  const [patientData, setPatientData] = useState(null);

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
    fetchMedicalRecords(); // Refresh records after adding a new one
  };

  const handleOpenUpdate = (record) => {
    setSelectedRecord(record);
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
    fetchMedicalRecords(); // Refresh records after updating
    setSelectedRecord(null);
  };

  // Function to fetch medical records

  const fetchMedicalRecords = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/medical-records/${id}` // Adjust the endpoint accordingly
      );
      console.log("medical records", response.data.data);
      setMedicalRecords(response.data.data);
    } catch (error) {
      console.error("Failed to fetch medical records", error);
    }
  };

  const getPatientData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/user/getPatientData/${id}` // Adjust the endpoint accordingly
      );
      console.log("patient data", response.data.data);
      setPatientData(response.data.data);
    } catch (error) {
      console.error("Failed to fetch patient data", error);
    }
  };

  useEffect(() => {
    fetchMedicalRecords(); // Fetch records on component mount
    getPatientData(); // Fetch patient data on component mount
  }, []);

  const handleDelete = async (recordId) => {
    try {
      await axios.delete(
        `${BASE_URL}/api/medical-records/${recordId}` // Adjust the endpoint accordingly
      );
      fetchMedicalRecords(); // Refresh the list after deletion
    } catch (error) {
      console.error("Failed to delete medical record", error);
    }
  };

  return (
    <Layout>
      <div
        style={{
          padding: "10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {patientData && <h1>Patient Name: {patientData.fullName}</h1>}
        <Button variant="contained" color="primary" onClick={handleOpenAdd}>
          Add New Medical Record
        </Button>
      </div>

      {/* Conditionally render the records table if there is data */}
      <div style={{ marginTop: "20px" }}>
        {medicalRecords.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Diagnosis</TableCell>
                  <TableCell>Vital Signs</TableCell>
                  <TableCell>Treatment Plans</TableCell>
                  <TableCell>Medicine</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {medicalRecords.map((record) => (
                  <TableRow key={record._id}>
                    <TableCell>{record.diagnosis}</TableCell>
                    <TableCell>{record.vitalSigns}</TableCell>
                    <TableCell>{record.treatmentPlans}</TableCell>
                    <TableCell>{record.medicine}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="warning"
                        onClick={() => handleOpenUpdate(record)}
                      >
                        Update
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(record._id)} // Call the delete handler
                        style={{ marginLeft: "10px" }} // Add margin for spacing
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <h2>No medical records available.</h2>
        )}
      </div>

      {/* Add Medical Record Modal */}
      <AddMedicalRecordModal
        open={openAdd}
        handleClose={handleCloseAdd}
        userId={id}
      />

      {/* Update Medical Record Modal */}
      {selectedRecord && (
        <UpdateMedicalRecordModal
          open={openUpdate}
          handleClose={handleCloseUpdate}
          record={selectedRecord}
        />
      )}
    </Layout>
  );
};

export default PatientDetails;
