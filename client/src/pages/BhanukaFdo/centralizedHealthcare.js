import React, { useState } from 'react';
import CentralizedDoctors from './CentralizedDoctors'; // Import CentralizedDoctors component
import CentralizedLabServices from './centralizedLabServices'; // Import CentralizedLabServices component
import './centralizedHealthcare.css'; // Styling for the tabs and layout
import Layout from './layout/layout';

const CentralizedHealthcare = () => {
  const [activeTab, setActiveTab] = useState('doctors'); // State for active tab, default to 'doctors'

  return (
    <Layout>
    <div className="healthcare-container">
      <div className="tabs-container">
        {/* Tabs for navigation */}
        <button
          className={`tab-button ${activeTab === 'doctors' ? 'active' : ''}`}
          onClick={() => setActiveTab('doctors')}
        >
          Doctors
        </button>
        <button
          className={`tab-button ${activeTab === 'labServices' ? 'active' : ''}`}
          onClick={() => setActiveTab('labServices')}
        >
          Lab Services
        </button>
      </div>

      <div className="content-container">
        {/* Conditionally render components based on the active tab */}
        {activeTab === 'doctors' ? <CentralizedDoctors /> : <CentralizedLabServices />}
      </div>
    </div>
    </Layout>
  );
};

export default CentralizedHealthcare;
