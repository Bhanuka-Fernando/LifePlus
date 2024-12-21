// seedDoctors.js
const mongoose = require('mongoose');
const Doctor = require('../../models/BhanukaFdo/doctor'); // Update the path to your doctor model
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    seedDoctors();
  })
  .catch(err => {
    console.log('Error connecting to MongoDB:', err);
  });

async function seedDoctors() {
  const doctors = [
    {
      hospitalId: "HOSP1234",
      doctorId: "DOC001",
      docName: "Dr. John Doe",
      docImage: "john_doe.jpg",
      specialization: "Cardiology",
      docDate: new Date("2024-10-10"),
      wardNo: "A1",
      maxCount: 10,
      docPayment: 200,
      doctorAvailableTime: "9 AM - 5 PM",
      availableDays: ["Monday", "Wednesday", "Friday"]
    },
    {
      hospitalId: "HOSP1234",
      doctorId: "DOC002",
      docName: "Dr. Jane Smith",
      docImage: "jane_smith.jpg",
      specialization: "Neurology",
      docDate: new Date("2024-10-12"),
      wardNo: "B2",
      maxCount: 8,
      docPayment: 250,
      doctorAvailableTime: "10 AM - 4 PM",
      availableDays: ["Tuesday", "Thursday"]
    },
    {
      hospitalId: "HOSP5678",
      doctorId: "DOC003",
      docName: "Dr. Alan Brown",
      docImage: "alan_brown.jpg",
      specialization: "Pediatrics",
      docDate: new Date("2024-10-14"),
      wardNo: "C3",
      maxCount: 12,
      docPayment: 180,
      doctorAvailableTime: "8 AM - 3 PM",
      availableDays: ["Monday", "Friday"]
    }
  ];

  try {
    await Doctor.insertMany(doctors);
    console.log('Doctors inserted successfully!');
    mongoose.connection.close();
  } catch (err) {
    console.log('Error inserting doctors:', err);
    mongoose.connection.close();
  }
}
