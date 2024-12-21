// seedHospitals.js
const mongoose = require('mongoose');
const Hospital = require('../../models/BhanukaFdo/Hospital'); // Update the path to your hospital model
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect('mongodb+srv://demondevil200166:k1Ul00CCLCAdZr6o@cluster0.oialj.mongodb.net/CsseReportTest', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    seedHospitals();
  })
  .catch(err => {
    console.log('Error connecting to MongoDB:', err);
  });

async function seedHospitals() {
  const hospitals = [
    {
      hospitalId: "HOSP1234",
      hospitalName: "City General Hospital",
      hospitalAddress: {
        street: "123 Main Street",
        city: "Los Angeles",
        state: "California",
        zipCode: "90001",
        country: "USA"
      },
      contactNumber: "+1-123-456-7890",
      email: "info@citygeneral.com",
      website: "http://www.citygeneral.com",
      departments: ["Cardiology", "Neurology", "Orthopedics"],
      doctors: [] // You can add doctor references here if available
    },
    {
      hospitalId: "HOSP5678",
      hospitalName: "Sunrise Medical Center",
      hospitalAddress: {
        street: "456 Oak Avenue",
        city: "San Francisco",
        state: "California",
        zipCode: "94103",
        country: "USA"
      },
      contactNumber: "+1-987-654-3210",
      email: "contact@sunrisemed.com",
      website: "http://www.sunrisemed.com",
      departments: ["Pediatrics", "Dermatology", "Oncology"],
      doctors: []
    },
    {
      hospitalId: "HOSP91011",
      hospitalName: "St. Mary's Hospital",
      hospitalAddress: {
        street: "789 Pine Street",
        city: "New York",
        state: "New York",
        zipCode: "10001",
        country: "USA"
      },
      contactNumber: "+1-555-123-4567",
      email: "services@stmaryshospital.com",
      website: "http://www.stmaryshospital.com",
      departments: ["Cardiology", "Neurology", "Surgery"],
      doctors: []
    }
  ];

  try {
    await Hospital.insertMany(hospitals);
    console.log('Hospitals inserted successfully!');
    mongoose.connection.close();
  } catch (err) {
    console.log('Error inserting hospitals:', err);
    mongoose.connection.close();
  }
}
