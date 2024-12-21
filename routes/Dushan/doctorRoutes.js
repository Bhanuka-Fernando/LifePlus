const express = require('express');
const {
  registerDoctor,
  getDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
  getDoctorsByHospitalId,
} = require('../../controllers/Dushan/doctorController');

const router = express.Router();

// POST route for doctor registration
router.post('/register', registerDoctor);

// GET route for retrieving all doctors
router.get('/', getDoctors);

// GET route for retrieving a doctor by ID
router.get('/:id', getDoctorById);

// PUT route for updating a doctor's information
router.put('/:id', updateDoctor);

// DELETE route for deleting a doctor
router.delete('/:id', deleteDoctor);


// GET route to fetch doctors by hospital ID
router.get('/hospital/:hospitalId', getDoctorsByHospitalId);

//router.get('/hospital/:hospitalId/specializations', getDoctorCountsBySpecialization);




module.exports = router;
