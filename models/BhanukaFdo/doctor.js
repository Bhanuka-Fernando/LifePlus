// models/Item.js
const mongoose = require('mongoose');

const doctorSchemaTwo = new mongoose.Schema({
    hospitalId:String,
    doctorId:String,
    docName:String,
    docImage:String,
    specialization:String,
    docDate:Date,
    wardNo:String,
    maxCount:Number,
    docPayment:Number,
    doctorAvailableTime:String,
    availableDays: [String]
});

module.exports = mongoose.model('Doctortwo', doctorSchemaTwo); 
