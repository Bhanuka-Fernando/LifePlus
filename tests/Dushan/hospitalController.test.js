const request = require('supertest');
const app = require('../../app'); // Adjust this to your app's path
const Hospital = require('../../models/Dushan/HospitalD');

describe('Hospital API', () => {
  jest.setTimeout(10000); // Set timeout for all tests to 10 seconds

  afterAll(async () => {
    // Cleanup: Remove any test data if needed
    await Hospital.deleteMany({});
  });

  describe('POST /api/hospitals/register', () => {
    it('should register a new hospital', async () => {
      const hospitalData = {
        hospitalID: "H001",
        hospitalName: "Asiri Hospital",
        hospitalAddress: "123 Main St, Colombo",
        hospitalDescription: "A premier healthcare facility.",
        hospitalImage: "https://example.com/hospital_image.jpg" // Replace with your test image URL
      };

      const response = await request(app)
       .post('/api/hospitals/create') // Change to '/create'
       .send(hospitalData)
       .expect(201);


      expect(response.body.hospitalID).toBe(hospitalData.hospitalID);
      expect(response.body.hospitalName).toBe(hospitalData.hospitalName);
      expect(response.body.hospitalAddress).toBe(hospitalData.hospitalAddress);
    });
  });

  describe('GET /api/hospitals/:hospitalId', () => {
    it('should fetch a hospital by ID', async () => {
      const hospitalData = {
        hospitalID: "H002",
        hospitalName: "Apollo Hospital",
        hospitalAddress: "456 Second St, Colombo",
        hospitalDescription: "A leading hospital for advanced treatment.",
        hospitalImage: "https://example.com/apollo_image.jpg"
      };

      // Create a test hospital
      const hospital = new Hospital(hospitalData);
      await hospital.save();

      const response = await request(app)
        .get(`/api/hospitals/${hospital.hospitalID}`) // Adjust based on your actual route
        .expect(200); // Expect a 200 OK response

      expect(response.body.hospitalID).toBe(hospitalData.hospitalID);
      expect(response.body.hospitalName).toBe(hospitalData.hospitalName);
    });
  });
});
