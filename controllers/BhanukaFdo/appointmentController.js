const Appointment = require('../../models/BhanukaFdo/appointment');
const mongoose = require('mongoose');
//const moment = require('moment')


const createAppointment = async (req, res) => {
  const {
    userName,
    contact,
    note,
    date,
    time,
    hospitalName,
    doctorName,
    specialization,
    wardNo,
    paymentAmount,
    email,
    doctorId,
    hospitalId,
    status,
  } = req.body;

  try {
    // Log the received data for debugging
    console.log("Received data:", req.body);

    const appointment = await Appointment.create({
      userName,
      contact,
      note,
      date,
      time,
      hospitalName,
      doctorName,
      specialization,
      wardNo,
      paymentAmount,
      email,
      doctorId,
      hospitalId,
      status,
    });
    res.status(200).json(appointment);
  } catch (error) {
    // Log the error message for debugging
    console.error('Error creating appointment:', error);
    res.status(500).json({ message: error.message });
  }
};

  
  const deleteAppointment = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send("No appointment with that id");
    }
  
    try {
      const appointment = await Appointment.findByIdAndDelete(id);
  
      if (!appointment) {
        return res.status(404).send("No appointment with that id");
      }
  
      res.status(200).json({ message: "appointment deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Update a promotion
  const updateAppointment = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send("No promotion with that id");
    }
  
    try {
      const appointment = await Appointment.findByIdAndUpdate(
        id, // Corrected to use id directly
        {
          ...req.body, 
        },
        { new: true } // This option returns the updated document
      );
  
      if (!appointment) {
        return res.status(404).send("No appointment with that id");
      }
  
      res.status(200).json(appointment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  const getAppointmentsByEmail = async (req, res) => {
    const { email } = req.params; // Get email from query parameters
    if (!email) {
      return res.status(400).send("Email query parameter is required");
    }
  
    try {
      // Find promotion by email
      const appointments = await Appointment.find({ email: email });
  
      if (!appointments || appointments.length === 0) {
        return res.status(404).send("No appointments found for this email");
      }
  
      res.status(200).json(appointments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  const getAppointmentsByDate = async (req, res) => {
    const { date, hospitalId, doctorId } = req.query; // Get the date from query parameters
    console.log("check date in backend ", date, hospitalId, doctorId);
    if (!date || !hospitalId || !doctorId) {
      return res
        .status(400)
        .json({ message: "Date query parameter is required" });
    }
  
    try {
      // Find all appointments that match the specified date
      const appointments = await Appointment.find({ 
        date: date,
        hospitalId: hospitalId,
        doctorId: doctorId 
      });
  
      // if (!appointments || appointments.length === 0) {
      //   return res.status(404).json({ message: "No appointments found for the specified date" });
      // }
  
      res.status(200).json(appointments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }; 
  
// count of appointments
const getAppointmentCount = async (req,res) => {
  const { doctorId, hospitalId, date } = req.query;

  try {
    // Find appointments for the specific doctor, hospital, and date
    const appointmentCount = await Appointment.countDocuments({
      doctorId,
      hospitalId,
      date,
    });

    res.status(200).json({ appointmentCount });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve appointment count', error });
  }
}

  
module.exports = {
    getAppointmentsByEmail,
    getAppointmentsByDate,
    createAppointment,
    deleteAppointment,
    updateAppointment,
    getAppointmentCount
};
