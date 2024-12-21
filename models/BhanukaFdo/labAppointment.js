const mongoose = require("mongoose");

const labAppointmentSchema = mongoose.Schema({
    userId: {
      type: String,
    },
    userName: {
      type: String,
    },
    email: {
      type: String,
    },
    contact: {
      type: String,
    },
    labId: {
      type: String,
    },
    date: {
        type: String,
    },
    time: {
        type: String,
    },
    labPaymentAmount: {
        type: String,
    },
    hospitalName: {
        type: String,
    },
    hospitalId: {
        type: String,
    },
    testType: {
        type: String,
    },
    note: {
        type: String,
    }
  },{timestamps:true});
  
  module.exports=mongoose.model('LabAppointment',labAppointmentSchema)