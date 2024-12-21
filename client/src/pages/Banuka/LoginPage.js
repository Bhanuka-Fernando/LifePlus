import React from 'react';

import LoginScreen from '../../components/Banuka/LoginComponent/Login';
import { useNavigate } from 'react-router-dom';

function ManageAccount() {
  const navigate = useNavigate();
  return (
    
    <div>
      <div style={{flexGrow:1}}>
      <LoginScreen/>
      </div>
      <button onClick={() => navigate('/HealthCareProvider_Register')}>Register</button>
    </div>
    
  );
}

export default ManageAccount;
