const Payment = require('../models/BhanukaFdo/payment');

// Get all payments
const getAllPayments = async () => {
    return await Payment.find({}).sort({ createdAt: -1 });
};

// Get a single payment by ID
const getPaymentById = async (id) => {
    return await Payment.findById(id);
};

// Create a new payment
const createPayment = async (paymentData) => {
    return await Payment.create(paymentData);
};

// Delete a payment by ID
const deletePaymentById = async (id) => {
    return await Payment.findOneAndDelete({ _id: id });
};

// Update a payment by ID
const updatePaymentById = async (id, updateData) => {
    return await Payment.findOneAndUpdate({ _id: id }, updateData, { new: true });
};

// Get payments by email
const getPaymentsByEmail = async (email) => {
    return await Payment.find({ email: email });
};

module.exports = {
    getAllPayments,
    getPaymentById,
    createPayment,
    deletePaymentById,
    updatePaymentById,
    getPaymentsByEmail
};
