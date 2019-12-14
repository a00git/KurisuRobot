import Telegraf from 'telegraf';

const bot = new Telegraf(process.env.BOT_TOKEN || '');

bot.on('message', (ctx) => ctx.reply('Test~'));

export default bot;
