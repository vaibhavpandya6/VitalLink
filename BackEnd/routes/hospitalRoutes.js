const express = require("express");
const router = express.Router();


const upload = require("../middleware/upload");



const {
  registerHospital,
  loginHospital,
  getHospitalProfile,
} = require("../controllers/hospitalController");

const authMiddleware = require("../middleware/authMiddleware");

router.post(
  "/register",
  upload.fields([
    { name: "hospitalLicense", maxCount: 1 },
    { name: "registrationCertificate", maxCount: 1 },
    { name: "bloodBankLicenseFile", maxCount: 1 },
    { name: "hospitalPhoto", maxCount: 1 }
  ]),
  registerHospital
);
router.post("/login", loginHospital);
router.get("/dashboard", authMiddleware, getHospitalProfile);

module.exports = router;
