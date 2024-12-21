import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UpdatePaymentModal from './UpdatePaymentModal'; // Import the modal component for updating payments
import Layout from './layout/layout';


const MyPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const { email } = useParams(); // Get email from URL params
  const userEmail = email || localStorage.getItem('UserEmail'); // Fallback to local storage if email is undefined

  useEffect(() => {
    if (userEmail) {
      setLoading(true);
      fetchPayments(userEmail)
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    } else {
      setError('Email parameter is missing');
      setLoading(false);
    }
  }, [userEmail]);

  const fetchPayments = async (userEmail) => {
    try {
      const response = await fetch(`/api/payment/my-payments/${userEmail}`);
      if (!response.ok) {
        throw new Error('Failed to fetch payments');
      }
      const data = await response.json();
      setPayments(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this payment?')) {
      try {
        const response = await fetch(`/api/payment/${id}`, { method: 'DELETE' });
        if (!response.ok) {
          throw new Error('Failed to delete payment');
        }
        setPayments(payments.filter((payment) => payment._id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleUpdateClick = (payment) => {
    setSelectedPayment(payment); // Set the selected payment for updating
    setModalVisible(true); // Show the update modal
  };

  const closeModal = () => {
    setModalVisible(false); // Close the modal
    setSelectedPayment(null); // Clear the selected payment
    fetchPayments(userEmail); // Refresh payments after closing the modal
  };

  if (loading) {
    return <p className="loading-text">Loading payments...</p>;
  }

  if (error) {
    return <p className="error-text">Error: {error}</p>;
  }

  return (
    <Layout>
    <div className="appointment-title">
      <h1>My Payments</h1>
      <hr />
      <h2>Check or Manage your Payment Details Here</h2>

      {/* Payments Table */}
      <div className="appointments-container">
        {payments.length > 0 ? (
          <table className="appointments-table">
            <thead>
              <tr>
                <th>Service Name</th>
                <th>Hospital Name</th>
                <th>Payment Date</th>
                <th>Payment Amount</th>
                <th>Payment Type</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment._id}>
                  <td>{payment.serviceName}</td>
                  <td>{payment.hospitalName}</td>
                  <td>{new Date(payment.paymentDate).toLocaleDateString()}</td>
                  <td>Rs.{payment.paymentAmount}</td>
                  <td>{payment.paymentType}</td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No payments found.</p>
        )}
      </div>

      {/* Modal for Updating Payments */}
      {modalVisible && (
        <UpdatePaymentModal
          payment={selectedPayment}
          onClose={closeModal}
        />
      )}
    </div>
    </Layout>
  );
};

export default MyPayments;
