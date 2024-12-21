// AddDoctorForm.js
import React, { useState } from 'react';
import axios from 'axios';
import styles from './AddDoctorForm.module.css'; // Import the CSS module
import HospitalForm from './HospitalForm'; // Import the new HospitalForm component

const AddDoctorForm = () => {
  const [doctor, setDoctor] = useState({
    name: '',
    email: '',
    phone: '',
    specialization: '',
    hospitals: [{ 
      name: '', 
      address: '', 
      workingHours: { start: '', end: '' },
      availableDays: []
    }],
    appointments: [],
  });

  const handleChange = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

  const handleHospitalChange = (index, e) => {
    const newHospitals = [...doctor.hospitals];
    if (e.target.name === 'start' || e.target.name === 'end') {
      newHospitals[index].workingHours[e.target.name] = e.target.value;
    } else if (e.target.name === 'availableDays') {
      newHospitals[index].availableDays = e.target.value.split(',');
    } else {
      newHospitals[index][e.target.name] = e.target.value;
    }
    setDoctor({ ...doctor, hospitals: newHospitals });
  };

  const addHospital = () => {
    setDoctor({
      ...doctor,
      hospitals: [...doctor.hospitals, { 
        name: '', 
        address: '', 
        workingHours: { start: '', end: '' },
        availableDays: []  
      }]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8070/api/Doctors/add', doctor);
      alert('Doctor added successfully!');
    } catch (error) {
      console.error('Error adding doctor:', error);
      alert('Failed to add doctor. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3>Add New Doctor</h3>

      <label className={styles.label}>
        Name:
        <input className={styles.input} type="text" name="name" value={doctor.name} onChange={handleChange} required />
      </label>

      <label className={styles.label}>
        Email:
        <input className={styles.input} type="email" name="email" value={doctor.email} onChange={handleChange} required />
      </label>

      <label className={styles.label}>
        Phone:
        <input className={styles.input} type="tel" name="phone" value={doctor.phone} onChange={handleChange} required />
      </label>

      <label className={styles.label}>
        Specialization:
        <input className={styles.input} type="text" name="specialization" value={doctor.specialization} onChange={handleChange} required />
      </label>

      <h3>Hospitals:</h3>
      {doctor.hospitals.map((hospital, index) => (
        <HospitalForm 
          key={index} 
          hospital={hospital} 
          index={index} 
          handleHospitalChange={handleHospitalChange} 
        />
      ))}
      <button type="button" className={styles.button} onClick={addHospital}>
        Add Another Hospital
      </button>

      <button type="submit" className={styles.button}>Add Doctor</button>
    </form>
  );
};

export default AddDoctorForm;
