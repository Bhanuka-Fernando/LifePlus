import React from 'react';
import styles from './HomeFooter.module.css'; // Import the CSS module for styling

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.info}>
          <h2>About Our Healthcare System</h2>
          <p>
            Our Healthcare System aims to provide easy access to healthcare services for patients and healthcare providers. We strive to enhance the patient experience through a streamlined approach to booking appointments, managing health records, and connecting with healthcare professionals.
          </p>
        </div>
        <div className={styles.FquickLinks}>
          <h2>Quick Links</h2>
          <ul>
            <li><a href="/login">Patient Portal</a></li>
            <li><a href="/HealthCareProvider_Login">Healthcare Providers Portal</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
          </ul>
        </div>
        <div className={styles.contact}>
          <h2>Contact Us</h2>
          <p>Email: support@healthcaresystem.com</p>
          <p>Phone: (123) 456-7890</p>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} Healthcare System. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
