import React, { useEffect, useState } from 'react';
import './myAppointments.css'; // Import the CSS for styling
import { useParams } from 'react-router-dom';
import UpdateAppointmentModal from './UpdateAppointmentModal';
import UpdateLabAppointmentModal from './updateLabAppointment';
import Layout from './layout/layout';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [labAppointments, setLabAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isLabAppointment, setIsLabAppointment] = useState(false);

  const { email } = useParams();
  const userEmail = email || localStorage.getItem('UserEmail');

  useEffect(() => {
    if (userEmail) {
      setLoading(true);
      Promise.all([fetchAppointments(userEmail), fetchLabAppointments(userEmail)])
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    } else {
      setError('Email parameter is missing');
      setLoading(false);
    }
  }, [userEmail]);

  const fetchAppointments = async (userEmail) => {
    try {
      const response = await fetch(`/api/appointment/my-appointments/${userEmail}`);
      if (!response.ok) {
        throw new Error('Failed to fetch appointments');
      }
      const data = await response.json();
      setAppointments(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchLabAppointments = async (userEmail) => {
    try {
      const response = await fetch(`/api/lab-appointment/my-appointments/${userEmail}`);
      if (!response.ok) {
        throw new Error('Failed to fetch lab appointments');
      }
      const data = await response.json();
      setLabAppointments(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id, isLab = false) => {
    const confirmMsg = isLab
      ? 'Are you sure you want to delete this lab appointment?'
      : 'Are you sure you want to delete this appointment?';
    if (window.confirm(confirmMsg)) {
      try {
        const url = isLab
          ? `/api/lab-appointment/${id}`
          : `/api/appointment/delete/${id}`;
        const response = await fetch(url, { method: 'DELETE' });
        if (!response.ok) {
          throw new Error('Failed to delete appointment');
        }
        if (isLab) {
          setLabAppointments(labAppointments.filter((appointment) => appointment._id !== id));
        } else {
          setAppointments(appointments.filter((appointment) => appointment._id !== id));
        }
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleUpdateClick = (appointment, isLab = false) => {
    setSelectedAppointment(appointment);
    setIsLabAppointment(isLab);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedAppointment(null);
    fetchAppointments();
    fetchLabAppointments();
  };

  const downloadPDF = (selector, filename) => {
    const element = document.querySelector(selector);
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${filename}.pdf`);
    });
  };

  const handleDownloadDoctorAppointmentsPDF = () => {
    if (appointments.length > 0) {
      downloadPDF('.doctor-appointments', 'doctor_appointments');
    } else {
      alert('No doctor appointments available to download.');
    }
  };

  const handleDownloadLabAppointmentsPDF = () => {
    if (labAppointments.length > 0) {
      downloadPDF('.lab-appointments', 'lab_appointments');
    } else {
      alert('No lab appointments available to download.');
    }
  };

  if (loading) {
    return <p className="loading-text">Loading appointments...</p>;
  }

  if (error) {
    return <p className="error-text">Error: {error}</p>;
  }

  return (
    <Layout>
      <div className="appointment-title">
        <h1>My Appointments

        <div className="download-buttons">
          <button className="btn download-btn" onClick={handleDownloadDoctorAppointmentsPDF}>
            Download Doctor Appointments PDF
          </button>
          <button className="btn download-btn" onClick={handleDownloadLabAppointmentsPDF}>
            Download Lab Appointments PDF
          </button>
        </div>
        </h1>
        <hr />
        <h2>Check or Manage your Appointment Details Here</h2>

        {/* Buttons for downloading PDF reports */}
        

        {/* Doctor Appointments Table */}
        <div className="appointments-container doctor-appointments">
          <h3>Doctor Appointments</h3>
          {appointments.length > 0 ? (
            <table className="appointments-table">
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Doctor Name</th>
                  <th>Ward No</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment._id}>
                    <td>{appointment.userName}</td>
                    <td>{appointment.email}</td>
                    <td>{appointment.contact}</td>
                    <td>{appointment.date}</td>
                    <td>{appointment.time}</td>
                    <td>{appointment.doctorName}</td>
                    <td>{appointment.wardNo}</td>
                    <td className="actions">
                      <button className="btn update-btn" onClick={() => handleUpdateClick(appointment)}>Update</button>
                      <button className="btn delete-btn" onClick={() => handleDelete(appointment._id)}>Cancel</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No doctor appointments found.</p>
          )}
        </div>

        {/* Lab Appointments Table */}
        <div className="appointments-container lab-appointments">
          <h3>Lab Appointments</h3>
          {labAppointments.length > 0 ? (
            <table className="appointments-table">
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Test Type</th>
                  <th>Hospital Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {labAppointments.map((appointment) => (
                  <tr key={appointment._id}>
                    <td>{appointment.userName}</td>
                    <td>{appointment.email}</td>
                    <td>{appointment.contact}</td>
                    <td>{appointment.date}</td>
                    <td>{appointment.time}</td>
                    <td>{appointment.testType}</td>
                    <td>{appointment.hospitalName}</td>
                    <td className="actions">
                      <button className="btn update-btn" onClick={() => handleUpdateClick(appointment, true)}>Update</button>
                      <button className="btn delete-btn" onClick={() => handleDelete(appointment._id, true)}>Cancel</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No lab appointments found.</p>
          )}
        </div>

        {/* Modal for Updating Appointments */}
        {modalVisible && (
          isLabAppointment ? (
            <UpdateLabAppointmentModal
              appointment={selectedAppointment}
              onClose={closeModal}
            />
          ) : (
            <UpdateAppointmentModal
              appointment={selectedAppointment}
              onClose={closeModal}
            />
          )
        )}
      </div>
    </Layout>
  );
};

export default MyAppointments;
