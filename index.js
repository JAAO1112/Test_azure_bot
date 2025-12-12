const restify = require('restify');
const { BotFrameworkAdapter } = require('botbuilder');

// Configuración del adaptador
const adapter = new BotFrameworkAdapter({
  appId: process.env.MICROSOFT_APP_ID,
  appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Crear servidor
const server = restify.createServer();
server.listen(process.env.PORT || 3978, () => {
  console.log('Bot escuchando en ${server.url}');
});

// Registrar endpoint /api/messages
server.post('/api/messages', async (req, res) => {
  await adapter.processActivity(req, res, async (context) => {
    if (context.activity.type === 'message') {
      const text = context.activity.text.toLowerCase();
      if (text.includes('hola')) {
        await context.sendActivity('¡Hola! ¿En qué puedo ayudarte?');
      } else if (text.includes('ayuda')) {
        await context.sendActivity('Puedo ayudarte con información básica. Pregúntame algo.');
      } else {
        await context.sendActivity('No entendí eso. Prueba con "hola" o "ayuda".');
      }
    }
  });
});


