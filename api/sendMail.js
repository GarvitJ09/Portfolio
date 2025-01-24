const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables

// Create transporter with Gmail SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465, // Use 587 for TLS
  secure: true, // false for TLS, true for SSL
  auth: {
    user: process.env.GMAIL_USER, // Your email
    pass: process.env.GMAIL_PASS, // Your email password or app-specific password
  },
});

// Export the function to send an email
module.exports = async (req, res) => {
  const { name, email, phone, message } = req.body;

  // Input validation
  if (!name || !email || !phone || !message) {
    return res
      .status(400)
      .send({ success: false, message: 'All fields are required.' });
  }

  const mailOptions = {
    from: email, // Sender's email
    to: 'kittujindal09@gmail.com', // Recipient's email
    subject: `New Contact Form Submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
  };

  try {
    // Send the email using async/await
    await transporter.sendMail(mailOptions);
    return res
      .status(200)
      .send({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);

    // Simplified error handling
    if (error.responseCode === 550) {
      return res.status(500).send({
        success: false,
        message:
          'Email address not recognized. Please check the recipient email address.',
      });
    }

    if (error.responseCode === 421) {
      return res.status(500).send({
        success: false,
        message: 'Service temporarily unavailable. Please try again later.',
      });
    }

    if (['ENOTFOUND', 'ECONNREFUSED'].includes(error.code)) {
      return res.status(500).send({
        success: false,
        message:
          'Network error. Unable to reach the email server. Please check your internet connection.',
      });
    }

    if (error.code === 'EAUTH') {
      return res.status(500).send({
        success: false,
        message:
          'Authentication failed. Please check your email credentials (user and app password).',
      });
    }

    // Default error handler for unexpected errors
    return res.status(500).send({
      success: false,
      message: `An unexpected error occurred: ${error.message || error}`,
    });
  }
};
