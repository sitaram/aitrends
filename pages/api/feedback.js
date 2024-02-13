// pages/api/feedback.js

import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { feedback, email, name } = req.body;

    try {
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER, // Accessing the sender's email from environment variables
          pass: process.env.EMAIL_PASS, // Accessing the sender's password from environment variables
        },
      });

      let mailOptions = {
        from: `"Feedback Form" <${process.env.EMAIL_USER}>`, // Using the sender's email from environment variables
        to: process.env.EMAIL_TO, // Accessing the recipient's email from environment variables
        subject: 'New Feedback Submitted',
        text: `Feedback from ${name} (${email}): ${feedback}`,
        html: `<b>Feedback from ${name} (${email}):</b> <p>${feedback}</p>`,
      };

      let info = await transporter.sendMail(mailOptions);

      console.log('Message sent: %s', info.messageId);

      res.status(200).json({ message: 'Feedback received and emailed successfully' });
    } catch (error) {
      console.error('Email send error:', error);
      res.status(500).json({ message: 'Failed to send feedback via email', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
