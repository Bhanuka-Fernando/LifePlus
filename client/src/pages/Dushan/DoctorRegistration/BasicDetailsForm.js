// BasicDetailsForm.js
import React from 'react';

const BasicDetailsForm = ({ formData, handleInputChange, handleHospitalChange, nextStep }) => {
  return (
    <>
      <div className="docregistration-field">
        <label>Doctor ID</label>
        <input
          type="text"
          name="doctorId"
          value={formData.doctorId}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="docregistration-field">
        <label>Full Name</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="docregistration-field">
        <label>Phone Number</label>
        <input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="docregistration-field">
        <label>Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="docregistration-field">
        <label>Specialization</label>
        <select
          name="specialization"
          value={formData.specialization}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Specialization</option>
          <option value="Cardiologist">Cardiologist</option>
          <option value="Oncologist">Oncologist</option>
          <option value="Pulmonologist">Pulmonologist</option>
          <option value="General Surgeon">General Surgeon</option>
          <option value="Neurologist">Neurologist</option>
          <option value="Psychiatrist">Psychiatrist</option>
          <option value="Dentist">Dentist</option>
        </select>
      </div>

      <div className="docregistration-field">
        <label>Associated Hospitals</label>
        {formData.associatedHospitals.map((hospital, index) => (
          <select
            key={index}
            value={hospital}
            onChange={(e) => handleHospitalChange(index, e.target.value)}
            required
          >
            <option value="">Select Hospital</option>
            <option value="Lanka Hospital">Lanka Hospital</option>
            <option value="Nawaloka Hospital">Nawaloka Hospital</option>
            <option value="Apollo Hospital">Apollo Hospital</option>
            <option value="Asiri Hospital">Asiri Hospital</option>
            <option value="Durdans Hospital">Durdans Hospital</option>
          </select>
        ))}
      </div>

      <div className="docregistration-field">
        <label>Hospital ID</label>
        <input
          type="text"
          name="hospitalId"
          value={formData.hospitalId}
          onChange={handleInputChange}
          required
        />
      </div>

      <button type="button" onClick={nextStep} className="docregistration-next-button">
        Next
      </button>
    </>
  );
};

export default BasicDetailsForm;
