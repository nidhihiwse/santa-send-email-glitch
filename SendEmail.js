const nodemailer = require('nodemailer');

// Create a nodemailer transporter with Ethereal Email credentials
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'morton.pouros@ethereal.email',
    pass: '7X8K1GkwHUdhfyNyFr',
  },
});

// Create an email message
const message = {
  from: ' do_not_reply@northpole.com',
  to: 'santa@northpole.com',
  subject: 'Hello from Nodemailer',
  text: 'This is a test email',
};

// Send the email
transporter.sendMail(message, (err, info) => {
  if (err) {
    console.error('Error sending email:', err);
  } else {
    console.log('Email sent successfully!');
    console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
  }
});
