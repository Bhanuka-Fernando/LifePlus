// UploadForm.js
import React from 'react';

const UploadForm = ({ formData, handleInputChange, handleFileChange, uploadProgressImage, uploadProgressLicense, prevStep }) => {
  return (
    <>
      <div className="docregistration-field">
        <label>Doctor Image</label>
        <input
          type="file"
          name="doctorImage"
          accept="image/*"
          onChange={handleFileChange}
          required
        />
        <progress value={uploadProgressImage} max="100" />
      </div>

      <div className="docregistration-field">
        <label>Medical License (PDF)</label>
        <input
          type="file"
          name="medicalLicense"
          accept="application/pdf"
          onChange={handleFileChange}
          required
        />
        <progress value={uploadProgressLicense} max="100" />
      </div>

      <div className="docregistration-field">
        <label>Degree</label>
        <input
          type="text"
          name="degree"
          value={formData.degree}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="docregistration-field">
        <label>University</label>
        <input
          type="text"
          name="university"
          value={formData.university}
          onChange={handleInputChange}
          required
        />
      </div>

      <button type="button" onClick={prevStep} className="docregistration-prev-button">
        Previous
      </button>
      <button type="submit" className="docregistration-submit-button">
        Submit
      </button>
    </>
  );
};

export default UploadForm;
