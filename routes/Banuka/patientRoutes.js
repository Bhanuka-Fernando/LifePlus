const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/authMiddleware');
const patientController = require('../../controllers/Banuka/patientController');

// Define routes and map them to controllers
router.post('/registerUser', authMiddleware, patientController.registerUser);
router.post('/scan/:id', patientController.scanUser);
router.get('/getPatientData/:id', patientController.getPatientData);
router.get('/getPatients', patientController.getPatients);
router.put('/updatePatient/:id', authMiddleware, patientController.updatePatient);
router.post('/generateNewCard', authMiddleware, patientController.generateNewCard);
router.get('/patientIdScans/:id', patientController.getPatientWithScans);
router.post('/PatientLogin',patientController.patientLogin);
router.delete('/deletePatient/:id',authMiddleware,patientController.deletePatient);

module.exports = router;
