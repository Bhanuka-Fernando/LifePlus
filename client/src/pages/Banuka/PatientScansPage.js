import React from 'react';
import Sidebar from '../../components/Banuka/SideBarComponent/Sidebar';
import PatientScans from '../../components/Banuka/PatientScans/PatientScans';



function PatientScansPage() {
  return (
    <div style={{display:'flex'}}>
        <div>
      <Sidebar />
      </div>
      <div style={{flexGrow:1}}>
      <PatientScans/>
      </div>
    </div>
  );
}

export default PatientScansPage;
