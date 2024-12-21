const mongoose = require('mongoose');
const User = require('../../models/Banuka/User'); // Update the path to the User model

// MongoDB connection URL
const MONGODB_URI = 'mongodb+srv://demondevil200166:k1Ul00CCLCAdZr6o@cluster0.oialj.mongodb.net/CsseReportTest'; // Update with your database name

// Sample users data to seed
const usersData = [
    {
        fullName: 'John Doe',
        password: 'password123', // In a real application, hash passwords before storing
        dob: new Date('1990-01-01'),
        gender: 'Male',
        bloodGroup: 'A+',
        phone: '1234567890',
        email: 'johndoe@example.com',
        address: '123 Main St, Cityville, USA',
        medicalHistory: ['Hypertension', 'Asthma'],
        profilePhoto: 'path/to/profilePhoto1.jpg',
        nic: '123456789V',
        barcode: 'barcode-data-123'
    },
    {
        fullName: 'Jane Smith',
        password: 'password456',
        dob: new Date('1985-05-15'),
        gender: 'Female',
        bloodGroup: 'O-',
        phone: '0987654321',
        email: 'janesmith@example.com',
        address: '456 Elm St, Townsville, USA',
        medicalHistory: ['Diabetes'],
        profilePhoto: 'path/to/profilePhoto2.jpg',
        nic: '987654321V',
        barcode: 'barcode-data-456'
    },
    {
        fullName: 'Alice Johnson',
        password: 'password789',
        dob: new Date('1978-09-22'),
        gender: 'Female',
        bloodGroup: 'B+',
        phone: '5678901234',
        email: 'alice.johnson@example.com',
        address: '789 Oak St, Villagetown, USA',
        medicalHistory: ['Migraine'],
        profilePhoto: 'path/to/profilePhoto3.jpg',
        nic: '345678901V',
        barcode: 'barcode-data-789'
    },
    {
        fullName: 'Robert Brown',
        password: 'password101',
        dob: new Date('1992-03-12'),
        gender: 'Male',
        bloodGroup: 'AB-',
        phone: '2345678901',
        email: 'robert.brown@example.com',
        address: '101 Pine St, Metropolis, USA',
        medicalHistory: ['None'],
        profilePhoto: 'path/to/profilePhoto4.jpg',
        nic: '654321098V',
        barcode: 'barcode-data-101'
    },
    {
        fullName: 'Emily Davis',
        password: 'password202',
        dob: new Date('2000-07-07'),
        gender: 'Female',
        bloodGroup: 'O+',
        phone: '3456789012',
        email: 'emily.davis@example.com',
        address: '202 Cedar St, Hamlet, USA',
        medicalHistory: ['Allergy to pollen'],
        profilePhoto: 'path/to/profilePhoto5.jpg',
        nic: '789012345V',
        barcode: 'barcode-data-202'
    },
    {
        fullName: 'Michael Wilson',
        password: 'password303',
        dob: new Date('1988-11-30'),
        gender: 'Male',
        bloodGroup: 'A-',
        phone: '4567890123',
        email: 'michael.wilson@example.com',
        address: '303 Birch St, Cityplace, USA',
        medicalHistory: ['High cholesterol'],
        profilePhoto: 'path/to/profilePhoto6.jpg',
        nic: '890123456V',
        barcode: 'barcode-data-303'
    },
    {
        fullName: 'Sophia Martinez',
        password: 'password404',
        dob: new Date('1995-02-28'),
        gender: 'Female',
        bloodGroup: 'B-',
        phone: '5678901234',
        email: 'sophia.martinez@example.com',
        address: '404 Maple St, Townland, USA',
        medicalHistory: ['Asthma'],
        profilePhoto: 'path/to/profilePhoto7.jpg',
        nic: '901234567V',
        barcode: 'barcode-data-404'
    },
    {
        fullName: 'James Garcia',
        password: 'password505',
        dob: new Date('1975-04-10'),
        gender: 'Male',
        bloodGroup: 'AB+',
        phone: '6789012345',
        email: 'james.garcia@example.com',
        address: '505 Walnut St, Urbantown, USA',
        medicalHistory: ['Cardiac arrhythmia'],
        profilePhoto: 'path/to/profilePhoto8.jpg',
        nic: '012345678V',
        barcode: 'barcode-data-505'
    },
    {
        fullName: 'Olivia Anderson',
        password: 'password606',
        dob: new Date('1982-12-14'),
        gender: 'Female',
        bloodGroup: 'A+',
        phone: '7890123456',
        email: 'olivia.anderson@example.com',
        address: '606 Cherry St, Riverside, USA',
        medicalHistory: ['Arthritis'],
        profilePhoto: 'path/to/profilePhoto9.jpg',
        nic: '234567890V',
        barcode: 'barcode-data-606'
    },
    {
        fullName: 'William Taylor',
        password: 'password707',
        dob: new Date('1998-06-18'),
        gender: 'Male',
        bloodGroup: 'O+',
        phone: '8901234567',
        email: 'william.taylor@example.com',
        address: '707 Fir St, Highland, USA',
        medicalHistory: ['Peanut allergy'],
        profilePhoto: 'path/to/profilePhoto10.jpg',
        nic: '345678901V',
        barcode: 'barcode-data-707'
    }
];

// Function to seed the database
async function seedDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');

        // Clear the existing data
        await User.deleteMany({});
        console.log('Existing users cleared');

        // Insert the new users
        await User.insertMany(usersData);
        console.log('Users seeded successfully');

        // Close the connection
        await mongoose.connection.close();
        console.log('Database connection closed');
    } catch (error) {
        console.error('Error seeding the database:', error);
    }
}

// Run the seed function
seedDatabase();
