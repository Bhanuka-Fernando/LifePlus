const express = require('express');
const { registerHospital, getHospitalById } = require('../../controllers/Dushan/HospitalController'); // Ensure the path to the controller is correct

const router = express.Router();

// Route for registering a new hospital (POST)
router.post('/create', registerHospital);


// Ensure the route is defined with correct parameter name
router.get('/:hospitalId', getHospitalById);

module.exports = router;
