// const Wishlist = require('../models/wishList');
// const Item = require('../models/itemSchema');
// const Profile = require('../models/profileSchema');
// const Discount = require('../models/discountModel');
const nodemailer = require('nodemailer');




// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service:'gmail',
  host: 'smtp.gmail.email',
    port: 587,
    secure: false,
    auth: {
        user: 'spmtestbanuk@gmail.com',
        pass: 'hnsn qevu rmti ujqv'
    }
  /*
  service: 'gmail',
  auth: {
    user: 'spmtestbanuk@gmail.com',
    pass: 'hnsn qevu rmti ujqv',
  },*/
});

// Email sending function
const sendEmail = (recipientEmail, subject, message) => {
  const mailOptions = {
    from: {
      name:'Health Care System',
      address : 'spmtestbanuk@gmail.com'
    },
    to: recipientEmail,
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};


const notifyUser = async ({user}) => {

  console.log("notify users");
  


  try{
          //Email subject and message
            const subject = `Your Account Has Been Created`;
            const message = `Dear ${user.fullName},

            Your account has been successfully created. Below are your details:
      
            Full Name: ${user.fullName}
            Date of Birth: ${user.dob}
            Gender: ${user.gender}
            Blood Group: ${user.bloodGroup}
            Phone: ${user.phone}
            Email: ${user.email}
            Address: ${user.address}
            NIC: ${user.nic}
            Password:${user.password} (Change this passsword)
      
            You can now use your email (${user.email}) to log into the system.
      
            Thank you,
            Healthcare Team
          `;
  
            // Send the email
            console.log("mail sent",subject,message,user.email);
            sendEmail(user.email, subject, message);
  }catch(err){
    console.log(err);
  }
  }
    
 



module.exports = { notifyUser };