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
    console.log('connected');
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.post('/sendMail', (req,res)=>{
    console.log(req.body);

    let result1 = mailServices.sendMail(key.user, req.body.email, 'Thank you!', `Hi ${req.body.name}, thank you for contacting me, I will get back to you as soon as possible. Best regards, Dang`, '');
    let result2 = mailServices.sendMail(key.user, 'lenonguyen@gmail.com', `From ${req.body.name}`, `${req.body.message}From ${req.body.email}`, '');
    console.log(req.body.name);
    if (result1 === "Error" || result2 === "Error") {
        res.sendStatus(500);
    }
    else {
        res.sendFile(path.join(__dirname+'/mail.html'));
        console.log(req.body);
    }
});

app.listen(PORT, () => {console.log('Server started')});

