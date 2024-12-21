const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
  hospitalID: { type: String, required: true, unique: true },
  hospitalName: { type: String, required: true },
  hospitalAddress: { type: String, required: true },
  hospitalDescription: { type: String },
  hospitalImage: { type: String } // Firebase image URL
});

const Hospital = mongoose.model('HospitalD', hospitalSchema);

module.exports = Hospital;
