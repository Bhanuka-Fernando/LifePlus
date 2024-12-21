import React from 'react';
import Sidebar from '../../components/Banuka/SideBarComponent/Sidebar';
import './ManageAccounts.module.css'
import HealthcareManagerRegistration from '../../components/Banuka/HealthCareManagerReg';

function HealthCareManagerReg() {
  return (
    <div>
      
      <div style={{flexGrow:1}}>
      <HealthcareManagerRegistration />
      </div>
    </div>
  );
}

export default HealthCareManagerReg;
