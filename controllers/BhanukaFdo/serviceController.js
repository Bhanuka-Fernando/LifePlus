const Service = require('../../models/BhanukaFdo/services');
const mongoose = require('mongoose');

// Get all services
const getAllServices= async (req, res) => {
    try {
        const service = await Service.find({}).sort({ createdAt: -1 });
        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch services' });
    }
};

// Get a single service by ID
const getService = async (req, res) => {
    const { id } = req.params;

    try {
        const service = await Service.findOne({ labId: id }); // Ensure this uses labId
        if (!service) {
            return res.status(404).json({ error: 'No such service found' });
        }
        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching service' });
    }
};



// Create a new service
const createService= async (req, res) => {
    const { hospitalId, labId, serviceName, serviceImage, serviceDate,wardNo, servicePayment } = req.body;

    try {
        const service = await Service.create({  hospitalId, labId, serviceName, serviceImage, serviceDate,wardNo, servicePayment });
        res.status(201).json(service);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create service', details: error.message });
    }
};

// Delete a service by ID
const deleteService = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such service found' });
    }

    try {
        const service = await Service.findOneAndDelete({ _id: id });

        if (!service) {
            return res.status(404).json({ error: 'No such service found' });
        }
        res.status(200).json({ message: 'service deleted successfully', service });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting service' });
    }
};

// Update a service by ID
const updateService = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such service found' });
    }

    try {
        const service = await Service.findOneAndUpdate({ _id: id }, req.body, { new: true });

        if (!service) {
            return res.status(404).json({ error: 'No such service found' });
        }
        res.status(200).json(service);
    } catch (error) {
        res.status(400).json({ error: 'Error updating service', details: error.message });
    }
};






module.exports = {
    getAllServices,
    getService,
    createService,
    deleteService,
    updateService
};
