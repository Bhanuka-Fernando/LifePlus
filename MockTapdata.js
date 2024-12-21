const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const TapRecord = require('./models/Banuka/TapRecord'); // Import your TapRecord model
const Hospital = require('./models/BhanukaFdo/Hospital');
const Patient = require('./models/Banuka/User');

const fetchHospitalIds = async () => {
  try {
    const hospitals = await Hospital.find({}, '_id'); // Fetch only the _id field
    return hospitals.map(hospital => hospital._id); // Return an array of hospital IDs
  } catch (error) {
    console.error('Error fetching hospital IDs:', error);
    throw error; // Handle error appropriately
  }
};

const fetchPatientIds = async () => {
  try {
    const patients = await Patient.find({}, '_id'); // Fetch only the _id field
    return patients.map(patient => patient._id); // Return an array of patient IDs
  } catch (error) {
    console.error('Error fetching patient IDs:', error);
    throw error; // Handle error appropriately
  }
};

// MongoDB connection
mongoose.connect('mongodb+srv://admin:admin@retailrush.bkj5d.mongodb.net/CSSEBanuka', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Generate mock data
const generateMockTapData = async () => {
  const hospitalIds = await fetchHospitalIds();
  const patientIds = await fetchPatientIds();

  console.log(hospitalIds);
  console.log("--------------------");
  console.log(patientIds);

  const mockTapEvents = [];

  for (let i = 0; i < 100; i++) {
    const userId = faker.helpers.arrayElement(patientIds); // Fetch a random patient ID
    const hospitalId = faker.helpers.arrayElement(hospitalIds); // Fetch a random hospital ID

    // Generate a random date between the specified range using the correct object format
    const tapTime = faker.date.between({
      from: new Date('2024-10-01'), 
      to: new Date('2024-10-14')
    });

    mockTapEvents.push({
      userId,
      hospitalId,
      tapTime,
    });
  }

  // Insert mock data into the database
  await TapRecord.insertMany(mockTapEvents);
  console.log('Mock data inserted successfully');
  mongoose.disconnect();
};

// Run the mock data generation
generateMockTapData();
