const mongoose = require('mongoose');

const healthcareManagerSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'healthcare_manager', // Default role set to healthcare manager
    enum: ['healthcare_manager'],  // Restrict role to healthcare manager
    required: true,
  },
  permissions: {
    type: [String],
    default: ['create_patient', 'manage_patients', 'view_reports'], // Permissions for healthcare managers
  },
  hospital: {
    type:String,
    //ref: 'Hospital', // Hospital the manager is assigned to
    required: true,
  },
  createdPatients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient', // Patients created by this manager
    },
  ],
  dateJoined: {
    type: Date,
    default: Date.now,
  },
});

// Automatically assign healthcare manager permissions
healthcareManagerSchema.pre('save', function (next) {
  if (!this.permissions || this.permissions.length === 0) {
    this.permissions = ['create_patient', 'manage_patients', 'view_reports']; // Set default permissions
  }
  next();
});

const HealthcareManager = mongoose.model('HealthcareManager', healthcareManagerSchema);
module.exports = HealthcareManager;
