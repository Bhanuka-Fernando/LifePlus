const express = require('express');
const {
    getAppointmentsByEmail,
    getAppointmentsByDate,
    createAppointment,
    deleteAppointment,
    updateAppointment,
    getAppointmentCount
} = require('../../controllers/BhanukaFdo/appointmentController')

const router = express.Router();

// Appointment routes
router.post('/add',createAppointment);
router.delete('/delete/:id', deleteAppointment);
router.patch('/update/:id', updateAppointment);
router.get('/my-appointments/:email', getAppointmentsByEmail);
router.get('/appointment-date', getAppointmentsByDate);
router.get('/count',getAppointmentCount)

module.exports = router;
