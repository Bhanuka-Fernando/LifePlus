import React, { useState } from 'react';
import './updateAppointmentModal.css'; // Make sure this CSS file exists

const UpdateAppointmentModal = ({ appointment, onClose }) => {
  const [formData, setFormData] = useState({ ...appointment });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/appointment/update/${appointment._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update appointment');
      }

      // Only call onClose to close the modal and refresh the appointments
      onClose(); // Close the modal
    } catch (err) {
      // Optionally, handle the error here, such as logging or displaying a message
      console.error(err.message); // Log the error for debugging
    }
  };

  return (
    <div>
    <div className="uamodal">
      <div className="uamodal-content">
        <div className="uamodal-header">
            <div className="uamodal-title">
                <h2>Update Details</h2>
            </div>
          
          <span className="uamodal-close" onClick={onClose}>&times;</span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="uaform-group">
            <label className="uaform-label">Patient Name</label>
            <input
              type="text"
              name="userName"
              className="uaform-input"
              value={formData.userName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="uaform-group">
            <label className="uaform-label">Email</label>
            <input
              type="email"
              name="email"
              className="uaform-input"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="uaform-group">
            <label className="uaform-label">Contact</label>
            <input
              type="text"
              name="contact"
              className="uaform-input"
              value={formData.contact}
              onChange={handleChange}
              required
            />
          </div>
          <div className="uaform-actions">
            <button type="submit" className="uabtn uaupdate-btn">Update Appointment</button>
            <button type="button" className="uabtn uacancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default UpdateAppointmentModal;
