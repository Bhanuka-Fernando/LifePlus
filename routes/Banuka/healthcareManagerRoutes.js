const express = require('express');
const authMiddleware = require('../../middlewares/authMiddleware');

const { registerHealthcareManager, loginHealthcareManager } = require('../../controllers/Banuka/healthcareManagerController');
const router = express.Router();

// POST /api/register-healthcare-manager
router.post('/register-healthcare-manager',registerHealthcareManager);

// POST /api/login
router.post('/login', loginHealthcareManager);

module.exports = router;
