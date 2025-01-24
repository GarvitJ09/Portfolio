const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465, // Use 587 for TLS
  secure: true, // false for TLS, true for SSL
  auth: {
    user: process.env.GMAIL_USER, // Your email
    pass: process.env.GMAIL_PASS, // Your email password or app-specific password
  },
});

module.exports = async (req, res) => {
  const { name, email, phone, message } = req.body;

  const mailOptions = {
    from: email, // User's email
    to: 'kittujindal09@gmail.com', // Your email
    subject: `New Contact Form Submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res
      .status(200)
      .send({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send({ success: false, message: 'Failed to send email.' });
  }
};
