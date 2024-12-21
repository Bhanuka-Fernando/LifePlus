// components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation
import logo from '../images/logo.png';
import LogOut from '../components/Banuka/LogOutButton/Logout'


const Sidebar = () => {
    return (
        <div style={styles.sidebar}>
            {/* Logo Section */}
            <div style={styles.logoContainer}>
                <img src={logo} alt="Retail Rush Logo" style={styles.logo} />
            </div>

            {/* Navigation Links */}
            <ul style={styles.ul}>
                <li style={styles.li}><Link to="/DoctorHome" style={styles.link}>Home</Link></li>
                <li style={styles.li}><Link to="/DoctorList" style={styles.link}>Doctor List</Link></li>
                <li style={styles.li}><Link to="/DoctorRegistration" style={styles.link}>Add Doctor</Link></li>
                <li style={styles.li}><Link to="/DoctorOverview" style={styles.link}>OverView</Link></li>
                <li style={styles.li}><Link to="/patientRecords" style={styles.link}>Patient Records</Link></li>                
                <li style={styles.li}><Link to="/profile" style={styles.link}>Calender</Link></li>
                

            </ul>
            <div>
                <LogOut/>
            </div>
        </div>
    );
};

const styles = {
    sidebar: {
        height: '100vh',
        width: '250px',
        position: 'fixed',
        top: '0',
        left: '0',
        backgroundColor: '#00bf93', 
        paddingTop: '20px', 
        color: '#fff',
        boxSizing: 'border-box',
        overflowY: 'auto', 
        fontFamily: 'Poppins, sans-serif', 
        boxShadow: '2px 0 8px rgba(0, 0, 0, 0.4)', 
    },
    logoContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '60px', // Adjust height as needed
        backgroundColor: '#00bf93', // Black background color to match the sidebar
    },
    logo: {
        maxHeight: '100px',
        maxWidth: '180px',
        objectFit: 'contain',
    },
    ul: {
        listStyleType: 'none',
        padding: 0,
        marginTop: '20px', // Adjust to leave space for logo
    },
    li: {
        padding: '15px 0px',
        textAlign: 'left',
    },
    link: {
        color: '#fff', // White text color
        textDecoration: 'none', // Remove underline
        display: 'block', // Make link fill the list item
        fontSize: '1.2rem', // Increase font size
        padding: '10px', // Add padding for better click area
        borderRadius: '4px', // Add rounded corners
    },
};

export default Sidebar;
