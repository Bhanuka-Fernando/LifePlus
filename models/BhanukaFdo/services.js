// models/Item.js
const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    hospitalId:String,
    labId:String,
    serviceName:String,
    serviceImage:String,
    serviceDate:Date,
    wardNo:String,
    servicePayment:Number
});

module.exports = mongoose.model('Service', serviceSchema);
