import Telegraf from 'telegraf';
import http from 'http';

const bot = new Telegraf(process.env.BOT_TOKEN || '');
bot.on('message', (ctx) => ctx.reply('Test~'));

const main = async () => {
  await bot.launch();
  http.createServer((req, res) => {
    res.end('Test~');
  }).listen(80);
};

main().catch(err => console.error(err));
