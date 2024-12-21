import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';
import axios from 'axios';
import Layout from '../../../components/Layout';

// Register required chart elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,  // For pie chart
  PointElement,
  LineElement, // For line chart
  Title,
  Tooltip,
  Legend
);

const DoctorOverview = () => {
  const [doctorData, setDoctorData] = useState([]);

  useEffect(() => {
    // Fetch doctors from API for hospital ID 'H001'
    axios.get('/api/doctors/hospital/H001')
      .then(response => {
        setDoctorData(response.data);
      })
      .catch(error => {
        console.error('Error fetching doctor data:', error);
      });
  }, []);

  // Helper functions to process data for charts
  const getSpecializationData = () => {
    const specCounts = {};
    doctorData.forEach(doctor => {
      specCounts[doctor.specialization] = (specCounts[doctor.specialization] || 0) + 1;
    });
    return {
      labels: Object.keys(specCounts),
      datasets: [{
        label: 'Number of Doctors',
        data: Object.values(specCounts),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      }]
    };
  };

  const getUniversityData = () => {
    const uniCounts = {};
    doctorData.forEach(doctor => {
      uniCounts[doctor.university] = (uniCounts[doctor.university] || 0) + 1;
    });
    return {
      labels: Object.keys(uniCounts),
      datasets: [{
        data: Object.values(uniCounts),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      }]
    };
  };

  const getChannelingFeeData = () => {
    return {
      labels: doctorData.map(doctor => doctor.fullName),
      datasets: [{
        label: 'Channeling Fees',
        data: doctorData.map(doctor => doctor.docPayment),
        fill: false,
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
      }]
    };
  };

  return (
    <Layout>
      <div style={{ padding: '20px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Doctor Overview</h2>

        <div className="chart-container" style={{ marginBottom: '40px' }}>
          <div className="overview-specialization" style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
            <h3 style={{ marginBottom: '15px', textAlign: 'center' }}>Specializations</h3>
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
              <Bar data={getSpecializationData()} />
            </div>
          </div>

          <div className="overview-university" style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
            <h3 style={{ marginBottom: '15px', textAlign: 'center' }}>University Distribution</h3>
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
              <Pie data={getUniversityData()} />
            </div>
          </div>

          <div className="overview-channeling" style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
            <h3 style={{ marginBottom: '15px', textAlign: 'center' }}>Channeling Fees</h3>
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
              <Line data={getChannelingFeeData()} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DoctorOverview;
