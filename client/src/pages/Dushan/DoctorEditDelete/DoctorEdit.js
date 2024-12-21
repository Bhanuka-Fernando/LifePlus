import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams and useNavigate
import axios from 'axios';
import { FaSave, FaTrash } from 'react-icons/fa'; // Import icons
import Layout from '../../../components/Layout';


const DoctorEdit = () => {
  const { id } = useParams(); // Get the doctor's ID from the URL
  const navigate = useNavigate(); // Initialize useNavigate
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axios.get(`/api/doctors/${id}`);
        setDoctor(response.data);
      } catch (err) {
        setError('Error fetching doctor details');
      } finally {
        setLoading(false);
      }
    };
    fetchDoctor();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/doctors/${id}`);
      navigate('/doctors'); // Redirect to doctor list after deletion
    } catch (err) {
      console.error('Error deleting doctor', err);
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(`/api/doctors/${doctor._id}`, doctor);
      alert(`Doctor ${doctor.fullName} updated successfully.`);
    } catch (err) {
      console.error('Error updating doctor', err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Layout>
      <div className="doctor-edit-container">
        <h2>Edit Doctor Profile</h2>
        {/* Include form inputs for editing doctor details */}
        <form>
          <input
            type="text"
            value={doctor.fullName}
            onChange={(e) => setDoctor({ ...doctor, fullName: e.target.value })}
            placeholder="Full Name"
          />
          {/* Add more fields for other doctor attributes... */}

          <button type="button" onClick={handleSave}>
            <FaSave /> Save Changes
          </button>
          <button type="button" onClick={handleDelete}>
            <FaTrash /> Delete Doctor
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default DoctorEdit;
