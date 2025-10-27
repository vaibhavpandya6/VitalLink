const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

// Create the "transporter" - this is the service that will send the email
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use other services like SendGrid, Mailgun
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Your App Password
  },
});

/**
 * Sends an email.
 * @param {string|string[]} to - The recipient's email or an array of emails.
 * @param {string} subject - The subject line.
 * @param {string} html - The HTML body of the email.
 */
const sendEmail = async (to, subject, html) => {
  try {
    const mailOptions = {
      from: `"VitalLink Alerts" <${process.env.EMAIL_USER}>`,
      to: to,       // This can be a single email or comma-separated string
      subject: subject,
      html: html,
    };

    await transporter.sendMail(mailOptions);
    console.log(`📧 Email sent successfully to: ${to}`);
  } catch (error) {
    console.error('❌ Error sending email:', error);
    throw new Error('Email sending failed');
  }
};

module.exports = { sendEmail };