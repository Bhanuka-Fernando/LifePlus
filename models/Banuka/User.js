const mongoose = require('mongoose');

const EXPIRATION_DURATION = (365 * 24 * 60 * 60 * 1000)*2; //2 years

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type:String,
    },
    dob: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Other'] // Optional: restrict values to predefined genders
    },
    bloodGroup: {
        type: String,
        required: true,
        enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'] // Optional: predefined blood groups
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    medicalHistory: {
        type: [String],
        default: [], // Default to an empty string if no medical history is provided
        
    },
    profilePhoto: {
        type: String, // Assuming this will store a file path or URL
        required: false
    },
    nic: {
        type: String,
        required : true,
        unique:true
    },
    barcode: {
        type: String, // Store the generated barcode data (e.g., base64 image or file path)
        required: false
    },
    expireAt: {
        type: Date,
        default: function() {
            return new Date(Date.now() + EXPIRATION_DURATION); // Set to 1 year from the current date
        }
    },
    scans: [{
        scannedBy: {
            type: mongoose.Schema.Types.ObjectId, // Reference to the user who scanned
            ref: 'DoctorM', // Assuming it's another user from the same collection
            required: true
        },
        date: {
            type: Date,
            default: Date.now // Automatically set the scan date to the current date
        }
    }]
    

}, {
    timestamps: true // Adds createdAt and updatedAt fields automatically
});

userSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

// Create and export the model
const User = mongoose.model('User', userSchema);
module.exports = User;
