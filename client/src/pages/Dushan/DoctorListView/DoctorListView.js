import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import axios from 'axios';
import { FaPhone, FaUniversity, FaHome, FaHospital } from 'react-icons/fa'; // Import icons
import Layout from '../../../components/Layout';
import DoctorModal from './DoctorModal'; // Import the modal component
import { jsPDF } from 'jspdf'; // Import jsPDF
import 'jspdf-autotable'; // Import the autotable plugin
import './DoctorListView.css';


const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [specializationFilter, setSpecializationFilter] = useState(''); // State for specialization filter

  const hospitalId = 'H001'; // Hardcoded hospital ID

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`/api/doctors/hospital/${hospitalId}`);
        setDoctors(response.data);
      } catch (err) {
        setError('Error fetching doctors');
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, [hospitalId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to handle specialization filter change
  const handleSpecializationChange = (e) => {
    setSpecializationFilter(e.target.value);
  };

  // Filter doctors based on search query and specialization
  const filteredDoctors = doctors.filter((doctor) => {
    const fullNameMatch = doctor.fullName.toLowerCase().includes(searchQuery.toLowerCase());
    const doctorIdMatch = doctor.doctorId.toLowerCase().includes(searchQuery.toLowerCase());
    const specializationMatch = specializationFilter ? doctor.specialization === specializationFilter : true;
    return (fullNameMatch || doctorIdMatch) && specializationMatch;
  });

  const handleUpdateProfile = () => {
    if (selectedDoctor) {
      setShowModal(true); // Show the modal
    }
  };

  const handleDeleteDoctor = async () => {
    if (selectedDoctor) {
      try {
        await axios.delete(`/api/doctors/${selectedDoctor._id}`);
        setDoctors(doctors.filter((doctor) => doctor._id !== selectedDoctor._id));
        setSelectedDoctor(null); // Deselect the doctor after deletion
      } catch (err) {
        setError('Error deleting doctor');
      }
    }
  };

  const handleUpdate = async (id, updatedDoctor) => {
    try {
      await axios.put(`/api/doctors/${id}`, updatedDoctor);
      setDoctors(doctors.map((doctor) => (doctor._id === id ? { ...doctor, ...updatedDoctor } : doctor)));
      setShowModal(false); // Close the modal after updating
      setSelectedDoctor(null); // Deselect the doctor
    } catch (err) {
      setError('Error updating doctor');
    }
  };

  // Function to download doctors report as PDF
  const handleDownloadReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('Registered Doctors Report', 20, 20);
    
    const headers = ['Name', 'Doctor ID', 'Specialization', 'Phone Number'];
    const data = filteredDoctors.map((doctor) => [
      doctor.fullName,
      doctor.doctorId,
      doctor.specialization,
      doctor.phoneNumber,
    ]);
    
    // Add headers to the PDF
    doc.autoTable({
      head: [headers],
      body: data,
      startY: 30,
      theme: 'grid',
    });
    
    doc.save('doctors_report.pdf');
  };
  

  return (
    <Layout>
      <div className="doctor-list-container">
        <div className="doctor-list">
          <h2>Registered Doctors</h2>

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search by Name or ID"
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-bar" // Optional: Add a CSS class for styling
          />

          {/* Specialization Filter */}
          <select value={specializationFilter} onChange={handleSpecializationChange} className="specialization-filter">
            <option value="">Select Specialization</option>
            <option value="Cardiologist">Cardiologist</option>
            <option value="Oncologist">Oncologist</option>
            <option value="Pulmonologist">Pulmonologist</option>
            <option value="General Surgeon">General Surgeon</option>
            <option value="Neurologist">Neurologist</option>
            <option value="Psychiatrist">Psychiatrist</option>
            <option value="Dentist">Dentist</option>
          </select>

          <button onClick={handleDownloadReport} className="download-report-button">
            Download Report
          </button>

          <table className="styled-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Doctor ID</th>
                <th>Specialization</th>
                <th>Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {filteredDoctors.map((doctor) => (
                <tr
                  key={doctor._id}
                  onClick={() => setSelectedDoctor(doctor)} // Set selected doctor
                  className="doctor-list-item"
                >
                  <td>{doctor.fullName}</td>
                  <td>{doctor.doctorId}</td>
                  <td>{doctor.specialization}</td>
                  <td>{doctor.phoneNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="doctor-details">
          {selectedDoctor ? (
            <div className="details-card">
              <img
                src={selectedDoctor.doctorImage} // Display doctor's image
                alt={selectedDoctor.fullName}
                className="doctor-image"
              />
              <h3>DR {selectedDoctor.fullName}</h3>
              <p><strong>Specialization:</strong> {selectedDoctor.specialization}</p>
              <p><FaPhone /> <strong>Phone:</strong> {selectedDoctor.phoneNumber}</p>
              <p><FaUniversity /> <strong>Degree:</strong> {selectedDoctor.degree}</p>
              <p><FaUniversity /> <strong>University:</strong> {selectedDoctor.university}</p>
              <p><FaHome /> <strong>Address:</strong> {selectedDoctor.address}</p>
              <p><FaHospital /> <strong>Associated Hospitals:</strong></p>
              <ul style={{ listStyleType: 'none', padding: '0', margin: '0' }}>
                {selectedDoctor.associatedHospitals.map((hospital, index) => (
                  <li key={index}>{hospital}</li>
                ))}
              </ul>

              <button
                className="update-profile-button"
                onClick={handleUpdateProfile}
                style={{
                  marginRight: '10px', // Space between buttons
                  backgroundColor: '#28a745', // Green for modify
                  color: '#fff',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#218838')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#28a745')}
              >
                Modify
              </button>

              <button
                className="delete-doctor-button"
                onClick={handleDeleteDoctor}
                style={{
                  backgroundColor: '#dc3545', // Red for delete
                  color: '#fff',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#c82333')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#dc3545')}
              >
                Delete
              </button>
            </div>
          ) : (
            <p>Select a doctor to view details</p>
          )}
        </div>

        {showModal && (
          <DoctorModal
            doctor={selectedDoctor}
            onClose={() => setShowModal(false)}
            onUpdate={(updatedDoctor) => handleUpdate(selectedDoctor._id, updatedDoctor)}
          />
        )}
      </div>
    </Layout>
  );
};

export default DoctorList;
