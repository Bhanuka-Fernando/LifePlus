const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../app'); // Import your Express app
const Payment = require('../../models/BhanukaFdo/payment'); // Import the Payment model

// Test suite for Payment API
describe('Payment API', () => {
    // Before all tests, connect to the test database
    beforeAll(async () => {
        const uri = 'mongodb+srv://admin:admin@retailrush.bkj5d.mongodb.net/CSSEBanuka'; // Use your test database URI here
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    // After all tests, disconnect from the database and close the connection
    afterAll(async () => {
        await mongoose.connection.close();
    });

    // Clear the payments collection before each test
    beforeEach(async () => {
        await Payment.deleteMany({});
    });

    // Test the Create (POST) operation
    it('should create a new payment', async () => {
        const newPayment = {
            paymentId: '123456',
            doctorId: 'doc123',
            cardHolderName: 'John Doe',
            expiryDate: '12/25',
            cvv: '123',
            cardNumber: '4111111111111111',
            hospitalName: 'Central Hospital',
            doctorName: 'Dr. Smith',
            paymentAmount: 100,
            userId: 'user123',
            serviceName: 'Consultation',
            paymentDate: new Date(),
            hospitalId: 'hospital123',
            paymentType: 'Credit Card',
            email: 'john.doe@example.com'
        };

        const response = await request(app)
            .post('/api/payment') // Your endpoint here
            .send(newPayment)
            .expect(201);

        expect(response.body).toHaveProperty('_id');
        expect(response.body.email).toBe('john.doe@example.com');
    });

    // Test the Read All (GET) operation
    it('should get all payments', async () => {
        // Add a payment to the database first
        const payment = new Payment({
            paymentId: '123456',
            doctorId: 'doc123',
            cardHolderName: 'Jane Doe',
            expiryDate: '11/26',
            cvv: '321',
            cardNumber: '4111111111111111',
            hospitalName: 'City Hospital',
            doctorName: 'Dr. Adams',
            paymentAmount: 150,
            userId: 'user456',
            serviceName: 'Check-up',
            paymentDate: new Date(),
            hospitalId: 'hospital456',
            paymentType: 'Credit Card',
            email: 'jane.doe@example.com'
        });
        await payment.save();

        const response = await request(app)
            .get('/api/payment/payments') // Your endpoint here
            .expect(200);

        expect(response.body.length).toBeGreaterThanOrEqual(1);
    });

    // Test the Read by ID (GET) operation
    it('should get a payment by ID', async () => {
        const payment = new Payment({
            paymentId: '654321',
            doctorId: 'doc654',
            cardHolderName: 'Emily Smith',
            expiryDate: '10/27',
            cvv: '456',
            cardNumber: '4111111111111111',
            hospitalName: 'National Hospital',
            doctorName: 'Dr. Johnson',
            paymentAmount: 200,
            userId: 'user789',
            serviceName: 'Surgery',
            paymentDate: new Date(),
            hospitalId: 'hospital789',
            paymentType: 'Debit Card',
            email: 'emily.smith@example.com'
        });
        await payment.save();

        const response = await request(app)
            .get(`/api/payment/${payment._id}`) // Your endpoint here
            .expect(200);

        expect(response.body.email).toBe('emily.smith@example.com');
    });

    // Test the Update (PUT) operation
    it('should update a payment', async () => {
        const payment = new Payment({
            paymentId: '789012',
            doctorId: 'doc789',
            cardHolderName: 'Michael Scott',
            expiryDate: '09/28',
            cvv: '789',
            cardNumber: '4111111111111111',
            hospitalName: 'General Hospital',
            doctorName: 'Dr. Blake',
            paymentAmount: 300,
            userId: 'user101',
            serviceName: 'Therapy',
            paymentDate: new Date(),
            hospitalId: 'hospital101',
            paymentType: 'Credit Card',
            email: 'michael.scott@example.com'
        });
        await payment.save();

        const updatedData = {
            paymentAmount: 400,
            serviceName: 'Advanced Therapy'
        };

        const response = await request(app)
            .put(`/api/payment/${payment._id}`) // Your endpoint here
            .send(updatedData)
            .expect(200);

        expect(Number(response.body.paymentAmount)).toBe(400); // Convert to number
        expect(response.body.serviceName).toBe('Advanced Therapy');
    });

    // Test the Delete (DELETE) operation
    it('should delete a payment', async () => {
        const payment = new Payment({
            paymentId: '345678',
            doctorId: 'doc345',
            cardHolderName: 'Dwight Schrute',
            expiryDate: '08/29',
            cvv: '101',
            cardNumber: '4111111111111111',
            hospitalName: 'Rural Hospital',
            doctorName: 'Dr. White',
            paymentAmount: 250,
            userId: 'user202',
            serviceName: 'Emergency Care',
            paymentDate: new Date(),
            hospitalId: 'hospital202',
            paymentType: 'Credit Card',
            email: 'dwight.schrute@example.com'
        });
        await payment.save();

        await request(app)
            .delete(`/api/payment/${payment._id}`) // Your endpoint here
            .expect(200);

        const deletedPayment = await Payment.findById(payment._id);
        expect(deletedPayment).toBeNull();
    });

    // Test fetching payments by email
    it('should get payments by email', async () => {
        const payment = new Payment({
            paymentId: '456789',
            doctorId: 'doc456',
            cardHolderName: 'Pam Beesly',
            expiryDate: '07/30',
            cvv: '404',
            cardNumber: '4111111111111111',
            hospitalName: 'Urban Hospital',
            doctorName: 'Dr. Miller',
            paymentAmount: 150,
            userId: 'user303',
            serviceName: 'Vaccination',
            paymentDate: new Date(),
            hospitalId: 'hospital303',
            paymentType: 'Debit Card',
            email: 'pam.beesly@example.com'
        });
        await payment.save();

        const response = await request(app)
            .get('/api/payment/my-payments/pam.beesly@example.com') // Your endpoint here
            .expect(200);

        expect(response.body.length).toBeGreaterThanOrEqual(1);
        expect(response.body[0].email).toBe('pam.beesly@example.com');
    });
});
