const express = require('express');

const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');

const mailSender = require('./config/email-config');
const serverConfig = require('./config/server-config');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, async () => {
    console.log(`Service is running on port ${ServerConfig.PORT}`);
    try {
        const response = await mailSender.sendMail({
            from: serverConfig.EMAIL,
            to: 'eduwiretech@gmail.com',
            subject: 'Email from Nodemailer',
            text: 'Hi, this email is from Nodemailer'
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
   
});
