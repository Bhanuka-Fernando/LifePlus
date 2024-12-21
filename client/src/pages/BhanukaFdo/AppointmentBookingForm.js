import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Calendar from 'react-calendar'; // Import Calendar
import 'react-calendar/dist/Calendar.css'; // Import calendar styles
import './bookingForm.css'; // Ensure this CSS file is updated
import PaymentModal from './PaymentModal'; // Import the PaymentModal component
import Layout from './layout/layout';

const BookingForm = () => {
  const [maxCount, setMaxAppointmentsPerDay] = useState(2); // Initialize max appointments state
  const [appointmentCount, setAppointmentCount] = useState(0);
  const [isPaymentModalVisible, setPaymentModalVisible] = useState(false); // Manage payment modal visibility
  const [bookingSuccess, setBookingSuccess] = useState(false); // Track booking success
  const [availableDays, setAvailableDays] = useState([]);
  const [validationErrors, setValidationErrors] = useState({}); // State for validation errors
  const [notAvailableMessage, setNotAvailableMessage] = useState('');
  const [availabilityMessage, setAvailabilityMessage] = useState('');
  const { doctorId, hospitalId,hospitalName, wardNo, docName, specialization, docPayment, doctorAvailableTime } = useParams();



  // State to manage form data
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    contact: '',
    doctorId: doctorId || '',
    date: '',
    status: 'false',
    docPayment: docPayment || '',
    hospitalName: hospitalName || '',
    hospitalId: hospitalId || '',
    doctorName: docName || '',
    specialization: specialization || '',
    wardNo: wardNo || '',
    doctorAvailableTime: doctorAvailableTime || '', // Ensure this is set correctly
    note: ''
  });

  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);

  // Fetch doctor data to get the maximum appointments per day
  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const response = await fetch(`/api/doctor/${doctorId}`);
        if (response.ok) {
          const data = await response.json();
          setMaxAppointmentsPerDay(data.maxCount);
          setAvailableDays(data.availableDays); // Set available days from the response
        } else {
          console.error('Failed to fetch doctor data');
        }
      } catch (error) {
        console.error('Error fetching doctor data:', error);
      }
    };
  
    fetchDoctorData();
  }, [doctorId]);

  // Handle calendar date selection
  const onDateChange = (date) => {
    const selectedDayName = date.toLocaleDateString('en-US', { weekday: 'long' });
  
    // Check if the selected day is in the availableDays array
    if (availableDays.includes(selectedDayName)) {
      setAvailabilityMessage(`The doctor is available on ${selectedDayName}.`);
      setNotAvailableMessage(''); // Clear any previous not available message
      setSelectedDate(date);
      setFormData((prev) => ({
        ...prev,
        date: date.toISOString().split('T')[0] // Save the date in YYYY-MM-DD format
      }));
    } else {
      setAvailabilityMessage(''); // Clear any previous availability message
      setNotAvailableMessage(`The doctor is not available on ${selectedDayName}. Please select another day.`);
    }
  };
  

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedDate) {
      alert('Please select a date.');
      return;
    }

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setPaymentModalVisible(true); // Open payment modal on form submission
  };

  // Form validation logic
  const validateForm = () => {
    const errors = {};
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!formData.userName || formData.userName.trim().length < 2) {
      errors.userName = 'Please enter a valid name (at least 2 characters).';
    }
    if (!formData.contact || !/^\d{10}$/.test(formData.contact)) {
      errors.contact = 'Please enter a valid 10-digit contact number.';
    }
    if (!formData.hospitalName || formData.hospitalName.trim().length < 2) {
      errors.hospitalName = 'Please enter a valid hospital name (at least 2 characters).';
    }
    if (!formData.docPayment || isNaN(formData.docPayment) || parseFloat(formData.docPayment) <= 0) {
      errors.docPayment = 'Please enter a valid payment amount.';
    }
    return errors;
  };

  const handleConfirmPayment = async () => {
    try {
      const response = await fetch('/api/appointment/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Ensure doctorAvailableTime is included
      });

      if (response.ok) {
        setBookingSuccess(true); // Mark booking as successful
        setPaymentModalVisible(false); // Close payment modal
        resetForm(); // Reset form on success
      } else {
        const errorData = await response.json();
        alert(`Booking failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error during booking:', error);
      alert('An error occurred. Please try again.');
    }

    navigate('/Patient-home');
  };

  // Function to reset the form data and clear selected date
  const resetForm = () => {
    setFormData({
      userName: '',
      email: '',
      contact: '',
      doctorId: '',
      date: '',
      status: 'false',
      docPayment: '',
      hospitalName: '',
      hospitalId: '',
      doctorName: '',
      specialization: '',
      doctorAvailableTime: '', // Resetting doctorAvailableTime
      wardNo: '',
      note: ''
    });
    setSelectedDate(null);
    setValidationErrors({});
  };

  // Fetch appointment count when date, doctorId, or hospitalId changes
  useEffect(() => {
    const fetchAppointmentCount = async () => {
      if (formData.date && formData.doctorId && formData.hospitalId) {
        try {
          const response = await fetch(
            `/api/appointment/count?doctorId=${formData.doctorId}&hospitalId=${formData.hospitalId}&date=${formData.date}`
          );
          if (response.ok) {
            const data = await response.json();
            setAppointmentCount(data.appointmentCount); // Set the appointment count

            console.log('Appointment Count:', appointmentCount);
            console.log('Max Appointments Per Day:', maxCount);

          } else {
            console.error('Failed to fetch appointment count');
          }
        } catch (error) {
          console.error('Error fetching appointment count:', error);
        }
      }
    };

    fetchAppointmentCount();
  }, [formData.date, formData.doctorId, formData.hospitalId]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // If the input name is "contact", only allow numeric values and limit to 10 digits
    if (name === 'contact') {
      // Only update if the value is empty, a number, and less than or equal to 10 characters
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
    navigate(-1); // Navigate back to centralized doctors page
  };

  return (

    <Layout>
    <div className="booking-form-title">
      <div className="booking-form-wrapper">
        <div className="date-input-container">
          <div className="form-group">
            <h1>Place your Booking Here</h1>
            <hr />
            <h2>Select your booking date to check availability</h2>

            {availableDays.length > 0 && (
              <p className="available-days-message">
                Available days : {availableDays.join(' , ')}
              </p>
            )}
            {/* Calendar Component */}
            <Calendar
              onChange={onDateChange}
              value={selectedDate}
              minDate={new Date()} // Set minimum date to today
            />
          </div>
         {/* Show availability message if the doctor is available */}
        {availableDays.includes(selectedDate?.toLocaleDateString('en-US', { weekday: 'long' })) && 
          appointmentCount < maxCount && availabilityMessage && (
            <p className="availability-message">{availabilityMessage}</p>
        )}

        {/* Show not available message if applicable */}
        {notAvailableMessage && (
          <p className="limit-reached-message">{notAvailableMessage}</p>
        )}

        {/* Show max count message if the limit is reached and the doctor is available */}
        {appointmentCount >= maxCount && 
          availableDays.includes(selectedDate?.toLocaleDateString('en-US', { weekday: 'long' })) && (
            <p className="limit-reached-message">Sorry, the doctor has reached the maximum appointment limit for this date.</p>
        )}
        </div>
        <div className="booking-form-container">
          <form className="booking-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>Email :</label><br />
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                {validationErrors.email && <p className="error-message">{validationErrors.email}</p>}
              </div>
              
              <div className="form-group">
                <label>Patient Name :</label><br />
                <input type="text" name="userName" value={formData.userName} onChange={handleChange} required />
                {validationErrors.userName && <p className="error-message">{validationErrors.userName}</p>}
              </div>
              
              <div className="form-group">
                <label>Time :</label><br />
                <input type="text" name="availabeTime" value={formData.doctorAvailableTime} readOnly />
              </div>
              <div className="form-group">
                <label>Payment Amount :</label><br />
                <input type="text" name="docPayment" value={formData.docPayment} onChange={handleChange} required />
                {validationErrors.docPayment && <p className="error-message">{validationErrors.docPayment}</p>}
              </div>
              <div className="form-group">
                <label>Hospital Name :</label><br />
                <input type="text" name="hospitalName" value={formData.hospitalName} onChange={handleChange} readOnly />
              </div>
              <div className="form-group">
                <label>Contact :</label><br />
                <input type="text" name="contact" value={formData.contact} onChange={handleChange}   required />
                {validationErrors.contact && <p className="error-message">{validationErrors.contact}</p>}
              </div>
              
              <div className="form-group">
                <label>Doctor Name :</label><br />
                <input type="text" name="doctorName" value={formData.doctorName} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Specialization :</label><br />
                <input type="text" name="specialization" value={formData.specialization} readOnly />
              </div>
              <div className="form-group">
                <label>Ward No :</label><br />
                <input type="text" name="wardNo" value={formData.wardNo} readOnly />
              </div>
              <div className="form-group">
                <label>Note:</label><br />
                <input type="text" name="note" value={formData.note} onChange={handleChange} />
              </div>
            </div>
            <div className="form-actions">
              <button
                type="submit"
                className="btn book-appointment-btn"
                disabled={appointmentCount >= maxCount} // Disable button if max limit is reached
              >
                Book Appointment
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
          doctorId={doctorId} // Pass doctorId
          doctorName={docName} // Pass doctorName
          hospitalId={hospitalId} // Pass hospitalId
          email={formData.email} // Pass email from form data
          paymentAmount={formData.docPayment} // Pass payment amount
        />
      )}


      {bookingSuccess && (
        <p className="booking-success-message">Booking Successful!</p>
      )}
    </div>
    </Layout>
  );
};

export default BookingForm;
