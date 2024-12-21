import React from 'react';

import PatientList from '../../components/Banuka/PatientCardComponent/PatientList';
import Sidebar from '../../components/Banuka/SideBarComponent/Sidebar';


function PatientSearch() {
  return (
    <div style={{display:'flex'}}>
        <div>
        <Sidebar />
        </div>
        <div style={{flexGrow:1}}>
        <PatientList/>
        
        </div>
        
       
    </div>
  );
}

export default PatientSearch;
