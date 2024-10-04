const nodemailer = require('nodemailer');

// Configure the email transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Replace with your SMTP host
    port: 587,
    secure: false, // Use TLS
    auth: {
        user: 'cazacu.lava@gmail.com', // Replace with your email
        pass: '22iunie2013LG' // Replace with your password
    }
});

function sendConfirmationEmail(email, name) {
    const mailOptions = {
        from: 'cazacu.lava@gmail.com', // Replace with your email
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