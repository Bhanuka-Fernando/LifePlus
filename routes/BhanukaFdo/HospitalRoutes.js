const express = require('express');
const router = express.Router();
const hospitalControler = require('../../controllers/BhanukaFdo/HospitalController');

router.get('/allHospitals',hospitalControler.getAllHospitals);

module.exports = router;