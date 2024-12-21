import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './PatientScans.module.css';
import { BASE_URL } from '../../../environment/environment';


const PatientScans = () => {
    const { id } = useParams(); // Get patient ID from URL params
    const [patient, setPatient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch patient data and scan details on component mount
    useEffect(() => {
        const fetchPatientWithScans = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/user/patientIdScans/${id}`);
                setPatient(response.data.data);
                console.log(response.data.data)
            } catch (err) {
                console.error('Error fetching patient data:', err);
                setError('Error fetching patient data. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchPatientWithScans();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className={styles.patientContainer}>
            {patient && (
                <div className={styles.patientInfo}>

                <div>
                    <div className={styles.profileHeader}>
                        <img src={patient.profilePhoto} alt="profile" />
                            <div >
                                <h2>{patient.fullName}</h2>
                                <p>{patient._id}</p> {/* Assuming 'id' is a field in your user data */}
                                <p>{patient.email}</p>
                            </div>
                            
                    </div>
                </div>
                    
                    <h3>Scan History</h3>
                    {patient.scans && patient.scans.length > 0 ? (
                        <ul className={styles.scanList}>
                            {patient.scans.map((scan, index) => (
                                <li key={index} className={styles.scanItem}>
                                    <p><strong>Scanned by:</strong> {scan.scannedBy.name} ({scan.scannedBy.email})</p>
                                    <p><strong>Date:</strong> {new Date(scan.date).toLocaleString()}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No scans recorded for this patient.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default PatientScans;
