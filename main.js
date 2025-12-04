const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client();

const messages = {
  perguntar_remedio: 'Qual remédio e dosagem usa atualmente?',
  perguntar_tempo_de_uso: 'Desde quando usa este remédio?',
  perguntar_diagnostico: 'Qual o diagnóstico foi te dado na ocasião em que começou?',
  perguntar_satisfacao_tratamento: 'Sente-se satisfeito com o tratamento atual?',
  perguntar_novo_sintoma: 'Tem algum sintoma novo, sintoma que tenha voltado ou agravado que sente que é importante compartilhar comigo?',
  perguntar_sintomas_graves: 'Você tem bipolaridade ou esquizofrenia? Já foi internado em hospital psiquiátrico?',
  finalizado_aprovado: 'Parabéns, você foi aprovado.'
};

const stateFlow = [
  'perguntar_remedio',
  'perguntar_tempo_de_uso',
  'perguntar_diagnostico',
  'perguntar_satisfacao_tratamento',
  'perguntar_novo_sintoma',
  'perguntar_sintomas_graves',
  'finalizado_aprovado'
];

class Chat {
  constructor(id, client) {
    this.id = id;
    this.client = client;
    this.step = 0;
    this.answers = {};
  }

  get currentState() {
    return stateFlow[this.step];
  }

  get nextState() {
    return stateFlow[this.step + 1];
  }

  async handleMessage(messageText) {
    const currentKey = this.currentState;

    if (this.step > 0 && currentKey) {
      this.answers[currentKey] = messageText;
    }

    if (this.nextState) {
      this.step++;
      const nextKey = this.currentState;
      await this.client.sendMessage(this.id, messages[nextKey]);
    } else {
      await this.client.sendMessage(this.id, '✅ Fim do questionário!');
      console.log(`🗂️ Respostas de ${this.id}:`, this.answers);
      this.reset();
    }
  }

  async start() {
    await this.client.sendMessage(this.id, messages[this.currentState]);
  }

  reset() {
    this.step = 0;
    this.answers = {};
  }
}

const chats = new Map();

client.on('qr', (qr) => qrcode.generate(qr, { small: true }));

client.once('ready', () => {
  console.log('✅ Bot pronto!');
});

client.on('message', async (message) => {
  if (message.fromMe) return;
  const userId = message.from;

  if (!chats.has(userId)) {
    const newChat = new Chat(userId, client);
    chats.set(userId, newChat);
    await newChat.start();
  } else {
    const chat = chats.get(userId);
    await chat.handleMessage(message.body);
  }
});

client.initialize();
