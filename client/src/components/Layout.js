// components/Layout.js
import React from 'react';
import Sidebar from '../../src/components/SideBar';
import Navbar from '../../src/components/NavBar';

const Layout = ({ children }) => {
    return (
        <div>
            <Navbar />
            <Sidebar />
            <div style={styles.mainContent}>
                {children}
            </div>
        </div>
    );
};

const styles = {
    mainContent: {
        marginLeft: '250px', // Sidebar width
        marginTop: '60px',   // Navbar height
        padding: '20px',
        backgroundColor: '#f9f9f9',
        minHeight: '100vh',
        boxSizing: 'border-box'
    }
};

export default Layout;
