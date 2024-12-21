// Import required modules
const request = require('supertest');
const app = require('../server'); // Path to your Express app
const User = require('../models/Banuka/User'); // Path to your User model

// Mock Mongoose User model
jest.mock('../models/Banuka/User');

describe('GET /api/patient/:id', () => {
  it('should return a 404 error if the user is not found', async () => {
    // Mock the User model's findById method to return null (user not found)
    User.findById.mockResolvedValue(null);

    const response = await request(app).get('/api/patient/123456');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'User not found' });
  });

  it('should return user data if the user is found', async () => {
    const mockUser = { _id: '123456', name: 'John Doe', email: 'john@example.com' };

    // Mock the User model's findById method to return a user object
    User.findById.mockResolvedValue(mockUser);

    const response = await request(app).get('/api/patient/123456');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: 'User found',
      data: mockUser
    });
  });

  it('should return a 500 error if an exception occurs', async () => {
    // Mock the User model's findById method to throw an error
    User.findById.mockRejectedValue(new Error('Database error'));

    const response = await request(app).get('/api/patient/123456');

    expect(response.status).toBe(500);
  });
});
