const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/authMiddleware');
const patientController = require('../../controllers/Banuka/patientController');
const reportController = require('../../controllers/Banuka/reportController');

router.get('/peak-times',reportController.getPeaktimes);
router.get('/peak-times2',reportController.generatePeakTimesReport)
module.exports = router;
