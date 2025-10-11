const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client();

client.once('ready', () => {
    console.log('Client is ready!');
});

client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
});

client.on('message', message => {
	console.log(message.body);
});

client.on('message', message => {
    if((message.body).toUpperCase() === 'OI') {
        client.sendMessage(message.from, 'Oi');
    }
})

client.initialize();