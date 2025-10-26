const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');
const axios = require('axios');
const cron = require('node-cron');

// Local Imports
const connectDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const { getAccidentNews } = require('./services/newsService');

// --- Initialization & Config ---
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// --- Database Connection ---
connectDB();

// --- Core Middleware ---
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// --- HTTP Server & Socket.IO Setup ---
// Create HTTP server for Socket.IO
const server = http.createServer(app);

// Attach Socket.IO to the server
const io = new Server(server, {
  cors: {
    origin: "*", // Adjust for production, e.g., "http://localhost:5173"
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket", "polling"], // Allow fallback
});
global.io = io;
// Socket.IO connection handler
io.on("connection", (socket) => {
  console.log("🟢 Client connected:", socket.id);
  socket.on("disconnect", () => console.log("🔴 Disconnected:", socket.id));
});

// --- API Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/notifications', notificationRoutes);

// POST endpoint to broadcast alerts
app.post("/api/notifications/send-alert", (req, res) => {
  const alert = {
    title: req.body.title || "Accident Alert",
    city: req.body.city || "Unknown",
    time: new Date().toLocaleTimeString(),
    patientsAffected: req.body.patientsAffected || 0,
    bloodNeeded: req.body.bloodNeeded || ["O+", "A+"],
  };

  io.emit("accident_alert", alert); // Use the 'io' instance
  console.log("🚨 Sent alert:", alert);
  res.json({ success: true, alert });
});

// --- Basic & Healthcheck Routes ---
app.get("/", (req, res) => res.send(`Server active on port ${PORT}`));

app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
  });
});

// --- Error Handling (Must be after all routes) ---

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : {},
  });
});

// --- Start Server ---
// Use 'server.listen' instead of 'app.listen' to run the server with Socket.IO
server.listen(PORT, () => {
  console.log(`✓ Server running on port ${PORT}`);
});