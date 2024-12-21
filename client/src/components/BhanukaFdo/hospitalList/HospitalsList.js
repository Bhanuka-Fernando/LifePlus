import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './hospitalList.css'; // Import the CSS file for styling

const HospitalsList = () => {
  const navigate = useNavigate();
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch('/api/hospitals/allHospitals');
        if (!response.ok) {
          throw new Error('Failed to fetch hospitals');
        }
        const data = await response.json();
        setHospitals(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  if (loading) return <p>Loading hospitals...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="hospitals-container">
      <div className="hospitals-title">
        <h1>Welcome to LIFEPLUS</h1>
        <h2>Select Your Preferred Hospital</h2>
      </div>
      <hr />
      <div className="hospitals-list">
        {hospitals.map(hospital => (
          <div
            onClick={() => navigate(`/healthCare/${hospital.hospitalId}/${hospital.hospitalName}`)}
            key={hospital._id}
            className="hospital-card"
          >
            <img src={hospital.hospitalImage} alt="Hospital" className="hospital-image" />
            <div className="hospital-info">
              <h3>{hospital.hospitalName}</h3>
              <p><strong>City:</strong> {hospital.hospitalAddress.city}</p>
              <p><strong>Contact:</strong> {hospital.contactNumber}</p>
              <button className="hosListselect-button">Select</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HospitalsList;
