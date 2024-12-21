const request = require("supertest");
const app = require("./app");
const mongoose = require('mongoose');
const HealthcareManager = require('./models/Banuka/HealthCareManager'); // Replace with the correct model path
const User = require('./models/Banuka/User')
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();



// describe("Health care manager API testing...", ()=>{
//     return request(app)
//     .post('/api/HealthCareManager/register-healthcare-manager')
//     .send({
//         fullName:"Banuka Healthcare",
//         email:"BH@gmail.com",
//         password:"B123",
//         hospital:"Kalutara"
//     })
//     .expect(201)
//     .then((response) => {
//         testcid = response.body._id
//         expect(response.body).toEqual(
//             expect.objectContaining({
//                 _id: expect.any(String),
//                 name: 'Cname',
//                 code: 'C1',
//                 description: 'Cdescription',
//                 credit: 2,
//                 faculty: 'IT',
//                 semester: '1',
//                 acYear: '1',
//                 __v: expect.any(Number),
//                 lecturer: expect.any(Array),
//             })
//         );
//     });
// })

beforeAll(async () => {
    // Connect to the database before running tests
    // await mongoose.connect(process.env.MONGO_URL_TEST, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // });
    await connectDB(process.env.MONGO_URL_TEST);
    console.log("------------------",process.env.MONGO_URL_TEST)
  });

  afterAll(async () => {
    // Clean up after tests
    await mongoose.connection.close();
  });

//Test ||/api/HealthCareManager/register-healthcare-manager
describe('POST /api/HealthCareManager/register-healthcare-manager', () => {

   

        afterEach(async () => {
          // Clear any test data after each test
          await HealthcareManager.deleteMany({});
        });
      
        it('should register a new healthcare manager successfully', async () => {
          const newManager = {
            fullName: 'John Doe',
            email: 'john@example.com',
            password: '123456',
            hospital: 'City Hospital',
          };
      
          const response = await request(app)
            .post('/api/HealthCareManager/register-healthcare-manager')
            .send(newManager)
            .expect('Content-Type', /json/)
            .expect(201);
      
          expect(response.body).toEqual(
            expect.objectContaining({
              msg: 'Healthcare manager registered successfully',
            })
          );
      
          // Verify the manager is saved in the database
          const manager = await HealthcareManager.findOne({ email: newManager.email });
          expect(manager).toBeTruthy();
          expect(manager.fullName).toBe(newManager.fullName);
          expect(manager.hospital).toBe(newManager.hospital);
        });
      
        it('should return 400 if manager with the same email already exists', async () => {
          // Create an existing manager
          await HealthcareManager.create({
            fullName: 'John Doe',
            email: 'john@example.com',
            password: 'hashedpassword',
            hospital: 'City Hospital',
          });
      
          const newManager = {
            fullName: 'Jane Smith',
            email: 'john@example.com', // Same email
            password: '654321',
            hospital: 'Metro Hospital',
          };
      
          const response = await request(app)
            .post('/api/HealthCareManager/register-healthcare-manager')
            .send(newManager)
            .expect('Content-Type', /json/)
            .expect(400);
      
          expect(response.body).toEqual(
            expect.objectContaining({
              msg: 'Manager already exists',
            })
          );
        });
      
        it('should return 500 if there is a server error', async () => {
          // Simulate a server error by mocking the save method to throw an error
          jest.spyOn(HealthcareManager.prototype, 'save').mockImplementationOnce(() => {
            throw new Error('Server error');
          });
      
          const newManager = {
            fullName: 'Jane Smith',
            email: 'jane@example.com',
            password: '654321',
            hospital: 'Metro Hospital',
          };
      
          const response = await request(app)
            .post('/api/HealthCareManager/register-healthcare-manager')
            .send(newManager)
            .expect(500);
      
            expect(response.body).toEqual({ error: 'Server error' }); 

        });
      });

describe('POST /api/HealthCareManager/login', () => {
        
      
        afterEach(async () => {
          // Clear any test data after each test
          await HealthcareManager.deleteMany({});
        });
      
        it('should log in a healthcare manager with valid credentials', async () => {
          // Create a manager for the test
          const manager = await HealthcareManager.create({
            fullName: 'John Doe',
            email: 'john@example.com',
            password: '123456', // For test simplicity, no hashed password
            hospital: 'City Hospital',
          });
      
          const credentials = {
            email: 'john@example.com',
            password: '123456', // Correct password
          };
      
          const response = await request(app)
            .post('/api/HealthCareManager/login')
            .send(credentials)
            .expect('Content-Type', /json/)
            .expect(200);
      
          expect(response.body).toEqual(
            expect.objectContaining({
              message: 'Login successful',
              data: expect.any(String), // JWT token
              success: true,
            })
          );
      
          // Verify the token
          const decodedToken = jwt.verify(response.body.data, process.env.JWT_SECRET);
          expect(decodedToken.id).toBe(manager._id.toString());
        });
      
        it('should return 400 for invalid email', async () => {
          const credentials = {
            email: 'nonexistent@example.com',
            password: '123456', // Valid password
          };
      
          const response = await request(app)
            .post('/api/HealthCareManager/login')
            .send(credentials)
            .expect('Content-Type', /json/)
            .expect(400);
      
          expect(response.body).toEqual(
            expect.objectContaining({
              msg: 'Invalid credentials',
            })
          );
        });
      
        it('should return 400 for invalid password', async () => {
          // Create a manager for the test
          await HealthcareManager.create({
            fullName: 'John Doe',
            email: 'john@example.com',
            password: '123456', // Stored password
            hospital: 'City Hospital',
          });
      
          const credentials = {
            email: 'john@example.com',
            password: 'wrongpassword', // Incorrect password
          };
      
          const response = await request(app)
            .post('/api/HealthCareManager/login')
            .send(credentials)
            .expect('Content-Type', /json/)
            .expect(400);
      
          expect(response.body).toEqual(
            expect.objectContaining({
              msg: 'Invalid credentials',
            })
          );
        });
      
        it('should return 500 if there is a server error', async () => {
          // Simulate a server error by mocking the `findOne` method to throw an error
          jest.spyOn(HealthcareManager, 'findOne').mockImplementationOnce(() => {
            throw new Error('Server error');
          });
      
          const credentials = {
            email: 'john@example.com',
            password: '123456',
          };
      
          const response = await request(app)
            .post('/api/HealthCareManager/login')
            .send(credentials)
            .expect(500);
      
            expect(response.body).toEqual({ error: 'Server error' }); 
        });
      });

describe('GET /api/user/getPatients', () => {

        // Sample test data
        const samplePatients = [
            {
            fullName: "John Doe",
            dob: "1990-01-01",
            gender: "Male",
            bloodGroup: "A+",
            phone: "1234567890",
            email: "john@example.com",
            address: "123 Main St",
            medicalHistory: [],
            nic: "NIC12345",
            profilePhoto: "",
            password: "Password123"
            },
            {
            fullName: "Jane Smith",
            dob: "1985-05-15",
            gender: "Female",
            bloodGroup: "B+",
            phone: "0987654321",
            email: "jane@example.com",
            address: "456 Elm St",
            medicalHistory: [],
            nic: "NIC54321",
            profilePhoto: "",
            password: "Password123"
            }
        ];
        
        beforeAll(async () => {
            // Create sample patients before running tests
            await User.insertMany(samplePatients);
        });
        
        afterAll(async () => {
            // Clean up the database after tests
            await User.deleteMany({});
        });
  
        it('should return all patients when no query parameter is provided', async () => {
          const response = await request(app)
            .get('/api/user/getPatients')
            .expect('Content-Type', /json/)
            .expect(200);
      
          expect(response.body.data).toHaveLength(2); // Expecting 2 sample patients
        });
      
        it('should return patients matching the name query', async () => {
          const response = await request(app)
            .get('/api/user/getPatients?name=John')
            .expect('Content-Type', /json/)
            .expect(200);
      
          expect(response.body.data).toHaveLength(1);
          expect(response.body.data[0].fullName).toBe("John Doe");
        });
      
        it('should return an empty array when no patients match the query', async () => {
          const response = await request(app)
            .get('/api/user/getPatients?name=NonExistingName')
            .expect('Content-Type', /json/)
            .expect(200);
      
          expect(response.body.data).toHaveLength(0);
        });
      
        it('should handle errors gracefully', async () => {
            // Simulate an error by mocking the User.find method
            jest.spyOn(User, 'find').mockImplementationOnce(() => {
              throw new Error('Database error');
            });
          
            const response = await request(app)
              .get('/api/user/getPatients')
              .expect(500); // Expecting a 500 status for server error
              console.log("Llllll",response.body); // Add this to inspect the actual response
            expect(response.body).toEqual({ error: 'Database error' }); // Adjust based on your centralized error handling
          });
      });

describe('POST /api/user/registerUser', () => {
        let managerId;
        let authToken;
      
        beforeAll(async () => {
          // Create a test healthcare manager
          const manager = new HealthcareManager({
            fullName: 'Test Manager',
            email: 'manager@test.com',
            password: 'password123',
            hospital: 'Test Hospital',
          });
          await manager.save();
          managerId = manager._id;

          // Simulate login to get an auth token
        const response = await request(app)
        .post('/api/HealthCareManager/login') // Assuming you have a login endpoint
        .send({ email: 'manager@test.com', password: 'password123' });
        console.log("res body aith",response.body);

        authToken = response.body.data; // Capture the token for authentication
        });
      
        afterAll(async () => {
          // Clean up test data
          await User.deleteMany({});
          await HealthcareManager.deleteMany({});
        });
      
        it('should register a new user successfully', async () => {
          const newUser = {
            fullName: 'John Doe',
            dob: '1990-01-01',
            gender: 'Male',
            bloodGroup: 'A+',
            phone: '1234567890',
            email: 'john.doe@example.com',
            address: '123 Main St',
            medicalHistory: [],
            nic: '123456789',
            profilePhoto: 'path/to/photo.jpg',
            password: 'password123',
            userId: managerId,
          };
      
          const response = await request(app)
            .post('/api/user/registerUser')
            .set('authorization', `Bearer ${authToken}`) // Set the auth token in the header
            .send(newUser)
            .expect('Content-Type', /json/)
            .expect(201);
      
          expect(response.body).toEqual(
            expect.objectContaining({
              message: 'User registered',
              user: expect.objectContaining({
                fullName: 'John Doe',
                email: 'john.doe@example.com',
                nic: '123456789',
                
              }),
            })
          );
        });
      
        it('should return an error if user already exists', async () => {
          const existingUser = {
            fullName: 'Jane Doe',
            dob: '1995-05-05',
            gender: 'Female',
            bloodGroup: 'O+',
            phone: '0987654321',
            email: 'john.doe@example.com', // Using the same email as the first test
            address: '456 Another St',
            medicalHistory: [],
            nic: '123456789',
            profilePhoto: 'path/to/photo2.jpg',
            password: 'password456',
            userId: managerId,
          };
      
          const response = await request(app)
            .post('/api/user/registerUser')
            .set('Authorization', `Bearer ${authToken}`) // Set the auth token in the header
            .send(existingUser)
            .expect('Content-Type', /json/)
            .expect(400);
      
          expect(response.body).toEqual({
            error: 'User already exists',
          });
        });
      
        it('should return an error if email is not provided', async () => {
          const newUser = {
            fullName: 'Alice Smith',
            dob: '1988-08-08',
            gender: 'Female',
            bloodGroup: 'B+',
            phone: '1234567890',
            //email: 'alice.smith@example.com',
            address: '789 New St',
            medicalHistory: [],
            nic: '123456789',
            profilePhoto: 'path/to/photo3.jpg',
            password: 'password789',
            // userId is missing
          };
      
          const response = await request(app)
            .post('/api/user/registerUser')
            .set('Authorization', `Bearer ${authToken}`) // Set the auth token in the header
            .send(newUser)
            .expect('Content-Type', /json/)
            .expect(400); // Adjust according to your validation logic
      
          expect(response.body).toHaveProperty('error');
        });
      });