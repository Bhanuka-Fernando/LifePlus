const request = require('supertest');
const app = require('./app'); // Ensure this points to your app.js



describe('POST /test', () => {
    test('should respond with a 200 status code', async () => {
        const response = await request(app)
            .post('/test')
            .send({
                username: 'username',
                password: 'password',
            });
        expect(response.statusCode).toBe(200);  // Ensure the status code is 200
    });

    test('Sould specify json in the content type header',async()=>{
        const response = await request(app)
        .post('/test')
        .send({
            username:'username',
            password:"password",
        });
        expect(response.headers['content-type']).toEqual((expect.stringContaining('json')))
    })
});
