const nodemailer = require('nodemailer');
const emailConfig = require('./emailConfig');

// Create a transporter
const transporter = nodemailer.createTransport(emailConfig);

// Function to send email notifications
const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: emailConfig.auth.user,
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

module.exports = sendEmail;

