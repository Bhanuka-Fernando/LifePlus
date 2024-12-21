const Doctor = require('../../models/Dushan/doctorModel');
const registerDoctor = async (req, res) => {
  const {
    doctorId,
    fullName,
    phoneNumber, // You can still keep this if you want to store it
    address,
    specialization,
    associatedHospitals,
    hospitalId,
    degree,
    university,
    doctorImage,
    medicalLicense,
    wardNo,
    maxCount,
    docPayment,
    doctorAvailableTime,
    availableDays
  } = req.body;


   // Validate required fields
   if (!doctorId || !fullName || !hospitalId) { // Add any additional required fields as needed
    return res.status(400).json({ message: 'doctorId, fullName, and hospitalId are required' });
  }
  try {
    const newDoctor = new Doctor({
      doctorId,
      fullName,
      phoneNumber,
      address,
      specialization,
      associatedHospitals,
      hospitalId,
      degree,
      university,
      doctorImage,
      medicalLicense,
      wardNo,
      maxCount,
      docPayment,
      doctorAvailableTime,
      availableDays
    });

    const savedDoctor = await newDoctor.save();

    res.status(201).json(savedDoctor);
  } catch (error) {
    console.error('Error registering doctor:', error);
    res.status(500).json({ message: 'Error registering doctor', error });
  }
};



// Get all doctors
const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching doctors', error });
  }
};

// Get a doctor by ID
const getDoctorById = async (req, res) => {
  const { id } = req.params;

  try {
    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching doctor', error });
  }
};

// Update a doctor's information
const updateDoctor = async (req, res) => {
  try {
    const { id } = req.params; // Get the doctor ID from the URL
    const updatedData = req.body; // Get the updated data from the request body

    // Find the doctor by ID and update their details
    const updatedDoctor = await Doctor.findByIdAndUpdate(id, updatedData, { new: true });
    
    if (!updatedDoctor) {
      return res.status(404).json({ message: 'Doctor not found' }); // Handle not found case
    }
    
    res.status(200).json(updatedDoctor); // Return the updated doctor
  } catch (error) {
    console.error('Error updating doctor:', error); // Log the error for debugging
    res.status(500).json({ message: 'Error updating doctor', error: error.message });
  }
};




// Delete a doctor
const deleteDoctor = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedDoctor = await Doctor.findByIdAndDelete(id);
    if (!deletedDoctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.status(200).json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting doctor', error });
  }
};

// Controller for fetching doctors by hospital ID
const getDoctorsByHospitalId = async (req, res) => {
  const { hospitalId } = req.params;

  try {
    const doctors = await Doctor.find({ hospitalId });
    if (doctors.length === 0) {
      return res.status(404).json({ message: 'No doctors found for this hospital.' });
    }
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching doctors', error });
  }
};



const getDoctorCountsBySpecialization = async (req, res) => {
  const { hospitalId } = req.params;

  try {
    const specializations = ['Neurology', 'Oncology', 'Cardiology', 'Psychiatry', 'General Surgery'];

    // Query to count doctors by specialization
    const counts = await Doctor.aggregate([
      { $match: { hospitalId } },  // Filter by hospital ID
      { $group: { _id: "$specialization", count: { $sum: 1 } } }, // Group by specialization and count
      { $match: { _id: { $in: specializations } } } // Filter to include only selected specializations
    ]);

    // Transform the response into a format of specialization => count
    const categorizedSpecialists = specializations.map(spec => {
      const match = counts.find(c => c._id === spec);
      return {
        title: spec,
        count: match ? match.count : 0, // If no match, return 0
      };
    });

    res.status(200).json(categorizedSpecialists);  // Send the results as JSON
  } catch (error) {
    res.status(500).json({ message: 'Error fetching doctor counts', error });
  }
};


module.exports = {
  registerDoctor,
  getDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
  getDoctorsByHospitalId,
  getDoctorCountsBySpecialization, // Export the new function
};
