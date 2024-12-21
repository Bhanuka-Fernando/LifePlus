import React from 'react';
import Sidebar from '../../components/Banuka/SideBarComponent/Sidebar';
import './ManageAccounts.module.css'
import AddDoctorForm from '../../components/Banuka/AddDoctorFormComponents/AddDoctorForm';


function ManageAccount() {
  return (
    <div>
        <div>
      <Sidebar />
      </div>
      <div style={{flexGrow:1}}>
      <AddDoctorForm/>
      </div>
    </div>
  );
}

export default ManageAccount;
