const Doctor = require('../../models/BhanukaFdo/doctor');
const mongoose = require('mongoose');

// Get all doctors
const getAllDoctors = async (req, res) => {
    const hospitalId = req.query.hospitalId;
    console.log(hospitalId)
    try {
        const doctors = await Doctor.find({hospitalId:hospitalId}).sort({ createdAt: -1 });
        res.status(200).json(doctors);
    } catch (error) {
        console.error('Error fetching doctors:', error);
        res.status(500).json({ error: 'An error occurred while fetching doctors' });
    }
};

// Get a single doctor by ID
const getAdoctor = async (req, res) => {
    const { id } = req.params;

    try {
        // Find the doctor by custom doctorId instead of _id
        const doctor = await Doctor.findOne({ doctorId: id });
        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }
        res.status(200).json(doctor);
    } catch (error) {
        console.error('Error fetching doctor:', error);
        res.status(500).json({ error: 'An error occurred while fetching the doctor' });
    }
};


// Create a new doctor
const createDoctor = async (req, res) => {
    const { hospitalId, doctorId, docName, maxCount, wardNo, doctorAvailableTime, specialization, docDate, docImage, docPayment, availableDays } = req.body;

    // Validation: Check if required fields are present
    if (!hospitalId || !doctorId || !docName || !specialization) {
        return res.status(400).json({ error: 'Missing required fields: hospitalId, doctorId, docName, and specialization are required' });
    }

    try {
        const doctor = await Doctor.create({ hospitalId, doctorId, doctorAvailableTime, docName, maxCount, wardNo, specialization, docDate, docImage, docPayment,availableDays });
        res.status(201).json(doctor);
    } catch (error) {
        console.error('Error creating doctor:', error);
        res.status(400).json({ error: 'Failed to create doctor', details: error.message });
    }
};

// Delete a doctor by ID
const deleteDoctor = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid Doctor ID format' });
    }

    try {
        const doctor = await Doctor.findOneAndDelete({ _id: id });

        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }
        res.status(200).json({ message: 'Doctor deleted successfully', doctor });
    } catch (error) {
        console.error('Error deleting doctor:', error);
        res.status(500).json({ error: 'An error occurred while deleting the doctor' });
    }
};

// Update a doctor by ID
const updateDoctor = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid Doctor ID format' });
    }

    try {
        const doctor = await Doctor.findOneAndUpdate({ _id: id }, req.body, { new: true, runValidators: true });

        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }
        res.status(200).json(doctor);
    } catch (error) {
        console.error('Error updating doctor:', error);
        res.status(400).json({ error: 'Failed to update doctor', details: error.message });
    }
};

module.exports = {
    getAllDoctors,
    getAdoctor,
    createDoctor,
    deleteDoctor,
    updateDoctor
};
