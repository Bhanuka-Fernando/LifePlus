const express = require('express');
const {
    getAllPayments,
    getPayment,
    createPayment,
    deletePayment,
    updatePayment,
    getPaymentsByEmail

} = require('../../controllers/BhanukaFdo/paymentController');

const router = express.Router();

// Doctor routes
router.get('/payments', getAllPayments);
router.get('/:id', getPayment);
router.post('/', createPayment);
router.get('/my-payments/:email', getPaymentsByEmail);
router.delete('/:id', deletePayment);
router.put('/:id', updatePayment);


module.exports = router;
