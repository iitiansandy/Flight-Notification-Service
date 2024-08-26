const express = require('express');
const amqplib = require('amqplib');
const { ServerConfig } = require('./config');

const { EmailService } = require('./services');
const apiRoutes = require('./routes');

async function connectQueue() {
    try {
        const connection = await amqplib.connect("amqp://localhost");
        const channel = await connection.createChannel();
        await channel.assertQueue("noti-queue");
        await channel.consume("noti-queue", async (data) => {
            const obj = JSON.parse(`${Buffer.from(data.content)}`);
            await EmailService.sendEmail("sandeep.sid.kumar10@gmail.com", obj.recepientEmail, obj.subject, obj.text);
            channel.ack(data);
        });
    } catch (error) {
        console.log(error);
    }
};

const mailSender = require('./config/email-config');
const serverConfig = require('./config/server-config');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, async () => {
    console.log(`Service is running on port ${ServerConfig.PORT}`);
    await connectQueue();
    console.log("RabbitMQ is up and connected");
});
