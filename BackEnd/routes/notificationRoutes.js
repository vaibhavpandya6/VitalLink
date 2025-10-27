const express = require('express');
const { sendNewsNotification } = require('../controllers/notificationController');
const { sendEmail } = require('../services/emailService'); // 1. Import sendEmail
const User = require('../models/User'); // 2. Import your User model (check your path)

const router = express.Router();

// ✅ POST /api/notifications/send-alert
// We make this an 'async' function to use 'await'
router.post('/send-alert', async (req, res) => { // 3. Make it async
  try {
    // --- Existing Socket.IO Logic ---
    const { title, city, patientsAffected, bloodNeeded } = req.body;
    const alert = {
      title: title || "Accident Alert",
      city: city || "Unknown",
      time: new Date().toLocaleTimeString(),
      patientsAffected: patientsAffected || 0,
      bloodNeeded: bloodNeeded || ["O+", "A+"],
    };

    const io = req.io; // Get 'io' from middleware (the better way)
    if (global.io) {
      global.io.emit("accident_alert", alert);
      console.log("🚨 Alert sent via socket:", alert);
    } else {
      console.error("❌ Socket.io not initialized!");
    }

    // --- New Email Logic ---
    
    // 4. Fetch all registered user emails from your database
    const users = await User.find({}, 'email'); // Fetches only the email field
    
    if (!users || users.length === 0) {
      console.log('No users found to email.');
      // We still return success because the socket alert worked
      return res.status(200).json({ success: true, alert, emailStatus: 'No users to email.' });
    }

    // 5. Get an array of just the email strings
    const emailList = users.map(user => user.email);

    // 6. Create the email content
    const subject = `🚨 URGENT: ${alert.title}`;
    const html = `
      <h1>VitalLink Emergency Alert</h1>
      <p>An urgent situation has been reported.</p>
      <ul>
        <li><strong>Title:</strong> ${alert.title}</li>
        <li><strong>City:</strong> ${alert.city}</li>
        <li><strong>Patients Affected:</strong> ${alert.patientsAffected}</li>
        <li><strong>Blood Needed:</strong> ${alert.bloodNeeded.join(', ')}</li>
        <li><strong>Time:</strong> ${alert.time}</li>
      </ul>
      <p>Your help may be needed. Please check the app for more details.</p>
    `;

    // 7. Send the email to all users
    // We send to `emailList` which Nodemailer handles as a bulk "to"
    await sendEmail(emailList, subject, html);

    // 8. Send the final success response
    return res.status(200).json({ 
      success: true, 
      alert, 
      emailStatus: `Email sent to ${emailList.length} users.` 
    });

  } catch (error) {
    // Handle errors (e.g., DB failed or email failed)
    console.error('Error in /send-alert route:', error);
    return res.status(500).json({
      success: false,
      message: 'Request failed.',
      error: error.message,
    });
  }
});

// ✅ GET /api/notifications/accident-news
router.get('/accident-news', sendNewsNotification);

module.exports = router;
 