const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(bodyParser.json());


const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: 'keerthimanoharreddy@gmail.com', 
    pass: 'ntkd tmrt foit dpgg',  
  },
});

app.post('/send-email', (req, res) => {
    const { email } = req.body;
  
    const mailOptions = {
      from: 'keerthimanoharreddy@gmail.com',
      to: email,
      subject: 'Thank You for Subscribing!',
      text: 'Thank you for subscribing to our newsletter!',
      html: '<strong>Thank you for subscribing to our newsletter!</strong>',
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Failed to send email.' });
      }
  
      // Send a success response to the client
      res.json({ success: true, message: 'Email sent successfully!' });
    });
  });
  
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
