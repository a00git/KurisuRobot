import Telegraf from 'telegraf';

const bot = new Telegraf(process.env.BOT_TOKEN || '');
bot.on('message', (ctx) => ctx.reply('Test~'));

const main = async () => {
  await bot.launch();
};

main().catch(err => console.error(err));
