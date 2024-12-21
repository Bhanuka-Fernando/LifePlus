import React, { useState } from 'react';
import './paymentModal.css'; // You can style the modal here
import { Navigate } from 'react-router-dom';

const PaymentModal = ({ onClose, onConfirm, doctorId, doctorName, userId, hospitalId, serviceName, email, paymentAmount }) => {
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolderName: ''
  });

  const [validationErrors, setValidationErrors] = useState({}); // State for validation errors

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Special handling for card number input
    if (name === 'cardNumber') {
      const formattedValue = value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim(); // Format to add space after every 4 digits
      setPaymentDetails((prev) => ({
        ...prev,
        [name]: formattedValue
      }));
    } else {
      setPaymentDetails((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    // Validate Card Holder Name
    if (!paymentDetails.cardHolderName || !/^[a-zA-Z\s]+$/.test(paymentDetails.cardHolderName)) {
      errors.cardHolderName = 'Please enter a valid name.';
    }
    
    // Validate Card Number
    const cardNumberWithoutSpaces = paymentDetails.cardNumber.replace(/\s/g, ''); // Remove spaces for validation
    if (!/^\d{16}$/.test(cardNumberWithoutSpaces)) {
      errors.cardNumber = 'Card number must be 16 digits.';
    }
    
    // Validate Expiry Date
    const [month, year] = paymentDetails.expiryDate.split('/');
    const currentDate = new Date();
    const expiryDate = new Date(`20${year}`, month - 1); // Construct expiry date
    if (!/^\d{2}\/\d{2}$/.test(paymentDetails.expiryDate) || expiryDate < currentDate) {
      errors.expiryDate = 'Please enter a valid expiry date (MM/YY).';
    }
    
    // Validate CVV
    if (!/^\d{3}$/.test(paymentDetails.cvv)) {
      errors.cvv = 'CVV must be 3 digits.';
    }
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm(); // Validate the form
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors); // Set validation errors if any
      return; // Stop submission
    }

    const cardNumberWithoutSpaces = paymentDetails.cardNumber.replace(/\s/g, ''); // Remove spaces for payment data

    const paymentData = {
      paymentId: Math.random().toString(36).substring(2, 15), // Generate a random payment ID
      doctorId,
      doctorName,
      userId,
      hospitalId,
      email,
      serviceName,
      paymentAmount,
      paymentDate: new Date().toISOString(), // Current date and time
      paymentType: 'Card',
      cardNumber: cardNumberWithoutSpaces, // Include card number without spaces
      expiryDate: paymentDetails.expiryDate, // Include expiry date
      cvv: paymentDetails.cvv, // Include CVV
      cardHolderName: paymentDetails.cardHolderName // Include cardholder name
    };

    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      if (response.ok) {
        alert('Payment Successful!');
        onConfirm(); // Call onConfirm to finalize booking
      } else {
        const errorData = await response.json();
        alert(`Payment failed: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error during payment submission:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="payment-modal">
      <div className="payment-modal-content">
        <h2>Enter Payment Details</h2>
        <div className="paymentModelContent">
          <form onSubmit={handleSubmit}>
            <div className="Pform-group">
              <label>Card Holder Name</label>
              <input
                type="text"
                name="cardHolderName"
                value={paymentDetails.cardHolderName}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="John Doe"
              />
              {validationErrors.cardHolderName && <p className="error-message">{validationErrors.cardHolderName}</p>}
            </div>
            <div className="Pform-group">
              <label>Card Number</label>
              <input
                type="text"
                name="cardNumber"
                value={paymentDetails.cardNumber}
                onChange={handleChange}
                required
                className="input-field"
                maxLength="19" // 16 digits + 3 spaces
                placeholder="1234 5678 9012 3456"
              />
              {validationErrors.cardNumber && <p className="error-message">{validationErrors.cardNumber}</p>}
            </div>
            <div className="Pform-group Pform-row">
              <div className="Pform-col">
                <label>Expiry Date</label>
                <input
                  type="text"
                  name="expiryDate"
                  value={paymentDetails.expiryDate}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="MM/YY"
                  maxLength="5" // MM/YY format
                />
                {validationErrors.expiryDate && <p className="error-message">{validationErrors.expiryDate}</p>}
              </div>
              <div className="Pform-col">
                <label>CVV</label>
                <input
                  type="text"
                  name="cvv"
                  value={paymentDetails.cvv}
                  onChange={handleChange}
                  required
                  className="input-field"
                  maxLength="3"
                  placeholder="123"
                />
                {validationErrors.cvv && <p className="error-message">{validationErrors.cvv}</p>}
              </div>
            </div>
            <div className="payment-modal-actions">
              <button type="submit" className="paymentbtn confirm-payment-btn">Confirm Payment</button><br />
              <button type="button" className="paymentbtn cancel-payment-btn" onClick={onClose}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
