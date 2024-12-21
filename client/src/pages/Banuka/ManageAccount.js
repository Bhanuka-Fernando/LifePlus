import React from 'react';
import Sidebar from '../../components/Banuka/SideBarComponent/Sidebar';
import CreateAccountForm from '../../components/Banuka/CreatePatientAccountComponents/CreateAccountForm';



function ManageAccount() {
  return (
    <div style={{display:'flex'}}>
        <div>
      <Sidebar />
      </div>
      <div style={{flexGrow:1}}>
      <CreateAccountForm />
      </div>
    </div>
  );
}

export default ManageAccount;
