import React, { useEffect, useState } from 'react';
import { fetchPeakTimes2 } from '../../../services/reportService';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import styles from './PeakTimesDashboard.module.css'; // Import the CSS module

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const PeakTimesDashboard = () => {
  const [reportData, setReportData] = useState({});
  const [startDate, setStartDate] = useState('2024-10-01');
  const [endDate, setEndDate] = useState('2024-10-14');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [peakInfo, setPeakInfo] = useState({ hour: null, taps: null });

  const loadReport = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPeakTimes2(startDate, endDate);
      setReportData(data);
      if (Object.keys(data).length > 0) {
        setSelectedHospital(Object.keys(data)[0]);
        const peakHourInfo = findPeakHour(data[Object.keys(data)[0]]);
        setPeakInfo(peakHourInfo);
      }
    } catch (err) {
      setError('Failed to load report.');
    }
    setLoading(false);
  };

  useEffect(() => {
    loadReport();
  }, []);

  const findPeakHour = (data) => {
    if (!data) return null;

    const peakHour = data.reduce(
      (max, taps, index) => (taps > max.taps ? { hour: index, taps } : max),
      { hour: 0, taps: 0 }
    );
    return peakHour;
  };

  const prepareChartData = () => {
    if (!selectedHospital || !reportData[selectedHospital]) return null;

    const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);
    const data = reportData[selectedHospital];
    const colors = ['rgba(75, 192, 192, 0.6)'];

    return {
      labels: hours,
      datasets: [
        {
          label: selectedHospital,
          data: data,
          backgroundColor: colors[0],
        },
      ],
    };
  };

  return (
    <div className={styles.dashboardContainer}>
      <h2 className={styles.header}>Peak Times Dashboard</h2>
      <div className={styles.formContainer}>
        <div className={styles.formGroup}>
          <label>Start Date:</label>
          <input 
            type="date" 
            value={startDate} 
            onChange={e => setStartDate(e.target.value)} 
          />
        </div>
        <div className={styles.formGroup}>
          <label>End Date:</label>
          <input 
            type="date" 
            value={endDate} 
            onChange={e => setEndDate(e.target.value)} 
          />
        </div>
        <div className={styles.formGroup}>
          <label>Select Hospital:</label>
          <select 
            value={selectedHospital || ''} 
            onChange={e => {
              setSelectedHospital(e.target.value);
              setPeakInfo(findPeakHour(reportData[e.target.value]));
            }}
          >
            {Object.keys(reportData).map(hospital => (
              <option key={hospital} value={hospital}>
                {hospital}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={loadReport}>Load Report</button>
        </div>
      </div>

      {loading && <p className={styles.loadingMessage}>Loading...</p>}
      {error && <p className={styles.errorMessage}>{error}</p>}
      
      {!loading && !error && selectedHospital && prepareChartData() && (
        <div className={styles.chartContainer}>
          <div className={styles.chartWrapper}>
            <Bar
              height={500}
              width={800}
              data={prepareChartData()}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: 'top' },
                  title: { display: true, text: `Number of Taps per Hour for ${selectedHospital}` },
                },
                scales: {
                  x: { 
                    title: { display: true, text: 'Hour of Day' },
                  },
                  y: { 
                    beginAtZero: true,
                    title: { display: true, text: 'Number of Taps' },
                  },
                },
              }}
            />
          </div>

          {/* Display the peak hour information */}
          {peakInfo && peakInfo.taps !== null && (
            <div className={styles.peakInfo}>
              <h3>Peak Hour for {selectedHospital}:</h3>
              <p style={{color:'black'}}>
                <strong>Hour:</strong> {peakInfo.hour}:00
              </p>
              <p style={{color:'black'}}>
                <strong>Number of Taps:</strong> {peakInfo.taps}
              </p>
            </div>
          )}
        </div>
      )}

      {!loading && !error && Object.keys(reportData).length === 0 && (
        <p className={styles.noDataMessage}>No data available for the selected date range.</p>
      )}
    </div>
  );
};

export default PeakTimesDashboard;
