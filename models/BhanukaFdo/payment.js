// models/Item.js
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    paymentId:String,
    doctorId:String,
    doctorName:String,
    userId:String,
    serviceName:String,
    email:String,
    paymentAmount:String,
    cardNumber:String,
    expiryDate:String,
    cvv:String,
    cardHolderName:String,
    paymentDate:Date,
    hospitalId:String,
    hospitalName:String,
    paymentType:String
});

module.exports = mongoose.model('Payment', paymentSchema);
