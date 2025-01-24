const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const sendMail = require('./api/sendMail');

// Load environment variables
dotenv.config();

const app = express();

app.use(
  cors({
    origin: '*', // Allow all origins (use specific origins for better security in production)
  })
);
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Define API routes
app.post('/api/send-email', sendMail);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
