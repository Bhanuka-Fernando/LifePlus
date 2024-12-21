import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import PaymentModal from './PaymentModal';
import './labBookingForm.css';
import Layout from './layout/layout';

const LabBookingForm = () => {
  const [isPaymentModalVisible, setPaymentModalVisible] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [serviceDetails, setServiceDetails] = useState(null); // State for service details

  const { labId, hospitalId, serviceName, servicePayment, hospitalName } = useParams();

  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    contact: '',
    labId: labId || '',
    date: '',
    time: '',
    status: 'false',
    labPaymentAmount: servicePayment || '',
    hospitalName: hospitalName || '',
    hospitalId: hospitalId || '',
    testType: serviceName || '',
    note: ''
  });

  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);

  // Fetch service details based on labId
  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        console.log(labId);
        const response = await fetch(`/api/services/${labId}`); // Replace with your actual endpoint
        if (response.ok) {
          const data = await response.json();
          setServiceDetails(data);
          setFormData((prev) => ({
            ...prev,
            testType: data.serviceName, // Set testType to serviceName
            labPaymentAmount: data.servicePayment // Set payment amount
          }));
        } else {
          throw new Error('Failed to fetch service details');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchServiceDetails();
  }, [labId]);

  const onDateChange = (date) => {
    setSelectedDate(date);
    setFormData((prev) => ({
      ...prev,
      date: date.toISOString().split('T')[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedDate) {
      alert('Please select a date.');
      return;
    }

    setPaymentModalVisible(true);
  };

  const handleConfirmPayment = async () => {
    try {
      const response = await fetch('/api/lab-appointment/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setBookingSuccess(true);
        setPaymentModalVisible(false);
        resetForm();
      } else {
        const errorData = await response.json();
        alert(`Booking failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error during booking:', error);
      alert('An error occurred. Please try again.');
    }

    navigate(-1);
  };

  const resetForm = () => {
    setFormData({
      userName: '',
      email: '',
      contact: '',
      labId: '',
      date: '',
      time: '',
      status: 'false',
      labPaymentAmount: '',
      hospitalName: '',
      hospitalId: '',
      testType: '',
      note: ''
    });
    setSelectedDate(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'contact') {
      if (value === '' || (/^[0-9\b]+$/.test(value) && value.length <= 10)) {
        setFormData({
          ...formData,
          [name]: value
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <Layout>
    <div className="booking-form-title">
      <div className="booking-form-wrapper">
        <div className="date-input-container">
          <div className="form-group">
            <h1>Place your Lab Appointment Here</h1>
            <hr className='lab_hr'/>
            <h2>Select your booking date to check availability</h2>
            <Calendar
              onChange={onDateChange}
              value={selectedDate}
              minDate={new Date()}
            />
          </div>
        </div>
        <div className="booking-form-container">
          <form className="booking-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>Email :</label><br />
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>Patient Name :</label><br />
                <input type="text" name="userName" value={formData.userName} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>Time :</label><br />
                <input type="time" name="time" value={formData.time} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Payment Amount :</label><br />
                <input type="text" name="labPaymentAmount" value={formData.labPaymentAmount} readOnly  />
              </div>
              <div className="form-group">
                <label>Lab Number :</label><br />
                <input type="text" className="labNumber" name="hospitalName" value={formData.hospitalName} onChange={handleChange} readOnly />
              </div>
              <div className="form-group">
                <label>Contact :</label><br />
                <input type="text" name="contact" value={formData.contact} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>Test Type :</label><br />
                <input type="text" name="testType" value={formData.testType} readOnly />
              </div>
              <div className="form-group">
                <label>Note:</label><br />
                <input type="text" name="note" value={formData.note} onChange={handleChange} />
              </div>
            </div>
            <div className="labform-actions">
              <button
                type="submit"
                className="btn book-appointment-btn"
              >
                Book Lab Appointment
              </button> <br />
              <button type="button" className="btn book-cancel-btn" onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        </div>
      </div>

      {isPaymentModalVisible && (
        <PaymentModal
          onClose={() => setPaymentModalVisible(false)}
          onConfirm={handleConfirmPayment}
          hospitalId={hospitalId}
          serviceName={serviceName}
          email={formData.email}
          paymentAmount={formData.labPaymentAmount} // Corrected to pass labPaymentAmount
        />
      )}

      {bookingSuccess && (
        <p className="booking-success-message">Booking Successful!</p>
      )}
    </div>
    </Layout>
  );
};

export default LabBookingForm;
