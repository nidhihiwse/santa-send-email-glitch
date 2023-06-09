const { getAllRecords, removeAllRecords } = require('./DB');
const nodemailer = require('nodemailer');


module.exports = {
    sendEmail: () => {

        console.log("sending emails...")

        let usersToSendEmail = getAllRecords()
        console.log(usersToSendEmail)
        if(usersToSendEmail.length == 0) return;

        var mailMessage = "";
        usersToSendEmail.forEach((user) => {
            mailMessage += "Children Name: "+user.id
            mailMessage += "\nAddress: "+user.address
            mailMessage += "\nMessage: "+user.message
            mailMessage += "\n================="
        });
        console.log(mailMessage);

        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
            user: 'morton.pouros@ethereal.email',
            pass: '7X8K1GkwHUdhfyNyFr',
            },
        });
        
        const message = {
            from: ' do_not_reply@northpole.com',
            to: 'santa@northpole.com',
            subject: 'Childers messages',
            text: mailMessage,
        };
        
        // Send the email
        transporter.sendMail(message, (err, info) => {
            if (err) {
                console.error('Error sending email:', err);
            } else {
                removeAllRecords()
                console.log('Email sent successfully!\n\n'+mailMessage);
                console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
            }
        });


    }
}