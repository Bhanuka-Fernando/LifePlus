import React, { useState } from 'react';
import axios from 'axios';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'; // Firebase imports
import { storage } from '../../firebase'; // Firebase configuration
import './HospitalRegistration.css';

const HospitalRegistration = () => {
  const [hospitalID, setHospitalID] = useState('');
  const [hospitalName, setHospitalName] = useState('');
  const [hospitalAddress, setHospitalAddress] = useState('');
  const [hospitalDescription, setHospitalDescription] = useState('');
  const [hospitalImage, setHospitalImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (hospitalImage) {
      // Upload image to Firebase
      setIsUploading(true);
      const storageRef = ref(storage, `hospitalImages/${hospitalImage.name}`);
      const uploadTask = uploadBytesResumable(storageRef, hospitalImage);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // You can handle progress here if needed
        },
        (error) => {
          console.error('Error uploading image:', error);
          setIsUploading(false);
        },
        async () => {
          // Get the download URL after upload
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          await submitForm(downloadURL); // Submit form after image upload
          setIsUploading(false);
        }
      );
    } else {
      await submitForm(''); // If no image, submit with empty URL
    }
  };

  const submitForm = async (imageUrl) => {
    const hospitalData = {
      hospitalID,
      hospitalName,
      hospitalAddress,
      hospitalDescription,
      hospitalImage: imageUrl, // Pass image URL to backend
    };

    try {
      const response = await axios.post('/api/hospitalsD/create', hospitalData);
      alert('Hospital registered successfully!');
    } catch (error) {
      console.error(error);
      alert('Error registering hospital.');
    }
  };

  return (
    <div className="hospital-registration-container">
      <h2>Hospital Registration</h2>
      <form onSubmit={handleSubmit} className="hospital-registration-form">
        <label>Hospital ID:</label>
        <input
          type="text"
          value={hospitalID}
          onChange={(e) => setHospitalID(e.target.value)}
          required
        />
        
        <label>Hospital Name:</label>
        <input
          type="text"
          value={hospitalName}
          onChange={(e) => setHospitalName(e.target.value)}
          required
        />
        
        <label>Hospital Address:</label>
        <input
          type="text"
          value={hospitalAddress}
          onChange={(e) => setHospitalAddress(e.target.value)}
          required
        />

        <label>Hospital Description:</label>
        <textarea
          value={hospitalDescription}
          onChange={(e) => setHospitalDescription(e.target.value)}
        ></textarea>

        <label>Hospital Image:</label>
        <input
          type="file"
          onChange={(e) => setHospitalImage(e.target.files[0])} // Capture image
        />

        <button type="submit" disabled={isUploading}>
          {isUploading ? 'Uploading...' : 'Register Hospital'}
        </button>
      </form>
    </div>
  );
};

export default HospitalRegistration;
