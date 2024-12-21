import React, { useState } from 'react';

const UpdatePaymentModal = ({ payment, onClose }) => {
  const [formData, setFormData] = useState({
    paymentId: payment.paymentId,
    serviceName: payment.serviceName,
    paymentDate: payment.paymentDate,
    paymentAmount: payment.paymentAmount,
    paymentType: payment.paymentType
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/payment/${payment._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Payment updated successfully!');
        onClose();
      } else {
        alert('Failed to update payment');
      }
    } catch (err) {
      console.error('Error updating payment:', err);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Update Payment</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Service Name</label>
            <input
              type="text"
              name="serviceName"
              value={formData.serviceName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Payment Amount</label>
            <input
              type="number"
              name="paymentAmount"
              value={formData.paymentAmount}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn confirm-btn">Update</button>
          <button type="button" className="btn cancel-btn" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePaymentModal;
