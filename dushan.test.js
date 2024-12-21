const request = require("supertest");
const app = require("./app");
const mongoose = require('mongoose');
const Doctor = require('./models/Dushan/doctorModel'); // Adjust the path according to your project structure
const Hospital = require('./models/Dushan/HospitalD');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

beforeAll(async () => {
    await connectDB(process.env.MONGO_URL_TEST);
});

afterAll(async () => {
    await mongoose.connection.close();
});

// Test for registering a doctor
describe('POST /api/doctors/register', () => {
    
    afterEach(async () => {
        // Clear any test data after each test
        await Doctor.deleteMany({});
    });

    it('should register a new doctor successfully', async () => {
        const newDoctor = {
            doctorId: 'D8321', // Unique doctor ID
            fullName: 'Dr. John Smith',
            phoneNumber: '1234567890',
            address: '123 Main St',
            specialization: 'Cardiology',
            associatedHospitals: ['City Hospital'],
            hospitalId: 'H001',
            degree: 'MBBS',
            university: 'XYZ University',
            doctorImage: 'http://example.com/doctor-image.jpg',
            medicalLicense: 'http://example.com/license.pdf',
            wardNo: 'Ward 1',
            maxCount: 20,
            docPayment: 150,
            doctorAvailableTime: '9:00 AM - 5:00 PM',
            availableDays: ['Monday', 'Wednesday', 'Friday']
        };
    
        const response = await request(app)
            .post('/api/doctors/register')
            .send(newDoctor)
            .expect('Content-Type', /json/)
            .expect(201);
    
        expect(response.body).toEqual(
            expect.objectContaining({
                doctorId: newDoctor.doctorId,
                fullName: newDoctor.fullName,
                specialization: newDoctor.specialization,
                // Add more fields if needed to match the savedDoctor response
            })
        );
    
        const doctor = await Doctor.findOne({ doctorId: newDoctor.doctorId });
        expect(doctor).toBeTruthy();
    });

    
});

it('should return an error if required fields are missing', async () => {
    const response = await request(app)
        .post('/api/doctors/register')
        .send({ doctorId: 'D8322' }) // Only sending the doctorId
        .expect('Content-Type', /json/)
        .expect(400); // Expecting a 400 Bad Request

    expect(response.body).toEqual(
        expect.objectContaining({
            message: 'doctorId, fullName, and hospitalId are required'
        })
    );
});

// Test for deleting a doctor
describe('DELETE /api/doctors/:id', () => {
    let doctorId;

    // Create a doctor before running the tests
    beforeEach(async () => {
        const newDoctor = new Doctor({
            doctorId: 'D8321',
            fullName: 'Dr. John Smith',
            phoneNumber: '1234567890',
            address: '123 Main St',
            specialization: 'Cardiology',
            associatedHospitals: ['City Hospital'],
            hospitalId: 'H001',
            degree: 'MBBS',
            university: 'XYZ University',
            doctorImage: 'http://example.com/doctor-image.jpg',
            medicalLicense: 'http://example.com/license.pdf',
            wardNo: 'Ward 1',
            maxCount: 20,
            docPayment: 150,
            doctorAvailableTime: '9:00 AM - 5:00 PM',
            availableDays: ['Monday', 'Wednesday', 'Friday']
        });

        const savedDoctor = await newDoctor.save();
        doctorId = savedDoctor._id; // Save the ID for later tests
    });

    afterEach(async () => {
        // Clear any test data after each test
        await Doctor.deleteMany({});
    });

    it('should delete a doctor successfully', async () => {
        const response = await request(app)
            .delete(`/api/doctors/${doctorId}`) // Using the ID of the doctor created in beforeEach
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toEqual({
            message: 'Doctor deleted successfully'
        });

        // Verify that the doctor has been deleted
        const deletedDoctor = await Doctor.findById(doctorId);
        expect(deletedDoctor).toBeNull(); // Doctor should not exist in the database
    });

    it('should return a 404 error if the doctor does not exist', async () => {
        const nonExistentId = new mongoose.Types.ObjectId(); // Generate a new ID that doesn't exist

        const response = await request(app)
            .delete(`/api/doctors/${nonExistentId}`)
            .expect('Content-Type', /json/)
            .expect(404); // Expecting a 404 Not Found

        expect(response.body).toEqual({
            message: 'Doctor not found'
        });
    });
});











