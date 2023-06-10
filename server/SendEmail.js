const { getAllRecords, removeAllRecords } = require('./DB');
const nodemailer = require('nodemailer');


module.exports = {
    sendEmail: () => {

        let usersToSendEmail = getAllRecords()
        if(usersToSendEmail.length == 0) {
            console.log("tried to send emails, but no pending message")
            return;
        } else {
            console.log("sending email to santa...")
            removeAllRecords()
        }

        var mailMessage = "";
        usersToSendEmail.forEach((user) => {
            mailMessage += "\nChildren Name: "+user.id
            mailMessage += "\nAddress: "+user.address
            mailMessage += "\nMessage: "+user.message
            mailMessage += "\n================="
        });

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
                console.log(usersToSendEmail.length+' messages sent successfully! Preview URL for mail: => \n', nodemailer.getTestMessageUrl(info));
            }
        });


    }
}