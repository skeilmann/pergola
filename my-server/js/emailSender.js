const nodemailer = require('nodemailer');

// Configure the email transporter
// TODO: Replace these placeholder values with your actual SMTP settings
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // e.g., 'smtp.gmail.com' for Gmail
    port: 587,
    secure: false, // Use TLS
    auth: {
        user: 'gheorghe.cazacu.cimislia@gmail.com', // Your full email address
        pass: '9fJx33rPoiR1MkJb' // Your email password or app-specific password
    }
});

function sendConfirmationEmail(email, name) {
    const mailOptions = {
        from: 'gheorghe.cazacu.cimislia@gmail.com', // Should be the same as the 'user' in the transporter configuration
        to: email,
        subject: 'Confirmare formular pergolă',
        text: `Dragă ${name},\n\nVă mulțumim pentru completarea formularului nostru pentru pergolă. Am primit cu succes solicitarea dumneavoastră și vom reveni în curând cu mai multe informații.\n\nCu stimă,\nEchipa Pergolă`
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                reject(error);
            } else {
                console.log('Email sent:', info.response);
                resolve(info);
            }
        });
    });
}

module.exports = {
    sendConfirmationEmail
};