import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'; // Importing Link for navigation
import './centralizedDoctors.css'; // Importing the CSS file for styling

const CentralizedLabServices = () => {

  const {hospitalId} = useParams();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`/api/services/services/?hospitalId=${hospitalId}`); // Correct endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        const data = await response.json();
        setServices(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const filteredServices = services.filter(service =>
    service.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.wardNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Loading lab services...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="doctors-container">
      <div className="doctors-title">
        <h1>Find Your Lab Service</h1>
        <h2 className="contact-info">For Lab Bookings or More Details: <span>077 - 52 76 953</span></h2>
      </div>
      <hr />

      {/* Search Input */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Service Name or Ward Number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term
          className="search-input"
        />
      </div>

      {filteredServices.length > 0 ? (
        <ul className="doctors-list">
          {filteredServices.map((service) => (
            <li className="doctor-card" key={service._id}>
              <img className="doctors-image" src={service.serviceImage} alt={service.serviceName} />
              <div className="doctors-info">
                <h3>{service.serviceName}</h3>
                <p><strong>Lab No:</strong> {service.wardNo}</p>
                <p><strong>Service Payment:</strong> Rs.{service.servicePayment}</p>
                <Link to={`/lab-BookingForm/${service.testType}/${service.hospitalId}/${service.hospitalName}/
                                            ${service.labId}/${service.serviceName}/${service.servicePayment}`} className="appointment-button">
                  Book a Lab Service
                </Link>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No services available.</p>
      )}
    </div>
  );
};

export default CentralizedLabServices;
