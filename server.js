const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// dot env config
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465, // Use 587 for TLS
  secure: true, // false for TLS, true for SSL
  auth: {
    user: `${process.env.GMAIL_USER}`, // Your email
    pass: `${process.env.GMAIL_PASS}`, // Your email password or app-specific password
  },
});

app.post('/send-email', async (req, res) => {
  const { name, email, phone, message } = req.body;

  const mailOptions = {
    from: email, // User's email
    to: 'kittujindal09@gmail.com', // Your email where messages will be sent
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
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.HOST}:${process.env.PORT}`);
});
