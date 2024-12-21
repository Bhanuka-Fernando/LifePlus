const paymentRepository = require('../Repositories/PaymentRepository');
const mongoose = require('mongoose');

const getAllPayments = async () => {
    try {
        return await paymentRepository.getAllPayments();
    } catch (error) {
        throw new Error('Failed to fetch payments');
    }
};

const getPaymentById = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid payment ID');
    }

    const payment = await paymentRepository.getPaymentById(id);
    if (!payment) {
        throw new Error('No such payment found');
    }

    return payment;
};

const createPayment = async (paymentData) => {
    try {
        return await paymentRepository.createPayment(paymentData);
    } catch (error) {
        throw new Error('Failed to create payment');
    }
};

const deletePaymentById = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid payment ID');
    }

    const payment = await paymentRepository.deletePaymentById(id);
    if (!payment) {
        throw new Error('No such payment found');
    }

    return payment;
};

const updatePaymentById = async (id, updateData) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid payment ID');
    }

    const payment = await paymentRepository.updatePaymentById(id, updateData);
    if (!payment) {
        throw new Error('No such payment found');
    }

    return payment;
};

const getPaymentsByEmail = async (email) => {
    if (!email) {
        throw new Error('Email is required');
    }

    const payments = await paymentRepository.getPaymentsByEmail(email);
    if (!payments || payments.length === 0) {
        throw new Error('No payments found for this email');
    }

    return payments;
};

module.exports = {
    getAllPayments,
    getPaymentById,
    createPayment,
    deletePaymentById,
    updatePaymentById,
    getPaymentsByEmail
};
