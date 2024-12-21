import React, { useEffect, useState } from 'react';
import './DoctorModal.css'; 

const DoctorModal = ({ doctor, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    doctorId: '',
    fullName: '',
    specialization: '',
    phoneNumber: '',
    degree: '',
    university: '',
    address: '',
    associatedHospitals: [],
  });

  useEffect(() => {
    if (doctor) {
      setFormData({
        doctorId: doctor.doctorId, 
        fullName: doctor.fullName,
        specialization: doctor.specialization,
        phoneNumber: doctor.phoneNumber,
        degree: doctor.degree,
        university: doctor.university,
        address: doctor.address,
        associatedHospitals: doctor.associatedHospitals,
      });
    }
  }, [doctor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAssociatedHospitalsChange = (e) => {
    const value = e.target.value.split(',').map(hospital => hospital.trim());
    setFormData((prevData) => ({
      ...prevData,
      associatedHospitals: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData); // Pass the updated data directly
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Modify Doctor Details</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="doctorId"
            value={formData.doctorId}
            readOnly // Make the Doctor ID read-only
            placeholder="Doctor ID"
          />
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            required
          />
          <input
            type="text"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            placeholder="Specialization"
            required
          />
          <input
            type="tel" // Changed to 'tel' for phone numbers
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Phone Number"
            required
          />
          <input
            type="text"
            name="degree"
            value={formData.degree}
            onChange={handleChange}
            placeholder="Degree"
            required
          />
          <input
            type="text"
            name="university"
            value={formData.university}
            onChange={handleChange}
            placeholder="University"
            required
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            required
          />
          <input
            type="text"
            name="associatedHospitals"
            value={formData.associatedHospitals.join(', ')}
            onChange={handleAssociatedHospitalsChange}
            placeholder="Associated Hospitals (comma-separated)"
            required
          />
          <button type="submit">Update</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default DoctorModal;
