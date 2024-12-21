import React, { useEffect } from "react";
import { Button } from "@mui/material";
import Layout from "../../components/Layout";
import PatientsTable from "../../components/Geshika/PatientTable";
import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../../environment/environment";
const AllPatients = () => {
  const [patients, setPatients] = useState([]);
  useEffect(() => {
    //get all patients by axios request
    const getPatients = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/user/getPatients`
        );
        console.log(response.data.data);
        setPatients(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    getPatients();
  }, []);

  return (
    <Layout>
      <div style={{ padding: "10px" }}>
        {/* Header Section */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1>All Patients</h1>
        </div>

        {/* Conditionally render the table only if there is patient data */}
        <div style={{ marginTop: "20px" }}>
          {patients.length > 0 ? (
            <PatientsTable patients={patients} />
          ) : (
            <h1>No patients available.</h1>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AllPatients;
