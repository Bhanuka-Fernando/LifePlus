import React from 'react';
import Sidebar from '../../components/Banuka/SideBarComponent/Sidebar';
import UpdatePatient from '../../components/Banuka/UpdatePatientDetails/UpdatePatient';


function UpdatePatientPage() {
  return (
    <div style={{display:'flex'}}>
        <div>
      <Sidebar />
      </div>
      <div style={{flexGrow:1}}>
      <UpdatePatient />
      </div>
    </div>
  );
}

export default UpdatePatientPage;
