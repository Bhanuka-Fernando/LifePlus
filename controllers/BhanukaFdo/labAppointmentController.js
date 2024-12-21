const LabAppointment = require('../../models/BhanukaFdo/labAppointment');
const mongoose = require('mongoose');
//const moment = require('moment')


const createLabAppointment = async (req, res) => {
  const {
    userId,
    userName,
    email,
    contact,
    labId,
    date,
    time,
    labPaymentAmount,
    hospitalName,
    hospitalId,
    testType,
    note
  } = req.body;

  try {
    // Log the received data for debugging
    console.log("Received data:", req.body);

    const lAppointment = await LabAppointment.create({
        userId,
        userName,
        email,
        contact,
        labId,
        date,
        time,
        labPaymentAmount,
        hospitalName,
        hospitalId,
        testType,
        note
    });
    res.status(200).json(lAppointment);
  } catch (error) {
    // Log the error message for debugging
    console.error('Error creating lab appointment:', error);
    res.status(500).json({ message: error.message });
  }
};

  
  const deleteLabAppointment = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send("No lab appointment with that id");
    }
  
    try {
      const lAppointment = await LabAppointment.findByIdAndDelete(id);
  
      if (!lAppointment) {
        return res.status(404).send("No lab appointment with that id");
      }
  
      res.status(200).json({ message: "lab appointment deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Update a promotion
  const updateLabAppointment = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send("No lab appontment with that id");
    }
  
    try {
      const lAppointment = await LabAppointment.findByIdAndUpdate(
        id, // Corrected to use id directly
        {
          ...req.body, 
        },
        { new: true } // This option returns the updated document
      );
  
      if (!lAppointment) {
        return res.status(404).send("No lab appointment with that id");
      }
  
      res.status(200).json(lAppointment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  const getLabAppointmentsByEmail = async (req, res) => {
    const { email } = req.params; // Get email from query parameters
    if (!email) {
      return res.status(400).send("Email query parameter is required");
    }
  
    try {
      // Find promotion by email
      const lAppointment = await LabAppointment.find({ email: email });
  
      if (!lAppointment || lAppointment.length === 0) {
        return res.status(404).send("No lab appointments found for this email");
      }
  
      res.status(200).json(lAppointment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  const getLabAppointmentsByDate = async (req, res) => {
    const { date, hospitalId, doctorId } = req.query; // Get the date from query parameters
    console.log("check date in backend ", date, hospitalId, doctorId);
    if (!date || !hospitalId || !doctorId) {
      return res
        .status(400)
        .json({ message: "Date query parameter is required" });
    }
  
    try {
      // Find all appointments that match the specified date
      const lAppointment = await LabAppointment.find({ 
        date: date,
        hospitalId: hospitalId,
        doctorId: doctorId 
      });
  
      // if (!appointments || appointments.length === 0) {
      //   return res.status(404).json({ message: "No appointments found for the specified date" });
      // }
  
      res.status(200).json(lAppointment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }; 
  
// count of appointments
const getLabAppointmentCount = async (req,res) => {
  const { doctorId, hospitalId, date } = req.query;

  try {
    // Find appointments for the specific doctor, hospital, and date
    const lAppointmentCount = await LabAppointment.countDocuments({
      doctorId,
      hospitalId,
      date,
    });

    res.status(200).json({ lAppointmentCount });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve appointment count', error });
  }
}


const getAllLabAppointments = async (req, res) => {
    try {
        const lAppointment = await LabAppointment.find({}).sort({ createdAt: -1 });
        res.status(200).json(lAppointment);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch lab appointments' });
    }
};

  
module.exports = {
    getLabAppointmentsByEmail,
    getLabAppointmentsByDate,
    createLabAppointment,
    deleteLabAppointment,
    updateLabAppointment,
    getLabAppointmentCount,
    getAllLabAppointments
};
