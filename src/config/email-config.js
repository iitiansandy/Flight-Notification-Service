const nodemailer = require('nodemailer');

const { GMAIL_PASS, EMAIL } = require('./server-config');

const mailSender = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: EMAIL,
        pass: GMAIL_PASS
    }
});

module.exports = mailSender;