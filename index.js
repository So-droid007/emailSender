const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const port = 5000;

// Express "Hello, World!" route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Nodemailer setup for sending emails
const emailTransporter = nodemailer.createTransport({
  service: 'Gmail', // Change to your email provider
  auth: {
    user: 'roysoumodip507@gmail.com', // Your email address
    pass: 'pzno bknv jdug drjp', // Your email password
  },
});

const emailData = {
  from: 'roysoumodip507@gmail.com', // Your email address
  subject: 'Subha Vijaya',
  text: 'Subha Vijaya to all!',
};

// An array of email addresses to send the email to
const recipients = ['roysoumodip507@gmail.com', 'sayantanghosh20000@gmail.com', /* Add all your email addresses here */];

// Express route to send "Subha Vijaya" email to multiple recipients
app.get('/send-email', (req, res) => {
  recipients.forEach((recipient) => {
    emailData.to = recipient;

    emailTransporter.sendMail(emailData, (error, info) => {
      if (error) {
        console.error(`Error sending email to ${recipient}: ${error.message}`);
      } else {
        console.log(`Email sent to ${recipient}: ${info.response}`);
      }
    });
  });

  res.send('Emails are being sent to recipients. Check the console for progress.');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
