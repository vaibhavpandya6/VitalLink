const Hospital = require("../models/Hospital");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * @route   POST /api/hospitals/register
 * @desc    Register a new hospital
 * @access  Public
 */
const registerHospital = async (req, res) => {
  try {
    // 🔥 FIX: Convert comma-separated strings into arrays
    if (typeof req.body.availableBloodGroups === "string") {
      req.body.availableBloodGroups = req.body.availableBloodGroups
        .split(",")
        .filter((v) => v.trim() !== "");
    }

    if (typeof req.body.specializations === "string") {
      req.body.specializations = req.body.specializations
        .split(",")
        .filter((v) => v.trim() !== "");
    }

    // 🔥 FIX: Extract fields AFTER body is parsed
    const {
      hospitalName,
      hospitalType,
      registrationNumber,
      establishmentYear,
      officialEmail,
      primaryPhone,
      state,
      city,
      pincode,
      address,
      totalBeds,
      icuBeds,
      bloodBankFacility,
      emergencyServices,
      administratorName,
      designation,
      adminContact,
      adminEmail,
      password,
      referenceId,
    } = req.body;

    // CHECK REQUIRED FIELDS
    if (!hospitalName || !officialEmail || !password) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    // 🔄 Check if hospital email already registered
    const existingHospital = await Hospital.findOne({ officialEmail });
    if (existingHospital) {
      return res.status(400).json({
        success: false,
        message: "Hospital already registered.",
      });
    }

    // 🔑 Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 🆕 Create new hospital document
    const newHospital = new Hospital({
      ...req.body,
      password: hashedPassword,
    });

    await newHospital.save();

    return res.status(201).json({
      success: true,
      message:
        "Hospital registration successful! Awaiting admin verification.",
      referenceId: newHospital.referenceId,
    });
  } catch (error) {
    console.error("❌ Registration Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @route   POST /api/hospitals/login
 * @desc    Hospital Login
 * @access  Public
 */
const loginHospital = async (req, res) => {
  try {
    const { officialEmail, password } = req.body;

    const hospital = await Hospital.findOne({ officialEmail });
    if (!hospital)
      return res
        .status(404)
        .json({ success: false, message: "Hospital not found" });

    if (hospital.verificationStatus !== "APPROVED") {
      return res.status(403).json({
        success: false,
        message: "Account not verified yet. Please wait for admin approval.",
      });
    }

    const isMatch = await bcrypt.compare(password, hospital.password);
    if (!isMatch)
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign(
      { id: hospital._id, role: "hospital" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      hospital: {
        id: hospital._id,
        hospitalName: hospital.hospitalName,
        hospitalType: hospital.hospitalType,
        city: hospital.city,
        referenceId: hospital.referenceId,
      },
    });
  } catch (error) {
    console.error("❌ Login Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @route   GET /api/hospitals/profile
 * @desc    Get hospital profile (token required)
 * @access  Private
 */
const getHospitalProfile = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.user.id).select("-password");
    if (!hospital)
      return res
        .status(404)
        .json({ success: false, message: "Hospital not found" });

    return res.json({ success: true, hospital });
  } catch (error) {
    console.error("❌ Profile Fetch Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  registerHospital,
  loginHospital,
  getHospitalProfile,
};
