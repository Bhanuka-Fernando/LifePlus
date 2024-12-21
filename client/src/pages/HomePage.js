import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './HomePage.module.css'; // Import the CSS module for styling

const HomePage = () => {
  const navigate = useNavigate();

  // Function to get user data
  const getUserData = async () => {
    try {
      const res = await axios.post(
        '/api/user/getUserData',
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(res.data); // Check the response if needed
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div style={{marginTop:'200px'}}>
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to Lifepulse Healthcare System</h1>
      <p className={styles.description}>
        Your health is our priority. Choose a portal to get started.
      </p>
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={() => navigate('/HealthCareProvider_Login')}>
          Health Care Managers Portal
        </button>
        <button className={styles.button} onClick={() => navigate('/StaffLogin')}>
          Hospital Staff Portal
        </button>
        <button className={styles.button} onClick={() => navigate('/login')}>
          Patient Portal
        </button>
      </div>
    </div>
    </div>
  );
};

export default HomePage;
