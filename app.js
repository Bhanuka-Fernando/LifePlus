const express = require('express');
const colors = require('colors');
const morgon =  require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors'); 


//Dushan 

const user_routes = require('./routes/userRoutes');
const doctorRoutes = require('./routes/Dushan/doctorRoutes'); 

const hospitalRoutesD = require('./routes/Dushan/HospitalRoutes');




//Banuka
const Patient_Routes = require('./routes/Banuka/patientRoutes');
const HealthCareManager_Routes = require('./routes/Banuka/healthcareManagerRoutes');
const Doctor_Routes = require('./routes/Banuka/DoctorRoutes');
const errorHandler = require('./middlewares/errorHandler');
const reportRoutes = require('./routes/Banuka/reportRoutes')

//BhanukaFdo
const doctorRoute = require('./routes/BhanukaFdo/doctorRoutes')
const appointmentRoute = require('./routes/BhanukaFdo/appointmentRoute')
const paymentRoute = require('./routes/BhanukaFdo/paymentRoutes')
const labAppointmentRoute = require('./routes/BhanukaFdo/labAppointmentRoute')
const servicesRoute = require('./routes/BhanukaFdo/serviceRoutes')
const hospitalRoutes = require('./routes/BhanukaFdo/HospitalRoutes');


// geshika
const medicalRecordRoute = require("./routes/Geshika/MedicalRecordRoute");







//rest object
const app = express();


//middlewares
app.use(express.json());
app.use(morgon('dev'));

// Use CORS
app.use(cors()); // Enable CORS for all routes

//routes
app.get('/', (req, res) => {
    res.send('API is running');
});

app.use('/api/user', user_routes );

//Banuka Routes
app.use('/api/user',Patient_Routes);
app.use('/api/Doctors',Doctor_Routes);
app.use('/api/HealthCareManager',HealthCareManager_Routes);
app.use('/api/reports',reportRoutes)

//Bhanuka
app.use('/api/doctor', doctorRoute)
app.use('/api/appointment', appointmentRoute)
app.use('/api/payment', paymentRoute)
app.use('/api/lab-appointment', labAppointmentRoute)
app.use('/api/services', servicesRoute)
app.use('/api/hospitals',hospitalRoutes);

//Dushan Routes

app.use('/api/doctors', doctorRoutes);

app.use('/api/hospitalsD', hospitalRoutesD);


//geshika
app.use("/api/medical-records", medicalRecordRoute);

app.post('/test',(req,res) => {
    res.send({});
});

app.use(errorHandler);

module.exports = app;
