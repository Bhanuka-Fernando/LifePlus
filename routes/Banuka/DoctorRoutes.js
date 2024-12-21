// routes/doctorRoutes.js
const express = require('express');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();
const Doctor = require('../../models/Banuka/Doctors');


// Add Doctor
router.post('/add', async (req, res) => {
    try {
        const newDoctor = new Doctor(req.body);
        await newDoctor.save();
        res.status(201).json({ message: "Doctor added successfully!" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.post('/login',async (req,res) => {
    console.log("Doctor Login")
    const {email,password} = req.body;
    console.log(email,password);

    try{
        const response = await Doctor.findOne({email:email});

        console.log(response);

        if(response){
            //const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
            res.status(200).send({message:'Login sucess',data:response,success:true});
        }else{
            res.status(500).send({message:'user notfound'});
        }
        
    }catch(err){
        console.log(err);
    }
})

module.exports = router;
