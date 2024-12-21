// AppointmentDetailsForm.js
import React from 'react';

const AppointmentDetailsForm = ({ formData, handleInputChange, handleDayChange, nextStep, prevStep }) => {
  return (
    <>
      <div className="docregistration-field">
        <label>Ward No</label>
        <input
          type="text"
          name="wardNo"
          value={formData.wardNo}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="docregistration-field">
        <label>Max Patient Count</label>
        <input
          type="number"
          name="maxCount"
          value={formData.maxCount}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="docregistration-field">
        <label>Payment Required</label>
        <input
          type="number"
          name="docPayment"
          value={formData.docPayment}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="docregistration-field">
        <label>Available Time</label>
        <input
          type="text"
          name="doctorAvailableTime"
          value={formData.doctorAvailableTime}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="docregistration-field">
        <label>Available Days</label>
        {formData.availableDays.map((day, index) => (
          <select
            key={index}
            value={day}
            onChange={(e) => handleDayChange(index, e.target.value)}
          >
            <option value="">Select Day</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
        ))}
      </div>

      <button type="button" onClick={prevStep} className="docregistration-prev-button">
        Previous
      </button>
      <button type="button" onClick={nextStep} className="docregistration-next-button">
        Next
      </button>
    </>
  );
};

export default AppointmentDetailsForm;
