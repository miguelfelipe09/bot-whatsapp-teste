const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client();

const msg = {
    perguntar_remedio: 'Qual remédio e dosagem usa atualmente?',
    perguntar_tempo_de_uso: 'Desde quando usa este remédio?',
    perguntar_diagnostico: 'Qual o diagnóstico foi te dado na ocasião em que começou?',
    perguntar_satisfacao_tratamento: 'Sente-se satisfeito com o tratamento atual?',
    perguntar_novo_sintoma: 'Tem algum sintoma novo, sintoma que tenha voltado ou agravado que sente que é importante compartilhar comigo?',
    perguntar_sintomas_graves: 'Você tem bipolaridade ou esquizofrenia? Já foi internado em hospital psiquiátrico?',
    finalizado_aprovado: 'Parabéns, você foi aprovado.'
}

const state = {
    perguntar_remedio: 'perguntar_remedio',
    perguntar_tempo_de_uso: 'perguntar_tempo_de_uso',
    perguntar_diagnostico: 'perguntar_diagnostico',
    perguntar_satisfacao_tratamento: 'perguntar_satisfacao_tratamento',
    perguntar_novo_sintoma: 'perguntar_novo_sintoma',
    perguntar_sintomas_graves: 'perguntar_sintomas_graves',
    finalizado_aprovado: 'finalizado_aprovado'
}

let currentState = null;

client.once('ready', () => {
    console.log('Client is ready!');
});

client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
});

client.on('message_create', message => {
    const messageBody = message.body
    const msgLower = messageBody.toLowerCase();

    if(msgLower === 'oi') {
        currentState = state.perguntar_remedio;
    }

    if(message.fromMe) return;

    switch (currentState) {
        case state.perguntar_remedio:
            client.sendMessage(message.from, `${msg[currentState]}`);
            currentState = state.perguntar_tempo_de_uso;
            break;
        case state.perguntar_tempo_de_uso:
            client.sendMessage(message.from, `${msg[currentState]}`);
            currentState = state.perguntar_diagnostico;
            break;
        case state.perguntar_diagnostico:
            client.sendMessage(message.from, msg[currentState]);
            currentState = state.perguntar_satisfacao_tratamento;
            break;
        case state.perguntar_satisfacao_tratamento:
            client.sendMessage(message.from, msg[currentState]);
            currentState = state.perguntar_novo_sintoma;
            break;
        case state.perguntar_novo_sintoma:
            client.sendMessage(message.from, msg[currentState]);
            currentState = state.perguntar_sintomas_graves;
            break;
        case state.perguntar_sintomas_graves:
            client.sendMessage(message.from, msg[currentState]);
            currentState = state.finalizado_aprovado;
            break;
        case state.finalizado_aprovado:
            client.sendMessage(message.from, msg[currentState]);
            break;
        default:
            break;
    }
	console.log(message.body);
});

client.initialize();