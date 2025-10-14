const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { validateRegistrationData } = require('../utils/validators');

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Register User
exports.registerUser = async (req, res) => {
  try {
    const {
      firstName, lastName, middleName, age, gender, dateOfBirth,
      bloodGroup, email, contactNo, aadharNumber, state, city,
      pincode, address, majorDisease, diseaseDetails, password, confirmPassword
    } = req.body;

    // Validate input
    const validation = validateRegistrationData(req.body);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: validation.errors,
      });
    }

    // Check password match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match',
      });
    }

    // Check if email already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists',
      });
    }

    // Check if aadhar already exists
    user = await User.findOne({ aadharNumber });
    if (user) {
      return res.status(400).json({
        success: false,
        message: 'User with this Aadhar number already exists',
      });
    }

    // Create new user
    user = new User({
      firstName, lastName, middleName, age, gender, dateOfBirth,
      bloodGroup, email, contactNo, aadharNumber, state, city,
      pincode, address, majorDisease, diseaseDetails, password
    });

    await user.save();

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: user.toJSON(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error during registration',
      error: error.message,
    });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    // Check if user exists
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Check password
    const isPasswordMatch = await user.matchPassword(password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: user.toJSON(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error during login',
      error: error.message,
    });
  }
};

// Get User Profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'User profile retrieved',
      user: user.toJSON(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching profile',
      error: error.message,
    });
  }
};

// Update User Profile
exports.updateUserProfile = async (req, res) => {
  try {
    const { firstName, lastName, middleName, age, bloodGroup, contactNo, state, city, pincode, address, majorDisease, diseaseDetails } = req.body;

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Update user fields
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (middleName) user.middleName = middleName;
    if (age) user.age = age;
    if (bloodGroup) user.bloodGroup = bloodGroup;
    if (contactNo) user.contactNo = contactNo;
    if (state) user.state = state;
    if (city) user.city = city;
    if (pincode) user.pincode = pincode;
    if (address) user.address = address;
    if (majorDisease) user.majorDisease = majorDisease;
    if (diseaseDetails) user.diseaseDetails = diseaseDetails;

    user.updatedAt = Date.now();
    await user.save();

    res.status(200).json({
      success: true,
      message: 'User profile updated successfully',
      user: user.toJSON(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating profile',
      error: error.message,
    });
  }
};