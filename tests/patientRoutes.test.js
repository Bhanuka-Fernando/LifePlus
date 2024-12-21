const request = require('supertest');
const app = require('../app'); // Adjust the path to your app
const mongoose = require('mongoose');
const Patient = require('../models/patientModel'); // Adjust the path to your Patient model

// Mock your middleware
jest.mock('../middleware/authMiddleware', () => {
    return (req, res, next) => {
        req.user = { id: 'mockUserId' }; // Mock user information
        next();
    };
});

describe('POST /registerUser', () => {
    // Connect to the database before each test
    beforeEach(async () => {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    // Clear the database after each test
    afterEach(async () => {
        await Patient.deleteMany({});
        await mongoose.connection.close();
    });

    test('should register a user successfully', async () => {
        const newUser = {
            fullName: 'John Doe',
            dob: '1990-01-01',
            gender: 'Male',
            bloodGroup: 'O+',
            phone: '1234567890',
            email: 'john@example.com',
            address: '123 Main St',
            medicalHistory: [],
            nic: '1234567890',
            profilePhoto: '', // Assuming profilePhoto is optional
            password: 'password123',
        };

        const response = await request(app)
            .post('/api/user/registerUser')
            .send(newUser)
            .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`) // Use a test token or mock authentication
            .expect(201); // Expect HTTP status 201 Created

        expect(response.body.message).toBe('User registered successfully');
        expect(response.body.data).toHaveProperty('id');
        expect(response.body.data.fullName).toBe(newUser.fullName);
    });

    test('should return 400 if required fields are missing', async () => {
        const incompleteUser = {
            fullName: '',
            dob: '',
            // Missing other fields...
        };

        const response = await request(app)
            .post('/api/user/registerUser')
            .send(incompleteUser)
            .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
            .expect(400); // Expect HTTP status 400 Bad Request

        expect(response.body.message).toBe('All fields are required');
    });

    test('should return 401 if authentication fails', async () => {
        const newUser = {
            fullName: 'John Doe',
            dob: '1990-01-01',
            gender: 'Male',
            bloodGroup: 'O+',
            phone: '1234567890',
            email: 'john@example.com',
            address: '123 Main St',
            medicalHistory: [],
            nic: '1234567890',
            profilePhoto: '',
            password: 'password123',
        };

        const response = await request(app)
            .post('/api/user/registerUser')
            .send(newUser)
            .set('Authorization', `Bearer invalidtoken`) // Invalid token
            .expect(401); // Expect HTTP status 401 Unauthorized

        expect(response.body.message).toBe('Authentication failed');
    });
});
