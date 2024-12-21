const Payment = require('../../models/BhanukaFdo/payment');
const mongoose = require('mongoose');

// Get all doctors
const getAllPayments = async (req, res) => {
    try {
        const payment = await Payment.find({}).sort({ createdAt: -1 });
        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch payments' });
    }
};

// Get a single doctor by ID
const getPayment = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such payment found' });
    }

    try {
        const payment = await Payment.findById(id);
        if (!payment) {
            return res.status(404).json({ error: 'No such payment found' });
        }
        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching payment' });
    }
};

// Create a new doctor
const createPayment = async (req, res) => {
    const { paymentId, doctorId,cardHolderName,expiryDate,cvv,cardNumber,hospitalName, doctorName,paymentAmount, userId,serviceName, paymentDate, hospitalId,paymentType, email } = req.body;

    try {
        const payment = await Payment.create({ paymentId, paymentAmount,expiryDate,cvv,cardNumber,hospitalName,cardHolderName,doctorId,serviceName, doctorName, userId, paymentDate, hospitalId,paymentType, email  });
        res.status(201).json(payment);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create payment', details: error.message });
    }
};

// Delete a doctor by ID
const deletePayment = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such payment found' });
    }

    try {
        const payment = await Payment.findOneAndDelete({ _id: id });

        if (!payment) {
            return res.status(404).json({ error: 'No such payment found' });
        }
        res.status(200).json({ message: 'payment deleted successfully', payment });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting payment' });
    }
};

// Update a doctor by ID
const updatePayment = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such payment found' });
    }

    try {
        const payment = await Payment.findOneAndUpdate({ _id: id }, req.body, { new: true });

        if (!payment) {
            return res.status(404).json({ error: 'No such payment found' });
        }
        res.status(200).json(payment);
    } catch (error) {
        res.status(400).json({ error: 'Error updating payment', details: error.message });
    }
};

// get payments by email
const getPaymentsByEmail = async (req, res) => {
    const { email } = req.params; // Get email from query parameters
    if (!email) {
      return res.status(400).send("Email query parameter is required");
    }
  
    try {
      // Find promotion by email
      const payment = await Payment.find({ email: email });
  
      if (!payment || payment.length === 0) {
        return res.status(404).send("No Payment found for this email");
      }
  
      res.status(200).json(payment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };





module.exports = {
    getAllPayments,
    getPayment,
    createPayment,
    deletePayment,
    updatePayment,
    getPaymentsByEmail
};
