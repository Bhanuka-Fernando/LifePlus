import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'; // Importing Link for navigation
import './centralizedDoctors.css'; // Importing the CSS file for styling

const CentralizedDoctors = () => {
  const {hospitalId} = useParams();
  const {hospitalName} = useParams();

  console.log("hospId",hospitalId);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(`/api/doctor/doctors/?hospitalId=${hospitalId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch doctors');
        }
        const data = await response.json();
        setDoctors(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter(doctor => 
    doctor.docName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Loading doctors...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="doctors-container">
      <div className="doctors-title">
        <h1>Find Your Doctor Here</h1>
        <h2 className="contact-info">For Chanelling or more Details: <span> 077 - 52 76 952</span></h2>
      </div>
      <hr />

      {/* Search Input */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Doctor Name or Specialization..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term
          className="search-input"
        />
      </div>

      {filteredDoctors.length > 0 ? (
        <ul className="doctors-list">
          {filteredDoctors.map((doctor) => (
            <li className="doctor-card" key={doctor.doctorId}>
              <img className="doctors-image" src={doctor.docImage} alt={doctor.docName} />
              <div className="doctors-info">
                <h3>{doctor.docName}</h3>
                <p><strong>Specialization:</strong> {doctor.specialization}</p>
                <p><strong>Ward No:</strong> {doctor.wardNo}</p>
                <p><strong>Available Time:</strong> {doctor.doctorAvailableTime}</p>
                <Link to={`/bookingForm/${doctor.doctorId}/${doctor.hospitalId}/${doctor.wardNo}/${doctor.docName}
                /${doctor.specialization}/${doctor.docPayment}/${doctor.doctorAvailableTime}/${hospitalName}`} className="appointment-button">
                  Make an Appointment
                </Link> {/* Button for making an appointment */}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No doctors available.</p>
      )}
    </div>
  );
};

export default CentralizedDoctors;
