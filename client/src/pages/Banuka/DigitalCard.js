import React from 'react';
import { useLocation } from 'react-router-dom';
import html2pdf from 'html2pdf.js';  // Import html2pdf.js
import DigitalCardContent from '../../components/Banuka/Digital Health Card/DigitalCardContent'; // Import the new component
import styles from './styles/DigitalCard.module.css'; // Import the CSS module
import Sidebar from '../../components/Banuka/SideBarComponent/Sidebar';

export default function DigitalCard() {
    const location = useLocation();
    const { userData } = location.state || {};
    
    // Error handling if userData is not available
    if (!userData) {
        return <div>No user data available.</div>;
    }

    const user = userData;

    // Function to generate PDF
    const generatePDF = () => {
        const element = document.getElementById('digitalCard');
        const options = {
            margin: [50, 70],
            filename: `${user.fullName}_DigitalCard.pdf`,
            image: { type: 'jpeg', quality: 1 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
        };

        html2pdf().set(options).from(element).save(); // Trigger the PDF download
    };

    return (
        <div style={{display:'flex',marginLeft:'300px'}}>
        <div>
            <Sidebar/>
        </div>
        <div className={styles.cardContainer}>
            <div id="digitalCard">
                <DigitalCardContent user={user} />
            </div>
            {/* Button to generate PDF */}
            <button onClick={generatePDF} className={styles.downloadButton}>
                Download PDF
            </button>
        </div>
        </div>
    );
}
