const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint to handle form submission
app.post('/submit-comment', (req, res) => {
    const { userName, userEmail, commentMessage } = req.body;

    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Use your email service
        auth: {
            user: 'your-email@gmail.com', // Your email address
            pass: 'your-email-password' // Your email password or app password
        }
    });

    // Email options
    const mailOptions = {
        from: userEmail,
        to: 'your-email@gmail.com', // Your email address where you want to receive comments
        subject: 'New Comment Submitted',
        text: `Name: ${userName}\nEmail: ${userEmail}\nComment: ${commentMessage}`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Error sending email: ' + error.toString());
        }
        res.status(200).send('Comment submitted successfully!');
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});