import React from 'react';
import styles from './styles/Dashboard.module.css'; // Import the CSS module
import { useNavigate } from 'react-router-dom';
const coverImage = require('../../images/banuka/ManagerDashoardCover.png');


const Dashboard = () => {
    const navigate = useNavigate();
    const logo = require('../../images/logo.png')

    return (
        <div className={styles.dashboardContainer}>
            {/* <img src={logo} style={{objectFit:'scale-down',height:'100px',width:'200px',backgroundColor:'black'}}/> */}
            <h1 className={styles.dashboardTitle}>Health Care Manager Dashboard</h1>
            <img 
                src={coverImage}// Replace with actual image path or URL
                alt="Health Care Banner" 
                className={styles.dashboardImage}
            />
            <div className={styles.dashboardButtons}>
                <div className={styles.dashboardButton}>
                    <button onClick={() => navigate('/HealthCareProvider/Dashboard/Patients')}>Manage Account</button>
                </div>
                <div className={styles.dashboardButton}>
                    <button onClick={() => navigate('/Dashboard/Appointments')}>Appointments</button>
                </div>
                <div className={styles.dashboardButton}>
                    <button onClick={() => navigate('/Dashboard/Reports')}>Reports</button>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
