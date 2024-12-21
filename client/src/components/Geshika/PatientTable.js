import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const PatientsTable = ({ patients }) => {
  const navigate = useNavigate();

  // Function to handle view details click
  const handleViewDetails = (id) => {
    // Navigate to the new page with the patient id in the URL
    navigate(`/patient-details/${id}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="patients table">
        <TableHead>
          <TableRow>
            <TableCell>Patient email</TableCell>
            <TableCell>Patient Name</TableCell>
            <TableCell>Medical Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patients.map((patient) => (
            <TableRow key={patient._id}>
              <TableCell>{patient.email}</TableCell>
              <TableCell>{patient.fullName}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="info"
                  onClick={() => handleViewDetails(patient._id)}
                >
                  View Medical Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PatientsTable;
