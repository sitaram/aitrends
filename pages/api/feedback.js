// pages/api/feedback.js
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY); // Set your SendGrid API key in the .env.local file

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { feedback, email, name } = req.body;

    const message = {
      to: process.env.FEEDBACK_RECEIVER_EMAIL, // Set the receiver email address in your environment variables
      from: process.env.SENDGRID_VERIFIED_SENDER, // This must be a verified sender in your SendGrid account
      subject: 'New Feedback Submitted',
      text: `Feedback from ${name} (${email}): ${feedback}`,
      html: `<strong>Feedback from ${name} (${email}):</strong> <p>${feedback}</p>`,
    };

    try {
      await sgMail.send(message);
      res.status(200).json({ message: 'Feedback sent successfully' });
    } catch (error) {
      console.error('SendGrid error:', error);
      if (error.response) {
        console.error(error.response.body);
      }
      res.status(500).json({ message: 'Failed to send feedback', error: error.toString() });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
