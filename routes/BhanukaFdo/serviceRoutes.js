const express = require('express');
const {
    getAllServices,
    getService,
    createService,
    deleteService,
    updateService
} = require('../../controllers/BhanukaFdo/serviceController');

const router = express.Router();

// Doctor routes
router.get('/services', getAllServices);
router.get('/:id', getService);
router.post('/', createService);
router.delete('/:id', deleteService);
router.put('/:id', updateService);


module.exports = router;
