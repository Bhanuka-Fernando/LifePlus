const labAppointmentRepository = require('../Repositories/LabAppointmentRepository');
const mongoose = require('mongoose');

const createLabAppointment = async (data) => {
  try {
    console.log("Received data:", data);
    return await labAppointmentRepository.create(data);
  } catch (error) {
    console.error('Error creating lab appointment:', error);
    throw error;
  }
};

const deleteLabAppointment = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("No lab appointment with that id");
  }

  try {
    const lAppointment = await labAppointmentRepository.findByIdAndDelete(id);
    if (!lAppointment) {
      throw new Error("No lab appointment with that id");
    }
    return { message: "Lab appointment deleted successfully" };
  } catch (error) {
    throw error;
  }
};

const updateLabAppointment = async (id, data) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("No lab appointment with that id");
  }

  try {
    const lAppointment = await labAppointmentRepository.findByIdAndUpdate(id, data);
    if (!lAppointment) {
      throw new Error("No lab appointment with that id");
    }
    return lAppointment;
  } catch (error) {
    throw error;
  }
};

const getLabAppointmentsByEmail = async (email) => {
  if (!email) {
    throw new Error("Email query parameter is required");
  }

  try {
    const lAppointment = await labAppointmentRepository.findByEmail(email);
    if (!lAppointment || lAppointment.length === 0) {
      throw new Error("No lab appointments found for this email");
    }
    return lAppointment;
  } catch (error) {
    throw error;
  }
};

const getLabAppointmentsByDate = async (date, hospitalId, doctorId) => {
  if (!date || !hospitalId || !doctorId) {
    throw new Error("Date, hospitalId, and doctorId query parameters are required");
  }

  try {
    return await labAppointmentRepository.findByDateHospitalDoctor(date, hospitalId, doctorId);
  } catch (error) {
    throw error;
  }
};

const getLabAppointmentCount = async (doctorId, hospitalId, date) => {
  try {
    const query = { doctorId, hospitalId, date };
    return await labAppointmentRepository.countDocuments(query);
  } catch (error) {
    throw error;
  }
};

const getAllLabAppointments = async () => {
  try {
    return await labAppointmentRepository.findAll();
  } catch (error) {
    throw new Error('Failed to fetch lab appointments');
  }
};

module.exports = {
  createLabAppointment,
  deleteLabAppointment,
  updateLabAppointment,
  getLabAppointmentsByEmail,
  getLabAppointmentsByDate,
  getLabAppointmentCount,
  getAllLabAppointments
};
