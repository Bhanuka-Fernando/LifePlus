import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; // Import toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the toastify CSS
import styles from './LoginScreen.module.css'; // Import the CSS module
import { BASE_URL } from '../../../environment/environment';

const LoginScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error('Please fill in all fields'); // Show toast error
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/api/HealthCareManager/login`, { email, password });
      
      if (response.data.success) {
        toast.success('Login successful'); // Show toast success
        localStorage.setItem('token', response.data.data);
        navigate('/HealthCareProvider/Dashboard');
      } else {
        toast.error(response.data.message); // Show toast error
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.'); // Show toast error
    }
  };

  return (
    <div className={styles.container}>
      <div style={{ width: '20vw'}}>
        <h1 className={styles.title}>Health Care Manager</h1>
        <input
          className={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
        <input
          className={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={styles.button} onClick={handleLogin}>
          <span className={styles.buttonText}>Login</span>
        </button>
        {/* <button className={styles.button} onClick={() => navigate('/HealthCareProvider_Register')}>
        <span className={styles.buttonText}>Register</span>
        </button> */}

      </div>
      <ToastContainer /> {/* Include ToastContainer to display toasts */}
    </div>
  );
};

export default LoginScreen;
