import React, { useState } from 'react';
import './Sidebar.css'; // Custom CSS for styling
import LogoutButton from '../LogOutButton/Logout';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true); // State to manage sidebar toggle

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const logo = require('../../../images/logo.png')

    return (
        <div className={`sidebar-container ${isOpen ? 'open' : ''}`}>
            <button className="toggle-btn" onClick={toggleSidebar}>
                {isOpen ? 'Close' : 'Open'} Menu
            </button>
            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                <img src={logo} style={{objectFit:'scale-down',height:'100px',width:'200px'}}/>
                <ul>
                    <li><a href='/HealthCareProvider/Dashboard'><i className="fas fa-home"></i> Home</a></li>
                    <li><a href='/HealthCareProvider/Dashboard/Patients'><i className="fas fa-user"></i> Manage Account</a></li>
                    {/* <li><a href='/Dashboard/AddDoctor'><i className="fas fa-user"></i> Manage Doctors</a></li> */}
                    <li><a href='/Dashboard/Appointments'><i className="fas fa-calendar"></i> Appointments</a></li>
                    <li><a href='/Dashboard/reports'><i className="fas fa-file-alt"></i> Reports</a></li>
                </ul>
                <LogoutButton />
            </div>
        </div>
    );
}

export default Sidebar;
