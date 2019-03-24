const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const mailServices = require('./mail');
const key = require('./key');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname)));

app.get('/', (req,res) => {
    res.send('Hello');
});

app.post('/sendMail', (req,res)=>{
    console.log(req.body);

    let result1 = mailServices.sendMail(key.user, req.body.email, 'Test String', `<h4>Hi ${req.body.name},</h4><br><p>Thank you for contacting me, I will get back to you as soon as possible.</p><br><p>Best regards,</p><p>Dang</p>`, '');
    let result2 = mailServices.sendMail(key.user, key.user, `From ${req.body.name}`, `<p>${req.body.message}</p><br><p>From ${req.body.email}</p>`, '');

    if (result1 === "Error" || result2 === "Error") {
        res.sendStatus(500);
    }
    else {
        res.sendFile(path.join(__dirname+'/mail.html'));
        console.log(req.body);
    }
});

app.listen(PORT, () => {console.log('Server started')});

