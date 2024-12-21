const mongoose = require('mongoose');
const faker = require('faker');
const TapRecord = require('./models/tapRecordModel'); // Import your TapRecord model
const Hospital = require('../../models/BhanukaFdo/Hospital');
const Patient = require('../../models/Banuka/User');

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
    return patients.map(patients => patients._id); // Return an array of hospital IDs
  } catch (error) {
    console.error('Error fetching hospital IDs:', error);
    throw error; // Handle error appropriately
  }
};
// MongoDB connection
mongoose.connect('mongodb+srv://demondevil200166:k1Ul00CCLCAdZr6o@cluster0.oialj.mongodb.net/CsseReportTest', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Generate mock data
const generateMockTapData = async () => {

  const hospitalIds = await fetchHospitalIds();
  const patientIds = await fetchPatientIds();

  console.log(hospitalIds)
  console.log("--------------------")
  console.log(patientIds)

  // const hospitalIds = [
  //   mongoose.Types.ObjectId("652f70b2c9f9b5a6d7b4a789"),
  //   mongoose.Types.ObjectId("652f70b2c9f9b5a6d7b4a101"),
  //   mongoose.Types.ObjectId("652f70b2c9f9b5a6d7b4a202"),
  // ];

  // const users = [
  //   mongoose.Types.ObjectId("652f70b2c9f9b5a6d7b4a123"),
  //   mongoose.Types.ObjectId("652f70b2c9f9b5a6d7b4a456"),
  //   mongoose.Types.ObjectId("652f70b2c9f9b5a6d7b4a789"),
  // ];

  const mockTapEvents = [];

  for (let i = 0; i < 50; i++) {
    const userId = faker.random.arrayElement(users);
    const hospitalId = faker.random.arrayElement(hospitalIds);
    const tapTime = faker.date.between('2024-10-01', '2024-10-14'); // Random date in the range

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
