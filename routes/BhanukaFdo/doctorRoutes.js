const express = require('express');
const {
    getAllDoctors,
    getAdoctor,
    createDoctor,
    deleteDoctor,
    updateDoctor
} = require('../../controllers/BhanukaFdo/doctorController');

const router = express.Router();

// Doctor routes
router.get('/doctors', getAllDoctors);
router.get('/:id', getAdoctor);
router.post('/', createDoctor);
router.delete('/:id', deleteDoctor);
router.put('/:id', updateDoctor);


module.exports = router;
