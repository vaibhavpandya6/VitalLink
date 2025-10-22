const welcomeEmailTemplate = (userName, userEmail) => {
  return {
    subject: 'Welcome to VitalLink - Emergency Blood Donation Network',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .logo { font-size: 32px; font-weight: bold; margin-bottom: 10px; }
          .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; }
          .button { display: inline-block; background: #dc2626; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { background: #f3f4f6; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; font-size: 12px; color: #6b7280; }
          .alert-box { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; }
          .feature { display: flex; margin: 15px 0; }
          .feature-icon { background: #fee2e2; color: #dc2626; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; font-size: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">🩸 VitalLink</div>
            <p style="margin: 0; font-size: 16px;">Emergency Blood Donation Network</p>
          </div>
          
          <div class="content">
            <h2 style="color: #dc2626;">Welcome, ${userName}!</h2>
            <p>Thank you for joining VitalLink - India's premier emergency blood donation network. Your registration has been successfully completed.</p>
            
            <div class="alert-box">
              <strong>🚨 You're Now Part of Our Emergency Response Team</strong>
              <p style="margin: 5px 0 0 0;">You will receive instant notifications about blood emergencies in your area where your blood group is needed.</p>
            </div>

            <h3 style="color: #dc2626;">What Happens Next?</h3>
            
            <div class="feature">
              <div class="feature-icon">📧</div>
              <div>
                <strong>Emergency Alerts</strong>
                <p style="margin: 5px 0 0 0;">Get real-time email and app notifications for critical blood needs</p>
              </div>
            </div>

            <div class="feature">
              <div class="feature-icon">🏥</div>
              <div>
                <strong>Hospital Network</strong>
                <p style="margin: 5px 0 0 0;">Book donation slots at verified partner hospitals near you</p>
              </div>
            </div>

            <div class="feature">
              <div class="feature-icon">🏆</div>
              <div>
                <strong>Track Your Impact</strong>
                <p style="margin: 5px 0 0 0;">Earn badges and see how many lives you've saved</p>
              </div>
            </div>

            <h3 style="color: #dc2626;">Your Account Details</h3>
            <p><strong>Email:</strong> ${userEmail}<br>
            <strong>Registered:</strong> ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>

            <center>
              <a href="${process.env.FRONTEND_URL}/dashboard" class="button">Go to Dashboard</a>
            </center>

            <p style="margin-top: 30px; color: #6b7280; font-size: 14px;">
              <strong>Important:</strong> Please ensure your contact information is always up to date so we can reach you during emergencies.
            </p>
          </div>
          
          <div class="footer">
            <p><strong>VitalLink - Saving Lives Together</strong></p>
            <p>Emergency Helpline: 1800-123-4567 | Email: support@vitallink.com</p>
            <p>© 2025 VitalLink. All rights reserved.</p>
            <p style="margin-top: 10px;">
              <a href="${process.env.FRONTEND_URL}/privacy" style="color: #6b7280; margin: 0 10px;">Privacy Policy</a> | 
              <a href="${process.env.FRONTEND_URL}/unsubscribe" style="color: #6b7280; margin: 0 10px;">Unsubscribe</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `Welcome to VitalLink, ${userName}!\n\nThank you for joining our emergency blood donation network. You will now receive notifications about blood emergencies in your area.\n\nAccount Email: ${userEmail}\n\nVisit your dashboard: ${process.env.FRONTEND_URL}/dashboard\n\nVitalLink - Saving Lives Together`,
  };
};

// Emergency Alert Email Template
const emergencyAlertEmailTemplate = (userName, bloodGroup, emergencyDetails) => {
  return {
    subject: `🚨 URGENT: ${emergencyDetails.bloodGroup} Blood Needed - ${emergencyDetails.location}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .emergency-header { background: linear-gradient(135deg, #dc2626 0%, #7f1d1d 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; animation: pulse 2s infinite; }
          .critical-badge { background: #fbbf24; color: #7f1d1d; padding: 8px 16px; border-radius: 20px; font-weight: bold; display: inline-block; margin-bottom: 10px; }
          .content { background: #ffffff; padding: 30px; border: 2px solid #dc2626; }
          .emergency-box { background: #fee2e2; border: 2px solid #dc2626; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .detail-row { display: flex; justify-content: space-between; padding: 10px; border-bottom: 1px solid #e5e7eb; }
          .respond-button { display: inline-block; background: #dc2626; color: white; padding: 15px 40px; text-decoration: none; border-radius: 8px; margin: 20px 0; font-size: 18px; font-weight: bold; }
          .footer { background: #f3f4f6; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; font-size: 12px; color: #6b7280; }
          .hospital-list { background: #f9fafb; padding: 15px; border-radius: 8px; margin: 15px 0; }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="emergency-header">
            <div class="critical-badge">🚨 LIVE EMERGENCY</div>
            <h1 style="margin: 10px 0; font-size: 28px;">CRITICAL BLOOD NEEDED</h1>
            <p style="margin: 5px 0; font-size: 18px;">${emergencyDetails.title}</p>
          </div>
          
          <div class="content">
            <p style="font-size: 18px;"><strong>Hello ${userName},</strong></p>
            <p style="font-size: 16px; color: #dc2626;">
              <strong>Your blood group (${bloodGroup}) is urgently needed!</strong>
            </p>

            <div class="emergency-box">
              <h3 style="color: #dc2626; margin-top: 0;">Emergency Details</h3>
              
              <div class="detail-row">
                <span><strong>📍 Location:</strong></span>
                <span>${emergencyDetails.location}</span>
              </div>
              
              <div class="detail-row">
                <span><strong>🩸 Blood Group Needed:</strong></span>
                <span style="color: #dc2626; font-weight: bold;">${emergencyDetails.bloodGroup}</span>
              </div>
              
              <div class="detail-row">
                <span><strong>⏰ Time:</strong></span>
                <span>${emergencyDetails.time}</span>
              </div>
              
              <div class="detail-row">
                <span><strong>👥 Patients Affected:</strong></span>
                <span>${emergencyDetails.patientsAffected}</span>
              </div>
              
              <div class="detail-row" style="border-bottom: none;">
                <span><strong>🚨 Severity:</strong></span>
                <span style="color: #dc2626; font-weight: bold;">${emergencyDetails.criticality}</span>
              </div>
            </div>

            <h3 style="color: #dc2626;">Nearest Hospitals Accepting Donors</h3>
            <div class="hospital-list">
              ${emergencyDetails.hospitals.map(hospital => `
                <div style="padding: 10px; border-bottom: 1px solid #e5e7eb;">
                  <strong>${hospital.name}</strong><br>
                  <span style="color: #6b7280; font-size: 14px;">${hospital.address}</span><br>
                  <span style="color: #059669; font-size: 14px;">✓ Available Slots: ${hospital.slots.join(', ')}</span>
                </div>
              `).join('')}
            </div>

            <center>
              <a href="${process.env.FRONTEND_URL}/dashboard" class="respond-button">
                🚨 RESPOND NOW
              </a>
            </center>

            <p style="background: #fef3c7; padding: 15px; border-left: 4px solid #f59e0b; margin: 20px 0;">
              <strong>⚡ Every Second Counts!</strong><br>
              Click the button above to book your donation slot immediately and help save lives.
            </p>

            <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
              If you cannot donate at this time, please ignore this email. You can update your availability preferences in your dashboard settings.
            </p>
          </div>
          
          <div class="footer">
            <p><strong>VitalLink Emergency Response System</strong></p>
            <p>24/7 Helpline: 1800-123-4567 | Emergency: emergency@vitallink.com</p>
            <p>© 2025 VitalLink. Saving Lives Together.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `🚨 URGENT BLOOD NEEDED\n\nHello ${userName},\n\nYour blood group (${bloodGroup}) is critically needed!\n\nEmergency: ${emergencyDetails.title}\nLocation: ${emergencyDetails.location}\nTime: ${emergencyDetails.time}\nPatients: ${emergencyDetails.patientsAffected}\n\nRespond now: ${process.env.FRONTEND_URL}/dashboard\n\nVitalLink Emergency Response`,
  };
};

// Donation Confirmation Email
const donationConfirmationEmailTemplate = (userName, donationDetails) => {
  return {
    subject: '✅ Donation Slot Confirmed - Thank You for Saving Lives!',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #059669 0%, #047857 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .checkmark { font-size: 60px; margin-bottom: 10px; }
          .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; }
          .details-box { background: #f0fdf4; border: 2px solid #059669; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .detail-row { padding: 12px 0; border-bottom: 1px solid #d1fae5; }
          .button { display: inline-block; background: #059669; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { background: #f3f4f6; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; font-size: 12px; color: #6b7280; }
          .tip-box { background: #dbeafe; border-left: 4px solid #3b82f6; padding: 15px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="checkmark">✅</div>
            <h1 style="margin: 10px 0;">Slot Confirmed!</h1>
            <p style="margin: 0;">Thank you for being a lifesaver</p>
          </div>
          
          <div class="content">
            <h2 style="color: #059669;">Dear ${userName},</h2>
            <p>Your blood donation slot has been successfully confirmed. You're making a life-saving difference!</p>

            <div class="details-box">
              <h3 style="color: #059669; margin-top: 0;">Appointment Details</h3>
              
              <div class="detail-row">
                <strong>🏥 Hospital:</strong> ${donationDetails.hospital}
              </div>
              
              <div class="detail-row">
                <strong>📅 Date:</strong> ${donationDetails.date}
              </div>
              
              <div class="detail-row">
                <strong>⏰ Time:</strong> ${donationDetails.time}
              </div>
              
              <div class="detail-row">
                <strong>📍 Address:</strong> ${donationDetails.address}
              </div>
              
              <div class="detail-row" style="border-bottom: none;">
                <strong>🩸 Blood Group:</strong> ${donationDetails.bloodGroup}
              </div>
            </div>

            <div class="tip-box">
              <h4 style="margin-top: 0; color: #3b82f6;">💡 Before You Donate</h4>
              <ul style="margin: 10px 0; padding-left: 20px;">
                <li>Eat a healthy meal and stay hydrated</li>
                <li>Get adequate sleep the night before</li>
                <li>Bring a valid ID proof</li>
                <li>Avoid fatty foods before donation</li>
                <li>Inform staff of any medications you're taking</li>
              </ul>
            </div>

            <center>
              <a href="${process.env.FRONTEND_URL}/dashboard" class="button">View in Dashboard</a>
            </center>

            <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
              Need to reschedule? Contact us at support@vitallink.com or call 1800-123-4567
            </p>
          </div>
          
          <div class="footer">
            <p><strong>VitalLink - Saving Lives Together</strong></p>
            <p>Helpline: 1800-123-4567 | Email: support@vitallink.com</p>
            <p>© 2025 VitalLink. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };
};

module.exports = {
  welcomeEmailTemplate,
  emergencyAlertEmailTemplate,
  donationConfirmationEmailTemplate,
};
