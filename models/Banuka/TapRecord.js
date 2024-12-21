const mongoose = require('mongoose');

const tapRecordSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the user who tapped the card
        required: true
    },
    hospitalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital', // Reference to the hospital where the tap occurred
        required: true
    },
    tapTime: {
        type: Date, // Timestamp of the event
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('TapRecord', tapRecordSchema);
