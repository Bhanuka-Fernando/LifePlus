const request = require('supertest');
const app = require('../../app'); // Adjust this to your app's path
const Doctor = require('../../models/Dushan/doctorModel');

describe('Doctor API', () => {
  jest.setTimeout(10000); // Set timeout for all tests to 10 seconds

  let doctorId;

  afterAll(async () => {
    // Cleanup: Remove any test data if needed
    await Doctor.deleteMany({});
  });

  describe('POST /api/doctors/register', () => {
    it('should register a new doctor', async () => {
      const doctorData = {
        doctorId: "D361",
        fullName: "Dushan Warnakulasuriya",
        phoneNumber: "0701675834",
        address: "82,Colombo 4",
        specialization: "Cardiologist",
        associatedHospitals: ["Lanka Hospital", "Apollo Hospital", ""],
        hospitalId: "H001",
        degree: "Bsc",
        university: "University Of Colombo",
        doctorImage: "https://firebasestorage.googleapis.com/v0/b/retailrushdb.appspot.com/o...",
        medicalLicense: "https://firebasestorage.googleapis.com/v0/b/retailrushdb.appspot.com/o...",
        wardNo: "03",
        maxCount: 30,
        docPayment: 3000,
        doctorAvailableTime: "9.00 a.m",
        availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
      };

      const response = await request(app)
        .post('/api/doctors/register') // Adjust this route if necessary
        .send(doctorData) // Send the doctor data
        .expect(201); // Expect a 201 Created response

      expect(response.body).toHaveProperty('_id'); // Check that an ID was returned
      expect(response.body.doctorId).toBe(doctorData.doctorId); // Verify the doctorId
      expect(response.body.fullName).toBe(doctorData.fullName); // Verify the fullName

      // Store the ID for further tests if needed
      doctorId = response.body._id;
    });
  });
});
