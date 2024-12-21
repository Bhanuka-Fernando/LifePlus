import React from 'react';
import styles from './PatientList.module.css'; // Import styles
import { useNavigate } from 'react-router-dom';

const PatientCard = ({ patient }) => {
    const navigate = useNavigate();

    return (
        <div className={styles.patientCard} onClick={() => navigate(`/HealthCareProvider/Dashboard/Patients/UpdatePatient/${patient._id}`)}>
            <div className={styles.profileHeader}>
            <div className={styles.upper}>
                <img src={patient.profilePhoto} alt="profile" />
                <div>
                    <h2>{patient.fullName}</h2>
                    <p>{patient.email}</p>
                </div>
            </div>
                <div className={styles.sections}>
                    <p>{patient._id}</p>
                </div>
                <div className={styles.sections}>
                    <p>{patient.phone}</p>
                </div>
                <div className={styles.sections}>
                    <p>{patient.nic}</p>
                </div>
            </div>
        </div>
    );
};

export default PatientCard;
