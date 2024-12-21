const express = require('express');
const router = express.Router();
const Hospital = require('../../models/BhanukaFdo/Hospital'); // Import your Hospital model

// Get all hospitals
exports.getAllHospitals = async (req, res) => {
    try {
        // Fetch only selected fields
        const hospitals = await Hospital.find({}, 'hospitalName hospitalImage hospitalAddress.city contactNumber hospitalId ');
        res.json(hospitals);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};

