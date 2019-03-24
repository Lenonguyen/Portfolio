const nodemailer = require('nodemailer');

const key = require('./key');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: key.user,
        pass: key.password
    }
});

sendMail = (from, to, subject, text, html) => {
    let result = "OK";
    var mailOptions = {
        from,
        to,
        subject,
        html,
        text
    };

    try {
        transporter.sendMail(mailOptions, (err, info) => {
            const time = new Date();
            if (err) {
                result = new Error('error!');
            } else {
                console.log(info);
            }
            console.log(time);
        });
    }
    catch(e){
        result="Error"
    }
    return result;
}
module.exports = {sendMail}