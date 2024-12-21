const appointmentRepository = require('../Repositories/AppointmentRepository');
const mongoose = require('mongoose');

// Service to create an appointment
const createAppointment = async (appointmentData) => {
    return await appointmentRepository.createAppointment(appointmentData);
};

// Service to delete an appointment
const deleteAppointment = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('No appointment with that id');
    }

    const appointment = await appointmentRepository.deleteAppointment(id);

    if (!appointment) {
        throw new Error('No appointment with that id');
    }

    return { message: 'Appointment deleted successfully' };
};

// Service to update an appointment
const updateAppointment = async (id, updateData) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('No appointment with that id');
    }

    const appointment = await appointmentRepository.updateAppointment(id, updateData);

    if (!appointment) {
        throw new Error('Updated Service');
    }

    return appointment;
};

// Service to get appointments by email
const getAppointmentsByEmail = async (email) => {
    if (!email) {
        throw new Error('Email query parameter is required');
    }

    const appointments = await appointmentRepository.findAppointmentsByEmail(email);

    if (!appointments || appointments.length === 0) {
        throw new Error('No appointments found for this email');
    }

    return appointments;
};

// Service to get appointments by date, hospitalId, and doctorId
const getAppointmentsByDate = async (date, hospitalId, doctorId) => {
    if (!date || !hospitalId || !doctorId) {
        throw new Error('Date, hospitalId, and doctorId query parameters are required');
    }

    const appointments = await appointmentRepository.findAppointmentsByDate(date, hospitalId, doctorId);
    return appointments;
};

// Service to count appointments
const getAppointmentCount = async (doctorId, hospitalId, date) => {
    return await appointmentRepository.countAppointments(doctorId, hospitalId, date);
};

module.exports = {
    createAppointment,
    deleteAppointment,
    updateAppointment,
    getAppointmentsByEmail,
    getAppointmentsByDate,
    getAppointmentCount
};
