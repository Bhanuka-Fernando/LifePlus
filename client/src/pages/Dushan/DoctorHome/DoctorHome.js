import React, { useEffect, useState } from 'react';
import './DoctorHome.css'; // Import your CSS file
import { FaBrain, FaHeartbeat, FaUserMd, FaStethoscope, FaUserNurse } from 'react-icons/fa'; // Import icons
import axios from 'axios'; // Import Axios for API calls
import Layout from '../../../components/Layout';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const HomePage = () => {
  const [hospitalDetails, setHospitalDetails] = useState(null);
  const [specialists, setSpecialists] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Fetch hospital details and specialists based on hardcoded hospitalId
    const fetchHospitalData = async () => {
      try {
        // Fetch hospital details
        const hospitalResponse = await axios.get('/api/hospitalsD/H001'); // Adjust the endpoint if necessary
        setHospitalDetails(hospitalResponse.data);

        // Fetch specialists (doctors) for the hospital
        const doctorsResponse = await axios.get('/api/doctors/hospital/H001'); // Adjust the endpoint if necessary
        const doctors = doctorsResponse.data;

        // Map doctors to categories with icons
        const categorizedSpecialists = [
          { title: "Neurologists", icon: <FaBrain /> },
          { title: "Oncologists", icon: <FaUserMd /> },
          { title: "Cardiologists", icon: <FaHeartbeat /> },
          { title: "Psychiatrists", icon: <FaUserNurse /> },
          { title: "General Surgeons", icon: <FaStethoscope /> }
        ];

        setSpecialists(categorizedSpecialists);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchHospitalData();
  }, []);

  if (!hospitalDetails) {
    return <div>Loading...</div>; // Show a loading indicator while data is being fetched
  }

  // Handler for specialist card click
  const handleSpecialistClick = (title) => {
    navigate('/DoctorList', { state: { specialization: title } });
  };

  return (
    <Layout>
      <div className="homepage">
        <div className="hospital-details">
          <img src={hospitalDetails.hospitalImage} alt={`${hospitalDetails.hospitalName} Logo`} className="hospital-logo" />
          <h1 className="hospital-name">{hospitalDetails.hospitalName}</h1>
          <p className="hospital-description">{hospitalDetails.hospitalDescription}</p>
        </div>

        <div className="specialists">
          {specialists.map((specialist, index) => (
            <div className="specialist-card" key={index} onClick={() => handleSpecialistClick(specialist.title)}>
              <div className="specialist-icon">{specialist.icon}</div>
              <h2 className="specialist-title">{specialist.title}</h2>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
