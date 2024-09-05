const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'keerthimanoharreddy@gmail.com',
    pass: 'vrqx fucs vqyu hovm',
  },
});

app.post('/subscribe', (req, res) => {
  // Extract the user's email from the request body
  const userEmail = req.body['contact[email]'];

  // Set up email options
  const mailOptions = {
    from: 'keerthimanoharreddy@gmail.com',
    to: userEmail,
    subject: 'Subscription Confirmation',
    text: 'You have been subscribed successfully!',
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).send('Error sending email');
    }
    console.log('Email sent:', info.response);
    res.status(200).send('Subscription successful');
  });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
