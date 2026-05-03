const TelegramBot = require('node-telegram-bot-api');

const TOKEN = process.env.BOT_TOKEN;
const WEBAPP_URL = process.env.WEBAPP_URL || 'https://your-app.railway.app/public/index.html';
const bot = new TelegramBot(TOKEN, { polling: true });

const users = {};

bot.onText(/\/start/, (msg) => {
  const id = msg.chat.id;
  const name = msg.from.first_name;
  if (!users[id]) users[id] = { coins: 0, spins: 3 };
  bot.sendMessage(id, `🎉 Baga nagaan dhufte ${name}!\n\n🪙 Coin: ${users[id].coins}\n🎰 Spin: ${users[id].spins}\n\n👇 SpinWin Mini App bani:`, {
    reply_markup: {
      inline_keyboard: [[
        { text: '🎰 SpinWin App Bani', web_app: { url: WEBAPP_URL } }
      ],[
        { text: '💰 Balance', callback_data: 'balance' },
        { text: '👥 Invite', callback_data: 'invite' }
      ]]
    }
  });
});

bot.on('callback_query', (query) => {
  const id = query.message.chat.id;
  if (!users[id]) users[id] = { coins: 0, spins: 3 };
  if (query.data === 'balance') {
    bot.sendMessage(id, `💰 Coin kee: ${users[id].coins}\n🎰 Spin hafte: ${users[id].spins}`);
  } else if (query.data === 'invite') {
    bot.sendMessage(id, `👥 Link kee:\nhttps://t.me/SpinWinBot?start=${id}`);
  }
  bot.answerCallbackQuery(query.id);
});

console.log('SpinWin Bot hojjechaa jira...');
