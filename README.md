<h1 align="center">✅ WhatsApp Triage Bot — Questionário Automatizado</h1>

<p align="center">
  Um bot de WhatsApp que conduz um questionário de triagem clínica via mensagens, gerando QR Code para login e mantendo o estado de cada conversa individualmente. Construído com <code>whatsapp-web.js</code> + Node.js. 📱⚡
</p>

---

### 📌 Tecnologias Utilizadas

#### 🖥️ Interface / Bot
<div>
  <img align="center" alt="JavaScript" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg">
  <span style="margin-left:8px;">whatsapp-web.js</span>
</div>

#### 🛠️ Backend
<div>
  <img align="center" alt="NodeJS" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg">
  <span style="margin-left:8px;">qrcode-terminal</span>
</div>

---

### ✨ Funcionalidades

✔ Login via QR Code direto no terminal  
✔ Fluxo de perguntas guiado em português com estado por usuário (Map em memória)  
✔ Lógica de máquina de estados simples (`stateFlow`, `currentState`, `nextState`) para saber qual pergunta enviar a cada etapa  
✔ Armazena todas as respostas do contato em um objeto e loga no console ao final  
✔ Ignora mensagens enviadas por você mesmo (`fromMe`)  
✔ Fácil de extender: ajuste a ordem em `stateFlow` e o texto em `messages`

---

### 🗂️ Estrutura Simplificada

- `main.js`: núcleo do bot, definição do fluxo, listeners e envio de mensagens
- `package.json`: scripts (`npm start`) e dependências (`whatsapp-web.js`, `qrcode-terminal`)

---

## 🚀 Como executar o projeto na sua máquina

#### 🔹 Clonar o projeto

```bash
git clone https://github.com/SEU-USUARIO/SEU-REPO.git
cd SEU-REPO
```

#### 📌 Pré-requisitos
- Node.js instalado ✅
- WhatsApp no celular com conta ativa ✅
- Terminal com acesso à internet para parear o QR Code ✅

#### 🔹 Instalar dependências
```bash
npm install
```

#### 🔹 Iniciar o bot
```bash
npm start
```

- Um QR Code aparecerá no terminal. Abra o WhatsApp no celular → Ajustes/Configurações → Dispositivos Conectados → Conectar dispositivo e escaneie o código.
- Envie qualquer mensagem para o número vinculado; o bot inicia o questionário automaticamente e envia a próxima pergunta a cada resposta.
- Ao finalizar, as respostas completas são exibidas no terminal.

---

### 🧩 Personalizando o fluxo

- Perguntas e textos: edite o objeto `messages` em `main.js`.
- Ordem das etapas: ajuste o array `stateFlow` (a posição define a sequência).
- Ações no término: personalize o bloco que roda quando `nextState` não existe (ex.: salvar em banco, chamar API).

---

### 🧠 Como a máquina de estados funciona

- A sequência de etapas vive no array `stateFlow` em `main.js`.
- O getter `currentState` retorna a chave da pergunta atual; `nextState` aponta para a próxima.
- Cada contato tem uma instância da classe `Chat`, guardada no `Map chats`, mantendo `step` e `answers`.
- Ao receber uma mensagem, o bot salva a resposta no estado corrente, avança o `step` e envia a próxima pergunta. Quando não há `nextState`, finaliza e registra as respostas.

---

### 🛠️ Scripts

- `npm start` — inicia o bot e exibe o QR Code.
- `npm test` — (placeholder) não há testes configurados ainda.

---

👨‍💻 Autor

Miguel Felipe da Silva  
📎 LinkedIn: https://www.linkedin.com/in/miguel-felipe-aab18523a/
