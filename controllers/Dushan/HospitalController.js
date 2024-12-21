const Hospital = require('../../models/Dushan/HospitalD');

// Controller for registering a new hospital
const registerHospital = async (req, res) => {
  const {
    hospitalID,
    hospitalName,
    hospitalAddress,
    hospitalDescription,
    hospitalImage // Image URL from frontend
  } = req.body;

  try {
    const newHospital = new Hospital({
      hospitalID,
      hospitalName,
      hospitalAddress,
      hospitalDescription,
      hospitalImage // Store the image URL
    });

    const savedHospital = await newHospital.save();
    res.status(201).json(savedHospital);
  } catch (error) {
    res.status(500).json({ message: 'Error registering hospital', error });
  }
};

// Controller for fetching a hospital by ID
const getHospitalById = async (req, res) => {
  const { hospitalId } = req.params; // Ensure you're using the correct parameter name

  try {
    const hospital = await Hospital.findOne({ hospitalID: hospitalId }); // Use findOne with hospitalID field
    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }
    res.status(200).json(hospital);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error fetching hospital', error });
  }
};


module.exports = {
  registerHospital,
  getHospitalById, // Ensure it's exported
};
