const express = require('express');
const {
    getLabAppointmentsByEmail,
    getLabAppointmentsByDate,
    createLabAppointment,
    deleteLabAppointment,
    updateLabAppointment,
    getAllLabAppointments
} = require('../../controllers/BhanukaFdo/labAppointmentController');

const router = express.Router();

// Doctor routes
router.get('/labAppointments', getAllLabAppointments);
router.get('/my-appointments/:email', getLabAppointmentsByEmail);
router.get('/appointment-date', getLabAppointmentsByDate);
router.post('/', createLabAppointment);
router.delete('/:id', deleteLabAppointment);
router.put('/:id', updateLabAppointment);


module.exports = router;
