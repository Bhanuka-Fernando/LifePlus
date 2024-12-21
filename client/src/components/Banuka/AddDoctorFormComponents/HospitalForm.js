// HospitalForm.js
import React from 'react';
import styles from './AddDoctorForm.module.css';

const HospitalForm = ({ hospital, index, handleHospitalChange }) => {
  return (
    <div className={styles.hospitalSection}>
      <label className={styles.label}>
        Hospital Name:
        <input
          className={styles.input}
          type="text"
          name="name"
          value={hospital.name}
          onChange={(e) => handleHospitalChange(index, e)}
          required
        />
      </label>
      <label className={styles.label}>
        Address:
        <input
          className={styles.input}
          type="text"
          name="address"
          value={hospital.address}
          onChange={(e) => handleHospitalChange(index, e)}
          required
        />
      </label>
      <label className={styles.label}>
        Working Hours Start:
        <input
          className={styles.input}
          type="time"
          name="start"
          value={hospital.workingHours.start}
          onChange={(e) => handleHospitalChange(index, e)}
        />
      </label>
      <label className={styles.label}>
        Working Hours End:
        <input
          className={styles.input}
          type="time"
          name="end"
          value={hospital.workingHours.end}
          onChange={(e) => handleHospitalChange(index, e)}
        />
      </label>
      <label className={styles.label}>
        Available Days:
        <input
          className={styles.input}
          type="text"
          name="availableDays"
          value={hospital.availableDays.join(',')}
          onChange={(e) => handleHospitalChange(index, e)}
          placeholder="e.g., Monday,Tuesday"
        />
      </label>
    </div>
  );
};

export default HospitalForm;
