const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const hospitalSchema = new mongoose.Schema({
  // --- Basic Hospital Info ---
  hospitalName: {
    type: String,
    required: true,
    trim: true,
  },
  hospitalType: {
    type: String,
    required: true,
    enum: ['Government', 'Private', 'Semi-Government', 'Trust', 'NGO'],
  },
  registrationNumber: {
    type: String,
    required: true,
    match: [/^\d{10}$/, "Registration number must be 10 digits"],
  },
  establishmentYear: {
    type: Number,
    required: true,
    min: [1800, "Invalid year"],
    max: [new Date().getFullYear(), "Invalid year"],
  },

  // --- Contact Information ---
  officialEmail: {
    type: String,
    required: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"],
  },
  primaryPhone: {
    type: String,
    required: true,
    match: [/^\d{10}$/, "Phone must be 10 digits"],
  },
  secondaryPhone: {
    type: String,
    match: [/^\d{10}$/, "Phone must be 10 digits"],
  },
  emergencyContact: {
    type: String,
    required: true,
    match: [/^\d{10}$/, "Emergency contact must be 10 digits"],
  },
  website: {
    type: String,
    default: "",
  },

  // --- Location ---
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
    match: [/^\d{6}$/, "Pincode must be 6 digits"],
  },
  address: {
    type: String,
    required: true,
    minlength: [10, "Address must be at least 10 characters"],
  },

  // --- Medical Infrastructure ---
  totalBeds: {
    type: Number,
    required: true,
    min: [1, "Must be greater than 0"],
  },
  icuBeds: {
    type: Number,
    required: true,
    min: [0, "Cannot be negative"],
  },
  bloodBankFacility: {
    type: String,
    required: true,
    enum: ['yes', 'no'],
  },
  emergencyServices: {
    type: String,
    required: true,
    enum: ['yes', 'no'],
  },
  storageCapacity: {
    type: Number,
    min: [0, "Must be positive"],
  },
  availableBloodGroups: {
    type: [String],
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    default: [],
  },
  specializations: {
    type: [String],
    enum: [
      'Cardiology', 'Orthopedics', 'Neurology', 'Oncology', 'Pediatrics',
      'Gynecology', 'Emergency Medicine', 'Radiology', 'Pathology',
      'Anesthesiology', 'Surgery', 'Dermatology'
    ],
    default: [],
  },

  // --- Administrative Contact ---
  administratorName: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  adminContact: {
    type: String,
    required: true,
    match: [/^\d{10}$/, "Contact must be 10 digits"],
  },
  adminEmail: {
    type: String,
    required: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"],
  },

  // --- Accreditations ---
  nabhAccreditation: {
    type: String,
    enum: ['yes', 'no', ''],
    default: '',
  },
  nabhCertNumber: {
    type: String,
    default: '',
  },
  isoAccreditation: {
    type: String,
    enum: ['yes', 'no', ''],
    default: '',
  },
  isoCertNumber: {
    type: String,
    default: '',
  },

  // --- Documents ---
  hospitalLicense: {
    type: String, // store file path or Cloud URL
    required: false,
  },
  registrationCertificate: {
    type: String,
    required: false,
  },
  bloodBankLicenseFile: {
    type: String,
    required: false,
  },
  hospitalPhoto: {
    type: String,
    required: false,
  },
  bloodBankLicense: {
    type: String,
    required: false,
  },

  // --- Security ---
  password: {
    type: String,
    required: true,
  },

  // --- Terms and Privacy ---
  termsAccepted: {
    type: Boolean,
    required: true,
  },
  privacyAccepted: {
    type: Boolean,
    required: true,
  },

  // --- System Metadata ---
  referenceId: {
    type: String,
    default: function () {
      const timestamp = Date.now().toString(36);
      const random = Math.random().toString(36).substring(2, 7);
      // ✅ FIXED: Use backticks for string interpolation
      return `HSP-${(timestamp + random).toUpperCase()}`;
    },
    unique: true,
  },
  verificationStatus: {
    type: String,
    enum: ['PENDING', 'APPROVED', 'REJECTED'],
    default: 'PENDING',
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports=mongoose.model("Hospital", hospitalSchema);