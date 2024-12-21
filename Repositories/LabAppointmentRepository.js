const LabAppointment = require('../models/BhanukaFdo/labAppointment');

const create = async (data) => {
  return await LabAppointment.create(data);
};

const findByIdAndDelete = async (id) => {
  return await LabAppointment.findByIdAndDelete(id);
};

const findByIdAndUpdate = async (id, data) => {
  return await LabAppointment.findByIdAndUpdate(id, data, { new: true });
};

const findByEmail = async (email) => {
  return await LabAppointment.find({ email });
};

const findByDateHospitalDoctor = async (date, hospitalId, doctorId) => {
  return await LabAppointment.find({ date, hospitalId, doctorId });
};

const countDocuments = async (query) => {
  return await LabAppointment.countDocuments(query);
};

const findAll = async () => {
  return await LabAppointment.find({}).sort({ createdAt: -1 });
};

module.exports = {
  create,
  findByIdAndDelete,
  findByIdAndUpdate,
  findByEmail,
  findByDateHospitalDoctor,
  countDocuments,
  findAll
};
