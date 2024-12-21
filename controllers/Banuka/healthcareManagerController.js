const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const HealthcareManager = require('../../models/Banuka/HealthCareManager');

// Register a new healthcare manager
exports.registerHealthcareManager = async (req, res, next) => {
  const { fullName, email, password, hospital } = req.body;
  console.log(req.body);

  try {
    // Check if the manager already exists
    let manager = await HealthcareManager.findOne({ email });
    if (manager) {
      return res.status(400).json({ msg: 'Manager already exists' });
    }

    // Hash the password
    //const hashedPassword = await bcrypt.hash(password, 10);
    const hashedPassword = password;

    // Create new healthcare manager
    manager = new HealthcareManager({
      fullName,
      email,
      password: hashedPassword, // Store hashed password
      hospital,
    });

    // Save the manager to the database
    await manager.save();

    res.status(201).json({ msg: 'Healthcare manager registered successfully' });
  } catch (err) {
    //console.error(err.message);
    //res.status(500).send('Server error');
    next(err);
  }
};

// Login a healthcare manager
exports.loginHealthcareManager = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email,password);

  try {
    // Find the manager by email
    const manager = await HealthcareManager.findOne({ email });
    if (!manager) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Compare the password
    //const isMatch = await bcrypt.compare(password, manager.password);
    let isMatch = false;
    if(password == manager.password){
         isMatch = true;
    }
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: manager._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({ message: 'Login successful', data:token, success: true });
  } catch (err) {
    // console.error(err.message);
    // res.status(500).send('Server error');
    next(err);
  }
};
