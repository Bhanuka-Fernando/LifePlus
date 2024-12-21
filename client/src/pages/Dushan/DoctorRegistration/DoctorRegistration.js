import React, { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';
import axios from 'axios';
import Layout from '../../../components/Layout';
import './DoctorRegistration.css';

const DoctorRegistration = () => {
  const [step, setStep] = useState(1); // To control the step navigation

  const [formData, setFormData] = useState({
    doctorId: '',
    fullName: '',
    phoneNumber: '',
    
    address: '',
    specialization: '',
    associatedHospitals: ['', '', ''],
    hospitalId: '',
    degree: '',
    university: '',
    doctorImage: null,
    medicalLicense: null,
    wardNo: '',
    maxCount: '',
    docPayment: '',
    doctorAvailableTime: '',
    availableDays: ['', '', '', '', '', '', ''],
  });

  const [uploadProgressImage, setUploadProgressImage] = useState(0);
  const [uploadProgressLicense, setUploadProgressLicense] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleHospitalChange = (index, value) => {
    const updatedHospitals = [...formData.associatedHospitals];
    updatedHospitals[index] = value;
    setFormData({ ...formData, associatedHospitals: updatedHospitals });
  };

  const handleDayChange = (index, value) => {
    const updatedDays = [...formData.availableDays];
    updatedDays[index] = value;
    setFormData({ ...formData, availableDays: updatedDays });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const imageRef = ref(storage, `images/${formData.doctorImage.name}`);
      const imageUploadTask = uploadBytesResumable(imageRef, formData.doctorImage);

      imageUploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgressImage(progress);
        },
        (error) => {
          console.error('Error uploading image:', error);
        },
        async () => {
          const doctorImageURL = await getDownloadURL(imageUploadTask.snapshot.ref);

          const licenseRef = ref(storage, `licenses/${formData.medicalLicense.name}`);
          const licenseUploadTask = uploadBytesResumable(licenseRef, formData.medicalLicense);

          licenseUploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setUploadProgressLicense(progress);
            },
            (error) => {
              console.error('Error uploading license:', error);
            },
            async () => {
              const medicalLicenseURL = await getDownloadURL(licenseUploadTask.snapshot.ref);

              const doctorData = {
                ...formData,
                doctorImage: doctorImageURL,
                medicalLicense: medicalLicenseURL,
              };

              await axios.post('/api/doctors/register', doctorData);
              alert('Doctor registration successful!');
            }
          );
        }
      );
    } catch (error) {
      console.error('Error during submission:', error);
    }
  };

  // Navigation functions
  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  // Step 1: Basic Details Form
  const renderBasicDetailsForm = () => (
    <>
      <div className="docregistration-field">
        <label>Doctor ID</label>
        <input
          type="text"
          name="doctorId"
          value={formData.doctorId}
          onChange={handleInputChange}
          className="docregistration-input"
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
          className="docregistration-input"
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
          className="docregistration-input"
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
          className="docregistration-input"
          required
        />
      </div>

      <div className="docregistration-field">
        <label>Specialization</label>
        <select
          name="specialization"
          value={formData.specialization}
          onChange={handleInputChange}
          className="docregistration-select"
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
            className="docregistration-select"
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
          className="docregistration-input"
          required
        />
      </div>

      <button type="button" onClick={nextStep} className="docregistration-next-button">
        Next
      </button>
    </>
  );

  // Step 2: Appointment Details Form
  const renderAppointmentDetailsForm = () => (
    <>
      <div className="docregistration-field">
        <label>Ward No</label>
        <input
          type="text"
          name="wardNo"
          value={formData.wardNo}
          onChange={handleInputChange}
          className="docregistration-input"
          required
        />
      </div>

      <div className="docregistration-field">
        <label>Patient Count Per Day</label>
        <input
          type="number"
          name="maxCount"
          value={formData.maxCount}
          onChange={handleInputChange}
          className="docregistration-input"
          required
        />
      </div>

      <div className="docregistration-field">
        <label>Channeling Fee</label>
        <input
          type="number"
          name="docPayment"
          value={formData.docPayment}
          onChange={handleInputChange}
          className="docregistration-input"
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
          className="docregistration-input"
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
            className="docregistration-select"
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

      <button type="button" onClick={prevStep} className="docregistration-back-button">
        Back
      </button>
      <button type="button" onClick={nextStep} className="docregistration-next-button">
        Next
      </button>
    </>
  );

  // Step 3: Uploads Form
  const renderUploadsForm = () => (
    <>
      <div className="docregistration-field">
        <label>Degree</label>
        <input
          type="text"
          name="degree"
          value={formData.degree}
          onChange={handleInputChange}
          className="docregistration-input"
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
          className="docregistration-input"
          required
        />
      </div>

      <div className="docregistration-field">
        <label>Doctor Image</label>
        <input
          type="file"
          name="doctorImage"
          onChange={handleFileChange}
          className="docregistration-file-input"
          required
        />
        {uploadProgressImage > 0 && <div>Upload Progress: {uploadProgressImage.toFixed(2)}%</div>}
      </div>

      <div className="docregistration-field">
        <label>Medical License</label>
        <input
          type="file"
          name="medicalLicense"
          onChange={handleFileChange}
          className="docregistration-file-input"
          required
        />
        {uploadProgressLicense > 0 && <div>Upload Progress: {uploadProgressLicense.toFixed(2)}%</div>}
      </div>

      <button type="button" onClick={prevStep} className="docregistration-back-button">
        Back
      </button>
      <button type="submit" onClick={handleSubmit} className="docregistration-submit-button">
        Submit
      </button>
    </>
  );

  return (
    <Layout>
      <h2>Doctor Registration</h2>
      <form onSubmit={handleSubmit}>
        {step === 1 && renderBasicDetailsForm()}
        {step === 2 && renderAppointmentDetailsForm()}
        {step === 3 && renderUploadsForm()}
      </form>
    </Layout>
  );
};

export default DoctorRegistration;
