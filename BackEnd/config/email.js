const nodemailer = require('nodemailer');

// Create email transporter
const createTransporter = () => {
  // Option 1: Using Gmail
  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // your-email@gmail.com
      pass: process.env.EMAIL_PASSWORD, // App password (not regular password)
    },
  });

  // Option 2: Using custom SMTP
  /*
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  */
};

module.exports = createTransporter;