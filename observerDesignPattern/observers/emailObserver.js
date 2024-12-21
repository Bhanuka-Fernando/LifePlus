// /observers/emailObserver.js
const nodemailer = require('nodemailer');
const Observer = require('./observer');

// Concrete Observer for sending email notifications
class EmailObserver extends Observer {
  constructor() {
    super();
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'spmtestbanuk@gmail.com',
        pass: 'hnsn qevu rmti ujqv',
      },
    });
  }

  update(user) {
    const subject = 'Your Account Has Been Created';
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

    const mailOptions = {
      from: {
        name: 'Health Care System',
        address: 'spmtestbanuk@gmail.com',
      },
      to: user.email,
      subject: subject,
      text: message,
    };

    this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  }
}

module.exports = EmailObserver;
