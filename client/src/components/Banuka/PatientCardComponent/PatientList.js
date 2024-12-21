// PatientList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './PatientList.module.css'; // Import styles
import PatientCard from './PatientCard'; // Import the new component
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../../environment/environment';

const PatientList = () => {
    const navigate = useNavigate();
    const [patients, setPatients] = useState([]);
    const [searchQuery, setSearchQuery] = useState(''); // For search input
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // State for error handling

    useEffect(() => {
        fetchPatients();
    }, [searchQuery]);

    const fetchPatients = async () => {
        setLoading(true);
        setError(null); // Reset error state before fetching
        try {
            const res = await axios.get(`${BASE_URL}/api/user/getPatients`, {
                params: { name: searchQuery },
            });
            setPatients(res.data.data);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch patients. Please try again later.'); // Set error message
        } finally {
            setLoading(false);
        }
    };

    const handleNavigate = async () => {
        navigate('/HealthCareProvider/Dashboard/Patients/AddPatient')
    }

    return (
        <div className={styles.container}>
            <div className={styles.upper}>
            <h2>Registered Patients</h2>
            <button onClick={handleNavigate}>Add Patient</button>
            </div>
            
            <input
                type="text"
                className={styles.searchInput}
                placeholder="Search by name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            {loading ? (
                <p>Loading patients...</p>
            ) : error ? (
                <p className={styles.error}>{error}</p> // Display error message
            ) : patients.length > 0 ? (
                <div className={styles.patientList}>
                    {patients.map((patient) => (
                        <PatientCard key={patient._id} patient={patient} />
                    ))}
                </div>
            ) : (
                <p>No patients found.</p>
            )}
        </div>
    );
};

export default PatientList;
