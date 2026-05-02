const TelegramBot = require('node-telegram-bot-api');

const TOKEN = process.env.BOT_TOKEN;
const bot = new TelegramBot(TOKEN, { polling: true });

const users = {};

bot.onText(/\/start/, (msg) => {
  const id = msg.chat.id;
  const name = msg.from.first_name;
  if (!users[id]) users[id] = { coins: 0, spins: 3 };
  bot.sendMessage(id, `🎉 Baga nagaan dhufte ${name}!\n\n🪙 Coin: ${users[id].coins}\n🎰 Spin: ${users[id].spins}\n\n👇 Filadhu:`, {
    reply_markup: {
      keyboard: [['🎰 Spin', '👆 Tap'], ['💰 Balance', '👥 Invite']],
      resize_keyboard: true
    }
  });
});

bot.onText(/Spin|🎰/, (msg) => {
  const id = msg.chat.id;
  if (!users[id]) users[id] = { coins: 0, spins: 3 };
  if (users[id].spins <= 0) {
    return bot.sendMessage(id, '❌ Spin hin qabdu! Boru deebi\'i.');
  }
  const results = ['🍋🍋🍋', '🍒🍒🍒', '⭐⭐⭐', '🍋🍒⭐', '🍒⭐🍋'];
  const wins = [100, 50, 200, 10, 20];
  const idx = Math.floor(Math.random() * results.length);
  users[id].coins += wins[idx];
  users[id].spins--;
  bot.sendMessage(id, `🎰 ${results[idx]}\n\n+${wins[idx]} Coin!\n🪙 Waliigala: ${users[id].coins}\n🎰 Spin hafte: ${users[id].spins}`);
});

bot.onText(/Tap|👆/, (msg) => {
  const id = msg.chat.id;
  if (!users[id]) users[id] = { coins: 0, spins: 3 };
  users[id].coins += 5;
  bot.sendMessage(id, `👆 +5 Coin!\n🪙 Waliigala: ${users[id].coins}`);
});

bot.onText(/Balance|💰/, (msg) => {
  const id = msg.chat.id;
  if (!users[id]) users[id] = { coins: 0, spins: 3 };
  bot.sendMessage(id, `💰 Coin kee: ${users[id].coins}\n🎰 Spin hafte: ${users[id].spins}`);
});

bot.onText(/Invite|👥/, (msg) => {
  const id = msg.chat.id;
  bot.sendMessage(id, `👥 Hiriyaa kee afaari bonus argadhu!\n\nLink kee:\nhttps://t.me/SpinWinBot?start=${id}`);
});

console.log('SpinWin Bot hojjechaa jira...');
