const nodemailer = require('nodemailer');
const Queue1 = require('bull');

// Nodemailer setup for sending emails
const emailTransporter = nodemailer.createTransport({
  service: 'Gmail', // Change to your email provider
  auth: {
    user: 'roysoumodip507@gmail.com', // Your email address
    pass: 'bxgv krqj yxmo hcrc', // Your email password
  },
});

const queue = new Queue1('emailQueue', {
  redis: {
    port: 6379,
    host: 'localhost'
  }

});

const emailData = {
  from: 'roysoumodip507@gmail.com', // Your email address
  subject: 'Subha Vijaya',
  text: 'Subha Vijaya to all!',
};

const sendEmail = async (email) => {
  console.log(`Sending email to ${email}`);

  emailData.to = email; 

  try {
    const info = await emailTransporter.sendMail(emailData);
    console.log(`Email sent to ${email}: ${info.response}`);
  } catch (error) {
    console.error(`Failed to send email to ${email}: ${error}`);
  }
};


const recipients = ['roysoumodip507@gmail.com', 'sayantanghosh20000@gmail.com'];

// Express route to send "Subha Vijaya" email to multiple recipients
recipients.forEach((recipient) => {
  queue.add(recipient);
  console.log(`Added recipient ${recipient} to the queue`);
});

console.log('Processing emails...');

queue.process(async (job,done) => {
  await sendEmail(job.data);
  done()
  
});

