const Appointment = require('../models/BhanukaFdo/appointment');

// Function to create an appointment
const createAppointment = async (appointmentData) => {
    return await Appointment.create(appointmentData);
};

// Function to delete an appointment by ID
const deleteAppointment = async (id) => {
    return await Appointment.findByIdAndDelete(id);
};

// Function to update an appointment by ID
const updateAppointment = async (id, updateData) => {
    return await Appointment.findByIdAndUpdate(id, updateData, { new: true });
};

// Function to get appointments by email
const findAppointmentsByEmail = async (email) => {
    return await Appointment.find({ email });
};

// Function to get appointments by date, hospital ID, and doctor ID
const findAppointmentsByDate = async (date, hospitalId, doctorId) => {
    return await Appointment.find({ date, hospitalId, doctorId });
};

// Function to count appointments by doctor ID, hospital ID, and date
const countAppointments = async (doctorId, hospitalId, date) => {
    return await Appointment.countDocuments({ doctorId, hospitalId, date });
};

module.exports = {
    createAppointment,
    deleteAppointment,
    updateAppointment,
    findAppointmentsByEmail,
    findAppointmentsByDate,
    countAppointments
};
