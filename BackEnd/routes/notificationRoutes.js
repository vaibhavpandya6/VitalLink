const express = require('express');
const { sendNewsNotification } = require('../controllers/notificationController');

const router = express.Router();

// ✅ POST /api/notifications/send-alert
router.post('/send-alert', (req, res) => {
  const { title, city, patientsAffected, bloodNeeded } = req.body;

  const alert = {
    title: title || "Accident Alert",
    city: city || "Unknown",
    time: new Date().toLocaleTimeString(),
    patientsAffected: patientsAffected || 0,
    bloodNeeded: bloodNeeded || ["O+", "A+"],
  };

  // emit alert through socket.io
  if (global.io) {
    global.io.emit("accident_alert", alert);
    console.log("🚨 Alert sent via socket:", alert);
  } else {
    console.error("❌ Socket.io not initialized!");
  }

  return res.status(200).json({ success: true, alert });
});

// ✅ GET /api/notifications/accident-news
router.get('/accident-news', sendNewsNotification);

module.exports = router;
