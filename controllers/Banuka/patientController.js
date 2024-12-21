const User = require('../../models/Banuka/User');
const HealthCareManager = require('../../models/Banuka/HealthCareManager');
const generateBarcode = require('../../utils/barcodeGenerator');
const mailService = require('../../service/SendMail');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserRegistrationSubject = require('../../observerDesignPattern/subjects/userRegistrationSubject');
const EmailObserver = require('../../observerDesignPattern/observers/emailObserver');
const LogObserver = require('../../observerDesignPattern/observers/logObserver');

// Create an instance of the subject
const userRegistrationSubject = new UserRegistrationSubject();

// Create and register observers
const emailObserver = new EmailObserver();
const logObserver = new LogObserver();

userRegistrationSubject.registerObserver(emailObserver);
userRegistrationSubject.registerObserver(logObserver);




// Patient Login
exports.patientLogin = async (req,res, next) => {
  const { email, password } = req.body;
  console.log(email,password);
  

  try {
    // Find the Patient by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    console.log("Patient",user);

    // Compare the password
    //const isMatch = await bcrypt.compare(password, manager.password);
    let isMatch = false;
    if(password == user.password){
         isMatch = true;
    }
    if (!isMatch) {
      
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({ message: 'Login successful', data:token,Id:user._id, success: true });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
} 
// Register a new user (patient)
exports.registerUser = async (req, res, next) => {
  const { fullName, dob, gender, bloodGroup, phone, email, address, medicalHistory, nic,profilePhoto,password } = req.body;
  const managerId = req.body.userId;

  console.log(req.body)
  console.log("ManagerID",managerId);

  try {
    const userExist = await User.findOne({ nic });
    if (userExist) return res.status(400).json({ error: 'User already exists' });

    const newUser = new User({ fullName, dob, gender, bloodGroup, phone, email, address, medicalHistory, nic ,profilePhoto,password });
    const savedUser = await newUser.save();

    const healthcareManager = await HealthCareManager.findById(managerId);
    healthcareManager.createdPatients.push(savedUser._id);
    await healthcareManager.save();

    const barcode = await generateBarcode(savedUser._id.toString());
    newUser.barcode = barcode;
    await newUser.save();


    // Notify all observers about the new user
    userRegistrationSubject.notifyObservers(savedUser);

    //  mailService.notifyUser({user:savedUser})
    


    res.status(201).json({ message: 'User registered', user: newUser });
  } catch (error) {
    next(error); // Pass error to centralized error handler
  }
};

// Scan a patient using barcode
exports.scanUser = async (req, res, next) => {
  const { id } = req.params;
  const { scannerId } = req.body;

  console.log("Scanned-----------------",id,scannerId)

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.scans.push({ scannedBy: scannerId });
    await user.save();

    res.json({ user });
  } catch (error) {
    next(error);
  }
};

// Get patient data by ID
exports.getPatientData = async (req, res, next) => {
    console.log("ppp")
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'User found', data: user });
  } catch (error) {
    next(error);
  }
};

// Get all patients (optional search by name)
exports.getPatients = async (req, res, next) => {
  const { name } = req.query;

  try {
    const query = name ? { fullName: { $regex: name, $options: 'i' } } : {};
    const patients = await User.find(query);

    res.status(200).json({ data: patients });
  } catch (error) {
    //console.log("getttt",error);
    next(error);
  }
};

// Update patient details
exports.updatePatient = async (req, res, next) => {
    console.log("update patient");
    console.log(req.body);
    const { id } = req.params;
    const { fullName, dob, gender, bloodGroup, phone, email, address, medicalHistory, nic,profilePhoto,password } = req.body;
  
    try {
      // Find the patient by ID
      const patient = await User.findById(id);
      if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
      }
  
      // Update only fields that are provided in the request body
      if (fullName) patient.fullName = fullName;
      if (dob) patient.dob = dob;
      if (gender) patient.gender = gender;
      if (bloodGroup) patient.bloodGroup = bloodGroup;
      if (phone) patient.phone = phone;
      if (email) patient.email = email;
      if (address) patient.address = address;
      if (medicalHistory) patient.medicalHistory = medicalHistory;
      if (nic) patient.nic = nic;
      if (profilePhoto) patient.profilePhoto = profilePhoto;
      if (password) patient.password = password;
  
      // Save updated patient details
      const updatedPatient = await patient.save();
  
      res.status(200).json({ message: 'Patient updated successfully', data: updatedPatient });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating patient details' });
    }
  };

  exports.generateNewCard = async (req, res, next) => {
    const {_id,fullName, dob, gender, bloodGroup, phone, email, address, medicalHistory, nic,profilePhoto,password } = req.body;
    const managerId = req.body.userId;
    console.log("newcard",_id);
  
    try {
        
        await User.findByIdAndDelete(_id);
  
      const newUser = new User({ fullName, dob, gender, bloodGroup, phone, email, address, medicalHistory, nic,profilePhoto,password });
      const savedUser = await newUser.save();
  
      const healthcareManager = await HealthCareManager.findById(managerId);
      healthcareManager.createdPatients.push(savedUser._id);
      await healthcareManager.save();
  
      const barcode = await generateBarcode(savedUser._id.toString());
      newUser.barcode = barcode;
      await newUser.save();
  
      res.status(201).json({ message: 'User registered', user: newUser });
    } catch (error) {
      next(error); // Pass error to centralized error handler
    }
  };

    exports.getPatientWithScans = async (req, res) => {
    try {
        const { id } = req.params; // Get patient ID from URL params
        console.log("id",id)
        // Fetch patient data and populate the scannedBy field
        const patient = await User.findById(id).populate('scans.scannedBy'); // Populates the 'scannedBy' field with user's full name and email
        console.log(patient.scans);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        // Send patient data along with scan details
        res.status(200).json({
            success: true,
            data: patient
        });
    } catch (error) {
        console.error('Error fetching patient:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deletePatient = async (req, res) => {
  const { id } = req.params;

  try {
      // Find the patient by ID and delete them
      const patient = await User.findByIdAndDelete(id);

      if (!patient) {
          return res.status(404).json({ error: "Patient not found" });
      }

      return res.status(200).json({ message: "Patient account deleted successfully" });
  } catch (error) {
      console.error('Error deleting patient:', error);
      return res.status(500).json({ error: "Failed to delete patient" });
  }
};