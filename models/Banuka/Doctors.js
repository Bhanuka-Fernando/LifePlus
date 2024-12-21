
const mongoose = require('mongoose');


const doctorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        required:true
    },
    specialization:{
        type:String,
        required:true
    },
    hospitals:[{
        name:{type:String,required:true},
        address:{type:String,required:true},
        workingHours:{
            start:{type:String},
            end:{type:String}
        },
        availableDays:{
            type:[String],
            required:true
        }
    }
    ],

    appointments:[
        {
            patientId:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
            date:{type:Date,required:true},
            time:{type:String,required:true}
        }
    ],

    createdAt:{
        type:Date,
        default:Date.now
    }
});


const Doctor = mongoose.model('DoctorM',doctorSchema);
module.exports = Doctor; 

